import type {LanguageName} from '@uiw/codemirror-extensions-langs'
import type { NsGraph} from '@antv/xflow'
export type ILanguageName = LanguageName | 'sqlgraph' | 'dagsql'

export interface ITabData {
    language: ILanguageName;
    value: string;
    tabId: string,
    path:string,
    [key:string]:any
}

export enum SQLTemplateType {
    SELECT = 'SELECT',
    GROUPBY = 'GROUPBY',
    LEFTJOIN = 'LEFTJOIN',
    RIGHTJOIN = 'RIGHTJOIN',
    INNERJOIN = 'INNERJOIN',
    FULLJOIN = 'FULLJOIN',
    UNIONALL='UNIONALL',
    UNION='UNION'
}

export interface DataType {
    key: React.Key;
    paramName: string;
    paramValue: string;
}
export type GraphParamsDataType = DataType[]

export type TargetType = 'node' | 'edge' | 'canvas' | 'group'
export type TargetData = NsGraph.INodeConfig | NsGraph.IEdgeConfig | NsGraph.IGroupConfig | null

export type GraphScaleParmasType = {
    sx: number,
    sy:number,
    ox:number,
    oy:number
} | null 

export type GraphTranslateParmasType = {
    tx:number,
    ty:number
} | null


export type GraphZoomParamsType = {
    scale: GraphScaleParmasType,
    translate: GraphTranslateParmasType
} | null


export interface IGraphEditorData {
    graphData: NsGraph.IGraphData,
    graphConfigParams: GraphParamsDataType,
    zoomParams: GraphZoomParamsType
}

export interface SQLColumn {
    name: string
}

export type SQLNodeType = 'code' | 'gui' | 'source'