import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import molecule from '@dtinsight/molecule'
import {IGlobalEditorSettingService, getEditorSettingservice} from './editorSettingService'
import {IGlobalUserService, getUserService} from './userService'
import {IColorThemeService, getColorThemeService} from './colorThemeService'
import {sendPOSTRequest} from '../api'

const Component = molecule.react.Component

export const getGlobalConfigFromServer = async ()=>{
    const userService = getUserService()
    const {uid} = await userService.getUserInfo()
    if(uid === null){
        return {err: 'user is null'}
    }
    const ret = await sendPOSTRequest('/api/get_config_data/', {uid})
    return ret
}

// define model 
export interface IGlobalSetting {
}

// 
export class GlobalSettingModel implements IGlobalSetting {
}

export interface IGlobalSettingService extends molecule.react.Component<IGlobalSetting> {
    loadConfigFromServer: ()=>Promise<void>
}

@singleton()
export class GlobalSettingService
    extends Component<IGlobalSetting>
    implements IGlobalSettingService
{
    protected state: IGlobalSetting;
    private editorSettingService: IGlobalEditorSettingService
    private userService: IGlobalUserService
    private colorThemeService: IColorThemeService
    constructor() {
        super();
        this.state = container.resolve(GlobalSettingModel)
        this.editorSettingService = getEditorSettingservice()
        this.userService = getUserService()
        this.colorThemeService = getColorThemeService()
    }

    private onUpdateGlobalConfig = async ()=>{
        const {uid} = await this.userService.getUserInfo()
        if(uid === null){
            return {err: 'user is null'} 
        }
        const {fontSize, tabWidth} = this.editorSettingService.getState()
        const {currentTheme} = this.colorThemeService.getState()
        const value = JSON.stringify({
            fontSize,
            tabWidth,
            colorThemeId: currentTheme.id
        })
        sendPOSTRequest('/api/onUpdateGlobalConfig', {
            value: value
        })
        return {}
    }

    setFontSize = (fontSize:number)=>{
        this.editorSettingService.setFontSize(fontSize)
        this.onUpdateGlobalConfig()
    }

    setColorTheme = (themeId: string)=>{
        this.colorThemeService.setTheme(themeId)
        this.onUpdateGlobalConfig()
    }

    setTabWidth = (tabWidth: number)=>{
        this.editorSettingService.setTabWidth(tabWidth)
        this.onUpdateGlobalConfig()
    }

    loadConfigFromServer = async ()=>{
        const ret = await getGlobalConfigFromServer()
        if(ret.fontSize !== undefined && ret.fontSize !== null){ 
            this.editorSettingService.setFontSize(ret.fontSize)
        }
        if(ret.tabWidth !== undefined && ret.tabWidth !== null){
            this.editorSettingService.setTabWidth(ret.tabWidth)
        }
        if(ret.colorThemeId !== undefined && ret.colorThemeId !== null){
            this.colorThemeService.setTheme(ret.colorThemeId)
        }
    }
}

export const getGlobalSettingService = () =>{
    return container.resolve(GlobalSettingService)
}