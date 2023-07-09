import type {Request, Response, Express} from 'express'
import {ErrorMessage} from './errorMessage'
import {Author} from './auth'
import {HttpServerLogger} from '../logger/httpServerLogger'
import {getConsoleLogger} from '../logger/consoleLogger'
import chalk from 'chalk'

const consoleLogger = getConsoleLogger()

const resp_set_cookie = async (resp:Response, uid:string, token:string, maxage:number) => {
    resp.cookie('uid', uid, { maxAge: maxage})
    resp.cookie('token', token, { maxAge: maxage})
}

export const req_auth_cookie = async (req:Request, res: Response)=>{
    const {uid, token} = req.cookies
    if(uid && token){
        const auth = new Author()
        const respData = await auth.auth(uid, token)
        if(respData.err){
            return false
        }
        if(respData.result === 'success'){
            if(respData.data && respData.data.maxAge){
                await resp_set_cookie(res, uid, token, respData.data.maxAge)
            }     
            return true
        }
    }
    return false 
}

interface IHandler {
    path: string,
    method: string,
    handler: (req: Request, res: Response) => Promise<any>
}

const handlerWraper = (handlerItem:IHandler) => async (req:Request, res:Response) => {
    let recordError = {}
    try {
        HttpServerLogger.logRequest(req)
        const ret = await handlerItem.handler(req, res)
        HttpServerLogger.logResponseResult(res, ret)
        res.send(JSON.stringify(ret))
    } catch (error) {
        HttpServerLogger.logError(error)
        recordError[ErrorMessage.SERVER_ERROR] = true 
        const errMsg = {
            url: req.url,
            error: recordError
        }
        res.send({err: JSON.stringify(errMsg)}) 
    }
}

export class HttpHandler {
    path:string 
    method: string
    handler: (req:Request, res:Response)=>Promise<any>
    requireCookieFields: string[]
    requireBodyFields: string[]
    constructor(
        path:string, 
        method:string, 
        handler: (req:Request, res:Response)=>Promise<any>, 
        requireCookieFields: string[],
        requireBodyFields: string[]
        ){
            this.path = path 
            this.method = method
            this.handler = handler
            this.requireCookieFields = requireCookieFields
            this.requireBodyFields = requireBodyFields
    }

    public async preHandler(req:Request, res:Response){
        return {preHandlerError: {}}
    }

    public onHandlerError(req:Request, res:Response){
        return {onHandlerErrorError: {}}
    }

    public async getRespData(req:Request, res:Response){
        let errorRecord = {}
        try {
            if(this.requireCookieFields){
                for(let field of this.requireCookieFields){
                    if(!(field in req.cookies)){
                        errorRecord[ErrorMessage.REQUIRE_COOKIE_MISS] = true
                        throw new Error('requireCookieFieldsError')
                    }
                }
            }
            if(this.requireBodyFields){
                for(let field of this.requireBodyFields){
                    if(!(field in req.body)){
                        errorRecord[ErrorMessage.REQUIRE_BODY_PARAMS_MISS] = true
                        throw new Error('requireBodyFieldsError')
                    }
                }
            }
            const {preHandlerError} = await this.preHandler(req, res)
            if(preHandlerError && (typeof preHandlerError) === 'object' && Object.keys(preHandlerError).length > 0){
                errorRecord = {...errorRecord, ...preHandlerError}
                throw new Error('preHandlerError')
            }
            const ret = await this.handler(req, res)
            const {handlerError} =  ret 
            if(handlerError && (typeof handlerError) === 'object' && Object.keys(handlerError).length > 0){
                errorRecord = {...errorRecord, ...handlerError}
                throw new Error('handlerError')
            }
            return ret
        } catch (error) {
            try {
                const {onHandlerErrorError} = this.onHandlerError(req, res)
                if(onHandlerErrorError && (typeof onHandlerErrorError) === 'object' && Object.keys(onHandlerErrorError).length > 0){
                    errorRecord = {...errorRecord, ...onHandlerErrorError}
                }
            } catch (error2) {
                consoleLogger.error(chalk.red(`[ERROR] error:${error2}`))
            }
            const errorMsg = {
                url: req.url,
                error: errorRecord
            }
            return {err: errorMsg}
        }
    }

    public getHandlerItem(){
        return {
            path: this.path,
            method: this.method,
            handler: async (req:Request, res:Response) => {
                return await this.getRespData(req, res)
            }
        }
    }

    public registerHandler(app:Express){
        const handlerItem = this.getHandlerItem()
        if(handlerItem.method == 'GET'){
            app.get(handlerItem.path, handlerWraper(handlerItem))
        }
        else if(handlerItem.method == 'POST'){
            app.post(handlerItem.path, handlerWraper(handlerItem))
        }
    }
}

export class AuthHttpHandler extends HttpHandler {
    constructor(
        path:string, 
        method:string, 
        handler:(req:Request, res:Response)=>Promise<any>,
        requireCookieFields: string[],
        requireBodyFields: string[]
        ){
        super(path, method, handler, requireCookieFields, requireBodyFields)
    }

    public async preHandler(req:Request, res:Response){
        let error = {} 
        if(!await req_auth_cookie(req, res)){
            error[ErrorMessage.NO_LOGIN] = true   
        }
        return {preHandlerError: error}
    }
}

export class StorageDataSyncHandler extends AuthHttpHandler {
    constructor(
        path:string, 
        method:string, 
        handler:(req:Request, res:Response)=>Promise<any>,
        requireCookieFields: string[],
        requireBodyFields: string[]
    ){
        super(path, method, handler, requireCookieFields, requireBodyFields)
    }
    public onHandlerError(req:Request, res:Response){
        return {onHandlerErrorError: {
            [ErrorMessage.STORAGE_DATA_SYNC_ERROR]: true
        }}
    }
}

