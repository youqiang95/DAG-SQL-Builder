import type { IApplication, NsGraph, NsNodeCmd} from '@antv/xflow'
import {randomInt, MODELS, XFlowNodeCommands} from '@antv/xflow'
import {NsAddNodeCmd} from '../cmdExtensions/addNode'
import {CustomCommands} from '../cmdExtensions/cmdDefines'
import {genUniqId} from '../../../../common'
import type {TargetType, TargetData} from '../../interface'
import type { Cell, Node as X6Node, Graph as X6Graph} from '@antv/x6'

export const createNodeFromFileExplore = async (app: IApplication)=>{
    if(app && app.commandService){
        app.commandService.executeCommand<NsAddNodeCmd.IArgs>(
            CustomCommands.ADD_NODE.id,{
            nodeConfig: {
                x: 10 + randomInt(20, 60),
                y: 10 + randomInt(20, 60),
                id: genUniqId(),
                label: 'from file'
            }
          }
        )
    } 
}

export const watchSelectedCell = async (app:IApplication,  callback: (type:TargetType, data:TargetData)=>void)=>{
    const getCellType = (targetCell: Cell):TargetType => {
        if (!targetCell) {
            return 'canvas'
        } 
        else if (targetCell.isNode && targetCell.isNode()) {
            return 'node'
        } 
        else if (targetCell.isEdge && targetCell.isEdge()) {
            return 'edge'
        } 
        else {
            return 'canvas'
        }
    }
    if (!(app && app.modelService)){
        return 
    }
    const {modelService} = app
    const selectedCellModel = await MODELS.SELECTED_CELL.getModel(modelService)
    selectedCellModel.watch(async cell => {
        const type = getCellType(cell)
        const targetData:TargetData = cell ? cell.getData() : null
        callback(type, targetData)
    })
}

const getNodeConfigByX6Node = (x6Node: X6Node) => {
    const data = x6Node.getData()
    const position = x6Node.getPosition()
    const size = x6Node.getSize()
    return {
        ...data,
        ...position,
        ...size,
    }
}

export const updateTargetNodeSQL = async (app:IApplication, value:string) => {
    if (!(app && app.modelService && app.commandService)){
        return 
    }
    const {commandService, modelService} = app
    const model = await MODELS.SELECTED_NODE.getModel(modelService)
    const selectNode = await model.getValidValue()
    if(!selectNode) return 
    const nodeConfig = getNodeConfigByX6Node(selectNode)
    commandService.executeCommand(XFlowNodeCommands.UPDATE_NODE.id, {
        nodeConfig: {...nodeConfig, sql:value}
    })
}

// remove other props
const getPureGraphData = (x6Graph: X6Graph)=>{
    const x6Nodes = x6Graph.getNodes()
    const x6Edges = x6Graph.getEdges()

    const nodes = x6Nodes.map(node => {
        const data = node.getData<NsGraph.INodeConfig>()
        const position = node.position()
        const size = node.size()
        const model = {
            id: node.id,
            ...data,
            ...position,
            ...size,
        }
        return model
    })

    const edges = x6Edges.map(edge => {
        const data = edge.getData<NsGraph.IEdgeConfig>()
        const model = {
            id: edge.id,
            ...data,
        }
        return model
    })
    return { nodes, edges }
}

export const watchGraphDataChange = async (app:IApplication, callback:(newGraphData: NsGraph.IGraphData)=>void)=>{
    if(!app) return 
    const graph = await app.getGraphInstance()
    graph.on('cell:added', async ({ cell, index, options }) => {
        callback(getPureGraphData(graph))
    })
    graph.on('cell:removed', async ({ cell, index, options }) => { 
        callback(getPureGraphData(graph))
    })
    graph.on('cell:changed', async ({ cell, options }) => { 
        callback(getPureGraphData(graph))
    })
}

export const watchGraphZoomOrTranslate = async (app:IApplication, callback:(zoomParams:IXflow['graphZoomParams'])=>void)=>{
    if(!app) return 
    const graph = await app.getGraphInstance()
    graph.on('scale', ({ sx, sy, ox, oy }) => { 
        const {tx, ty} = graph.transform.getTranslation()
        callback({
            scale: {sx, sy, ox, oy},
            translate:{tx, ty}
        })
    })
    graph.on('translate', ({ tx, ty }) => { 
        const {sx, sy} =  graph.transform.getScale()
        callback({
            scale: {sx, sy, ox:0, oy:0},
            translate:{tx, ty}
        })
    })
}

// cancel all selected nodes
export const cancelSelectedNodes = (app:IApplication)=>{
    if(app.commandService){
        app.commandService.executeCommand<NsNodeCmd.SelectNode.IArgs>(
            XFlowNodeCommands.SELECT_NODE.id,
            {
                nodeIds: [],
                resetSelection: true
            }
        )
    }
}

export const addDataSourceNodes = async (app: IApplication, tables:any[], context:any)=>{
    if(!(context && context.x !== undefined && context.y !== undefined)){
        return 
    }
    if(app.commandService){
        const commandService = app.commandService
        let count = 0
        let xSpace = 200
        for(let table of tables){
            if(!(
                    table.name !== undefined 
                    && table.type !== undefined 
                    && table.columns !== undefined
                    && table.refName !== undefined
                )
            ){
                continue
            }
            const nodeId = genUniqId()
            const label = table.name
            await commandService.executeCommand<NsAddNodeCmd.IArgs>(
                CustomCommands.ADD_NODE.id,{
                    nodeConfig: {
                        id: nodeId,
                        label: label,
                        graphX: context.x + count*xSpace,
                        graphY: context.y,
                        columns: table.columns,
                        refName: table.refName,
                        nodeType: 'source',
                        tableType: table.type
                    }
                }
            )
            count += 1
        }
    }
}
