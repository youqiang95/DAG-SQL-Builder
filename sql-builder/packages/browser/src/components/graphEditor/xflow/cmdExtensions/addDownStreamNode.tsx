import {CustomCommands} from './cmdDefines'
import { HookHub, 
    ICmdHooks as IHooks, 
    NsGraph,  
    IArgsBase, 
    ICommandHandler
} from '@antv/xflow'
import { 
    ManaSyringe, 
    ICommandContextProvider,
    XFlowEdgeCommands,
    NsEdgeCmd
} from '@antv/xflow'
import type { Graph as X6Graph} from '@antv/x6'
import {NsAddNodeCmd} from './addNode'
import {getXflowGraphService} from '../xflowGraphService'

const xflowService = getXflowGraphService()

type ICommand = ICommandHandler<
    NsAddDownStreamNodeCmd.IArgs,
    NsAddDownStreamNodeCmd.IResult,
    NsAddDownStreamNodeCmd.ICmdHooks
>


export namespace NsAddDownStreamNodeCmd {
    /** Command: 用于注册named factory */
    export const command = CustomCommands.ADD_DOWNSTREAM_NODE
    /** hook name */
    export const hookKey = 'addDownStreamNode'
    /** hook 参数类型 */
    export interface IArgs extends IArgsBase {
        nodeConfig: NsGraph.INodeConfig,
        newNodeId: string,
        newEdgeId: string
    }
    /** hook handler 返回类型 */
    export interface IResult {
        err: string | null
    }
    /** hooks 类型 */
    export interface ICmdHooks extends IHooks {
        addDownStreamNode: HookHub<IArgs, IResult>
    }
}

const getNodePortId = (x6Graph: X6Graph, nodeId:string) => {
    let result = [null, null]
    const x6Nodes = x6Graph.getNodes()
    for(let node of x6Nodes){
        if(node.id === nodeId){
            const nodeConfig = node.getData<NsGraph.INodeConfig>()
            if(!nodeConfig.ports){
                break
            }
            const ports = nodeConfig.ports as NsGraph.INodeAnchor[]
            for(let port of ports){
                if(port.type === NsGraph.AnchorType.INPUT){
                    result[0] = port.id
                }
                if(port.type === NsGraph.AnchorType.OUTPUT){
                    result[1] = port.id
                }
            }
        }
    }
    return result
}

@ManaSyringe.injectable()
/** command 实现 */
export class AddDownStreamNodeCmd implements ICommand {
  /** api */
  @ManaSyringe.inject(ICommandContextProvider) contextProvider: ICommand['contextProvider']
  /** 执行Cmd */
  execute = async () => {
    const ctx = this.contextProvider()
    const { args } = ctx.getArgs()
    const hooks = ctx.getHooks()
    const result = await hooks.addDownStreamNode.call(args, async args => {
        const { nodeConfig, commandService, newNodeId, newEdgeId} = args
        const label = 'New_Code_Node'
        const x6Graph = await ctx.getX6Graph()
        await commandService.executeCommand<NsAddNodeCmd.IArgs>(
            CustomCommands.ADD_NODE.id,{
                nodeConfig: {
                    id: newNodeId,
                    label: label,
                    x: nodeConfig.x,
                    y: nodeConfig.y + 100,
                    sql: xflowService.getNodeTemplate(nodeConfig.id),
                    nodeType: 'code'
                }
            }
        )
        const [a, sourceOutPortId] = getNodePortId(x6Graph, nodeConfig.id)
        const [targetInPortId, b] = getNodePortId(x6Graph, newNodeId)
        if(!(sourceOutPortId && targetInPortId)){
            return {err: null}
        }
        await commandService.executeCommand<NsEdgeCmd.AddEdge.IArgs>(XFlowEdgeCommands.ADD_EDGE.id, {
            edgeConfig: {
                id: newEdgeId,
                source: nodeConfig.id,
                target: newNodeId,
                sourcePortId: sourceOutPortId,
                targetPortId: targetInPortId
            }
        })
        return { err: null}
    })

    ctx.setResult(result || {err:null})
    return this
  }

  /** undo cmd */
  undo = async () => {
    if (this.isUndoable()) {
        const ctx = this.contextProvider()
        ctx.undo()
    }
    return this
  }

  /** redo cmd */
  redo = async () => {
    if (!this.isUndoable()) {
        await this.execute()
    }
    return this
  }

  isUndoable(): boolean {
    const ctx = this.contextProvider()
    return ctx.isUndoable()
  }
}

