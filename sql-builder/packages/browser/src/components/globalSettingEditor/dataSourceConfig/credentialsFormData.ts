
interface IDataSourceCredentialConfigItem  {
    name: string,
    isSensitive: boolean,
    default?: any,
    type: 'string' | 'number'
}

export const DataSourceCredentialConfig = {
    mysql: [
        {name: 'host', isSensitive: false, type: 'string'},
        {name: 'user', isSensitive: false, type: 'string'},
        {name: 'database', isSensitive: false, type: 'string'},
        {name: 'password', isSensitive: true, type: 'string'},
        {name: 'port', isSensitive:false, default: 3306, type:'number'}   
    ],
    maxcompute: [
        {name: 'endpoint', isSensitive: false, type: 'string'},
        {name: 'access_id', isSensitive: true, type: 'string'},
        {name: 'access_key', isSensitive: true, type: 'string'},
        {name: 'project_name', isSensitive: false, type: 'string'}
    ],
    postgresql: [
        {name: 'host', isSensitive: false, type: 'string'},
        {name: 'user', isSensitive: false, type: 'string'},
        {name: 'database', isSensitive: false, type: 'string'},
        {name: 'password', isSensitive: true, type: 'string'},
        {name: 'port', isSensitive:false, default: 5432, type:'number'}
    ]
}

export class DataSourceCredentialConfigManager {
    private static instance: DataSourceCredentialConfigManager
    private credentialMap: Map<string, IDataSourceCredentialConfigItem[]>

    private constructor(){
        this.credentialMap = new Map<string, IDataSourceCredentialConfigItem[]>()
    }

    public static getInstance(): DataSourceCredentialConfigManager{ 
        if (!DataSourceCredentialConfigManager.instance) {
            DataSourceCredentialConfigManager.instance = new DataSourceCredentialConfigManager();
            for(const sourceType in DataSourceCredentialConfig){
                DataSourceCredentialConfigManager.instance.registerSourceTypeCredentialConfig(sourceType, DataSourceCredentialConfig[sourceType])
            }
        }
        return DataSourceCredentialConfigManager.instance;
    }

    public registerSourceTypeCredentialConfig(sourceType: string, config: IDataSourceCredentialConfigItem[]){
        this.credentialMap.set(sourceType, config)
    }

    public getSourceTypeList(){
        return Array.from(this.credentialMap.keys())
    }

    public getCredentialsFormData(sourceType:string){
        const config = this.credentialMap.get(sourceType)
        if(!config){
            throw new Error('getCredentialsFormData unknown source type ' + sourceType)
        }
        let result = []
        for(const item of config){
            result.push({
                name: item.name, 
                label: item.name, 
                clear: item.isSensitive, 
                needEncrypt: item.isSensitive,
                type: item.type,
                default: item.default
            })
        }
        return result
    }

    public getCredentialsTableData(sourceType:string, credentials:any){
        if(!(sourceType && credentials)){
            return {
                columns: [],
                dataSource: []
            }
        }
        const config = this.credentialMap.get(sourceType)
        if(!config){
            throw new Error('getCredentialsTableData unknown source type ' + sourceType)
        }
        let columns =  [
            {
                title: '数据源类型',
                dataIndex: 'sourceType',
                key: 'sourceType',
                default: null
            }
        ]
        for(const item of config){
            if(item.isSensitive){
                continue
            }
            columns.push({
                title: item.name,
                dataIndex: item.name,
                key: item.name,
                default: item.default || null
            })
        }
        let dataSourceItem = {
            key: '1',
            sourceType
        }

        for(const col of columns){
            if(col.dataIndex === 'sourceType'){
                continue
            }
            dataSourceItem[col.dataIndex] = credentials[col.dataIndex] || col.default || null
        }
        const dataSource = [
            dataSourceItem
        ]
        return {
            columns,
            dataSource
        }
    }
}

export const getCredentialsFormData = (sourceType:string)=>{
    const credConfigManager = DataSourceCredentialConfigManager.getInstance()
    return credConfigManager.getCredentialsFormData(sourceType)
}

export const getCredentialsTableData = (sourceType:string, config: any)=>{
    const credConfigManager = DataSourceCredentialConfigManager.getInstance()
    return credConfigManager.getCredentialsTableData(sourceType, config)
}

export const getSourceTypeOptions = ()=>{
    const credConfigManager = DataSourceCredentialConfigManager.getInstance()
    return credConfigManager.getSourceTypeList().map(item=>({
        value: item,
        label: item
    }))
}