import React from 'react'
import './index.less'
import type {GraphParamsDataType, DataType} from '../interface'
import {genUniqId} from '@/common'
import 'reflect-metadata';
import { singleton, container } from 'tsyringe';

export interface INameCheckService {
    setNameCheckFunc: (func: (key:string, name:string)=>string)=>void,
    checkName: (key:string, name:string)=>string
}

@singleton()
export class NameCheckService implements INameCheckService{
    nameCheckFunc: (key:string, name:string)=>string | null
    constructor() {
        this.nameCheckFunc = null 
    }

    setNameCheckFunc = (func: (key:string, name:string)=>string)=>{
        this.nameCheckFunc = func 
    }

    checkName = (key:string, name:string)=>{
        if(this.nameCheckFunc){
            return this.nameCheckFunc(key, name)
        }
        else {
            return null 
        }
    }
}

const adjustNewParamNameAvoidSame = (key:string, name:string)=>{
    if(container.resolve(NameCheckService).checkName(key, name)){
        return adjustNewParamNameAvoidSame(key, name + '_copy')
    }
    else {
        return name
    }
}

type ConfigTabName = 'params' | 'presql' |null 

export interface IRightConfigPanelProps {
    dataSource: GraphParamsDataType,
    tabId:string,
    nameCheckFunc: (key:string, name:string)=>string,
    onDatachange: (newData: GraphParamsDataType)=>void
}

interface IErrorInfo { 
    key: string,
    nameErrorInfo: string,
    valueErrorInfo: string
}

