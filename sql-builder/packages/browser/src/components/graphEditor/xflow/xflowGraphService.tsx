import 'reflect-metadata'
import { singleton, container } from 'tsyringe'
import type { NsGraph} from '@antv/xflow'
import type {GraphZoomParamsType, TargetType, TargetData} from '../interface'

export interface IXflowGraphService {
    setNodeNameValidFunc: (func:(newName:string, oldName:string)=>string)=>void,
    checkGraphNodeOrParamValid: (newName:string, oldName:string)=>string,

    setOpenFinalSqlEditorFunc: (func:(nodeId: string, label:string)=>void)=>void,
    openFinalSqlEditor: (nodeId: string, label:string)=>void,

    setOnGraphDataChange: (func:(newGraphData: NsGraph.IGraphData)=>void)=>void,
    onXGraphDataChange: (newGraphData: NsGraph.IGraphData)=>void,

    setOnZoomParamsChange:(func: (newZoomParams: GraphZoomParamsType)=>void)=>void,
    onZoomParamsChange: (newZoomParams: GraphZoomParamsType)=>void,

    setOnTargetDataChange: (func: (type:TargetType, data:TargetData)=>void)=>void,
    onTargetDataChange: (type:TargetType, data:TargetData)=>void,

    lockGraphDataChange: ()=>void,
    unlockGraphDataChange: ()=>void,

    setOnOpenNodeEditor: (func: (nodeId:string, nodeLabel:string)=>void)=>void,
    onOpenNodeEditor: (nodeId:string, nodeLabel:string)=>void,

    onOpenDataSourceModal: (context:any)=>void,
    setOnOpenDataSourceModal: (func: (context:any)=>void)=>void,

    onCompileAllNodes: (context:any)=>Promise<void>,
    setOnCompileAllNodes: (func: (context:any)=>Promise<void>)=>void,

    getNodeTemplate: (nodeId:string)=>string,
    setGetNodeTemplate: (func:(nodeId:string)=>string)=>void,

    onDelNode: (nodeId:string)=>void,
    setOnDelNode: (func: (nodeId:string)=>void)=>void 
}

@singleton()
class XflowGraphService implements IXflowGraphService {
    checkGraphNodeOrParamValid:  (newName:string, oldName:string)=>string
    openFinalSqlEditor: (nodeId: string, label:string)=>void
    onXGraphDataChange: (newGraphData: NsGraph.IGraphData)=>void
    onZoomParamsChange: (newZoomParams: GraphZoomParamsType)=>void
    onTargetDataChange: (type:TargetType, data:TargetData)=>void
    onOpenNodeEditor: (nodeId:string, nodeLabel:string)=>void
    onOpenDataSourceModal: (context:any)=>void
    onCompileAllNodes: (context:any)=>Promise<void>
    getNodeTemplate: (nodeId:string)=>string
    onDelNode: (nodeId:string)=>void
    lockGraphDataChangeState: boolean

    constructor(){
        this.lockGraphDataChangeState = true
        this.checkGraphNodeOrParamValid = (newName:string, oldName:string)=>{
            return null
        }
        this.openFinalSqlEditor = (nodeId: string, label:string)=>{}
        this.onXGraphDataChange = (newGraphData: NsGraph.IGraphData)=>{}
        this.onZoomParamsChange = (newZoomParams: GraphZoomParamsType)=>{}
        this.onTargetDataChange = (type:TargetType, data:TargetData)=>{}
        this.onOpenNodeEditor = (nodeId:string, nodeLabel:string)=>{}
        this.onOpenDataSourceModal = (context:any)=>{}
        this.onCompileAllNodes = async (context:any)=>{}
        this.getNodeTemplate = (nodeId:string)=>{return ''}
        this.onDelNode = (nodeId:string)=>{}
    }
    setNodeNameValidFunc = (func: (newName:string, oldName:string)=>string)=>{
        this.checkGraphNodeOrParamValid = func
    }

    setOpenFinalSqlEditorFunc = (func:(nodeId: string, label:string)=>void)=>{
        this.openFinalSqlEditor = func 
    }

    setOnGraphDataChange = (func:(newGraphData: NsGraph.IGraphData)=>void)=>{
        this.onXGraphDataChange = func 
    }

    setOnZoomParamsChange = (func: (newZoomParams: GraphZoomParamsType)=>void)=>{
        this.onZoomParamsChange = func 
    }

    setOnTargetDataChange = (func: (type:TargetType, data:TargetData)=>void)=>{
        this.onTargetDataChange = func
    }

    lockGraphDataChange = ()=>{
        this.lockGraphDataChangeState = false 
    }
    unlockGraphDataChange = ()=>{
        this.lockGraphDataChangeState = true
    }

    setOnOpenNodeEditor = (func: (nodeId:string, nodeLabel:string)=>void)=>{
        this.onOpenNodeEditor = func
    }

    setOnOpenDataSourceModal = (func: (context:any)=>void)=>{
        this.onOpenDataSourceModal = func
    }

    setOnCompileAllNodes = (func: (context:any)=>Promise<void>)=>{
        this.onCompileAllNodes = func
    }

    setGetNodeTemplate = (func:(nodeId:string)=>string)=>{
        this.getNodeTemplate = func
    }

    setOnDelNode = (func: (nodeId:string)=>void)=>{
        this.onDelNode = func
    }

}

export const getXflowGraphService = ()=>{
    return container.resolve(XflowGraphService)
}


