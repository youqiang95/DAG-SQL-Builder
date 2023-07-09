import { NsGraph } from '@antv/xflow'
import { createHookConfig, DisposableCollection } from '@antv/xflow'
import { 
    CODE_NODE_RENDER_KEY,
    SOURCE_NODE_RENDER_KEY
} from './constant'
import {CodeNode, SourceNode} from '../reactNode'
import type { Graph } from '@antv/x6'

export const useGraphHookConfig = createHookConfig((config, proxy) => {
    config.setRegisterHook(hooks => {
        const disposableList = [
            // register custom node render
            hooks.reactNodeRender.registerHook({
                name: 'addReactNodeHook',
                handler: async renderMap => {
                    renderMap.set(CODE_NODE_RENDER_KEY, CodeNode)
                    renderMap.set(SOURCE_NODE_RENDER_KEY, SourceNode)
                },
            }),
            // register graphOptions hook to change port connect interactive logic
            hooks.graphOptions.registerHook({
                name: 'customX6Options',
                after: 'dag-extension-x6-options',
                handler: async options => {
                    options.grid = false
                    options.keyboard = {
                        enabled: true,
                    }
                    // port connect logic
                    const graphOptions: Graph.Options = {
                        connecting: {
                            // is triger interactive event 
                            validateMagnet() {
                                // return magnet.getAttribute('port-group') !== NsGraph.AnchorGroup.TOP
                                return true
                            },

                            // is can be connected
                            validateConnection({ sourceView, targetView, sourceMagnet, targetMagnet }) {
                                // no self connect
                                if (sourceView === targetView) {
                                    return false
                                }
                                // source must not from top ports group
                                if ( sourceMagnet && sourceMagnet.getAttribute('port-group') === NsGraph.AnchorGroup.TOP) {
                                    return false
                                }
                                // target must from top ports group 
                                if (targetMagnet && targetMagnet.getAttribute('port-group') !== NsGraph.AnchorGroup.TOP) {
                                    return false
                                }

                                // must have source and target
                                if (!sourceMagnet) {
                                    return false
                                }
                                if (!targetMagnet) {
                                    return false
                                }
                                const node = targetView!.cell as any
                                
                                const portId = targetMagnet.getAttribute('port')!
                                const port = node.getPort(portId)
                                return !!port
                            },
                        },
                    }
                    options.connecting = { ...options.connecting, ...graphOptions.connecting }
                },
            })

        ]
        const toDispose = new DisposableCollection()
        toDispose.pushAll(disposableList)
        return toDispose
    })
})
