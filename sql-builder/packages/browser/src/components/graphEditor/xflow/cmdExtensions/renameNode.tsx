import type { 
    HookHub, ICmdHooks as IHooks, 
    NsGraph, 
    IModelService, 
    NsNodeCmd,
    IArgsBase, 
    ICommandHandler, 
    IGraphCommandService
} from '@antv/xflow'
import { Deferred, ManaSyringe } from '@antv/xflow'
import type { FormInstance } from 'antd'
import { Modal, Form, Input, ConfigProvider} from 'antd'
import { ICommandContextProvider, XFlowNodeCommands } from '@antv/xflow'
import { Node as X6Node } from '@antv/x6'
import type { Graph as X6Graph } from '@antv/x6';
import { CustomCommands } from './cmdDefines'
import {getXflowGraphService} from '../xflowGraphService'

type ICommand = ICommandHandler<
  NsRenameNodeCmd.IArgs,
  NsRenameNodeCmd.IResult,
  NsRenameNodeCmd.ICmdHooks
>

export namespace NsRenameNodeCmd {
  /** Command: 用于注册named factory */
  export const command = CustomCommands.RENAME_NODE
  /** hook name */
  export const hookKey = 'renameNode'
  /** hook 参数类型 */
  export interface IArgs extends IArgsBase {
    nodeConfig: NsGraph.INodeConfig
  }
  /** hook handler 返回类型 */
  export interface IResult {
    err: string | null
    preNodeName?: string
    currentNodeName?: string
  }
  /** hooks 类型 */
  export interface ICmdHooks extends IHooks {
    renameNode: HookHub<IArgs, IResult>
  }
}

@ManaSyringe.injectable()
/** 部署画布数据 */
export class RenameNodeCommand implements ICommand {
    /** api */
    @ManaSyringe.inject(ICommandContextProvider) contextProvider: ICommand['contextProvider']

    genLabelSet = (x6Graph: X6Graph) => {
        const labelSet = new Set<string>()
        const x6Nodes = x6Graph.getNodes()
        for(const i in x6Nodes){
            labelSet.add(x6Nodes[i].getData<NsGraph.INodeConfig>().label || '')
        }
        return labelSet
    }

    getNodeConfig = (x6Node: X6Node) => {
        const data = x6Node.getData()
        const position = x6Node.getPosition()
        const size = x6Node.getSize()
        return {
            ...data,
            ...position,
            ...size,
        }
    }
    getGraphData = (x6Graph: X6Graph) => {
        const x6Nodes = x6Graph.getNodes()
        const x6Edges = x6Graph.getEdges()
        const nodes = x6Nodes.map(node => {
            const data = node.getData<NsGraph.INodeConfig>()
            const position = node.position()
            const size = node.size()
            const model = {
                ...data,
                ...position,
                ...size,
            }
            return model
        })
        const edges = x6Edges.map(edge => {
            const data = edge.getData<NsGraph.IEdgeConfig>()
            const model = {
                ...data,
            }
            return model
        })
        return {nodes, edges}
    }

  /** 执行Cmd */
  execute = async () => {
    const ctx = this.contextProvider()
    const { args} = ctx.getArgs()
    const hooks = ctx.getHooks()
    const result = await hooks.renameNode.call(args, async args => {
        const { nodeConfig, commandService} = args
        const x6Graph = await ctx.getX6Graph()
        const preNodeName = nodeConfig.label
        const cell = x6Graph.getCellById(nodeConfig.id)
        if (!cell || !cell.isNode()) {
            throw new Error(`${nodeConfig.id} is not a valid node`)
        }
        /** 通过modal 获取 new name */
        const newName = await showModal(nodeConfig)
        /** 更新 node name  */
        if (newName) {
            const newNodeConfig =  {...nodeConfig, label:newName}
            await commandService!.executeCommand<NsNodeCmd.UpdateNode.IArgs>(
                XFlowNodeCommands.UPDATE_NODE.id,
                { 
                    nodeConfig: {...newNodeConfig}
                },
            )
            return { err: null, preNodeName, currentNodeName: newName }
        }
        return { err: null, preNodeName, currentNodeName: '' }
    })
    ctx.setResult(result)
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

export interface IGetAppCtx {
  (): {
    commandService: IGraphCommandService
    modelService: IModelService
    labelSet: Set<string>
  }
}

export type IModalInstance = ReturnType<typeof Modal.confirm>
export interface IFormProps {
  newNodeName: string
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
}

function showModal(node: NsGraph.INodeConfig) {
    /** showModal 返回一个Promise */
    const defer = new Deferred<string | void | null>()

    /** modal确认保存逻辑 */
    class ModalCache {
        static modal: IModalInstance
        static form: FormInstance<IFormProps>
    }
    const xflowGraphService = getXflowGraphService()

  /** modal确认保存逻辑 */
    const onOk = async () => {
        const { form, modal } = ModalCache
        try {
            modal.update({ okButtonProps: { loading: true } })
            await form.validateFields(['newNodeName'])
            const values = form.getFieldsValue()
            const newName: string =  values.newNodeName
            defer.resolve(newName)
            onHide()
        } catch (error) {
            console.error(error)
            /** 如果resolve空字符串则不更新 */
            modal.update({ okButtonProps: { loading: false } })
            defer.resolve(null)
            onHide()
        }
    }

    /** modal销毁逻辑 */
    const onHide = () => {
        modal.destroy()
        ModalCache.form = null as any
        ModalCache.modal = null as any
        domContainer.destroy()
    }

    /** modal内容 */
    const ModalContent = () => {
        const [form] = Form.useForm<IFormProps>()
        /** 缓存form实例 */
        ModalCache.form = form
        return (
            <div>
            <ConfigProvider>
                <Form form={form} {...layout} initialValues={{ newNodeName: node.label }}>
                <Form.Item
                    name="newNodeName"
                    label="节点名"
                    rules={[
                        { required: true, message: '请输入新节点名' },
                        () => ({
                            validator(_, value) {
                                const checkInfo = xflowGraphService.checkGraphNodeOrParamValid(value, node.label)
                                if(!checkInfo) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error(checkInfo));
                            },
                        }),
                    ]}
                >
                    <Input/>
                </Form.Item>
                </Form>
            </ConfigProvider>
            </div>
        )
    }

    /** 创建modal dom容器 */
    const domContainer = createContainer()
    /** 创建modal */
    const modal = Modal.confirm({
        title: '重命名',
        content: <ModalContent />,
        okText: '确定',
        cancelText: '取消',
        getContainer: () => {
            return domContainer.element
        },
        okButtonProps: {
            onClick: e => {
            e.stopPropagation()
            onOk()
            },
        },
        onCancel: () => {
            onHide()
        },
        afterClose: () => {
            onHide()
        },
    })

    /** 缓存modal实例 */
    ModalCache.modal = modal

    /** showModal 返回一个Promise，用于await */
    return defer.promise
}

const createContainer = () => {
    const div = document.createElement('div')
    div.classList.add('xflow-modal-container')
    window.document.body.append(div)
    return {
    element: div,
    destroy: () => {
        window.document.body.removeChild(div)
    },
    }
}
