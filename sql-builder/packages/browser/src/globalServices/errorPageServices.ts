import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import React from 'react'
import molecule from '@dtinsight/molecule'

interface IExtraButtonItem {
    type: 'primary' | null,
    key: string;
    name: string;
    onClick: ()=>Promise<void>
}

// define model 
export interface IErrorPageStatus {
    isOpen: boolean;
    status: string;
    title: string;
    subTitle: string;
    extra: IExtraButtonItem[]
}

// 
export class ErrorPageStatusModel implements IErrorPageStatus {
    isOpen: boolean;
    status: string;
    title: string;
    subTitle: string;
    extra: IExtraButtonItem[]
    constructor() {
        this.isOpen = false
        this.status = 'error'
        this.title = ''
        this.subTitle = ''
        this.extra = []
    }
}

const Component = molecule.react.Component

export interface IErrorPageStatusService extends molecule.react.Component<IErrorPageStatus> {
    
}

@singleton()
export class ErrorPageStatusService
    extends Component<IErrorPageStatus>
    implements IErrorPageStatusService
{
    protected state: IErrorPageStatus;

    constructor() {
        super();
        this.state = container.resolve(ErrorPageStatusModel);
    }
}

export const getErrorPageStatusService= () =>{
    return container.resolve(ErrorPageStatusService)
}

export const useErrorPageStatusModel = ()=>{
    const service = getErrorPageStatusService()
    const [model, setModel] = React.useState<IErrorPageStatus>(service.getState())
    React.useEffect(()=>{
        service.onUpdateState((prevState, nextState)=>{
            setModel({...nextState})
        })
    }, [service])
    return model
}
