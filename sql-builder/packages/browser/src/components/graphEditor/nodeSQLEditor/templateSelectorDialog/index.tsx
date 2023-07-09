import { Modal, Form, ConfigProvider, TreeSelect} from 'antd'
import type { FormInstance} from 'antd'
import {Deferred} from '@/common'
import { SQLTemplateType } from '@/common/interface'

export type IModalInstance = ReturnType<typeof Modal.confirm>

export interface IFormProps {
    templateType:SQLTemplateType
}

class ModalCache {
    static modal: IModalInstance
    static form: FormInstance<IFormProps>
}

const layout = {
    labelCol: { span: 7, offset: 0 },
    wrapperCol: { span: 30 },
}


interface ITreeData {
    title: string,
    value: string,
    children?: ITreeData[],
    selectable?: boolean
}

const SQLJoinTypes: ITreeData = {
    title: 'JOIN 语句',
    value: 'join-root',
    selectable: false,
    children: [
        {
            title: 'LEFT JOIN',
            value: SQLTemplateType.LEFTJOIN,
        },
        {
            title: 'RIGHT JOIN',
            value: SQLTemplateType.RIGHTJOIN,
        },
        {
            title: 'INNER JOIN',
            value: SQLTemplateType.INNERJOIN,
        },
        {
            title: 'FULL JOIN',
            value: SQLTemplateType.FULLJOIN
        }
    ]
}

const SQLUnionTypes: ITreeData = {
    title: 'UNION 语句',
    value: 'union-root',
    selectable: false,
    children: [
        {
            title: 'UNION ALL',
            value: SQLTemplateType.UNIONALL,
        },
        {
            title: 'UNION',
            value: SQLTemplateType.UNION,
        }
    ]
}

const SQLSelectTypes: ITreeData = {
    title: 'SELECT 语句',
    value: SQLTemplateType.SELECT
}

const SQLGroupByTypes: ITreeData = {
    title: 'GROUP BY 语句',
    value: SQLTemplateType.GROUPBY,
}

const getSQLTemplateTreeSelectorData: ()=>ITreeData = () => {
    return {
        title: 'SQL模板',
        value: 'root',
        selectable: false,
        children: [
            SQLSelectTypes,
            SQLGroupByTypes,
            SQLJoinTypes,
            SQLUnionTypes
        ]
    }
}

const ModalContent = () => {
    const onSelectorChange = (newValue:string)=>{
        
    }
    const [form] = Form.useForm<IFormProps>()
    /** 缓存form实例 */
    ModalCache.form = form 
    return (
        <div>
        <ConfigProvider>
            <Form form={form} {...layout} initialValues={{ templateType: SQLTemplateType.SELECT}}>
                <Form.Item
                    name='templateType'
                    label="SQL模板类型"
                >
                    <TreeSelect
                        style={{ width: '100%' }}
                        value={SQLTemplateType.SELECT}
                        dropdownStyle={{ maxHeight: 800, overflow: 'auto' }}
                        treeData={[getSQLTemplateTreeSelectorData()]}
                        placeholder="请选择SQL模板类型"
                        treeDefaultExpandAll
                        onChange={onSelectorChange}
                        listHeight={800}
                    />
                </Form.Item>
            </Form>
        </ConfigProvider>
        </div>
    )
}

const createContainer = () => {
    const div = document.createElement('div')
    div.classList.add('sql-template-selector-modal')
    window.document.body.append(div)
    return {
        element: div,
        destroy: () => {
            try {
                window.document.body.removeChild(div)
            } catch (error) {
            }
        },
    }
}

export const showSQLTemplateSelectorModal = ()=>{
    const defer = new Deferred<string | void | null>()
    const domContainer = createContainer()
    const onHide = () => {
        modal.destroy()
        ModalCache.form = null as any
        ModalCache.modal = null as any
        domContainer.destroy()
    }

    const onOk = async () => {
        const { form, modal } = ModalCache
        try {
            modal.update({ okButtonProps: { loading: true } })
            const values = form.getFieldsValue()
            const templateType: string = values.templateType
            defer.resolve(templateType)
            onHide()
        } catch (error) {
            console.error(error)
            /** 如果resolve空字符串则不更新 */
            modal.update({ okButtonProps: { loading: false } })
            onHide()
        }
    }
    const modal = Modal.confirm({
        title: '选择SQL模板',
        mask: false,
        maskClosable: true,
        closable: true,
        content: <ModalContent />,
        okText: '确定',
        cancelText: '取消',
        width: 500,
        getContainer: () => {
            return domContainer.element
        },
        okButtonProps: {
            onClick: e => {
            e.stopPropagation()
            onOk()
            },
        },
        onCancel: () => {
            onHide()
            defer.resolve(null)
        },
        afterClose: () => {
            onHide()
        },
    })
    ModalCache.modal = modal

    return defer.promise
}