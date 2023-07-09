import 'reflect-metadata';
import molecule from '@dtinsight/molecule'
import type { NsGraph} from '@antv/xflow'
import {getFolderTreeService} from './folderTreesService'
import {
    formatSQL,
    XflowGraphDataManager,
    NodeSQLBuilder,
    generateSQLTemplate
} from './dagCompile'
import type {SQLTemplateType, IGraphEditorData} from '@/common'
import {parseGraphNodeIdByTabId} from '@/common'
import {extractColumnsFromSql} from '@/sqlParser'
import { SelectTemplate } from './dagCompile/sqlTemplate/singleQueryTemplate';

// delete view prop
export const processGraphData = (graphData: NsGraph.IGraphData)=>{
    const {nodes, edges} = graphData
    const pureNodes = nodes.map((node)=>{
        let model: NsGraph.INodeConfig = {
            id: node.id,
            label: node.label || ''
        }
        node.x !== undefined && (model.x = node.x)
        node.y !== undefined && (model.y = node.y)
        node.renderKey !== undefined && (model.renderKey = node.renderKey)
        node.ports !== undefined && (model.ports = node.ports)
        node.sql !== undefined && (model.sql = node.sql)
        node.nodeType !== undefined && (model.nodeType = node.nodeType)
        node.columns !== undefined && (model.columns = node.columns)
        node.fromSql !== undefined && (model.fromSql = node.fromSql) 
        node.finalSql !== undefined && (model.finalSql = node.finalSql) 
        node.compiledSql !== undefined && (model.compiledSql = node.compiledSql) 
        node.tableType !== undefined && (model.tableType = node.tableType)
        node.refName !== undefined && (model.refName = node.refName)
        node.width !== undefined && (model.width = node.width)
        node.height !== undefined && (model.height = node.height)
        return model
    })
    const pureGraphData = {
        nodes: pureNodes,
        edges: edges
    }
    return pureGraphData
}

export const parseGraphValue = (value:string)=>{
    let result:IGraphEditorData = {
        graphData:{
            nodes:[],
            edges:[]
        },
        graphConfigParams:[],
        zoomParams: null 
    }
    try {
        const graphValue = JSON.parse(value)
        if(graphValue.graphData){
            result.graphData = {...processGraphData(graphValue.graphData)}
        }
        if(graphValue.graphParams){
            result.graphConfigParams = [...graphValue.graphParams]
        }
        if(graphValue.graphConfigParams){
            result.graphConfigParams = [...graphValue.graphConfigParams]
        }
        if(graphValue.zoomParams){
            result.zoomParams = graphValue.zoomParams
        }
    } catch (error) {
    }
    return result
}

export const getLatestGraphEditorData = (graphTabId:string)=>{
    let result:IGraphEditorData = {
        graphData:{
            nodes:[],
            edges:[]
        },
        graphConfigParams:[],
        zoomParams: null 
    }
    const folderNode = molecule.folderTree.get(graphTabId)
    if(!folderNode){
        return result
    }
    if(folderNode.data && folderNode.data.value){
        return parseGraphValue(folderNode.data.value)
    }
}

export const getLatestGraphEditorNodeData = (graphTabId:string, nodeId:string)=>{
    const graphEditorData = getLatestGraphEditorData(graphTabId)
    for(let node of graphEditorData.graphData.nodes){
        if(node.id === nodeId){
            return {...node}
        }
    }
    return null 
}

export const changeGraphNodeDataToFolderTree = async (graphTabId:string, nodeId:string, nodeData: any)=>{
    const graphEditorData = getLatestGraphEditorData(graphTabId)
    let nodes = [...graphEditorData.graphData.nodes]
    for(let i=0; i<nodes.length; i++){
        if(nodes[i].id === nodeId){
            nodes[i] = {...nodeData}
        }
    }
    const newGraphData =  processGraphData({...graphEditorData.graphData, nodes:nodes})
    const value = JSON.stringify({
        graphData: newGraphData,
        graphConfigParams: graphEditorData.graphConfigParams,
        zoomParams: graphEditorData.zoomParams
    })
    const folderTreeService = getFolderTreeService()
    await folderTreeService.updateFolderTreeNodeValueOnEditorChange(graphTabId, value)
    closeDeledNodeTabAfterGraphDataChange(graphTabId)
}

export const changeGraphEditorDataToFolderTree = async (graphTabId:string, graphEditorDataWillUpdate:Partial<IGraphEditorData>)=>{
    const graphEditorData = getLatestGraphEditorData(graphTabId)
    let newData = {
        ...graphEditorData,
        ...graphEditorDataWillUpdate
    }
    newData.graphData = processGraphData({...newData.graphData})
    const value = JSON.stringify(newData)
    const folderTreeService = getFolderTreeService()
    await folderTreeService.updateFolderTreeNodeValueOnEditorChange(graphTabId, value)
    closeDeledNodeTabAfterGraphDataChange(graphTabId)
}

