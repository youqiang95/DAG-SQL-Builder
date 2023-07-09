import { Modal, Input, ConfigProvider, Form} from 'antd'
import React from 'react'
import {Deferred} from '@/common'
import type { FormInstance} from 'antd'

const { TextArea } = Input;

const createContainer = () => {
    const div = document.createElement('div')
    div.classList.add('feeback-form-container')
    window.document.body.append(div)
    return {
        element: div,
        destroy: () => {
            window.document.body.removeChild(div)
        },
    }
}

type IModalInstance = ReturnType<typeof Modal.confirm>
interface IFormProps {
    feedbackContent: string
}
class ModalCache {
    static modal: IModalInstance
    static form: FormInstance<IFormProps>
}

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 24 },
}

const ModalContent: React.FC = () =>{
    const [form] = Form.useForm<IFormProps>()
    ModalCache.form = form
    return (
        <div className='feedback-modal-content'>
            <ConfigProvider>
                <Form form={form} {...layout} initialValues={{ feedbackContent: '' }}>
                    <Form.Item
                        name="feedbackContent"
                        // label="反馈内容"
                        rules={[
                            { required: true, message: '请输入反馈内容' },
                        ]}
                    >
                        <TextArea rows={10} />
                    </Form.Item>
                </Form>
            </ConfigProvider>
        </div>
    )
}

export const showFeedbackForm = ()=>{
    const container = createContainer()
    const defer = new Deferred<string>()
    const onHide = () => {
        modal.destroy()
        ModalCache.modal = null
        ModalCache.form = null
        container.destroy()
    }
    const onOk = async () => {
        const { modal, form } = ModalCache
        if(!(modal && form)){
            onHide()
            return 
        }
        try {
            modal.update({ okButtonProps: { loading: true } })
            await form.validateFields(['feedbackContent'])
            const values = form.getFieldsValue()
            if(values  && values.feedbackContent){
                defer.resolve(values.feedbackContent)
            }
            onHide()
        } catch (error) {
            console.error(error)
            modal.update({ okButtonProps: { loading: false } })
            defer.resolve(null)
            onHide()
        }
    }
    const modal = Modal.confirm({
        title: '反馈或建议',
        content: <ModalContent/>,
        okText: '提交反馈',
        cancelText: '取消',
        getContainer: () => {
            return container.element
        },
        okButtonProps: {
            onClick: e => {
            e.stopPropagation()
            onOk()
            },
        },
        onCancel: () => {
            onHide()
        },
        afterClose: () => {
            onHide()
        },
    })
    ModalCache.modal = modal

    return defer.promise
}