import XflowView from './xflow'
import RightConfigPanel from './rightConfigPanel'
import React from 'react'
import type { NsGraph} from '@antv/xflow'
import type {GraphZoomParamsType, TargetType, TargetData, GraphParamsDataType} from './interface'
import type {ITabData} from '@/common/interface'
import {
    processGraphData, 
    changeGraphEditorDataToFolderTree, 
    checkGraphNodeOrParamValidByLatestData,
    checkGraphParamNameValidByLatestData,
    getLatestGraphEditorNodeData,
    updateSQLColumnsPreviewPanelColumns,
    updateSQLColumnsPreviewPanelMessage,
    getLatestGraphEditorData,
    compileNodeByLatestData,
    sendMessageToOutput,
    genNodeDownstreamTemplatebyLatestData,
    parseSqlOutputColumns
} from '@/globalServices'
import type {SQLColumn} from '@/common/interface'
import {NodeSQLEditor} from './nodeSQLEditor'
import {NodeSourceEditor} from './nodeSourceEditor'
import {DataSourceModal} from './dataSourceModal'
import {message} from 'antd';
import {NodeEditorTabId} from '@/common'
import './index.less'

export interface IGraphEditorProps {
    tabId: string,
    path:string,
    onOpenNewEditorTab: (newTabId: string,
        value:string,
        language: string,
        tabNameConstructor: (fileName:string)=>string,
        renderPane: (item:ITabData)=>React.ReactNode,
        extraData?: {[key:string]: any},
        icon?: string | JSX.Element
    ) =>void
}

