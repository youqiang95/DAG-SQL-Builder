import {normalizeUrl} from '@/common'

export class MessageErrorHandlersManager {
    private static instance: MessageErrorHandlersManager;
    private handlerMap: Map<string, (data:any)=>Promise<void>>
    private constructor(){
        this.handlerMap = new Map<string, (data:any)=>Promise<void>>()
    }

    public static getInstance(): MessageErrorHandlersManager {
        if (!MessageErrorHandlersManager.instance) {
            MessageErrorHandlersManager.instance = new MessageErrorHandlersManager();
        }
        return MessageErrorHandlersManager.instance;
    }

    public registerErrorHandler(errorKey:string, handler: (data:any)=>Promise<void>){
        this.handlerMap.set(errorKey, handler)
    }

    public emitError(errorKey:string, data:any){
        const handler = this.handlerMap.get(errorKey)
        if(handler){
            handler(data)
        }
    }
}

export const getMessageErrorHandlerManager = ()=>{
    return MessageErrorHandlersManager.getInstance()
}

export class RequestNoSuccessManager {
    private static instance: RequestNoSuccessManager;
    private handlerMap: Map<string, ()=>Promise<void>>
    private constructor(){
        this.handlerMap = new Map<string, ()=>Promise<void>>()
    }

    public static getInstance(): RequestNoSuccessManager {
        if (!RequestNoSuccessManager.instance) {
            RequestNoSuccessManager.instance = new RequestNoSuccessManager();
        }
        return RequestNoSuccessManager.instance;
    }

    public registerRequestUrl(url:string | string[], handler: ()=>Promise<void>){
        if(typeof url === 'string'){
            this.handlerMap.set(normalizeUrl(url), handler)
        }
        else if(Array.isArray(url)) {
            for(let u of url){
                this.handlerMap.set(normalizeUrl(u), handler)
            }
        }
    }

    public emitError(url:string){
        const handler = this.handlerMap.get(normalizeUrl(url))
        if(handler){
            handler()
        }
    }
}

export const getRequestNoSuccessManager = ()=>{
    return RequestNoSuccessManager.getInstance()
}







