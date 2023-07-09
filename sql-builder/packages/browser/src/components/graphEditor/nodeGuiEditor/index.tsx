import React from 'react'
import { Pane, SplitPane } from '@dtinsight/molecule/esm/components';
import { Tabs, ConfigProvider, theme} from 'antd';
import type { TabsProps } from 'antd';
import {EditableColumnsTable} from './editableTable'
import {MonacoEditorCustom} from '@/components/monaco'
import {EditableTitle} from '@/components/editableTitle'
import {
    getLatestGraphEditorNodeData, 
    changeGraphNodeDataToFolderTree,
    checkGraphNodeNameValid
} from '@/globalServices'
import {useColorThemeServiceModel} from '@/globalServices/colorThemeService'
import FinalSQLEditor from '../finalSQLEditor'
import {SqlMonacoId, FinalSqlMonacoId, FromEditorId} from '@/common'
import './index.less'

interface IColumn {
    key: string;
    columnName: string;
    transform: string | null;
    source: string
}

interface IProps {
    currentTabId:string,
    graphId:string,
    nodeId:string
}

export const NodeGuiEditor: React.FC<IProps> = (props)=>{
    const {currentTheme} =  useColorThemeServiceModel()
    const {graphId, nodeId} = props

    const nodeData = getLatestGraphEditorNodeData(graphId, nodeId)
    const columns = nodeData.columns ? nodeData.columns : []
    const fromSql = nodeData.fromSql ? nodeData.fromSql : ''
    const onTabChange = (key:string)=>{
    }
    const onNodeNameChange = (newName:string)=>{
        const nodeData = getLatestGraphEditorNodeData(graphId, nodeId)
        changeGraphNodeDataToFolderTree(graphId, nodeId, {...nodeData, label:newName})
    }
    const onColumnsChange = (newColumns: IColumn[])=>{
        const nodeData = getLatestGraphEditorNodeData(graphId, nodeId)
        changeGraphNodeDataToFolderTree(graphId, nodeId, {...nodeData, columns:newColumns})
    }
    const onFromSqlChange = (newSql:string)=>{
        const nodeData = getLatestGraphEditorNodeData(graphId, nodeId)
        changeGraphNodeDataToFolderTree(graphId, nodeId, {...nodeData, fromSql:newSql})
    }

    const tabItems: TabsProps['items'] = [
        {
            key: '1',
            label: '输出列',
            children: <EditableColumnsTable 
                            dataSource={columns}
                            onDataSourceChange={onColumnsChange}
                        />,
          },
          {
            key: '2',
            label: '来源',
            children: <MonacoEditorCustom
                value={fromSql}
                language={'sql'}
                monacoModelId={FromEditorId(graphId, nodeId)}
                onValueChange={onFromSqlChange}
                />,
          },
          {
            key: '3',
            label: 'SQL',
            children: <MonacoEditorCustom
                value={''}
                language={'sql'}
                monacoModelId={SqlMonacoId(graphId, nodeId)}
                onValueChange={(newValue: string)=>{}}
                />,
          },
          {
            key: '4',
            label: '最终SQL',
            children: <FinalSQLEditor
                monacoId={FinalSqlMonacoId(graphId, nodeId)}
                graphId={graphId}
                nodeId={nodeId}
                />,
          },
    ]
    const checkNodeNameVaild = (name:string)=>{
        return checkGraphNodeNameValid(graphId, nodeId, name)
    }
    return (
        <ConfigProvider
            theme={{
                algorithm: currentTheme.themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
            }}
        >
            <div className='node-gui-editor'>
                <SplitPane
                    sizes={['100%', 'auto']}
                    split="vertical"
                    allowResize={[false, true]}
                    onChange={(sizes:number[])=>{}}
                >
                    <Pane className='node-gui-editor-main' minSize='40%' maxSize="80%">
                        <EditableTitle 
                            title={nodeData.label} 
                            onTitleChange={onNodeNameChange} 
                            tooltip='修改节点名称'
                            checkValid={checkNodeNameVaild}
                        />
                        <Tabs className='node-gui-editor-main-tabs' defaultActiveKey="1" items={tabItems} onChange={onTabChange}/>
                    </Pane>
                    <Pane className='node-gui-editor-right' style={{background: '#f1f3f4'}}>
                            {'right'}
                    </Pane>
                </SplitPane>
            </div>
        </ConfigProvider>
    )
}

