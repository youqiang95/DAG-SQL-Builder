import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import molecule from '@dtinsight/molecule'
import type { IFolderTreeNodeProps } from '@dtinsight/molecule/esm/model'
import React from 'react'

const Component = molecule.react.Component


// define model 
export interface ICreateFileModalStatus {
    isOpen: boolean,
    isCreateDir: boolean,
    presetLanguage: string | null,
    folderId: string,
    value: string,
    afterOk: (folderNode:IFolderTreeNodeProps)=>void,
    afterCanceel: ()=>void
}

// 
export class CreateFileModalStatus implements ICreateFileModalStatus {
    isOpen: boolean
    isCreateDir: boolean
    presetLanguage: string | null 
    folderId: string
    value:string
    afterOk: (folderNode:IFolderTreeNodeProps)=>void
    afterCanceel: ()=>void
    constructor() {
        this.isOpen = false
        this.isCreateDir = false 
        this.presetLanguage = null 
        this.folderId = ''
        this.value = ''
        this.afterOk = (folderNode:IFolderTreeNodeProps)=>{}
        this.afterCanceel = ()=>{}
    }
}

export interface ICreateFileModalService extends molecule.react.Component<ICreateFileModalStatus> {
    reset: ()=>void
}

@singleton()
export class CreateFileModalService
    extends Component<ICreateFileModalStatus>
    implements ICreateFileModalService
{
    protected state: ICreateFileModalStatus;

    constructor() {
        super();
        this.state = container.resolve(CreateFileModalStatus);
    }

    reset = ()=>{
        this.setState({
            isOpen: false,
            isCreateDir: false,
            presetLanguage: null,
            folderId: '',
            value: '',
            afterOk: (folderNode:IFolderTreeNodeProps)=>{},
            afterCanceel: ()=>{}
        })
    }
}

export const getCreateFileModalService = ()=>{
    return container.resolve(CreateFileModalService)
}

export const useCreateFileModalModel = ()=>{
    const service = getCreateFileModalService()
    const [model, setModel] = React.useState<ICreateFileModalStatus>(service.getState())
    React.useEffect(()=>{
        service.onUpdateState((prevState, nextState)=>{
            setModel({...nextState})
        })
    }, [service])
    return model
}
