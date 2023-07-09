import {TreeSelect, Modal, Input, Space, Alert, Select} from 'antd'
import molecule from '@dtinsight/molecule'
import { IFolderTreeNodeProps } from '@dtinsight/molecule/esm/model'
import React from 'react'
import {ILanguageName, getFileSuffixByLanguage, Deferred, genUniqId} from '@/common'
import {getFileIconByLanguage} from '@/globalServices'

interface IFilePathSelectorProps {
    folderId: string;
    title: string;
    isDir: boolean;
    presetLanguage?: ILanguageName
}

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
    if(folderTreeNode.isLeaf===true){
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

const checkFileNameValid = (folderId:string, name:string, suffix:string, isDir=false)=>{
    if(!name) return '文件/目录名不能为空!'
    if(name.trim() === '') return '文件/目录名不能为空!'
    const folder = molecule.folderTree.get(folderId)
    if(folder.children && folder.children.length>0){
        for(let child of folder.children){
            if(child.name === name + (isDir ? '' :suffix)){
                return '同目录下已经存在该名称的文件/目录, 请选择其他名称!'
            }
        }
    }
    return null 
}

class ModalCache {
    static folderNode: IFolderTreeNodeProps | null;
    static parentNodeId: string | null
}

interface IModalContentProps {
    folderId: string,
    isDir:boolean,
    presetLanguage?: ILanguageName
}

const getInitFolderId = (folderid:string) =>{
    const node = molecule.folderTree.get(folderid)
    if(!node){
        return molecule.folderTree.getState().folderTree.data[0].id.toString()
    }
    if(node.fileType === 'File'){
        const parentNode = molecule.folderTree.getParentNode(folderid)
        return parentNode.id.toString()
    }
    else {
        return folderid
    }
}

const ModalContent: React.FC<IModalContentProps> = (props) =>{
    const {folderId, isDir, presetLanguage} = props 
    const [selectFolderId, setSelectFolderId] = React.useState<string>(getInitFolderId(folderId));
    const [name, setName] = React.useState<string>('');
    const [inputStatus, setInputStatus] = React.useState<''|'error'|'warning'>('');
    const [inputAlertMessage, setInputAlertMessage] = React.useState<string>('');
    const [language, setLanguage] = React.useState<ILanguageName>('sqlgraph');
    const getTreeData = ()=>{
        const folderTreeState = molecule.folderTree.getState()
        return constructTreeDataFromFolderTree(folderTreeState.folderTree.data[0])
    }
    const onSelectorChange = (newValue:string)=>{
        setSelectFolderId(newValue)
    }
    const onNameChange = (e: any)=>{
        setName(e.target.value)
    }
    const onLanguageSelect = (newValue:string)=>{
        setLanguage(newValue as ILanguageName)
    }
    const constructFolderNode = ()=>{
        if(checkFileNameValid(selectFolderId, name, getFileSuffixByLanguage(language), isDir)){
            return null
        }
        const newId = genUniqId()
        const nodeValue = language === 'sqlgraph' ? JSON.stringify({nodes:[], edges:[]}) : ''
        const nodeIcon = isDir ? null : getFileIconByLanguage(language)
        const newNode: molecule.model.IFolderTreeNodeProps = {
            id: newId,
            name: name +  (isDir ? '' : getFileSuffixByLanguage(language)),
            fileType: isDir ? 'Folder': 'File',
            isLeaf: isDir ? false : true,
            data: { language: language, value: nodeValue},
            isEditable: false,
            isOnCreate: false,
            icon: nodeIcon
        }
        return newNode
    }
    // set language
    React.useEffect(()=>{
        if(presetLanguage){
            setLanguage(presetLanguage)
        }
    }, [presetLanguage])

    // init select folderid
    React.useEffect(()=>{
        setSelectFolderId(getInitFolderId(folderId))
    }, [folderId])
    // save most new value
    React.useEffect(()=>{
        const folderNode = constructFolderNode()
        ModalCache.folderNode = folderNode
        ModalCache.parentNodeId = selectFolderId
    }, [selectFolderId, language, name, constructFolderNode])
    // change alert message on name change
    React.useEffect(()=>{
        const alertMessage =  checkFileNameValid(selectFolderId, name, getFileSuffixByLanguage(language), isDir)
        if(alertMessage){
            setInputStatus('error')
            setInputAlertMessage(alertMessage)
        }
        else{
            setInputStatus('')
            setInputAlertMessage('')
        }
    }, [name, selectFolderId, language, isDir])
    const inputPlaceHolder = isDir ? '在此输入目录名称:' : '在此输入文件名称:'
    return (
        <div className='file-selector-modal-content'>
            <Space direction={'vertical'}>
                {
                    !isDir &&
                    <Select
                        disabled={presetLanguage ? true : false}
                        defaultValue={presetLanguage ? presetLanguage : "sqlgraph"}
                        style={{ width: 120 }}
                        onChange={onLanguageSelect}
                        options={[
                            {
                                value: 'sqlgraph',
                                label: 'SQL画布',
                            },
                            {
                                value: 'sql',
                                label: 'SQL文件',
                            },
                        ]}
                    />
                }
                <TreeSelect
                    style={{ width: '100%' }}
                    value={selectFolderId}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={[getTreeData()]}
                    placeholder="请选择文件夹"
                    treeDefaultExpandAll
                    onChange={onSelectorChange}
                    treeNodeLabelProp='path'
                />
                <Input 
                    addonAfter={isDir ? null :getFileSuffixByLanguage(language)} 
                    allowClear
                    placeholder={inputPlaceHolder}
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

export interface IFilePathModalReturnType {
    folderNode: IFolderTreeNodeProps | null,
    parentNodeId: string | null 
}

export const showFilePathSelectorModalOnCreate = (filePathSelectProps: IFilePathSelectorProps)=>{
    const {title, folderId, isDir, presetLanguage} = filePathSelectProps
    const container = createFileSelectorContainer()
    const defer = new Deferred<IFilePathModalReturnType>()
    const onHide = () => {
        modal.destroy()
        ModalCache.folderNode = null
        ModalCache.parentNodeId = null
        container.destroy()
    }
    const onOk = async () => {
        const { folderNode, parentNodeId } = ModalCache
        try {
            modal.update({ okButtonProps: { loading: true } })
            if(!folderNode){
                defer.resolve({folderNode:null, parentNodeId:null})
                onHide()
                return 
            } 
            defer.resolve({folderNode, parentNodeId})
            onHide()
        } catch (error) {
            console.error(error)
            modal.update({ okButtonProps: { loading: false } })
        }
    }
    const modal = Modal.confirm({
        title: title,
        content: <ModalContent folderId={folderId} isDir={isDir} presetLanguage={presetLanguage}/>,
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
            defer.resolve({folderNode:null, parentNodeId:null})
        },
        afterClose: () => {
            onHide()
        },
    })
    return defer.promise
}