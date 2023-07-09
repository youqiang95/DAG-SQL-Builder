import {
    getUserRootFolderData,
    userCreateDirOrFile,
    userMoveDirOrFile,
    userRemoveDirOrFile,
    userUpdateFile,
    getUserConfigData,
    updateUSerConfigData,
    importExamplesData,
    getUserDataWarehouseConfigData,
    updateUSerDataWarehouseConfigData
} from '../storage'
import {HttpHandler, AuthHttpHandler, StorageDataSyncHandler, req_auth_cookie} from './base'
import {sendPostRequest} from '../util/request'
import {DataWarehouseRunnerUrl} from '../common'

const getUser = new HttpHandler(
    '/api/get_user', 
    'GET', 
    async (req, resp)=>{
        if(req.cookies.uid && req.cookies.token){
            const authRet = await req_auth_cookie(req, resp)
            if(authRet){
                return {result: {uid: req.cookies.uid}}
            }
        }
        return {result: {uid: null}}
    },
    ['uid', 'token'],
    []
)

const getFolderData = new AuthHttpHandler(
    '/api/get_folder_data',
    'POST',
    async (req, resp)=>{
        return getUserRootFolderData(req.cookies.uid)
    },
    ['uid', 'token'],
    []
)

const getConfigData = new AuthHttpHandler(
    '/api/get_config_data',
    'POST',
    async (req, resp)=>{
        return getUserConfigData(req.cookies.uid)
    },
    ['uid', 'token'],
    []
)

const importExamples = new AuthHttpHandler(
    '/api/importExamples',
    'POST',
    async (req, resp)=>{
        importExamplesData(req.cookies.uid)
        return {result: 'success'}
    },
    ['uid', 'token'],
    []
)

const onUpdateFile = new StorageDataSyncHandler(
    '/api/onUpdateFile',
    'POST',
    async (req, resp)=>{
        userUpdateFile(req.cookies.uid, req.body.path, req.body.value)
        return {}
    },
    ['uid', 'token'],
    ['path', 'value'],
)

const onCreateDirOrFile = new StorageDataSyncHandler(
    '/api/onCreateDirOrFile',
    'POST',
    async (req, resp)=>{
        userCreateDirOrFile(req.cookies.uid, req.body.path, req.body.is_dir, req.body.value)
        return {}
    },
    ['uid', 'token'],
    ['path', 'value', 'is_dir'],
)

const onMoveDirOrFile = new StorageDataSyncHandler(
    '/api/onMoveDirOrFile',
    'POST',
    async (req, resp)=>{
        userMoveDirOrFile(req.cookies.uid, req.body.old_path, req.body.new_path)
        return {}
    },
    ['uid', 'token'],
    ['old_path', 'new_path']
)

const onRemoveDirOrFile = new StorageDataSyncHandler(
    '/api/onRemoveDirOrFile',
    'POST',
    async (req, resp)=>{
        userRemoveDirOrFile(req.cookies.uid, req.body.path)
        return {}
    },
    ['uid', 'token'],
    ['path']
)

const onUpdateGlobalConfig = new StorageDataSyncHandler(
    '/api/onUpdateGlobalConfig',
    'POST',
    async (req, resp)=>{
        updateUSerConfigData(req.cookies.uid, req.body.value)
        return {}
    },
    ['uid', 'token'],
    ['value']
)

const clientReportError = new HttpHandler(
    '/api/clientReportError',
    'POST',
    async (req, resp)=>{
        return {}
    },
    ['uid', 'token'],
    ['value']
)

const sendFeedback = new HttpHandler(
    '/api/sendFeedback',
    'POST',
    async (req, resp)=>{
        return {}
    },
    [],
    ['value']
)

const getDataWarehouseConfig = new AuthHttpHandler(
    '/api/get_data_warehouse_config',
    'POST',
    async (req, resp)=>{
        return { result: getUserDataWarehouseConfigData(req.cookies.uid) }
    },
    ['uid', 'token'],
    []
)

const updateDataWarehouseConfig = new StorageDataSyncHandler(
    '/api/onUpdateDataWarehouseConfig',
    'POST',
    async (req, resp)=>{
        updateUSerDataWarehouseConfigData(req.cookies.uid, req.body.value)
        return { result: {} }
    },
    ['uid', 'token'],
    ['value']
)

const getDataWarehouseTableList = new AuthHttpHandler(
    '/api/get_data_warehouse_table_list',
    'POST',
    async (req, resp)=>{
        const respData = await sendPostRequest(DataWarehouseRunnerUrl + '/api/list_tables', {
            ...req.body.config,
            uid: req.cookies.uid,
            token: req.cookies.token,
            warehouse: req.body.sourceType
        })
        if(respData.err){
            return {err: respData.err}
        }
        return { result: respData.result}
    },
    ['uid', 'token'],
    ['sourceType', 'config']
)

const isDataWarehouseConnectable = new AuthHttpHandler(
    '/api/is_data_warehouse_connectable',
    'POST',
    async (req, resp)=>{
        const respData = await sendPostRequest(DataWarehouseRunnerUrl + '/api/is_connectable', {
            ...req.body.config,
            uid: req.cookies.uid,
            token: req.cookies.token,
            warehouse: req.body.sourceType
        })
        if(respData.err){
            return {err: respData.err}
        }
        return { result: respData.result}
    },
    ['uid', 'token'],
    ['sourceType', 'config']
)

export const handlerList = [
    getUser,
    getFolderData,
    getConfigData,    
    importExamples,
    onUpdateFile,
    onCreateDirOrFile,
    onMoveDirOrFile,
    onRemoveDirOrFile,
    onUpdateGlobalConfig,
    clientReportError,
    sendFeedback,
    getDataWarehouseConfig,
    updateDataWarehouseConfig,
    getDataWarehouseTableList,
    isDataWarehouseConnectable
]