const RightConfigPanel: React.FC<IRightConfigPanelProps> = (props) =>{
    const {dataSource, nameCheckFunc, onDatachange, tabId}  = props
    const [dataState, setDataState] = React.useState<GraphParamsDataType>(dataSource)
    const [activeTab, setActiveTab] = React.useState<ConfigTabName>(null)
    const [errorInfoMap, setErrorInfoMap] = React.useState<Map<string, IErrorInfo>>(new Map<string, IErrorInfo>())
    const [isDataChange, setIsDataChange] = React.useState<boolean>(false)
    const nameCheckService = container.resolve(NameCheckService)
    nameCheckService.setNameCheckFunc((key:string, name:string)=>{
        for(let item of dataState){
            if(item.paramName === name){
                return '已经存在此名称的参数了，请重命名！'
            }
        }
        return nameCheckFunc(key, name)
    })
    const isDisAbleSave = ()=>{
        if(!isDataChange){
            return true
        }
        const inValidData = dataState.filter((item)=>{
            if(errorInfoMap.get(item.key.toString())){
                return true
            }
            else{
                return false
            }
        })
        return inValidData.length > 0
    }

    const toggleTabItem = (name: ConfigTabName)=>{
        if(activeTab === null){
            setActiveTab(name)
        }
        else {
            setActiveTab(null)
        }
    }
    const onParamChange = (key:string, valueType:'name'|'value', value:string)=>{
        if(valueType === 'name'){
            const errorInfo = nameCheckService.checkName(key, value)
            if(errorInfo){
                errorInfoMap.set(key, {
                    key: key,
                    nameErrorInfo: errorInfo,
                    valueErrorInfo: null
                })
                setErrorInfoMap(errorInfoMap)
            }
            else {
                errorInfoMap.delete(key)
            }
        }
        const newData: GraphParamsDataType = dataState.map(item=>{
            if(item.key.toString() === key){
                if(valueType === 'name'){
                    return {
                        ...item,
                        paramName: value
                        
                    }
                }
                else if (valueType === 'value'){
                    return {
                        ...item,
                        paramValue: value
                        
                    }
                }
                else {
                    return {
                        ...item
                    }
                }
            }
            else {
                return {
                    ...item
                }
            }
        })
        setDataState(newData)
        setIsDataChange(true)
    }

    const onDeleteParam = (key:string)=>{
        const newData: GraphParamsDataType = dataState.filter(item=>{
            if(item.key.toString() !== key){
                return true
            }
            else {
                return false 
            }
        })
        setDataState(newData)
        setIsDataChange(true)
    }

    const onAddParam = (key:string, name:string, value:string)=>{
        const fromExist = dataState.filter(item=>item.key.toString()===key)
        if(fromExist.length > 0){
            return 
        } 
        setDataState([...dataState, {
            key:key,
            paramName: name,
            paramValue: value
        }])
        setIsDataChange(true)
    }

    const onClickAddParam = (e:React.MouseEvent)=>{
        const newKey = genUniqId()
        onAddParam(newKey, adjustNewParamNameAvoidSame(newKey, 'paramName'), 'paramValue')
    }

    const getErrorInfo = (key:string, errorType: 'name'| 'value')=>{
        const info = errorInfoMap.get(key.toString())
        if(info){
            if(errorType === 'name' && info.nameErrorInfo){
                return info.nameErrorInfo
            }
            if(errorType === 'value' && info.valueErrorInfo){
                return info.valueErrorInfo
            }
        }
        else {
            return null
        }
    }
    const handleSave = (e: React.MouseEvent)=>{
        onDatachange(dataState)
        setIsDataChange(false)
    }

    const onCloseParamsContainer = (e: React.MouseEvent)=>{
        setActiveTab(null)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.ctrlKey && event.code === 'KeyA') { // Ctrl + A 快捷键
          event.preventDefault(); // 防止全文选择
          event.currentTarget.select()
        }
    }

    React.useEffect(()=>{
        setDataState(dataSource)
        errorInfoMap.clear()
        setErrorInfoMap(errorInfoMap)
        setIsDataChange(false)
    }, [dataSource])

    React.useEffect(()=>{
        setActiveTab(null)
    }, [tabId])

    return (
        <div className='right-config-panel'>
            {
                activeTab === 'params' &&
                <div className='right-config-panel-content'>
                    <div className='panel-title'>
                        <button type='button' onClick={onCloseParamsContainer}>
                            <i className='fa fa-times'></i>
                        </button>
                        <div className='label'>关闭</div>
                    </div>
                    <div className='params-container'>
                        <div className='tips'>
                            <i className='fa fa-info-circle'></i>
                            <div className='tips-content'>
                                修改参数后保存才能生效！
                            </div>
                        </div>
                        <span className='params-rows'>
                            { 
                                dataState.map(item=>(
                                    <div className='param-row' dir='lrt'>
                                        <div className='param-name' dir='ltr'>
                                            <div className='form-item'>
                                                <div className='form-item-label'>
                                                    <label>参数名称</label>
                                                </div>
                                                <div className='form-item-control'>
                                                    <span>
                                                        <input 
                                                            value={item.paramName} 
                                                            onChange={(e)=>{
                                                                onParamChange(item.key.toString(), 'name', e.target.value)
                                                                }
                                                            }
                                                            onKeyDown={handleKeyDown}
                                                        />
                                                    </span>
                                                    {
                                                       getErrorInfo(item.key.toString(), 'name') && 
                                                        <p className='param-error'>{getErrorInfo(item.key.toString(), 'name')}</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className='param-name' dir='ltr'>
                                            <div className='form-item'>
                                                <div className='form-item-label'>
                                                    <label>参数值</label>
                                                </div>
                                                <div className='form-item-control param-value'>
                                                    <input 
                                                        value={item.paramValue} 
                                                        onChange={(e)=>{
                                                            onParamChange(item.key.toString(), 'value', e.target.value)
                                                            }
                                                        }
                                                        onKeyDown={handleKeyDown}
                                                    />
                                                    <div className='form-item-delete'>
                                                        <a onClick={(e)=>{
                                                            onDeleteParam(item.key.toString())
                                                        }}>
                                                            删除
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </span>
                        <div className='btn-area'>
                            <button type='button' className='btn-secondary' onClick={onClickAddParam}>
                                <span>新增参数</span>
                            </button>
                            <button type='button' className='btn-primary' onClick={handleSave} disabled={isDisAbleSave()}>
                                <span>保存参数</span>
                            </button>
                        </div>
                    </div>
                </div>
            }
            <div className='right-config-panel-nav-bar'>
                <div className={activeTab==='params' ? 'nav-tab-item active' : 'nav-tab-item'}>
                    <div className='nav-tab-item-title'>
                           <span className='nav-tab-item-label' onClick={(e)=>{toggleTabItem('params')}}>画布参数</span> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightConfigPanel