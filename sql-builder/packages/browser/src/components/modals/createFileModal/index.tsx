import React from 'react'
import {Form, Input, Modal, ConfigProvider, theme, Select, TreeSelect} from 'antd';
import molecule from '@dtinsight/molecule'
import type { IFolderTreeNodeProps } from '@dtinsight/molecule/esm/model'
import {
    useColorThemeServiceModel,
    useCreateFileModalModel,
    getCreateFileModalService,
    getFolderTreeService,
    getFileIconByLanguage
} from '@/globalServices'
import {getFileSuffixByLanguage, genUniqId} from '@/common'

const folderTreeService = getFolderTreeService()

interface IProps {
}

interface ITreeData {
    title: string,
    value:string,
    path:string,
    selectable: boolean,
    isLeaf: boolean,
    disabled: boolean,
    children?: ITreeData[]
}

interface IFormValue {
    fileType: string
    fileName: string, 
    parentNodeId:string
}

const createFileModalService = getCreateFileModalService()

const getInitFolderId = (folderid:string) =>{
    const node = molecule.folderTree.get(folderid)
    if(!node){
        const state = molecule.folderTree.getState()
        if(state?.folderTree?.data && state.folderTree.data.length > 0){
            return molecule.folderTree.getState().folderTree.data[0].id.toString()
        }
        else{
            return ''
        }
    }
    if(node.fileType === 'File'){
        const parentNode = molecule.folderTree.getParentNode(folderid)
        return parentNode.id.toString()
    }
    else {
        return folderid
    }
}

const constructTreeDataFromFolderTree = (folderTreeNode: IFolderTreeNodeProps) =>{
    // if(folderTreeNode.isLeaf===true){
    //     return null
    // }
    const selectable = folderTreeNode.isLeaf ? false : true
    const disabled = folderTreeNode.isLeaf ? true : false
    let result: ITreeData = {
        title: folderTreeNode.name,
        path: folderTreeNode.location,
        value: folderTreeNode.id.toString(),
        selectable: selectable,
        isLeaf: folderTreeNode.isLeaf,
        disabled: disabled

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

const getTreeData = ()=>{
    const folderTreeState = molecule.folderTree.getState()
    if(folderTreeState?.folderTree?.data && folderTreeState.folderTree.data.length>0){
        return constructTreeDataFromFolderTree(folderTreeState.folderTree.data[0])
    }
    else {
        return null
    }
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

export const CreateFileModal: React.FC<IProps> = (props)=>{
    const {currentTheme} =  useColorThemeServiceModel()
    const [form] = Form.useForm<IFormValue>()
    const {isOpen, isCreateDir, presetLanguage, folderId, value, afterOk, afterCanceel} = useCreateFileModalModel()
    const [selectFolderId, setSelectFolderId] = React.useState<string>(getInitFolderId(folderId));
    const [language, setLanguage] = React.useState<string>(presetLanguage || 'sqlgraph');
    const title = isCreateDir ? '新建目录' : '新建文件'
    const constructFolderNode = (name:string)=>{
        if(checkFileNameValid(selectFolderId, name, getFileSuffixByLanguage(language), isCreateDir)){
            return null
        }
        const newId = genUniqId()
        let nodeValue = value 
        if(!nodeValue){
            nodeValue = language === 'sqlgraph' ? JSON.stringify({nodes:[], edges:[]}) : ''
        }
        const nodeIcon = isCreateDir ? null : getFileIconByLanguage(language)
        const newNode: molecule.model.IFolderTreeNodeProps = {
            id: newId,
            name: name +  (isCreateDir ? '' : getFileSuffixByLanguage(language)),
            fileType: isCreateDir ? 'Folder': 'File',
            isLeaf: isCreateDir ? false : true,
            data: { language: language, value: nodeValue},
            isEditable: false,
            isOnCreate: false,
            icon: nodeIcon
        }
        return newNode
    }
    const onLanguageSelect = (newValue:string)=>{
        setLanguage(newValue)
    }
    const handleOk = async () => {
        try {
            await form.validateFields()
            const values = form.getFieldsValue()
            if(values && values.fileName && values.parentNodeId){
                const folderNode = constructFolderNode(values.fileName)
                folderTreeService.addFolderTreeNode(folderNode, values.parentNodeId)
                afterOk(folderNode)
            }
        } catch (error) {
            console.error(error)
            afterOk(null)
        }
        createFileModalService.reset()
    }

    const handleCancel = ()=>{
        afterCanceel()
        createFileModalService.reset()
    }

    const onSelectorChange = (newValue:string)=>{
        setSelectFolderId(newValue)
    }

    React.useEffect(()=>{
        form.setFieldsValue({fileName: ''})
    },[isOpen, language, selectFolderId])

    React.useEffect(()=>{
        const lang = presetLanguage || 'sqlgraph'
        form.setFieldsValue({fileType: lang})
        setLanguage(lang)
    }, [isOpen, presetLanguage])

    React.useEffect(()=>{
        const parentNodeId = getInitFolderId(folderId)
        form.setFieldsValue({parentNodeId: parentNodeId})
        setSelectFolderId(parentNodeId)
    }, [folderId])
    return (
        <div>
            <ConfigProvider
                theme={{
                    algorithm: currentTheme.themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
                }}
            >
                <Modal title={title} open={isOpen} onOk={handleOk} onCancel={handleCancel} width={700}>
                    <Form form={form} layout='vertical'>
                        {
                            !isCreateDir &&
                            <Form.Item
                                name="fileType"
                                label="文件类型"
                                initialValue={presetLanguage ? presetLanguage : "sqlgraph"}
                            >
                                <Select
                                    disabled={presetLanguage ? true : false}
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
                            </Form.Item>
                        }
                        <Form.Item
                            name="parentNodeId"
                            label={ isCreateDir ? "上级目录" : "目录"}
                            initialValue={selectFolderId}
                        >
                            <TreeSelect
                                dropdownStyle={{maxHeight: 1000, overflow: 'auto' }}
                                treeData={[getTreeData()]}
                                placeholder="请选择目录"
                                treeDefaultExpandAll
                                treeNodeLabelProp='path'
                                onChange={onSelectorChange}
                                treeLine={{showLeafIcon: true}}
                            />
                        </Form.Item>
                        <Form.Item
                            name="fileName"
                            label={isCreateDir ? '目录名称' : '文件名称'}
                            initialValue={''}
                            rules={[
                                { required: true, message:'文件或目录名称不能为空'},
                                ()=>({
                                    validator(_, value) {
                                        const errorMessage = checkFileNameValid(
                                            selectFolderId, 
                                            value, 
                                            getFileSuffixByLanguage(language),
                                            isCreateDir
                                        )
                                        if (!errorMessage) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error(errorMessage));
                                    },
                                })
                            ]}
                        >
                            <Input 
                                addonAfter={isCreateDir ? null : getFileSuffixByLanguage(language)} 
                                allowClear
                                placeholder={isCreateDir ? '请输入目录名称' : '请输入文件名称'}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </ConfigProvider>
        </div>
    )
}