import { TreeSelect, Modal, Input, Space, Alert} from 'antd'
import molecule from '@dtinsight/molecule'
import { IFolderTreeNodeProps } from '@dtinsight/molecule/esm/model'
import React from 'react'
import {Deferred} from '@/common'

interface ITreeData {
    title: string,
    value:string,
    path:string,
    children?: ITreeData[]
}

const createFileSelectorContainer = () => {
    const div = document.createElement('div')
    div.classList.add('file-selector-container')
    window.document.body.append(div)
    return {
        element: div,
        destroy: () => {
            window.document.body.removeChild(div)
        },
    }
}

const constructTreeDataFromFolderTree = (folderTreeNode: IFolderTreeNodeProps) =>{
    if(folderTreeNode.isLeaf && folderTreeNode.data.language !== 'sql'){
        return null
    }
    let result: ITreeData = {
        title: folderTreeNode.name,
        path: folderTreeNode.location,
        value: folderTreeNode.id.toString()
    }
    let childrenResult = []
    if(folderTreeNode.children && folderTreeNode.children.length>0){
        for(let child of folderTreeNode.children){
            const childRes = constructTreeDataFromFolderTree(child)
            childRes && childrenResult.push(childRes)
        }
    }
    if(childrenResult.length>0){
        result.children = childrenResult
    } 
    return result
}

class ModalCache {
    static selectSqlValue: string;
    static sqlNodeName:string

}

interface ISQLFilePathModalReturnType {
    selectSqlValue: string | null,
    sqlNodeName: string | null 
}

interface ModalContentProps {
    checkNodeNameValid: (name:string)=>string
}
const ModalContent: React.FC<ModalContentProps> = (props) =>{
    const {checkNodeNameValid} = props
    const [selectFolderId, setSelectFolderId] = React.useState<string | null>(null);
    const [name, setName] = React.useState<string>('');
    const [inputStatus, setInputStatus] = React.useState<''|'error'|'warning'>('');
    const [inputAlertMessage, setInputAlertMessage] = React.useState<string>('');
    const getTreeData = ()=>{
        const folderTreeState = molecule.folderTree.getState()
        return constructTreeDataFromFolderTree(folderTreeState.folderTree.data[0])
    }
    const getFolderTreeValue = () => {
        if(selectFolderId){
            const node = molecule.folderTree.get(selectFolderId)
            if(node && node.data && node.data.value){
                return node.data.value
            }
            else {
                return ''
            }
        }
    }
    const onSelectorChange = (newValue:string)=>{
        setSelectFolderId(newValue)
    }
    const onNameChange = (e: any)=>{
        setName(e.target.value)
    }
    // save most new value
    React.useEffect(()=>{
        if(checkNodeNameValid(name) === null){
            ModalCache.selectSqlValue = getFolderTreeValue()
            ModalCache.sqlNodeName = name
        }
        else {
            ModalCache.selectSqlValue = null
            ModalCache.sqlNodeName = null
        }
        
    }, [selectFolderId, name, checkNodeNameValid])
    // change alert message on name change
    React.useEffect(()=>{
        const alertMessage =  checkNodeNameValid(name)
        if(alertMessage){
            setInputStatus('error')
            setInputAlertMessage(alertMessage)
        }
        else{
            setInputStatus('')
            setInputAlertMessage('')
        }
    }, [name, checkNodeNameValid])
    return (
        <div className='file-selector-modal-content'>
            <Space direction={'vertical'}>
                <TreeSelect
                    style={{ width: '100%' }}
                    value={selectFolderId}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={[getTreeData()]}
                    placeholder="请选择要导入的SQL文件"
                    treeDefaultExpandAll
                    onChange={onSelectorChange}
                    treeNodeLabelProp='path'
                />
                <Input 
                    allowClear
                    placeholder='在此输入新节点名称'
                    onChange={onNameChange}
                    status={inputStatus}
                    value={name}
                />
                {
                    (inputStatus !== '' && inputAlertMessage !== '') &&
                    <Alert
                        message={inputAlertMessage}
                        type="error"
                    />
                }
            </Space>
        </div>
    )
}

export const showFilePathSelectorOnImportSQL = (checkNodeNameValid: ModalContentProps['checkNodeNameValid'])=>{
    const container = createFileSelectorContainer()
    const defer = new Deferred<ISQLFilePathModalReturnType>()
    const onHide = () => {
        modal.destroy()
        ModalCache.sqlNodeName = null
        ModalCache.selectSqlValue = null
        container.destroy()
    }
    const onOk = async () => {
        const { sqlNodeName, selectSqlValue } = ModalCache
        try {
            modal.update({ okButtonProps: { loading: true } })
            if(!sqlNodeName){
                defer.resolve({sqlNodeName:null, selectSqlValue:null})
                onHide()
                return 
            } 
            defer.resolve({sqlNodeName, selectSqlValue})
            onHide()
        } catch (error) {
            console.error(error)
            modal.update({ okButtonProps: { loading: false } })
        }
    }
    const modal = Modal.confirm({
        title: '导入SQL文件作为新节点',
        content: <ModalContent checkNodeNameValid={checkNodeNameValid}/>,
        okText: '确定',
        cancelText: '取消',
        getContainer: () => {
            return container.element
        },
        okButtonProps: {
            onClick: e => {
            e.stopPropagation()
            onOk()
            },
        },
        onCancel: () => {
            onHide()
        },
        afterClose: () => {
            onHide()
        },
    })
    return defer.promise
}