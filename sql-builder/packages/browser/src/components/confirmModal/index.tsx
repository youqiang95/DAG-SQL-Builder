import { Modal} from 'antd'
import {Deferred} from '@/common'

const createContainer = () => {
    const div = document.createElement('div')
    div.classList.add('global-setting-modal')
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

export const showConfirmModal = (title:string, desc:string)=>{
    const domContainer = createContainer()
    const defer = new Deferred<boolean>()
    const onHide = () => {
        modal.destroy()
        domContainer.destroy()
    }

    const onOk = async () => {
        try {
            defer.resolve(true)
            onHide()
        } catch (error) {
            console.error(error)
            defer.resolve(false)
            onHide()
        }
    }
    const modal = Modal.confirm({
        title: title,
        maskClosable: true,
        content: desc,
        okText: '确定',
        cancelText: '取消',
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
        },
        afterClose: () => {
            onHide()
        },
    })
    return defer.promise
}