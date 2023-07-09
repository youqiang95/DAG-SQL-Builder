import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import molecule from '@dtinsight/molecule'
import React from 'react'

const Component = molecule.react.Component

// define model 
export interface IGlobalEditorSetting {
    fontSize: number,
    tabWidth: number
}

// 
export class GlobalEditorSettingModel implements IGlobalEditorSetting {
    fontSize: number
    tabWidth: number
    constructor() {
        this.fontSize = 15
        this.tabWidth = 4
    }
}

export interface IGlobalEditorSettingService extends molecule.react.Component<GlobalEditorSettingModel> {
    setFontSize: (fontSize:number)=>void
    setTabWidth: (tabWidth: number)=>void
}


@singleton()
export class GlobalEditorSettingService
    extends Component<IGlobalEditorSetting>
    implements IGlobalEditorSettingService
{
    protected state: IGlobalEditorSetting;

    constructor() {
        super();
        this.state = container.resolve(GlobalEditorSettingModel);
    }

    setFontSize = (fontSize:number)=>{
        this.setState({
            fontSize: fontSize
        })
    }

    setTabWidth = (tabWidth:number)=>{
        this.setState({
            tabWidth: tabWidth
        })
    }
}


export const getEditorSettingservice = () =>{
    return container.resolve(GlobalEditorSettingService)
}

export const useEditorSettingModel = ()=>{
    const editorSettingService = container.resolve(GlobalEditorSettingService)
    const [model, setModel] = React.useState<IGlobalEditorSetting>(editorSettingService.getState())
    React.useEffect(()=>{
        editorSettingService.onUpdateState((prevState, nextState)=>{
            setModel({...nextState})
        })
    }, [editorSettingService])
    return model
}