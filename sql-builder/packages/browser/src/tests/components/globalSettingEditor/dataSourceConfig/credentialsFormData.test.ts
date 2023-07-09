import {DataSourceCredentialConfigManager, DataSourceCredentialConfig} from '@/components/globalSettingEditor/dataSourceConfig/credentialsFormData'

describe('DataSourceCredentialConfigManager', ()=>{
    describe('getCredentialsFormData', ()=>{
        it('common', ()=>{
            const ins = DataSourceCredentialConfigManager.getInstance()
            for(const sourceType in DataSourceCredentialConfig){
                const ret = ins.getCredentialsFormData(sourceType)
                for(let i=0; i<DataSourceCredentialConfig[sourceType].length; i++){
                    const retSub = ret[i]
                    const configSub = DataSourceCredentialConfig[sourceType][i]
                    expect(retSub['name']).toEqual(configSub['name'])
                    expect(retSub['label']).toEqual(configSub['name'])
                    expect(retSub['clear']).toEqual(configSub['isSensitive'])
                    expect(retSub['needEncrypt']).toEqual(configSub['isSensitive'])
                    expect(retSub['type']).toEqual(configSub['type'])
                    expect(retSub['default']).toEqual(configSub['default'])
                }
            } 
        })

        it('get unknow source type shoule throw error', ()=>{
            const ins = DataSourceCredentialConfigManager.getInstance()
            expect(()=>{
                ins.getCredentialsFormData('unknowType')
            }).toThrowError()
        })
    })

    describe('getCredentialsTableData', ()=>{
        it('common', ()=>{
            const ins = DataSourceCredentialConfigManager.getInstance()
            for (let sourceType in DataSourceCredentialConfig){
                let cred = {}
                for(let item of DataSourceCredentialConfig[sourceType]){
                    cred[item.name] = 'cred_' + item.name
                }
                const {columns, dataSource} = ins.getCredentialsTableData(sourceType, cred)
                for(let col of columns){
                    if(col.dataIndex === 'sourceType'){
                        continue
                    }
                    expect(dataSource[0][col.dataIndex]).toBe(cred[col.dataIndex])
                }
            }
        })
        it('datasource shoule fill default value when credential key miss', ()=>{
            const ins = DataSourceCredentialConfigManager.getInstance()
            for (let sourceType in DataSourceCredentialConfig){
                let cred = {}
                let defaultRecord = new Map<string, any>()
                for(let item of DataSourceCredentialConfig[sourceType]){
                    if(!item.default){
                        cred[item.name] = 'cred_' + item.name
                    }
                    else {
                        defaultRecord.set(item.name, item.default)
                    }
                }
                const {columns, dataSource} = ins.getCredentialsTableData(sourceType, cred)
                for(let col of columns){
                    if(col.dataIndex === 'sourceType'){
                        continue
                    }
                    if(defaultRecord.has(col.dataIndex)){
                        expect(dataSource[0][col.dataIndex]).toBe(defaultRecord.get(col.dataIndex))
                    }
                }
            }
        })

        it('should return [] if !(sourceType and cred)', ()=>{
            const ins = DataSourceCredentialConfigManager.getInstance()
            const result = ins.getCredentialsTableData(null, null)
            expect(result.columns).toEqual([])
            expect(result.dataSource).toEqual([])
        })
    })
})