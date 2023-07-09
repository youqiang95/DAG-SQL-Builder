import React from 'react'
import { Table, ConfigProvider, theme} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {genUniqId} from '@/common'
import type {SQLColumn} from '@/common/interface'
import {useColorThemeServiceModel} from '@/globalServices/colorThemeService'

interface DataType {
    key: React.Key,
    [columnName:string]: any
}

interface ISQLColumnPreviewProps {
    columns: SQLColumn[],
    message?: string
}

const ColumnWidth = 100
const constructTableColumns = (columns:SQLColumn[])=>{
    let tableColumns: ColumnsType<DataType> = []
    if(!columns){
        return tableColumns
    }
    for(let column of columns){
        tableColumns.push({
            title: column.name,
            dataIndex: column.name,
            key: genUniqId(),
            width: ColumnWidth
        })
    }
    return tableColumns
}

const constructTableData = (columns:SQLColumn[])=>{
    let data: DataType[] = []
    if(!columns){
        return data
    }
    let row = {key: genUniqId()}
    for(let column of columns){
        row[column.name] = column.name
    }
    data.push(row)
    return data
}

const SQLColumnsPreview: React.FC<ISQLColumnPreviewProps> = (props)=>{
    const {currentTheme} =  useColorThemeServiceModel()
    if(props.message){
        return <div>{props.message}</div>
    }
    if(!(props.columns && props.columns.length>0)){
        return <div>无法解析出该节点的输出字段</div>
    }
    return (
        <ConfigProvider
            theme={{
                algorithm: currentTheme.themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
            }}
        >
            <Table
                columns={constructTableColumns(props.columns)}
                dataSource={constructTableData(props.columns)}
                scroll={{ x: ColumnWidth* props.columns.length}}
                pagination={false}
                size={'large'}
                showHeader={false}
                bordered={true}
            />
        </ConfigProvider>
    )
}
export default SQLColumnsPreview
