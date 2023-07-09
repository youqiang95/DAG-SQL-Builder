import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import molecule from '@dtinsight/molecule'
import {getUserService} from './userService'
import {sendMessageToOutput} from './bottomPanelService'
import {sendPOSTRequest} from '../api'
import { message } from 'antd';
import React from 'react'
import {validate_sql} from '@/api/mock/dataWarehouse'

const Component = molecule.react.Component

// define model 
export interface IGlobalDataWarehouseConfig {
    sourceType: string,
    config: any
}   

// 
export class GlobalDataWarehouseConfig implements IGlobalDataWarehouseConfig {
    sourceType: string
    config: any
    constructor() {
        this.sourceType = null 
        this.config = null
    }
}

export interface IGlobalDataWarehouseService extends molecule.react.Component<IGlobalDataWarehouseConfig> {
    loadConfigFromServer: ()=>Promise<void>,
    updateConfig: (state: Partial<IGlobalDataWarehouseConfig>)=>Promise<void>,
    isConnectable: (sourceType:string, config:any)=>Promise<boolean>,
    fetchTableList: ()=>Promise<any[]>,
    validateSql: (sql:string)=>Promise<boolean>
}

@singleton()
export class GlobalDataWarehouseService
    extends Component<IGlobalDataWarehouseConfig>
    implements IGlobalDataWarehouseService
{
    protected state: IGlobalDataWarehouseConfig;

    constructor() {
        super();
        this.state = container.resolve(GlobalDataWarehouseConfig);
    }

    loadConfigFromServer = async ()=>{
        const ret = await sendPOSTRequest('/api/get_data_warehouse_config', {})
        if(ret.err){
            message.error('获取数据仓库配置错误：' + ret.err)
            return 
        }
        if(ret.result && ret.result.sourceType && ret.result.config){
            this.setState({
                sourceType: ret.result.sourceType,
                config: ret.result.config
            })
        }
    }

    updateConfig = async (state: Partial<IGlobalDataWarehouseConfig>)=>{
        this.setState(state)
        const {sourceType, config} = this.getState()
        const ret = await sendPOSTRequest('/api/onUpdateDataWarehouseConfig', {
            value: JSON.stringify({
                sourceType,
                config
            })
        })
    }

    isConnectable = async (sourceType:string, config:any)=>{
        if(!(sourceType && config)){
            message.error('数据源配置参数错误')
            return false 
        }
        const ret = await sendPOSTRequest('/api/is_data_warehouse_connectable/', {
            sourceType: sourceType,
            config: config
        })
        if(ret.err){
            message.error('连接失败: ' + ret.err)
            return false 
        }
        else if (ret.result && ret.result === 'success'){
            message.success('连接成功')
            return true
        }
        else {
            message.error('连接失败')
            return false
        }
    }

    fetchTableList = async ()=>{
        let result = []
        const {sourceType, config} = this.getState()
        if(sourceType && config){
            const ret = await sendPOSTRequest('/api/get_data_warehouse_table_list', {
                sourceType: sourceType,
                config: config
            })
            if(ret.err){
                message.error('发生错误：' + ret.err)
                return result
            }
            if(ret.result){
                return ret.result
            }
        }
        else {
            message.error('您还没有配置有效的数据源，请配置数据源！')
        }
        return result
    }

    validateSql = async (sql:string)=>{
        const userService = getUserService()
        const {uid} = await userService.getUserInfo()
        if(uid === null){
            message.error('错误：未登录')
            return false
        }
        const {sourceType, config} = this.getState()
        if(sourceType && config){
            const ret = await validate_sql()
            // const ret = await sendPOSTRequest('/api/validate_sql/', {
            //     uid,
            //     sourceType: sourceType,
            //     config: config,
            //     sql: sql
            // })
            if(ret.err){
                message.error('校验失败')
                sendMessageToOutput('SQL校验失败:\n' + ret.err)
                return false
            }
            if(ret.result && ret.result === 'success'){
                message.success('校验成功!')
                sendMessageToOutput('SQL校验成功')
                return true
            }
            message.error('校验失败')
            sendMessageToOutput('SQL校验失败:\n' + '未知错误')
            return false
        }
        else {
            message.error('您还没有配置有效的数据源，请配置有效数据源！')
        }
        return false
    }
}

export const getDataWarehouseConfigservice = () =>{
    return container.resolve(GlobalDataWarehouseService)
}

export const useDataWarehouseConfigModel = ()=>{
    const service = getDataWarehouseConfigservice()
    const [model, setModel] = React.useState<GlobalDataWarehouseConfig>(service.getState())
    React.useEffect(()=>{
        service.onUpdateState((prevState, nextState)=>{
            setModel({...nextState})
        })
    }, [service])
    return model
}