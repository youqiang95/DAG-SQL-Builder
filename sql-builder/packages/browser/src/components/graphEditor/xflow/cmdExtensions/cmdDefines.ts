import type {IGraphCommand } from '@antv/xflow'

export namespace CustomCommands {
    const category = '节点操作'
    export const ADD_NODE: IGraphCommand = {
        id: 'xflow:custom-add-node',
        label: '新增节点',
        category,
    }

    export const CLEAR_GRAPH: IGraphCommand = {
        id: 'xflow:clear-graph',
        label: '清空画布',
        category,
    }

    export const RENAME_NODE: IGraphCommand = {
        id: 'xflow:rename-node',
        label: '重命名节点',
        category,
    }

    export const RENDER_GRAPH_CUSTOM: IGraphCommand = {
        id: 'xflow:render-graph-custom',
        label: '自定义渲染画布',
        category,
    }

    export const ADD_DOWNSTREAM_NODE: IGraphCommand = {
        id: 'xflow:add-downstream-node',
        label: '新增下游节点',
        category,
    }

}