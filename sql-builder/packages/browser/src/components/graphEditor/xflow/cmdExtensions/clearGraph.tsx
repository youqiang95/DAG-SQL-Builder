import type { HookHub, 
    ICmdHooks as IHooks, 
    IArgsBase, 
    ICommandHandler, 
    NsEdgeCmd,
    NsNodeCmd
} from '@antv/xflow'
import { 
    ManaSyringe, 
    ICommandContextProvider,
    XFlowEdgeCommands,
    XFlowNodeCommands
} from '@antv/xflow'
import {CustomCommands} from './cmdDefines'

type ICommand = ICommandHandler<
    NsClearGraphCmd.IArgs,
    NsClearGraphCmd.IResult,
    NsClearGraphCmd.ICmdHooks
>

export namespace NsClearGraphCmd {
  /** Command: 用于注册named factory */
  export const command = CustomCommands.CLEAR_GRAPH
  /** hook name */
  export const hookKey = 'clearGraph'
  /** hook 参数类型 */
  export type IArgs = IArgsBase

  /** hook handler 返回类型 */
  export interface IResult {
    err: string | null
  }
  /** hooks 类型 */
  export interface ICmdHooks extends IHooks {
    clearGraph: HookHub<IArgs, IResult>
  }
}

@ManaSyringe.injectable()
export class ClearGraphCommand implements ICommand {
    /** api */
    @ManaSyringe.inject(ICommandContextProvider) contextProvider: ICommand['contextProvider']

    /** 执行Cmd */
    execute = async () => {
        const ctx = this.contextProvider()
        const { args } = ctx.getArgs()
        const hooks = ctx.getHooks()
        const result = await hooks.clearGraph.call(args, async args => {
            const { commandService } = args
            let cells = (await ctx.getX6Graph()).getCells()
            // first delete edges
            await Promise.all(
                cells.map(cell => {
                    if (cell.isEdge()) {
                        return commandService!.executeCommand<NsEdgeCmd.DelEdge.IArgs>(XFlowEdgeCommands.DEL_EDGE.id, {
                            edgeConfig: { ...cell.getData(), id: cell.id },
                        } as NsEdgeCmd.DelEdge.IArgs)
                    }
                    return cell
                }),
            )
            // then delete nodes 
            cells = (await ctx.getX6Graph()).getCells()
            await Promise.all(
                cells.map(cell => {
                    if (cell.isNode()) {
                    return commandService!.executeCommand<NsNodeCmd.DelNode.IArgs>(XFlowNodeCommands.DEL_NODE.id, {
                        nodeConfig: {
                            ...cell.getData(),
                            id: cell.id,
                        },
                    })
                    }
                    return cell
                }),
            )
            return { err: null }
        })
        ctx.setResult(result!)
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

