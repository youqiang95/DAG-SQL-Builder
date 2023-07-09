import {molecule} from '@dtinsight/molecule'
import React from 'react'
import { editor as MEditor, Uri, KeyMod, KeyCode} from '@dtinsight/molecule/esm/monaco'
import {getMonacoViewStateManager} from './monacoViewStateManager'
import type {IMonacoEditorProps} from '@dtinsight/molecule/esm/components/monaco'
import {updateEditorTabValue, useEditorSettingModel} from '@/globalServices'

const MonacoEditor = molecule.component.MonacoEditor

export interface IMonacoEditorCustomProps {
    value:string,
    language: string,
    monacoModelId: string,
    readOnly?: boolean,
    onValueChange: (newValue: string)=>void,
    resolveSetEditorValue?: (func:(value:string)=>void)=>void,
    resolveGetEditorValue?: (func:()=>string)=>void,
}

export const MonacoEditorCustom : React.FC<IMonacoEditorCustomProps> = (props)=>{
    const {value, monacoModelId, language, onValueChange, resolveSetEditorValue, resolveGetEditorValue, readOnly=false} = props
    const {fontSize, tabWidth} = useEditorSettingModel()
    const onValueChangeRef = React.useRef<(newValue:string)=>void>(onValueChange)
    const fixedLanguage = language === 'sql' ? 'dagsql' : language
    const insRef = React.useRef<MEditor.IStandaloneCodeEditor>(null)
    const monacoViewStateManager = getMonacoViewStateManager()
    const onUpdateEditorIns = (editorInstance: MEditor.IStandaloneCodeEditor)=>{
        insRef.current = editorInstance
        insRef.current.getModel().updateOptions({
            tabSize: tabWidth,
            indentSize: tabWidth,
            insertSpaces: true
        })
        editorInstance.addCommand(KeyMod.CtrlCmd | KeyCode.KeyA, ()=>{
            const range = editorInstance.getModel().getFullModelRange()
            editorInstance.setSelection(range);
        })
        editorInstance.onDidChangeModelContent((event: any) => {
            const newValue = editorInstance.getModel()?.getValue()
            onValueChangeRef.current(newValue)
        })

        editorInstance.onDidFocusEditorText(() => {
            // this.updateEditorLineColumnInfo(editorInstance);
        })

        editorInstance.onDidChangeCursorSelection(() => {
            // this.updateEditorLineColumnInfo(editorInstance);
        });

        editorInstance.onDidBlurEditorText(() => {
        });

        resolveSetEditorValue && resolveSetEditorValue((value:string)=>{
            const model = editorInstance.getModel()
            if(model){
                model.setValue(value)
            }
        })

        resolveGetEditorValue && resolveGetEditorValue(()=>{
            return editorInstance.getModel()?.getValue()
        })
    }
    const onChangeEditorProps = (preProps:IMonacoEditorProps, props:IMonacoEditorProps)=>{
        if(!insRef.current){
            return 
        }
        const { path, options} = props
        if(path !== preProps.path){
            monacoViewStateManager.saveViewState(preProps.path, insRef.current.saveViewState())
            let model = MEditor.getModel(Uri.parse(path))
            if(model){
                model.dispose()
            }
            model = MEditor.createModel(options.value, options.language, Uri.parse(path));
            // if (!model) {
            //     model = MEditor.createModel(options.value, options.language, Uri.parse(path));
            // }
            insRef.current.setModel(model)
            insRef.current.updateOptions(options)
            insRef.current.getModel().updateOptions(options)
            const editorViewState = monacoViewStateManager.loadViewState(path)
            if (editorViewState) {
                // viewState contains: scroller info, cursor info, contributions info
                insRef.current.restoreViewState(editorViewState);
            }
            insRef.current.focus()
        }
        else {
            insRef.current.updateOptions(options)
            insRef.current.getModel().updateOptions(options)
            const model = insRef.current.getModel()
            if(model && model.getValue() !== options.value){
                model.setValue(options.value)
            }
        }
    }

    React.useEffect(()=>{
        onValueChangeRef.current = onValueChange
    }, [onValueChange])
    return (
        <MonacoEditor
            options={{
                value: value,
                language: fixedLanguage,
                automaticLayout: true,
                fontSize: fontSize,
                renderWhitespace: 'none',
                tabSize: tabWidth,
                insertSpaces: true,
                readOnly: readOnly
            }}
            path={monacoModelId}
            editorInstanceRef={(editorInstance) => {
                // This assignment will trigger moleculeCtx update, and subNodes update
                onUpdateEditorIns?.(editorInstance);
            }}
            onChangeEditorProps={(preProps, props) => {
                // Listener event for Editor property update
                onChangeEditorProps?.(preProps, props);
            }}
        />
    )
}