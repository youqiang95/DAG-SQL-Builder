import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import molecule from '@dtinsight/molecule'
import type { IFolderTreeNodeProps } from '@dtinsight/molecule/esm/model'
import React from 'react'

const Component = molecule.react.Component


// define model 
export interface IDeleteFileModalStatus {
    isOpen: boolean,
    folderNode: IFolderTreeNodeProps,
    title: string,
    afterOk: ()=>void,
    afterCanceel: ()=>void
}

// 
export class DeleteFileModalStatus implements IDeleteFileModalStatus {
    isOpen: boolean
    folderNode: IFolderTreeNodeProps
    title:string
    afterOk: ()=>void
    afterCanceel: ()=>void
    constructor() {
        this.isOpen = false
        this.folderNode = null
        this.title = ''
        this.afterOk = ()=>{}
        this.afterCanceel = ()=>{}
    }
}

export interface IDeleteFileModalService extends molecule.react.Component<IDeleteFileModalStatus> {
    reset: ()=>void
}

@singleton()
export class DeleteFileModalService
    extends Component<IDeleteFileModalStatus>
    implements IDeleteFileModalService
{
    protected state: IDeleteFileModalStatus;

    constructor() {
        super();
        this.state = container.resolve(DeleteFileModalStatus);
    }

    reset = ()=>{
        this.setState({
            isOpen: false,
            folderNode: null,
            title: '',
            afterOk: ()=>{},
            afterCanceel: ()=>{}
        })
    }
}

export const getDeleteFileModalService = ()=>{
    return container.resolve(DeleteFileModalService)
}

export const useDeleteFileModalModel = ()=>{
    const service = getDeleteFileModalService()
    const [model, setModel] = React.useState<IDeleteFileModalStatus>(service.getState())
    React.useEffect(()=>{
        service.onUpdateState((prevState, nextState)=>{
            setModel({...nextState})
        })
    }, [service])
    return model
}
