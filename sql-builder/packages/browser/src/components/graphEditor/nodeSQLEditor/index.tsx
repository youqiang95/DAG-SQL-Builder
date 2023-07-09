import React from 'react'
import {MonacoEditorCustom} from '@/components/monaco'
import {showSQLTemplateSelectorModal} from './templateSelectorDialog'
import type {SQLTemplateType} from '@/common/interface'
import {
    getLatestGraphEditorNodeData, 
    changeGraphNodeDataToFolderTree,
    genNodeSqlTemplateByLatestData,
    checkGraphNodeNameValid,
    compileNodeByLatestData,
    sendMessageToOutput,
    formatSQL,
    getCreateFileModalService
} from '@/globalServices'
import {showConfirmModal} from '@/components/confirmModal'
import { Tabs, ConfigProvider, theme, Space, message} from 'antd';
import type { TabsProps } from 'antd';
import {EditableTitle} from '@/components/editableTitle'
import {useColorThemeServiceModel} from '@/globalServices/colorThemeService' 
import {SqlMonacoId, FinalSqlMonacoId} from '@/common'
import molecule from '@dtinsight/molecule'
import {AsyncButton} from '@/components/asyncButton'
import clipboard from 'clipboard'
import './index.less'

const createFileModalService = getCreateFileModalService()

export interface INodeSQLEditorProps {
    currentTabId: string,
    graphTabId: string,
    nodeId:string
}

interface IButtonItem {
    title:string,
    onClickCallback: (
        graphId:string, 
        nodeId:string, 
        getMonacoValueFunc:()=>string, 
        setMonacoValueFunc:(value:string)=>void
        )=>void|Promise<void>
}

interface ISQLMonacoEditorProps {
    graphId: string,
    nodeId:string, 
    monacoId:string,
    buttonItems: IButtonItem[],
    initMonacoValue: (nodeData:any)=>string
    onMonacoEditorValueChange?: (graphId:string, nodeId:string, newValue:string)=>void
}

const SQLMonacoEditor: React.FC<ISQLMonacoEditorProps> = (props)=>{
    const {
        graphId, 
        nodeId, 
        monacoId, 
        buttonItems=[], 
        initMonacoValue,
        onMonacoEditorValueChange=(graphId:string, nodeId:string, newValue:string)=>{}
    } = props
    const nodeData = getLatestGraphEditorNodeData(graphId, nodeId)
    const sql = initMonacoValue(nodeData)
    const getMonacoValueRef = React.useRef<()=>string>(null)
    const forceSetEditorValueRef = React.useRef<(value:string)=>void>(null)
    const resolveSetEditorValue = (func:(value:string)=>void)=>{
        forceSetEditorValueRef.current = func
    }
    const resolveGetEditorValue = (func:()=>string)=>{
        getMonacoValueRef.current = func
    }
    return (
        <div>
            {   buttonItems.length > 0 &&
                <div className='node-sql-editor-tool'>
                    <Space align='center'>
                        {
                            buttonItems.map(item=>{
                                const onClick = async ()=>{
                                    await item.onClickCallback(graphId, nodeId, getMonacoValueRef.current, forceSetEditorValueRef.current)
                                }
                                return (
                                    <AsyncButton title={item.title} onClick={onClick}/>
                                )
                            })
                        }
                    </Space>
                </div>
            }
            <div className='node-sql-editor-content' style={{top: buttonItems.length>0 ? 60 : 0}}>
                <MonacoEditorCustom
                    value={sql}
                    language='dagsql'
                    monacoModelId={monacoId}
                    onValueChange={newValue=>onMonacoEditorValueChange(graphId, nodeId, newValue)}
                    resolveSetEditorValue={resolveSetEditorValue}
                    resolveGetEditorValue={resolveGetEditorValue}
                />
            </div>
        </div>
    )
}

const getDefaultTreeSelectId = () => {
    return molecule.folderTree.getState().folderTree.data[0].id.toString()
}

