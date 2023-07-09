import React from 'react'
import { Table, ConfigProvider, theme} from 'antd'
import {EditableTitle} from '@/components/editableTitle'
import {useColorThemeServiceModel} from '@/globalServices/colorThemeService'
import {
    getLatestGraphEditorNodeData, 
    changeGraphNodeDataToFolderTree,
    checkGraphNodeNameValid
} from '@/globalServices'
import {genUniqId} from '@/common'
import './index.less'

interface IProps {
    currentTabId:string,
    graphId:string,
    nodeId:string
}

const columns = [
    {
      title: '列名',
      dataIndex: 'columnName',
      key: 'columnName',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
        title: '是否为分区字段',
        dataIndex: 'isPartition',
        key: 'isPartition',
    }
];

const constructTableData = (nodeData: any)=>{
    let data = []
    if(!(nodeData.columns !== undefined)){
        return data
    }
    for(let column of nodeData.columns){
        if(!(column.name !== undefined && column.type !== undefined && column.is_partition !== undefined)){
            continue
        }
        data.push({
            key: genUniqId(),
            columnName: column.name,
            type: column.type,
            isPartition: column.is_partition ? '是' : '否'
        })
    }
    return data
}

export const NodeSourceEditor: React.FC<IProps> = (props)=>{
    const {graphId, nodeId} = props
    const nodeData = getLatestGraphEditorNodeData(graphId, nodeId)
    const tableData = constructTableData(nodeData)
    const {currentTheme} =  useColorThemeServiceModel()
    const onNodeNameChange = (newName:string)=>{
        const nodeData = getLatestGraphEditorNodeData(graphId, nodeId)
        changeGraphNodeDataToFolderTree(graphId, nodeId, {...nodeData, label:newName})
    }
    const checkNodeNameVaild = (name:string)=>{
        return checkGraphNodeNameValid(graphId, nodeId, name)
    }
    return (
        <ConfigProvider
            theme={{
                algorithm: currentTheme.themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
            }}
        >
            <div className='node-source-editor'>
                <EditableTitle 
                    title={nodeData.label} 
                    onTitleChange={onNodeNameChange} 
                    tooltip='修改节点名称'
                    checkValid={checkNodeNameVaild}
                />
                <Table columns={columns} dataSource={tableData} pagination={false}/>
            </div>
        </ConfigProvider>
    )
}