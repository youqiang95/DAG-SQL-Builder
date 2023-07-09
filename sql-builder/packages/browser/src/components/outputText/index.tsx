import React from 'react'
import {MonacoEditorCustom} from '@/components/monaco'

export const OutputText: React.FC<{message:string}> = (props)=>{
    const {message} = props
    const setFunc = React.useRef<(value:string)=>void>(null) 
    const resolveSetFunc = (func: (value:string)=>void)=>{
        setFunc.current = func
    }
    return (
        <MonacoEditorCustom
            value={message}
            language='text'
            readOnly={true}
            monacoModelId={'output'}
            onValueChange={newValue=>{}}
            resolveSetEditorValue={resolveSetFunc}
        />
    )
}