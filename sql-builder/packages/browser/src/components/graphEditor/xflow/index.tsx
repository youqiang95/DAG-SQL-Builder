import React from 'react'
import {
    XFlow, 
    XFlowCanvas, 
    DagGraphExtension, 
    CanvasContextMenu, 
    CanvasSnapline,
    CanvasNodePortTooltip,
    CanvasToolbar
} from '@antv/xflow'
import type { IApplication, IAppLoad} from '@antv/xflow'
import '@antv/xflow/dist/index.css'
import './index.less'
import {
    useCmdConfig, 
    useMenuConfig, 
    useScaleToolConfig, 
    useGraphHookConfig,
    useCanvasConfig
} from './hooks'
import {
    watchSelectedCell, 
    watchGraphDataChange,
    watchGraphZoomOrTranslate,
    cancelSelectedNodes,
    addDataSourceNodes
} from './appAPI'
import {renderGraphData} from './hooks/cmdConfig'
import {getXflowGraphService} from './xflowGraphService'
import type { NsGraph} from '@antv/xflow'
import type {GraphZoomParamsType, TargetType, TargetData} from '../interface'

const xflowGraphService =  getXflowGraphService()

export interface IXflowViewProps {
    graphData: NsGraph.IGraphData,
    graphZoomParams: GraphZoomParamsType,
    path: string,
    tabId: string,
    checkGraphNodeOrParamValid?: (newName:string, oldName:string)=>string,
    openFinalSqlEditor?: (nodeId: string, label:string)=>void,
    onXGraphDataChange?: (newGraphData: NsGraph.IGraphData)=>void,
    onZoomParamsChange?: (newZoomParams: GraphZoomParamsType)=>void,
    onTargetDataChange?: (type:TargetType, data:TargetData)=>void,
    resolveCancelAllSelectedFunc?: (func:()=>void|Promise<void>)=>void,
    onOpenNodeEditor?: (nodeId:string, nodeLabel:string)=>void,
    onOpenDataSourceModal?: (context:any)=>void,
    resolveAddDataSourceNodes?: (func:(tables:any[], context:any)=>void| Promise<void>)=>void,
    onCompileAllNodes?: (context:any)=>Promise<void>
    onGetTemplate?: (nodeId:string)=>string,
    onDelNode?: (nodeId:string)=>void
}

const XflowView: React.FC<IXflowViewProps> = (props)=>{
    const {
        graphData, 
        graphZoomParams,
        checkGraphNodeOrParamValid,
        openFinalSqlEditor,
        onXGraphDataChange,
        onZoomParamsChange,
        onTargetDataChange,
        resolveCancelAllSelectedFunc,
        onOpenNodeEditor,
        onOpenDataSourceModal,
        resolveAddDataSourceNodes,
        onCompileAllNodes,
        onGetTemplate,
        onDelNode
    } = props
    checkGraphNodeOrParamValid && xflowGraphService.setNodeNameValidFunc(checkGraphNodeOrParamValid)
    openFinalSqlEditor && xflowGraphService.setOpenFinalSqlEditorFunc(openFinalSqlEditor)
    onXGraphDataChange && xflowGraphService.setOnGraphDataChange(onXGraphDataChange)
    onZoomParamsChange && xflowGraphService.setOnZoomParamsChange(onZoomParamsChange)
    onTargetDataChange && xflowGraphService.setOnTargetDataChange(onTargetDataChange)
    onOpenNodeEditor && xflowGraphService.setOnOpenNodeEditor(onOpenNodeEditor)
    onOpenDataSourceModal && xflowGraphService.setOnOpenDataSourceModal(onOpenDataSourceModal)
    onCompileAllNodes && xflowGraphService.setOnCompileAllNodes(onCompileAllNodes)
    onGetTemplate && xflowGraphService.setGetNodeTemplate(onGetTemplate)
    onDelNode && xflowGraphService.setOnDelNode(onDelNode)
    const cmdConfig = useCmdConfig()
    const menuConfig = useMenuConfig()
    const scaleToolConfig = useScaleToolConfig()
    const graphHookConfig = useGraphHookConfig()
    const canvasConfig = useCanvasConfig()
    const cache = React.useMemo<{ app: IApplication | null }>(
        () => ({
            app: null,
        }),
        [],
    )

    const onLoad: IAppLoad = async app => {
        if(!app) return 
        cache.app = app 
        watchSelectedCell(cache.app, (type, data)=>{
            xflowGraphService.onTargetDataChange(type, data)
        })
        resolveCancelAllSelectedFunc && resolveCancelAllSelectedFunc(()=>{
            cancelSelectedNodes(cache.app)
        })

        resolveAddDataSourceNodes && resolveAddDataSourceNodes((tables:any[], context:any)=>{
            addDataSourceNodes(cache.app, tables, context)
        })
        watchGraphDataChange(app, (newGraphData)=>{
            xflowGraphService.lockGraphDataChangeState && xflowGraphService.onXGraphDataChange(newGraphData)
        })
        watchGraphZoomOrTranslate(app, (zoomParams)=>{
            xflowGraphService.lockGraphDataChangeState && xflowGraphService.onZoomParamsChange(zoomParams)
        })

        xflowGraphService.lockGraphDataChange()
        await renderGraphData(cache.app, {...graphData}, graphZoomParams)
        xflowGraphService.unlockGraphDataChange()

        // Listening xflow-canvas-root changes
        const rootResizeObserver = new ResizeObserver((entries)=>{
            if(!entries) return 
            if(entries.length <= 0) return 
            const entry = entries[0]
            const eleWidth = entry.contentRect.width
            const eleHeight = entry.contentRect.height
            cache.app.getGraphInstance().then((x6Graph)=>{
                x6Graph.resize(eleWidth, eleHeight)
            })
        })
        rootResizeObserver.observe(document.getElementsByClassName('xflow-canvas-root')[0])
    }
    React.useEffect(()=>{
        const func = async ()=>{
            if(!cache.app) return 
            xflowGraphService.lockGraphDataChange()
            await renderGraphData(cache.app, {...graphData}, graphZoomParams, 'effect')
            xflowGraphService.unlockGraphDataChange()
        }
        func()
    }, [graphData, graphZoomParams, cache.app])
    return (
        <XFlow 
            className='sql-builder-xflow'
            hookConfig={graphHookConfig}
            commandConfig={cmdConfig}
            onLoad={onLoad}
        >
            <DagGraphExtension/>
            <XFlowCanvas config={canvasConfig} position={{top:0, left:0, right:0, bottom:0}}>
                <CanvasToolbar 
                    className='canvasScaleTool'
                    position={{top: 12, right: 12}} 
                    layout="vertical" 
                    config={scaleToolConfig}
                />
                <CanvasContextMenu config={menuConfig} />
                <CanvasSnapline color="#faad14" />
                <CanvasNodePortTooltip />
            </XFlowCanvas>
        </XFlow>
    )
}
export default XflowView