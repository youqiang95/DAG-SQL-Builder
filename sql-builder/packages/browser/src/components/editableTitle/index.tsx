import React from 'react'
import {Typography, Form, Input, Modal} from 'antd';

interface IEditableTitleProps {
    title:string,
    onTitleChange: (newName:string)=>void,
    level?: number,
    tooltip?: string,
    checkValid?: (newName:string)=>string
}

export const EditableTitle: React.FC<IEditableTitleProps> = (props)=>{
    const [form] = Form.useForm<{titleName:string}>()
    const {onTitleChange, level, tooltip, checkValid} = props
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [title, setTitle] = React.useState<string>(props.title)
    const titleEditable = {
        tooltip: tooltip || '编辑',
        onStart: async ()=>{
            setIsModalOpen(true)
        }
    }
    const handleOk = async () => {
        try {
            await form.validateFields()
            const values = form.getFieldsValue()
            if(values && values.titleName){
                setTitle(values.titleName)
                onTitleChange(values.titleName)
            }
        } catch (error) {
            console.error(error)
        }
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    React.useEffect(()=>{
        setTitle(props.title)
    }, [props.title])

    React.useEffect(()=>{
        form.setFieldsValue({titleName: title})
    }, [title])
    return (
        <div>
            <Typography.Title editable={titleEditable} level={level || 2} style={{ margin: 0 }}>
                {title}
            </Typography.Title>
            <Modal title="编辑节点名称" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form}>
                    <Form.Item
                        name="titleName"
                        label="节点名称"
                        rules={[
                            { required: true, message:'节点名称不能为空'},
                            ()=>({
                                validator(_, value) {
                                    if(!checkValid){
                                        return Promise.resolve();
                                    }
                                    const errorMessage = checkValid(value)
                                    if (!errorMessage) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(errorMessage));
                                },
                            })
                        ]}
                        initialValue={title}
                    >
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}