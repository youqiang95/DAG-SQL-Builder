import React from 'react'
import {Form, Input, Modal, Select, Spin, Space, Button, Tree, ConfigProvider, theme, Table} from 'antd';
import {DatabaseOutlined, TableOutlined} from '@ant-design/icons'
import type { DataNode } from 'antd/es/tree';
import {getDataWarehouseConfigservice} from '@/globalServices'
import {useColorThemeServiceModel} from '@/globalServices/colorThemeService'
import {genUniqId} from '@/common'
import './index.less'

const dataWarehouseService = getDataWarehouseConfigservice()
const { Search } = Input;

interface IProps {
    isModalOpen: boolean,
    onCloseModal: ()=>void,
    onSubmit: (values:IDataSourceSelectItem[])=>void
}

interface ITableColumn {
    name:string,
    type:string,
    is_partition: boolean
}

interface IDataSourceSelectItem {
    name:string,
    refName:string,
    type: string,
    columns: ITableColumn[]
}

const constructTableTreeData = (table:any)=>{
    let tableTreeData = {key: genUniqId(), title: table.name}
    // no leaf
    if(table.children !== undefined){
        tableTreeData['selectable'] = false
        tableTreeData['checkable'] = false
        tableTreeData['type'] = 'schema'
        let childs = []
        for(let child of table.children){
            childs.push(constructTableTreeData(child))
        }
        tableTreeData['children'] = childs
    }
    // leaf
    else {
        tableTreeData['selectable'] = true
        tableTreeData['checkable'] = true
        tableTreeData['type'] = table.is_view ? '视图' : '表'
        tableTreeData['is_view'] = table.is_view
        tableTreeData['columns'] =  table.columns 
        tableTreeData['refName'] = table.ref_name 
        tableTreeData['name'] = table.name 
    }
    return tableTreeData
}

export const constructTreeData = (tables:any[])=>{
    let treeData: DataNode[] = []
    for(let table of tables){
        treeData.push(constructTableTreeData(table))
    }
    return treeData
}

const findTreeDataById = (tree:any, idList:string[])=>{
    if(idList.includes(tree.key)){
        return [tree]
    }
    if(tree.children){
        let founds = []
        for(const child of tree.children){
            const foundList = findTreeDataById(child, idList)
            if(foundList && foundList.length>0){
                founds = [...founds, ...foundList]
            }
        }
        return founds
    }
    return []
}

const findTrees = (data: any[], idList: string[])=>{
    let result = []
    for(const tree of data){
        const trees = findTreeDataById(tree, idList)
        result = [...result, ...trees]
    }
    return result
}

export const DataSourceModal: React.FC<IProps> = (props)=>{
    const {currentTheme} =  useColorThemeServiceModel()
    const [data, setData] = React.useState([])
    const {onCloseModal, onSubmit, isModalOpen} = props
    const [loading, setLoading] = React.useState(false);
    const [checkKeys, setCheckKeys] = React.useState([]);
    const onCheckChange = (checkedKeysValue) => {
        setCheckKeys(checkedKeysValue);
    };
    const handleOk = async () => {
        const checkTrees = findTrees(data, checkKeys)
        const value = checkTrees.map((item)=>{
            return {
                name: item.name,
                columns: item.columns,
                type: item.type,
                refName: item.refName
            }
        })
        onSubmit(value)
    };
    const handleCancel = () => {
        onCloseModal();
    };
    const fetchOptions = async ()=>{
        setLoading(true);
        const tables = await dataWarehouseService.fetchTableList()
        const data = constructTreeData(tables)
        setData(data)
        setLoading(false);
    }
    React.useEffect(()=>{
        isModalOpen && fetchOptions()
    }, [isModalOpen])

    const onSearch = (e) => {
        const filterData = data.filter((row)=>{
            return row.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        // setTableData(filterData)
    };

    const renderIcon = ({data})=>{
        if(data  && data.children !== undefined){
            return <DatabaseOutlined className='dataSourceModalTreeIcon'/>
        }
        else {
            return <TableOutlined className='dataSourceModalTreeIcon'/>
        }
    }
    return (
        <ConfigProvider
            theme={{
                algorithm: currentTheme.themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
            }}
        >
            <Modal 
                title="选择数据源表" 
                open={isModalOpen} 
                onOk={handleOk} 
                onCancel={handleCancel} 
                width={1000}
                okText='确定'
                cancelText='取消'
            >
                {
                    loading &&
                    <Spin tip="加载数据源中..." size="large" />
                }
                {
                    !loading &&
                    <div>
                        {/* <Search placeholder="Search" allowClear  onChange={onSearch} />
                        <Table rowSelection={rowSelection} columns={columns} dataSource={tableData} /> */}
                        <Tree 
                            checkable
                            showIcon	
                            treeData={data}
                            checkedKeys={checkKeys}
                            onCheck={onCheckChange}
                            height={600}
                            icon={renderIcon}
                        />
                    </div>
                }
            </Modal>
        </ConfigProvider>
    )
}