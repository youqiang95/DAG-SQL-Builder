/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NsNodeCmd, NsEdgeCmd, IMenuOptions, NsGraph} from '@antv/xflow'
import { 
    createCtxMenuConfig, 
    MenuItemType,
    IconStore, 
    XFlowNodeCommands, 
    XFlowEdgeCommands, 
    MODELS
} from '@antv/xflow'
import { 
    DeleteOutlined, EditOutlined, StopOutlined, PlusCircleOutlined, 
    ClearOutlined, FundViewOutlined
} from '@ant-design/icons'
import {CustomCommands, NsAddNodeCmd, NsClearGraphCmd, NsRenameNodeCmd, NsAddDownStreamNodeCmd} from '../cmdExtensions'
import {genUniqId} from '../../../../common'
import {showConfirmModal} from '../../../confirmModal'
import {getXflowGraphService} from '../xflowGraphService'

const xflowGraphService = getXflowGraphService()

/** menuitem 配置 */
export namespace NsMenuItemConfig {
    /** 注册菜单依赖的icon */
    IconStore.set('DeleteOutlined', DeleteOutlined)
    IconStore.set('EditOutlined', EditOutlined)
    IconStore.set('StopOutlined', StopOutlined)
    IconStore.set('PlusCircleOutlined', PlusCircleOutlined)
    IconStore.set('ClearOutlined', ClearOutlined)
    IconStore.set('FundViewOutlined', FundViewOutlined)

    export const DELETE_EDGE: IMenuOptions = {
        id: XFlowEdgeCommands.DEL_EDGE.id,
        label: '删除边',
        iconName: 'DeleteOutlined',
        onClick: async ({ target, commandService }) => {
            commandService.executeCommand<NsEdgeCmd.DelEdge.IArgs>(XFlowEdgeCommands.DEL_EDGE.id, {
                edgeConfig: target.data as NsGraph.IEdgeConfig,
            })
        },
    }

    export const DELETE_NODE: IMenuOptions = {
        id: XFlowNodeCommands.DEL_NODE.id,
        label: '删除节点',
        iconName: 'DeleteOutlined',
        onClick: async ({ target, commandService }) => {
            const confirm = await showConfirmModal('确定要删除这个节点吗？', '')
            confirm && await commandService.executeCommand<NsNodeCmd.DelNode.IArgs>(XFlowNodeCommands.DEL_NODE.id, {
                nodeConfig: {...target.data},
            })
            xflowGraphService.onDelNode(target.data.id)
        },
    }

    export const OPEN_NODE_EDITOR: IMenuOptions = {
        id: 'open-node-editor',
        label: '编辑节点',
        iconName: 'EditOutlined',
        onClick: async ({target, commandService })=>{
            xflowGraphService.onOpenNodeEditor(target.data.id, target.data.label)
        }
    }

    export const EMPTY_MENU: IMenuOptions = {
        id: 'EMPTY_MENU_ITEM',
        label: '暂无可用',
        isEnabled: false,
        iconName: 'DeleteOutlined',
    }

    export const ADD_NODE: IMenuOptions = {
        id: 'createNewNode',
        label: '新建SQL节点',
        isVisible: true,
        iconName: 'PlusCircleOutlined',
        onClick: async ({commandService, modelService }) => {
            const contextMenuTargetModel = await MODELS.CONTEXTMENU_TARGET.getModel(modelService)
            const contextMenuTargetValue = await contextMenuTargetModel.getValidValue()
            const {x, y} = contextMenuTargetValue.anchor
            const nodeId = genUniqId()
            const label = 'New_Code_Node'
            commandService.executeCommand<NsAddNodeCmd.IArgs>(
                CustomCommands.ADD_NODE.id,{
                    nodeConfig: {
                        id: nodeId,
                        label: label,
                        graphX: x,
                        graphY: y,
                        sql: '',
                        nodeType: 'code'
                    }
                }
            )
        }
        // submenu: [
        //     // gui node
        //     {
        //         id: 'createNewGuiNodeEmpty',
        //         label: '新建空白节点(GUI)',
        //         isVisible: true,
        //         iconName: 'PlusCircleOutlined',
        //         onClick: async ({commandService, modelService }) => {
        //             const contextMenuTargetModel = await MODELS.CONTEXTMENU_TARGET.getModel(modelService)
        //             const contextMenuTargetValue = await contextMenuTargetModel.getValidValue()
        //             const {x, y} = contextMenuTargetValue.anchor
        //             const nodeId = genUniqId()
        //             const label = 'New_Code_Node'
        //             commandService.executeCommand<NsAddNodeCmd.IArgs>(
        //                 CustomCommands.ADD_NODE.id,{
        //                     nodeConfig: {
        //                         id: nodeId,
        //                         label: label,
        //                         graphX: x,
        //                         graphY: y,
        //                         sql: '',
        //                         nodeType: 'gui'
        //                     }
        //                 }
        //             )
        //         }
        //     },

        //     //code node
        //     {
        //         id: 'createNewCodeNodeEmpty',
        //         label: '新建空白节点(CODE)',
        //         isVisible: true,
        //         iconName: 'PlusCircleOutlined',
        //         onClick: async ({commandService, modelService }) => {
        //             const contextMenuTargetModel = await MODELS.CONTEXTMENU_TARGET.getModel(modelService)
        //             const contextMenuTargetValue = await contextMenuTargetModel.getValidValue()
        //             const {x, y} = contextMenuTargetValue.anchor
        //             const nodeId = genUniqId()
        //             const label = 'New_Code_Node'
        //             commandService.executeCommand<NsAddNodeCmd.IArgs>(
        //                 CustomCommands.ADD_NODE.id,{
        //                     nodeConfig: {
        //                         id: nodeId,
        //                         label: label,
        //                         graphX: x,
        //                         graphY: y,
        //                         sql: '',
        //                         nodeType: 'code'
        //                     }
        //                 }
        //             )
        //         }
        //     },
            // import SQL from SQL file
            // {
            //     id: 'createNewNodeByImportSQLFile',
            //     label: '从SQL文件导入节点',
            //     isVisible: true,
            //     iconName: 'PlusCircleOutlined',
            //     onClick: async ({commandService, modelService }) => {
            //         const nodeNameCheckFunc = (name:string)=>{
            //             return xflowGraphService.checkGraphNodeOrParamValid(name, null)
            //         }
            //         const {sqlNodeName, selectSqlValue} = await showFilePathSelectorOnImportSQL(nodeNameCheckFunc)
            //         if(sqlNodeName && selectSqlValue){
            //             const contextMenuTargetModel = await MODELS.CONTEXTMENU_TARGET.getModel(modelService)
            //             const contextMenuTargetValue = await contextMenuTargetModel.getValidValue()
            //             const {x, y} = contextMenuTargetValue.anchor
            //             commandService.executeCommand<NsAddNodeCmd.IArgs>(
            //                 CustomCommands.ADD_NODE.id,{
            //                     nodeConfig: {
            //                         id: genUniqId(),
            //                         label: sqlNodeName,
            //                         graphX: x,
            //                         graphY: y,
            //                         sql: selectSqlValue
            //                     }
            //                 }
            //             )
            //         }

            //     }
            // }
        // ],
    }

