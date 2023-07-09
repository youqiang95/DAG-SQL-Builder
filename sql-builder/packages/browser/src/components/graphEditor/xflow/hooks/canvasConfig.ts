import {createGraphConfig} from '@antv/xflow'

export const useCanvasConfig = createGraphConfig((config, proxy)=>{
    config.setX6Config({
        mousewheel: {
            enabled: true,
            modifiers: 'ctrl'
        },
        panning: {
            enabled: true,
            eventTypes: ['leftMouseDown', 'mouseWheel'],
        },
        autoResize: true
    })
})

