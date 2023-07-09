import React from 'react'
import CodeEditorView from '@/components/codeEditor'
import GraphEditorView from '@/components/graphEditor'
import type {ILanguageName} from '@/common/interface'
import type {ITabData} from '@/common/interface'

export interface IEditorProps {
    language: ILanguageName;
    value: string;
    tabId: string,
    path:string,
    onValueChange: (newValue:string)=>void,
    onOpenNewEditorTab: (newTabId: string,
                        value:string,
                        language: string,
                        tabNameConstructor: (fileName:string)=>string,
                        renderPane: (item:ITabData)=>React.ReactNode,
                        extraData?: {[key:string]:any},
                        icon?: string | JSX.Element
    ) =>void
}

const Editor: React.FC<IEditorProps> = (props)=>{
    const {language, value, tabId, onValueChange, onOpenNewEditorTab} = props
    return (
        <React.Fragment>
            {
                language === 'sqlgraph' &&
                <GraphEditorView
                    tabId={props.tabId}
                    path={props.path}
                    onOpenNewEditorTab={onOpenNewEditorTab}
                />
            }
            {
                language !== 'sqlgraph' &&
                <CodeEditorView
                    value={value}
                    language={language}
                    currentTabId={tabId}
                    onValueChange={onValueChange}
                />
            }
        </React.Fragment>
    )
}

export default Editor

