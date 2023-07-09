import React from 'react'
import {MonacoEditorCustom} from '@/components/monaco'

export interface ICodeEditorProps {
    value: string, 
    language: string,
    currentTabId: string,
    onValueChange: (newValue:string)=>void
}

export const CodeEditor: React.FC<ICodeEditorProps> = (props)=>{
    const {value, language, currentTabId, onValueChange} = props
    return (
        <MonacoEditorCustom
            value={value}
            language={language}
            monacoModelId={currentTabId}
            onValueChange={onValueChange}
        />
    )   
}

export default CodeEditor
