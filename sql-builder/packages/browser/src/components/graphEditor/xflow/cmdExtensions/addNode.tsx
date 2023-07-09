import {CustomCommands} from './cmdDefines'
import type { HookHub, 
    ICmdHooks as IHooks, 
    NsGraph,  
    IArgsBase, 
    ICommandHandler, 
    NsNodeCmd
} from '@antv/xflow'
import { 
    ManaSyringe, 
    ICommandContextProvider,
    XFlowNodeCommands
} from '@antv/xflow'
import type { Graph as X6Graph } from '@antv/x6'

type ICommand = ICommandHandler<
    NsAddNodeCmd.IArgs,
    NsAddNodeCmd.IResult,
    NsAddNodeCmd.ICmdHooks
>

export namespace NsAddNodeCmd {
    /** Command: 用于注册named factory */
    export const command = CustomCommands.ADD_NODE
    /** hook name */
    export const hookKey = 'custmoAddNode'
    /** hook 参数类型 */
    export interface IArgs extends IArgsBase {
        nodeConfig: NsGraph.INodeConfig
    }
    /** hook handler 返回类型 */
    export interface IResult {
        err: string | null
    }
    /** hooks 类型 */
    export interface ICmdHooks extends IHooks {
        addNode: HookHub<IArgs, IResult>
    }
}

const genLabelSet = (x6Graph: X6Graph) => {
    const labelSet = new Set<string>()
    const x6Nodes = x6Graph.getNodes()
    for(const i in x6Nodes){
        labelSet.add(x6Nodes[i].getData<NsGraph.INodeConfig>().label || '')
    }
    return labelSet
}

const fixNodeLabel = (labelSet: Set<string>, label:string) => {
    let i = 1
    let newLabel = label
    for(let j=0; j<1000; j++){
        if (!labelSet.has(newLabel)){
            break
        }
        else {
            newLabel = label + '_' + i
            i += 1
        }
    }
    return newLabel
}

@ManaSyringe.injectable()
/** command 实现 */
export class AddNodeCmd implements ICommand {
  /** api */
  @ManaSyringe.inject(ICommandContextProvider) contextProvider: ICommand['contextProvider']
  /** 执行Cmd */
  execute = async () => {
    const ctx = this.contextProvider()
    const { args } = ctx.getArgs()
    const hooks = ctx.getHooks()
    const result = await hooks.addNode.call(args, async args => {
        const { nodeConfig, commandService} = args
        const x6Graph = await ctx.getX6Graph()
        const labelSet = genLabelSet(x6Graph)
        const fixedLabel = fixNodeLabel(labelSet, nodeConfig.label || '')
        // transform graph Coordinate to graph-local Coordinate
        let addNodeArgs: NsNodeCmd.AddNode.IArgs;
        if(nodeConfig.graphX && nodeConfig.graphY){
            const graphLocalPoint = x6Graph.graphToLocal(nodeConfig.graphX, nodeConfig.graphY)
            addNodeArgs = {
                nodeConfig: { ...nodeConfig, label:fixedLabel, x:graphLocalPoint.x,  y:graphLocalPoint.y},
            }
        }
        else {
            addNodeArgs = {
                nodeConfig: { ...nodeConfig, label:fixedLabel},
            }
        }
        commandService && await commandService.executeCommand(XFlowNodeCommands.ADD_NODE.id, addNodeArgs)
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

