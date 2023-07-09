import React from 'react'
import { Select, Space, Form, Input, InputNumber, Button, Table} from 'antd';
import {getCredentialsFormData, getCredentialsTableData, getSourceTypeOptions} from './credentialsFormData'
import {getDataWarehouseConfigservice, useDataWarehouseConfigModel} from '@/globalServices'
import {encryptString} from '@/common'
import {AsyncButton} from '@/components/asyncButton'


interface IFormValue {
    sourceType: string,
    [key:string]: string
}

const dataWarehouseConfigservice = getDataWarehouseConfigservice()
const layout = { labelCol: { span: 4 }, wrapperCol: { span: 14} }

const encryptFormValues = (values:any)=>{
    if(!values.sourceType){
        return values
    }
    let encryptFields = []
    const formItems = getCredentialsFormData(values.sourceType)
    for(let item of formItems){
        if(item.needEncrypt){
            encryptFields.push(item.name)
        }
    }
    let newValues = {...values} 
    for(let name of encryptFields){
        newValues[name] = encryptString(newValues[name])
    }
    return newValues
}

const notNullSourceType = (sourceType:string|null|undefined)=>sourceType || 'mysql'

export const DataSourceConfigTab: React.FC = (props)=>{
    const [editing, setEditing] = React.useState<boolean>(false)
    const {sourceType, config} = useDataWarehouseConfigModel()
    const {dataSource, columns} = getCredentialsTableData(sourceType, config)
    const [form] = Form.useForm<IFormValue>();
    const [sourceTypeState, setSourceTypeState] = React.useState<string>(notNullSourceType(sourceType))
    const onSelectChange = (value: string)=>{
        setSourceTypeState(value)
    }
    const [isFormValid, setIsFormValid] = React.useState<boolean>(false)
    const formValues = Form.useWatch([], form);
    React.useEffect(() => {
        const asyncFunc = async ()=>{
            try {
                const values = await form.validateFields()
                setIsFormValid(true)
            } catch (error) {
                setIsFormValid(false)
            }
        }
        asyncFunc()
    }, [formValues]);
    const onOk = async ()=>{
        try {
            await form.validateFields()
            const values = form.getFieldsValue()
            if(values.sourceType){
                const encryptValues = encryptFormValues(values)
                await dataWarehouseConfigservice.updateConfig({
                    config: {...encryptValues},
                    sourceType: values.sourceType
                })
            }
        } catch (error) {
            console.error(error)
        }
        setEditing(false)
    }
    const onTestConnect = async ()=>{
        try {
            await form.validateFields()
            const values = form.getFieldsValue()
            if(values.sourceType){
                const testResult = await dataWarehouseConfigservice.isConnectable(values.sourceType, encryptFormValues(values))
            }
        } catch (error) {
            console.error(error)
        }
    }

    const onTableTestConnect = async ()=>{
        await dataWarehouseConfigservice.isConnectable(sourceType, config)
    }

    React.useEffect(()=>{
        let formValues = {sourceType: sourceTypeState}
        getCredentialsFormData(sourceTypeState).forEach(item=>{
            if(item.clear){
                formValues[item.name] = ''
            }
            else {
                let initValue = ''
                if(config && config[item.name] && config.sourceType===sourceTypeState){
                    initValue = config[item.name]
                }
                if(!initValue){
                    initValue = item.default || ''
                }
                formValues[item.name] = initValue
            }
        })
        form.setFieldsValue(formValues)
    }, [sourceTypeState])

    React.useEffect(()=>{
        setSourceTypeState(notNullSourceType(sourceType))
    }, [editing])

    return (
        <div>
            {
                !editing &&
                <div>
                    <Table dataSource={dataSource} columns={columns} pagination={false}/>
                    <Space style={{marginTop: 10}}>
                        <Button type="primary" onClick={() => setEditing(true)} >
                            配置
                        </Button>
                        <AsyncButton title='测试连接' onClick={onTableTestConnect}/>
                    </Space>
                </div>
            }
            {
                editing &&
                <Form
                    {...layout}
                    form={form}
                >
                    <Form.Item
                        name='sourceType'
                        label="数据源类型"
                        initialValue={sourceTypeState}
                    >
                        <Select
                            onChange={onSelectChange}
                            options={getSourceTypeOptions()}
                        />
                    </Form.Item>
                    {
                        getCredentialsFormData(sourceTypeState).map(item=>{
                            return (
                                <Form.Item
                                    name={item.name}
                                    label={item.label}
                                    rules={[{required: true}]}
                                >
                                    {
                                        item.type === 'number' &&
                                        <InputNumber value={form.getFieldValue(item.name)} onChange={(value) => form.setFieldsValue({ [item.name]: value })}/>
                                    }
                                    {
                                        item.type !== 'number' &&
                                        <Input value={form.getFieldValue(item.name)} onChange={(e) => form.setFieldsValue({ [item.name]: e.target.value })}/>
                                    }
                                </Form.Item>
                            )
                        })
                    }

                    <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
                        <Space>
                            <Button type="primary"  disabled={!isFormValid} onClick={onOk}>
                                确认
                            </Button>
                            <Button onClick={()=>setEditing(false)}>取消</Button> 
                            <AsyncButton disabled={!isFormValid} title='测试连接' onClick={onTestConnect} />
                        </Space>
                    </Form.Item>
                </Form>
            }
        </div>
    )
}