import {getMessageErrorHandlerManager, getRequestNoSuccessManager} from '@/api'
import {redirectLoginPage} from '@/common'
import {message} from 'antd'
import {getFolderTreeService} from  './folderTreesService'
import {getErrorPageStatusService} from './errorPageServices'

const folderTreeService = getFolderTreeService()

const errPageService = getErrorPageStatusService()

const messageErrorHandlers = [
    {
        errorKey: 'no_login',
        handler: async (data:any)=>{
            console.log('handler no_login')
            message.error('您的登录状态已过期, 即将跳转到登录页面......', 3, ()=>{
                redirectLoginPage()
            })
        }
    },
    {
        errorKey: 'storage_data_sync_error',
        handler: async (data:any)=>{
            message.error('与服务端文件同步错误，将重新加载文件系统......', 3, ()=>{
                folderTreeService.reloadFolderTreeDataFromServer()
            })
            
        }
    }
]

const requestNoSuccessHandlers = [
    {
        url: [
            '/api/onUpdateFile',
            '/api/onCreateDirOrFile',
            '/api/onMoveDirOrFile',
            '/api/onRemoveDirOrFile',
            '/api/onUpdateGlobalConfig',
        ],
        handler: async ()=>{
            errPageService.setState({
                isOpen: true,
                title: '与服务端交互出现错误',
                subTitle: '请检查网络连接或刷新页面',
                extra: [
                    {
                        type: 'primary',
                        key: 'reload',
                        name: '刷新页面',
                        onClick: async ()=>{
                            errPageService.setState({isOpen: false})
                            window.location.reload();
                        }
                    }
                ]
            })
        }
    }
]

export const registerMessageErrorHandler = ()=>{
    const errManager = getMessageErrorHandlerManager()
    const reqNoSuccessManager = getRequestNoSuccessManager()
    for(let handlerItem of messageErrorHandlers){
        errManager.registerErrorHandler(handlerItem.errorKey, handlerItem.handler)
    }
    for(let handlerItem of requestNoSuccessHandlers){
        reqNoSuccessManager.registerRequestUrl(handlerItem.url, handlerItem.handler)
    }
}