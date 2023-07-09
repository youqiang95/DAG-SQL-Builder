import {waitWithTimeout, normalizeUrl} from '@/common'
import {getMessageErrorHandlerManager, getRequestNoSuccessManager} from './MessageErrorHandler'

const DefaultHeaders = {
    'Accept':'application/json',
    'Content-Type': 'application/json',
    'credentials' : 'include'
}

export class HttpRequestSender {
    constructor(){
    }

    private async sendRequest(
        method: string,
        url: string,
        headers: any,
        body: any,
        timeout: number=10000
    ) {
        const normalUrl = normalizeUrl(url)
        try {
            const respPromise = async() => {
                let options:any = {
                    method:method, 
                    headers:{...DefaultHeaders, ...headers}
                }
                if(method.toLowerCase()==='post'){
                    options = {...options, body:body}
                }
                const respText = await (await fetch(normalUrl, options)).text()
                return JSON.parse(respText)
            }
            const resp = await waitWithTimeout(respPromise(), timeout)
            const errManager = getMessageErrorHandlerManager()
            if(resp.err && resp.err.error && (typeof resp.err.error) === 'object'){
                for(let key in resp.err.error){
                    errManager.emitError(key, resp.err.error[key])
                }
            }
            return resp
        } catch (error) {
            console.log('customRequest error', error)
            const noSuccessManager = getRequestNoSuccessManager()
            noSuccessManager.emitError(normalUrl)
            return {err: error}
        }
    }

    public async get(url:string, options:any){
        const headers = options.headers || {}
        const timeout = options.timeout || undefined
        return await this.sendRequest('GET', url, headers, null, timeout)
    }

    public async post(url:string, options:any){
        const headers = options.headers || {}
        const timeout = options.timeout || undefined
        const body = options.body || {}
        try {
            const bodyStr = JSON.stringify(body)
            const ret =  await this.sendRequest('POST', url, headers, bodyStr, timeout)
            return ret
        } catch (error) {
            return {err: error}
        }
    }
}