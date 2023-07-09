import { 
    createToolbarConfig, 
    IconStore, 
    MODELS, 
    NsGraphStatusCommand,
    randomInt
} from '@antv/xflow'
import type { 
    IModelService, 
    IToolbarItemOptions
} from '@antv/xflow'
import {
    UngroupOutlined,
    SaveOutlined,
    CloudSyncOutlined,
    GroupOutlined,
    GatewayOutlined,
    PlaySquareOutlined,
    StopOutlined,
    PlusCircleOutlined,
    ClearOutlined,
    ConsoleSqlOutlined
} from '@ant-design/icons'
import {genUniqId} from '../../../../common'
import {CustomCommands, NsAddNodeCmd, NsClearGraphCmd} from '../cmdExtensions'

export namespace NSToolbarConfig {
    /** 注册icon 类型 */
    IconStore.set('SaveOutlined', SaveOutlined)
    IconStore.set('CloudSyncOutlined', CloudSyncOutlined)
    IconStore.set('GatewayOutlined', GatewayOutlined)
    IconStore.set('GroupOutlined', GroupOutlined)
    IconStore.set('UngroupOutlined', UngroupOutlined)
    IconStore.set('PlaySquareOutlined', PlaySquareOutlined)
    IconStore.set('StopOutlined', StopOutlined)
    IconStore.set('PlusCircleOutlined', PlusCircleOutlined)
    IconStore.set('ClearOutlined', ClearOutlined)
    IconStore.set('ConsoleSqlOutlined', ConsoleSqlOutlined)

  
    /** toolbar依赖的状态 */
    export interface IToolbarState {
        isMultiSelectionActive: boolean
        isNodeSelected: boolean
        isGroupSelected: boolean
        isProcessing: boolean
    }
  
    export const getDependencies = async (modelService: IModelService) => {
        return [
            await MODELS.SELECTED_CELLS.getModel(modelService),
            await MODELS.GRAPH_ENABLE_MULTI_SELECT.getModel(modelService),
            await NsGraphStatusCommand.MODEL.getModel(modelService),
        ]
    }
  
    export const getToolbarItems = async () => {
        const toolbarGroup1: IToolbarItemOptions[] = []
        const toolbarGroup2: IToolbarItemOptions[] = []
        const toolbarGroup3: IToolbarItemOptions[] = []
        // code node
        toolbarGroup1.push({
            id:  'newCodeNode',
            iconName: 'PlusCircleOutlined',
            tooltip: '新建SQL节点',
            onClick: async ({ commandService, modelService }) => {
                const nodeId = genUniqId()
                const label = 'New_Code_Node'
                commandService.executeCommand<NsAddNodeCmd.IArgs>(
                    CustomCommands.ADD_NODE.id,{
                    nodeConfig: {
                        id: nodeId,
                        label: label,
                        x: 10 + randomInt(20, 60),
                        y: 10 + randomInt(20, 60)
                    }
                  }
                )
            },
        })
        // 清空画布
        toolbarGroup2.push({
            id:  'clearGraph',
            iconName: 'ClearOutlined',
            tooltip: '清空画布',
            onClick: async ({ commandService, modelService }) => {
                await commandService.executeCommand<NsClearGraphCmd.IArgs>(
                    CustomCommands.CLEAR_GRAPH.id,
                    {}
                )
            },
        })
      return [
        { name: 'nodeOperate', items: toolbarGroup1 },
        { name: 'graphOperate', items: toolbarGroup2 },
        {
          name: 'customCmd',
          items: toolbarGroup3,
        },
      ]
    }
}

export const useToolbarConfig = createToolbarConfig(toolbarConfig => {
    /** 生产 toolbar item */
    toolbarConfig.setToolbarModelService(async (toolbarModel, modelService, toDispose) => {
        const updateToolbarModel = async () => {
            const toolbarItems = await NSToolbarConfig.getToolbarItems()
            toolbarModel.setValue(toolbar => {
                toolbar.mainGroups = toolbarItems
            })
        }
        const models = await NSToolbarConfig.getDependencies(modelService)
        const subscriptions = models.map(model => {
            return model.watch(async () => {
                updateToolbarModel()
            })
        })
        toDispose.pushAll(subscriptions)
    })
})