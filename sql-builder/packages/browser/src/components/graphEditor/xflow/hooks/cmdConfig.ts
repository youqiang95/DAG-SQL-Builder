import { createCmdConfig, DisposableCollection, NsGraph} from '@antv/xflow'
import type { IApplication} from '@antv/xflow'
import {commandContributions} from '../cmdExtensions'
import {addNodeFn} from './hookFn' 
import type {GraphZoomParamsType} from '../../interface'
import {NsGraphRenderCustom} from '../cmdExtensions/renderGraphCustom'

export const useCmdConfig = createCmdConfig(config => {
    // 注册全局Command扩展
    config.setCommandContributions(() => commandContributions)

    // hook 
    config.setRegisterHookFn(hooks => {
        const list = [
            // add node
            hooks.addNode.registerHook({
                name: 'addNodeHook',
                handler: async args => {
                    args.createNodeService = addNodeFn
                },
            }),
            hooks.addEdge.registerHook({
                name: 'addEdgeHook',
                handler: async args => {
                },
            }),
        ]
        const toDispose = new DisposableCollection()
        toDispose.pushAll(list)
        return toDispose
    })
})

export const renderGraphData = async (app:IApplication, graphData: NsGraph.IGraphData, zoomParams:GraphZoomParamsType, where:string='onload')=>{
    if(!app) return 
    try {
        await app.commandService.executeCommand<NsGraphRenderCustom.IArgs>(
            NsGraphRenderCustom.command.id,
            {
              graphData,
              zoomParams
            }
          )
    } catch (error) {
        console.error('renderGraphData error:', error)
    }
    
}
  