export const genNodeSqlTemplateByLatestData = (graphTabId:string, nodeId:string, templateType:SQLTemplateType) =>{
    const {graphData, graphConfigParams} = getLatestGraphEditorData(graphTabId)
    const dataManager = new XflowGraphDataManager()
    graphConfigParams.forEach((item)=>{
        dataManager.addParam(item.paramName, item.paramValue)
    })
    dataManager.setStateFromXflowGraphData(graphData)
    let parents = []
    const currentNode = dataManager.getNode(nodeId)
    if(!currentNode){
        return ''
    }
    let columns = []
    for(const pNode of dataManager.getNodeSortParentArray(nodeId)){
        if(pNode.data.nodeType === 'source'){
            if(pNode.data.columns){
                columns = pNode.data.columns.map(item=>item.name)
            }
        }
        else {
            columns = extractColumnsFromSql(pNode.data.sql || '').columns
        }
        parents.push({label: pNode.data.label, columns: columns, x: pNode.data.x})
    }

    return formatSQL(generateSQLTemplate(templateType, parents))
}

export const genNodeDownstreamTemplatebyLatestData = (graphTabId:string, nodeId:string) =>{
    const nodeData =  getLatestGraphEditorNodeData(graphTabId, nodeId)
    if(!nodeData){
        return ''
    }
    let columns = []
    if(nodeData.nodeType && nodeData.nodeType==='source'){
        if(nodeData.columns){
            columns = nodeData.columns.map(item=>item.name)
        }
    }
    else {
        columns = extractColumnsFromSql(nodeData.sql || '').columns
    }
    const templator = new SelectTemplate([{label: nodeData.label, columns: columns}])
    return formatSQL(templator.generate({}))
}

export const compileNodeByLatestData = async (graphTabId:string, nodeId:string)=>{
    const {graphData, graphConfigParams} = getLatestGraphEditorData(graphTabId)
    const dataManager = new XflowGraphDataManager()
    graphConfigParams.forEach((item)=>{
        dataManager.addParam(item.paramName, item.paramValue)
    })
    dataManager.setStateFromXflowGraphData(graphData)
    const builder = new NodeSQLBuilder(nodeId, dataManager)
    const compiled = formatSQL(builder.build())
    const {columns} = extractColumnsFromSql(compiled)
    const nodeData = getLatestGraphEditorNodeData(graphTabId, nodeId)
    await changeGraphNodeDataToFolderTree(graphTabId, nodeId, {...nodeData, finalSql:compiled, columns:columns})
    return compiled
}

export const checkGraphNodeNameValid = (graphId:string, nodeId:string, name:string)=>{
    const matchPos = name.search(/^[a-zA-Z][_a-zA-Z0-9]*$/g)
    if(matchPos<0){
        return '名称必须为字母、数字、下划线组成, 并且第一个字符必须为字母!'
    }
    const {graphData, graphConfigParams} = getLatestGraphEditorData(graphId)
    const {nodes} = graphData
    for(let node of nodes){
        if (node.id !== nodeId && node.label === name){
            return '画布中已经存在该名称的节点，请输入一个不同的名称！'
        } 
    }
    for(let param of graphConfigParams){
        if(param.paramName === name){
            return '画布参数已经存在该名称的参数，请输入一个不同的名称！'
        }
    }
    return null
}

export const checkGraphNodeOrParamValidByLatestData = (graphTabId:string, newName:string, oldName:string=null)=>{
    const {graphData, graphConfigParams} = getLatestGraphEditorData(graphTabId)
    if(oldName && oldName === newName){
        return null
    }
    const matchPos = newName.search(/^[a-zA-Z][_a-zA-Z0-9]*$/g)
    if(matchPos<0){
        return '名称必须为字母、数字、下划线组成, 并且第一个字符必须为字母!'
    }
    const {nodes} = graphData
    for(let node of nodes){
        if (node.label === newName){
            return '画布中已经存在该名称的节点，请输入一个不同的名称！'
        } 
    }
    for(let param of graphConfigParams){
        if(param.paramName === newName){
            return '画布参数已经存在该名称的参数，请输入一个不同的名称！'
        }
    }
    return null
}

export const checkGraphParamNameValidByLatestData = (graphTabId:string, key:string, paramName: string)=>{
    const {graphData, graphConfigParams} = getLatestGraphEditorData(graphTabId)
    const matchPos = paramName.search(/^[a-zA-Z][_a-zA-Z0-9]*$/g)
    if(matchPos<0){
        return '名称必须为字母、数字、下划线组成, 并且第一个字符必须为字母!'
    }
    const {nodes} = graphData
    for(let node of nodes){
        if (node.label === paramName){
            return '画布中已经存在该名称的节点，请输入一个不同的名称！'
        } 
    }
    for(let param of graphConfigParams){
        if(param.key !== key && param.paramName === paramName){
            return '画布参数已经存在该名称的参数，请输入一个不同的名称！'
        }
    }
    return null
}

export const closeDeledNodeTabAfterGraphDataChange = (graphId:string)=>{
    const editorState = molecule.editor.getState()
    const {graphData} = getLatestGraphEditorData(graphId)
    const nodeIdSet = new Set<string>()
    for(let node of graphData.nodes){
        nodeIdSet.add(node.id)
    }
    for(let group of editorState.groups){
        for(let tab of group.data){
            const [gId, nId] = parseGraphNodeIdByTabId(tab.id.toString())
            if(!(gId && nId)){
                continue 
            }
            if(graphId === gId && (!nodeIdSet.has(nId))){
                molecule.editor.closeTab(tab.id, group.id)
            }
        }
    }
}
