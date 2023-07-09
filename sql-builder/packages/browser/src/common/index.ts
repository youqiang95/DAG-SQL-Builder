import {EasySQLLoginLocation} from './constant'
export * from './interface'
export * from './deferred'
export * from './genUniqId'
export * from './folderTreeDiffChecker'
export * from './fileSuffix'
export * from './antiShark'
export * from './constant'
export * from './position'
export * from './encrypt'

export const getCookieValue = (name:string) => {
    const cookies = document.cookie.split(';')
    for (let cookie of cookies){
        const cookieSplit = cookie.split('=')
        if(cookieSplit.length === 2 && cookieSplit[0].trim() === name){
            return cookieSplit[1].trim()
        }
    }
    return null 
}

export const SUPPORT_WX_CODE_SRC =  'https://static.sqlzhushou.com/sqlzhushou_support_wx_group_code.jpg'  

export const SqlMonacoId = (graphId:string, nodeId:string)=> 'Sql-' + graphId + '-' + nodeId
export const FinalSqlMonacoId = (graphId:string, nodeId:string)=> 'FinalSql-' + graphId + '-' + nodeId
export const FromEditorId = (graphId:string, nodeId:string)=>'From-' + graphId + '-' + nodeId
export const CompileSqlEditorId = (graphId:string, nodeId:string)=>'CompileSql-' + graphId + '-' + nodeId

const NODE_EDITOR_TAB_PREFIX = 'node-editor@'
export const NodeEditorTabId = (graphId:string, nodeId:string)=> NODE_EDITOR_TAB_PREFIX + graphId + '@' + nodeId
export const parseGraphNodeIdByTabId = (tabId:string)=>{
    if(tabId.startsWith(NODE_EDITOR_TAB_PREFIX)){
        const subs = tabId.substring(NODE_EDITOR_TAB_PREFIX.length).split('@')
        if(subs.length>=2){
            return [subs[0], subs[1]]
        }
    }
    return [null, null]
}


export const normalizeUrl = (url: string): string =>{
    const regex = /\/+$/g; 
    return url.replace(regex, '')
}

export const redirectLoginPage = ()=>{
    window.location.href = normalizeUrl(EasySQLLoginLocation)
}

export const waitWithTimeout = async (promise:Promise<any>, timeout:number, timeoutMessage:string = "timeout") => {
    let timer: any = undefined;
    const timeoutPromise = new Promise((_, reject) => {
      timer = setTimeout(() => reject(timeoutMessage), timeout);
    }); 
    return Promise.race([timeoutPromise, promise])
      .finally(() => clearTimeout(timer))
}


export const delayResult = (result:any, delay=5000)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(result)
        }, delay)       
    })
}