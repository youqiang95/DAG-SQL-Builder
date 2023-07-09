import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import molecule from '@dtinsight/molecule'
import {sendGETRequest} from '../api'
import {redirectLoginPage} from '@/common'

const Component = molecule.react.Component

// define model 
export interface IGlobalUser {
    uid: string | null
}

// 
export class GlobalUserModel implements IGlobalUser {
    uid: string | null
    constructor() {
        this.uid = null 
    }
}

export interface IUserInfo {
    uid: string | null
}

export interface IGlobalUserService extends molecule.react.Component<GlobalUserModel> {
    loadUserFromServer: ()=>Promise<void>
    getUserInfo: ()=>Promise<IUserInfo>
}

@singleton()
export class GlobalUserService
    extends Component<IGlobalUser>
    implements IGlobalUserService
{
    protected state: IGlobalUser;
    constructor() {
        super();
        this.state = container.resolve(GlobalUserModel);
    }
    loadUserFromServer = async () =>{
        document.cookie = `uid=${process.env.REACT_APP_UID}`
        document.cookie = `token=${process.env.REACT_APP_TOKEN}`
        const ret = await sendGETRequest('/api/get_user/')
        if(ret.result && ret.result.uid !== undefined && ret.result.uid !== null){ 
            this.setState({
                uid: ret.result.uid
            })
        }
        else {
            redirectLoginPage()
        }
    }

    getUserInfo = async () =>{
        const {uid} = this.getState()
        return {uid}
    }
}

export const getUserService = ()=>{
    return container.resolve(GlobalUserService)
}