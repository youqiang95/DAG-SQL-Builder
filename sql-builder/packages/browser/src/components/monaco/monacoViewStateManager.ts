import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import { editor as MEditor} from '@dtinsight/molecule/esm/monaco'

export interface IMonacoViewStateManager {
    saveViewState: (monacoModelId:string, viewState:MEditor.ICodeEditorViewState)=>void
    loadViewState: (monacoModelId:string)=>MEditor.ICodeEditorViewState | null
}


@singleton()
class MonacoViewStateManager implements IMonacoViewStateManager {
    private viewStateMap: Map<string, MEditor.ICodeEditorViewState>
    constructor(){
        this.viewStateMap = new Map<string, MEditor.ICodeEditorViewState>()
    }

    saveViewState = (monacoModelId:string, viewState:MEditor.ICodeEditorViewState)=>{
        this.viewStateMap.set(monacoModelId, viewState)
    }

    loadViewState = (monacoModelId:string)=>{
        return this.viewStateMap.get(monacoModelId) || null 
    }
}

export const getMonacoViewStateManager = ()=>{
    return container.resolve(MonacoViewStateManager)
}