    export const CLEAR_GRAPH: IMenuOptions = {
        id: 'clearGraph',
        label: '清空画布',
        isVisible: true,
        iconName: 'ClearOutlined',
        onClick: async ({commandService}) => {
            const confirm = await showConfirmModal('确定清空画布吗？', '')
            confirm && commandService.executeCommand<NsClearGraphCmd.IArgs>(
                CustomCommands.CLEAR_GRAPH.id,
                {}
            )
        },
    }

    export const IMPORT_DATA_SOURCE: IMenuOptions = {
        id: 'importDataSource',
        label: '导入数据源节点',
        isVisible: true,
        iconName: 'PlusCircleOutlined',
        onClick: async ({commandService, modelService}) => {
            const contextMenuTargetModel = await MODELS.CONTEXTMENU_TARGET.getModel(modelService)
            const contextMenuTargetValue = await contextMenuTargetModel.getValidValue()
            const {x, y} = contextMenuTargetValue.anchor
            xflowGraphService.onOpenDataSourceModal({x, y})
        },
    }

    export const COMPILE_ALL_NODES: IMenuOptions = {
        id: 'compileAllNodes',
        label: '编译所有节点',
        isVisible: true,
        iconName: 'PlusCircleOutlined',
        onClick: async ({commandService, modelService}) => {
            xflowGraphService.onCompileAllNodes({})
        },
    }

    // add downstream node 
    export const ADD_DOWNSTREAM_NODE: IMenuOptions = {
        id: 'add-downstream-node',
        label: '增加下游SQL节点',
        isVisible: true,
        iconName: 'PlusCircleOutlined',
        onClick: async ({commandService, modelService, target }) => {
            const nodeConfig = target.data
            const nodeId = genUniqId()
            const edgeId = 'edge-' + genUniqId()
            await commandService.executeCommand<NsAddDownStreamNodeCmd.IArgs>(
                CustomCommands.ADD_DOWNSTREAM_NODE.id, {
                    nodeConfig: {...nodeConfig},
                    newNodeId: nodeId,
                    newEdgeId: edgeId
                }
            )
        }
    }

    export const SEPARATOR: IMenuOptions = {
        id: 'separator',
        type: MenuItemType.Separator,
    }
}

export const useMenuConfig = createCtxMenuConfig(config => {
    config.setMenuModelService(async (target, model, modelService, toDispose) => {
        const { type, cell } = target
        switch (type) {
            /** 节点菜单 */
            case 'node':
                model.setValue({
                    id: 'root',
                    type: MenuItemType.Root,
                    submenu: [
                        NsMenuItemConfig.OPEN_NODE_EDITOR, 
                        NsMenuItemConfig.DELETE_NODE,
                        NsMenuItemConfig.ADD_DOWNSTREAM_NODE
                    ],
                })
                break
            /** 边菜单 */
            case 'edge':
                model.setValue({
                    id: 'root',
                    type: MenuItemType.Root,
                    submenu: [NsMenuItemConfig.DELETE_EDGE],
                })
                break
            /** 画布菜单 */
            case 'blank':
                model.setValue({
                    id: 'root',
                    type: MenuItemType.Root,
                    submenu: [NsMenuItemConfig.ADD_NODE,  NsMenuItemConfig.IMPORT_DATA_SOURCE, NsMenuItemConfig.CLEAR_GRAPH],
                })
                break
            /** 默认菜单 */
            default:
                model.setValue({
                    id: 'root',
                    type: MenuItemType.Root,
                    submenu: [NsMenuItemConfig.EMPTY_MENU],
                })
                break
        }
    })
})