export const NodeSQLEditor: React.FC<INodeSQLEditorProps> = (props)=>{
    const {
        graphTabId, 
        nodeId
    } = props
    const [activeKey, setActiveKey] = React.useState<string>('1')
    const {currentTheme} =  useColorThemeServiceModel()
    const nodeData = getLatestGraphEditorNodeData(graphTabId, nodeId)
    const onNodeNameChange = (newName:string)=>{
        const nodeData = getLatestGraphEditorNodeData(graphTabId, nodeId)
        changeGraphNodeDataToFolderTree(graphTabId, nodeId, {...nodeData, label:newName})
    }
    const onTabChange = (key:string)=>{
        setActiveKey(key)
    }

    React.useEffect(()=>{
        setActiveKey('1')
    }, [graphTabId, nodeId])

    const onSqlEditorChange = (graphId:string, nodeId:string, newValue:string)=>{
        const nodeData = getLatestGraphEditorNodeData(graphId, nodeId)
        changeGraphNodeDataToFolderTree(graphId, nodeId, {...nodeData, sql:newValue})
    }

    const onFinalSqlEditorChange = (graphId:string, nodeId:string, newValue:string)=>{
        const nodeData = getLatestGraphEditorNodeData(graphId, nodeId)
        changeGraphNodeDataToFolderTree(graphId, nodeId, {...nodeData, finalSql:newValue})
    }

    const templateButtonItem: IButtonItem = {
        title: '生成SQL模板',
        onClickCallback: async (graphId, nodeId, getFunc, setFunc)=>{
            const templateType = await showSQLTemplateSelectorModal()
            if(!templateType){
                return 
            }
            if(getFunc){
                const monacoValue = getFunc()
                if(monacoValue){
                    const changeConfirm = await showConfirmModal('生成SQL模板', 'SQL模板会覆盖现有内容, 确定?')
                    if(!changeConfirm){
                        return
                    }
                }
            }
            const sql = genNodeSqlTemplateByLatestData(graphId, nodeId, templateType as SQLTemplateType)
            setFunc && setFunc(sql)
        }
    }

    const buildFinalSql: IButtonItem = {
        title: '编译',
        onClickCallback: async (graphId, nodeId, getFunc, setFunc)=>{
            try {
                const startTs = new Date().getTime()
                await compileNodeByLatestData(graphId, nodeId)
                const endTs = new Date().getTime()
                message.success('编译成功')
                sendMessageToOutput('编译成功!')
                setActiveKey('2')
            } catch (error) {
                message.error('编译错误')
                const msg = error.message || ''
                sendMessageToOutput(msg)
            }
            
        }
    }

    // const validateSql: IButtonItem = {
    //     title: '校验SQL',
    //     onClickCallback: async (graphId, nodeId, getFunc, setFunc)=>{
    //         if(!getFunc){
    //             return
    //         }
    //         const sql = getFunc()
    //         await dataWarehouseConfigService.validateSql(sql)
    //     }
    // }

    const saveFinalSql: IButtonItem = {
        title: '保存SQL',
        onClickCallback: async (graphId, nodeId, getFunc, setFunc)=>{
            if(!getFunc){
                return
            }
            const value = getFunc()
            createFileModalService.setState({
                isOpen: true,
                isCreateDir: false,
                presetLanguage: 'sql',
                value: value,
                folderId: getDefaultTreeSelectId(),
                afterOk: (folderNode) =>{
                },
                afterCanceel: ()=>{
                }
            })
        }
    }

    const copySql: IButtonItem = {
        title: '复制',
        onClickCallback: async (graphId, nodeId, getFunc, setFunc)=>{
            if(!getFunc){
                return
            }
            const value = getFunc()
            clipboard.copy(value)
            message.success('已复制到剪切板')
        }
    }

    const downLoadSql: IButtonItem = {
        title: '下载',
        onClickCallback: async (graphId, nodeId, getFunc, setFunc)=>{
            if(!getFunc){
                return
            }
            const nodeData = getLatestGraphEditorNodeData(graphId, nodeId)
            const filename = nodeData.label + '.sql'
            const value = getFunc()
            const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = filename;
            link.click();
            URL.revokeObjectURL(url);
        }
    }

    const formatSql: IButtonItem = {
        title: '格式化',
        onClickCallback: async (graphId, nodeId, getFunc, setFunc)=>{
            if(!getFunc){
                return
            }
            const value = getFunc()
            const formated = formatSQL(value)
            setFunc(formated)
        }
    }

    const tabItems: TabsProps['items'] = [
        {
            key: '1',
            label: 'SQL',
            children: <SQLMonacoEditor
                monacoId={SqlMonacoId(graphTabId, nodeId)}
                graphId={graphTabId}
                nodeId={nodeId}
                buttonItems={[templateButtonItem, buildFinalSql, formatSql]}
                initMonacoValue={(nodeData)=>(nodeData.sql || '')}
                onMonacoEditorValueChange={onSqlEditorChange}
                />
        },
        {
            key: '2',
            label: '编译结果',
            children: <SQLMonacoEditor
                monacoId={FinalSqlMonacoId(graphTabId, nodeId)}
                graphId={graphTabId}
                nodeId={nodeId}
                buttonItems={[saveFinalSql, copySql, downLoadSql]}
                initMonacoValue={(nodeData)=>(nodeData.finalSql || '')}
                onMonacoEditorValueChange={onFinalSqlEditorChange}
            />,
        },
    ]
    const checkNodeNameVaild = (name:string)=>{
        return checkGraphNodeNameValid(graphTabId, nodeId, name)
    }
    return (
        <ConfigProvider
            theme={{
                algorithm: currentTheme.themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
            }}
        >   {
                nodeData && 
                <div className='node-sql-editor'>
                    <EditableTitle 
                        title={nodeData.label} 
                        onTitleChange={onNodeNameChange} 
                        tooltip='修改节点名称'
                        checkValid={checkNodeNameVaild}
                    />
                    <Tabs className='node-code-editor-main-tabs' activeKey={activeKey} items={tabItems} onChange={onTabChange}/>
                </div>

            }
            {
                !nodeData &&
                <div>该节点不存在</div>
            }
        </ConfigProvider>
    )   
}

export default NodeSQLEditor