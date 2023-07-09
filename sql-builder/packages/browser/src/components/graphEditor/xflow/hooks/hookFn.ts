import type {NsNodeCmd} from '@antv/xflow'
import {NsGraph} from '@antv/xflow'
import {
    NODE_WIDTH,
    NODE_HEIGHT,
    CODE_NODE_RENDER_KEY,
    SOURCE_NODE_RENDER_KEY
} from './constant'
import {genUniqId} from '../../../../common'

export const NODE_COMMON_PROPS = {
    width: NODE_WIDTH,
    height: NODE_HEIGHT
} as const

export const addNodeFn: NsNodeCmd.AddNode.IArgs['createNodeService'] = async (args: NsNodeCmd.AddNode.IArgs) => {
    const portItems = [
        {
            type: NsGraph.AnchorType.INPUT,
            group: NsGraph.AnchorGroup.TOP,
            tooltip: '输入桩',
        },
        {
            type: NsGraph.AnchorType.OUTPUT,
            group: NsGraph.AnchorGroup.BOTTOM,
            tooltip: '输出桩',
        },
    ] as NsGraph.INodeAnchor[]

    const {ports = portItems} = args.nodeConfig

    // add ports and render key 
    let nodeRenderOptions = {...NODE_COMMON_PROPS}
    if(args.nodeConfig.nodeType === 'source'){
        nodeRenderOptions['renderKey'] = SOURCE_NODE_RENDER_KEY
    }
    else {
        nodeRenderOptions['renderKey'] = CODE_NODE_RENDER_KEY
    }
    const node: NsNodeCmd.AddNode.IArgs['nodeConfig'] = {
        ...nodeRenderOptions,
        ...args.nodeConfig,
        ports: (ports as NsGraph.INodeAnchor[]).map(port => {
            return { ...port, id: genUniqId() }
        })
    }
    return node
}