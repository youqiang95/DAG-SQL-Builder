import {HttpRequestSender} from './httpReqSender'

export const sendGETRequest = async (url:string, headers:any={})=>{
    const options = {headers: headers || undefined}
    return await new HttpRequestSender().get(url, options)
}

export const sendPOSTRequest = async (url:string, body: any, headers:any={})=>{
    const options = {headers: headers || undefined, body:body}
    return await new HttpRequestSender().post(url, options)
}
export interface IFileDataType {
    path: string;
    value: string
}

export * from './MessageErrorHandler'