const GraphEditor: React.FC<IGraphEditorProps> = (props) =>{
    const {tabId, onOpenNewEditorTab} = props
    const {graphData, graphConfigParams, zoomParams} = getLatestGraphEditorData(tabId)
    const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false)
    const targetTypeRef = React.useRef<TargetType>('canvas')
    const targetDataRef = React.useRef<TargetData>(null)
    const cancelAllSelectedFunc = React.useRef<()=>void|Promise<void>>(null)
    const addDataSourceNodesFunc = React.useRef<(tables:any[], context:any)=>void|Promise<void>>(null)
    const dataSourceModalCtx = React.useRef<any>(null)
    const checkGraphNodeOrParamValid = (newName:string, oldName:string=null)=>{
        return checkGraphNodeOrParamValidByLatestData(tabId, newName, oldName)
    }
    const compileAllNodes = async ()=>{
        try {
            const {graphData} = getLatestGraphEditorData(tabId)
            const {nodes} = graphData
            let outputText = '开始编译全部节点:\n'
            const startTs = new Date().getTime()
            for(let node of nodes){
                sendMessageToOutput(outputText)
                await compileNodeByLatestData(tabId, node.id)
                outputText += `编译节点(${node.label})成功!\n`
                sendMessageToOutput(outputText)
            }
            const endTs = new Date().getTime()
            message.success('编译全部节点成功')
            outputText += '编译全部节点成功!'
            sendMessageToOutput(outputText)
        } catch (error) {
            message.error('编译错误')
            const msg = error.message || ''
            sendMessageToOutput(msg)
        }
    }

    const checkGraphParamNameVaild = (key:string, name:string)=>{
        return checkGraphParamNameValidByLatestData(tabId, key, name)
    }

    const onXGraphDataChange = (newGraphData: NsGraph.IGraphData)=>{
        changeGraphEditorDataToFolderTree(tabId, {
            graphData: processGraphData(newGraphData)
        })
    }

    const onZoomParamsChange = (newZoomParams: GraphZoomParamsType)=>{
        changeGraphEditorDataToFolderTree(tabId, {
            zoomParams: newZoomParams
        })
    }

    const onGraphConfigParamsChange = (newParams: GraphParamsDataType)=>{
        changeGraphEditorDataToFolderTree(tabId, {
            graphConfigParams: newParams
        })
    }

    const onTargetDataChange = async (type:TargetType, data:TargetData)=>{
        targetTypeRef.current = type 
        targetDataRef.current = data
        if(type === 'node' && data){
            // source node
            if(data.nodeType === 'source' && data.columns){
                const transColumns = data.columns.map(item=>{
                    return {name: item.name}
                })
                updateSQLColumnsPreviewPanelColumns(transColumns)
                return 
            }
            // code node
            const {columns, err} = parseSqlOutputColumns(data.sql || '')
            if(err){
                updateSQLColumnsPreviewPanelMessage(err)
                return
            }
            const panelColumns:SQLColumn[] = columns.map((item)=>{
                return {name:item}
            })
            updateSQLColumnsPreviewPanelColumns(panelColumns)

            // if(data.columns !== undefined){
            //     const panelColumns:SQLColumn[] = data.columns.map((item)=>{
            //         return {name:item}
            //     })
            //     updateSQLColumnsPreviewPanelColumns(panelColumns)
            // }
            // else {
            //     updateSQLColumnsPreviewPanelMessage('该节点未编译')
            // }
            
            // updateSQLColumnsPreviewPanelMessage('解析节点SQL中......')
            // const parseColumnsResultAsync = async () => {
            //     const columnsResult = extractColumnsFromSql(data.sql)
            //     return columnsResult
            // }
            // const columnsResult = await parseColumnsResultAsync()
            // if(columnsResult && columnsResult.columns && columnsResult.columns.length>0){
            //     const panelColumns:SQLColumn[] = columnsResult.columns.map((item)=>{
            //         return {name:item}
            //     })
            //     updateSQLColumnsPreviewPanelColumns(panelColumns)
            // }
            // else {
            //     updateSQLColumnsPreviewPanelColumns([])
            // }
        }
        else {
            updateSQLColumnsPreviewPanelMessage('无选中节点')
        }
    }

    const resolveCancelAllSelectedFunc = (func:()=>void|Promise<void>)=>{
        cancelAllSelectedFunc.current = func
    }

    const resolveAddDataSourceNodes = (func: (tables:any[], context:any)=>void|Promise<void>)=>{
        addDataSourceNodesFunc.current = func
    }

    const onOpenNodeEditor = (nodeId:string, nodeLabel:string)=>{
        const nodeData = getLatestGraphEditorNodeData(tabId, nodeId)
        if(!nodeData){
            return 
        }
        const {label, sql, nodeType} = nodeData
        const newTabId = NodeEditorTabId(tabId, nodeId)
        const tabNameConstructor = (fileName:string)=>{
            const filePrefix = fileName.indexOf('.') > -1 ?  fileName.split('.')[0] : fileName
            return filePrefix + '-(' + label + ')'
        }
        if(nodeType && nodeType === 'source'){
            const renderPane = (item: ITabData) => {
                return <NodeSourceEditor
                    currentTabId={item.tabId}
                    graphId={item.graphTabId}
                    nodeId={item.nodeId}
                />
            }
            onOpenNewEditorTab(newTabId, '', 'sql', tabNameConstructor, renderPane, {
                    skipFolderTreeCheck: true,
                    graphTabId: tabId,
                    nodeId: nodeId
                },
                <span className="folder-file-icon codicon codicon-symbol-parameter"></span>
            )
        }
        else{
            const renderPane = (item: ITabData) => {
                return <NodeSQLEditor 
                    currentTabId={item.tabId}
                    graphTabId={item.graphTabId}
                    nodeId={item.nodeId}
                />
            }
            onOpenNewEditorTab(newTabId, sql, 'sql', tabNameConstructor, renderPane, {
                    skipFolderTreeCheck: true,
                    graphTabId: tabId,
                    nodeId: nodeId,
                },
                <span className="folder-file-icon codicon codicon-code"></span>
            )
        }
    }

    const onOpenDataSourceModal = (context:any)=>{
        dataSourceModalCtx.current = context
        setIsOpenModal(true)
    }

    const onSubmitDataSourceSelect = (values)=>{
        addDataSourceNodesFunc.current && addDataSourceNodesFunc.current(values, dataSourceModalCtx.current || {})
        setIsOpenModal(false)
    }

    const getDownstreamTemplate = (nodeId:string)=>{
        return genNodeDownstreamTemplatebyLatestData(tabId, nodeId)
    }
    React.useEffect(()=>{
        cancelAllSelectedFunc.current && cancelAllSelectedFunc.current()
    }, [tabId])

    return (
        <div className='graphEditor' style={{position:'absolute', top:0, right:0, bottom:0, left:0}}>
            <XflowView
                graphData={graphData} 
                graphZoomParams={zoomParams}
                tabId={props.tabId}
                path={props.path}
                checkGraphNodeOrParamValid={checkGraphNodeOrParamValid}
                onXGraphDataChange={onXGraphDataChange}
                onZoomParamsChange={onZoomParamsChange}
                onTargetDataChange={onTargetDataChange}
                resolveCancelAllSelectedFunc={resolveCancelAllSelectedFunc}
                onOpenNodeEditor={onOpenNodeEditor}
                onOpenDataSourceModal={onOpenDataSourceModal}
                resolveAddDataSourceNodes={resolveAddDataSourceNodes}
                onCompileAllNodes={compileAllNodes}
                onGetTemplate={getDownstreamTemplate}
            />
            <RightConfigPanel
                dataSource={graphConfigParams}
                nameCheckFunc={checkGraphParamNameVaild}
                onDatachange={onGraphConfigParamsChange}
                tabId={tabId}
            />
            <DataSourceModal isModalOpen={isOpenModal} onCloseModal={()=>setIsOpenModal(false)} onSubmit={onSubmitDataSourceSelect}/>
        </div>
    )
}

export default GraphEditor