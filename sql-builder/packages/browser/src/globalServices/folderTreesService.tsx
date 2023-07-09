import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import molecule from '@dtinsight/molecule'
import {sendPOSTRequest} from '../api'
import {EasySQLLoginLocation, updateFileAntiSharkService, ILanguageName, genUniqId} from '../common'
import { IEditorTab, IFolderTreeNodeProps } from '@dtinsight/molecule/esm/model'
import {message} from 'antd'
import {GlobalUserService} from './userService'
import cloneDeep from 'lodash/cloneDeep'
import {getErrorPageStatusService} from './errorPageServices'

const genRelativePath = (absPath:string) => {
    return absPath.split('/').slice(1).join('/')
}

export const getFileIconByLanguage = (language: string) =>{
    if(language === 'sqlgraph'){
        return <span className="folder-file-icon codicon codicon-source-control"></span>
    }
    else {
        return <span className="folder-file-icon codicon codicon-code"></span>
    }
}

export const addIconToFolderTree = (folderTree: IFolderTreeNodeProps): IFolderTreeNodeProps =>{
    // file
    if(folderTree.isLeaf){
        const language = (folderTree.data && folderTree.data.language) ? folderTree.data.language : 'sql'
        return {
            ...folderTree,
            icon: getFileIconByLanguage(language)
        }
    }
    // folder
    else {
        return {
            ...folderTree,
            children: folderTree.children.map((child)=>{
                return addIconToFolderTree(child)
            })
        }
    }
}

export const onCreateFileOrDir = async (path:string, value:string, isDir:boolean)=>{
    sendPOSTRequest('/api/onCreateDirOrFile', {
        path: genRelativePath(path),
        is_dir: isDir,
        value: value
    })
    return {}
}

export const getFileExplorerData = async () =>{
    const userService = container.resolve(GlobalUserService)
    const {uid} = await userService.getUserInfo()
    if(uid === null){
        return {err: 'user is null'} 
    }
    const ret = await sendPOSTRequest('/api/get_folder_data/', {uid})
    if(ret.err && ret.err === 'no_login'){
        window.location.href = EasySQLLoginLocation + '?from=EasySQL'
    }
    return ret
}

const isHiddenFile = (file: IFolderTreeNodeProps) =>{
    return !!file.name?.startsWith('.');
}

const sortTree = (tree: IFolderTreeNodeProps[]) =>{
    tree.sort((pre, cur) => {
        // folder before file
        if (pre.isLeaf !== cur.isLeaf) {
            return pre.isLeaf! > cur.isLeaf! ? 1 : -1;
        }

        // in general, both have name
        if (pre.name && cur.name) {
            const isHiddenFilePre = Number(isHiddenFile(pre));
            const isHiddenFileCur = Number(isHiddenFile(cur));
            // one is hidden file and another is not
            if (isHiddenFilePre ^ isHiddenFileCur) {
                return isHiddenFilePre ? -1 : 1;
            }
            // both are hidden files
            if (isHiddenFilePre & isHiddenFilePre) {
                // hidden file
                return pre.name
                    .substring(1)
                    .localeCompare(cur.name.substring(1));
            }
            return pre.name.localeCompare(cur.name!);
        }

        // the node which is creating would without name
        return pre.isEditable ? -1 : 1;
    });

    tree.forEach((treeNode) => sortTree(treeNode.children || []));
}

export const updateEditorAfterFolderTreeChange = ()=>{
    const editorState = molecule.editor.getState()
    for(let group of editorState.groups){
        // const groupId = group.id 
        for(let tab of group.data){
            let newTab = {...tab} as IEditorTab
            // skip some editor which no related folderTree
            if(newTab.data && newTab.data.skipFolderTreeCheck !== undefined && newTab.data.skipFolderTreeCheck){
                continue
            }
            const folderNode = molecule.folderTree.get(tab.id.toString())
            if(!folderNode){
                molecule.editor.closeTab(newTab.id, group.id)
                continue
            }
            else {
                newTab.breadcrumb = folderNode.location.split('/').map((local: string) => ({ id: local, name: local }))
                newTab.data = {
                    ...newTab.data,
                    path: folderNode.location,
                }
                newTab.name = folderNode.name 

            }
            molecule.editor.updateTab(newTab)
        }
    }
}

export const onRemoveFileOrDir = async (path:string) =>{
    sendPOSTRequest('/api/onRemoveDirOrFile', {
        path: genRelativePath(path)

    })
    return {}
}

export interface IFileDataType {
    path: string;
    value: string
}

export const onUpdateFileData = async (fileData: IFileDataType) => {
    const {path, value} = fileData
    sendPOSTRequest('/api/onUpdateFile', {
        path: genRelativePath(path),
        value
    })
    return {}
}

export const onRename = async (oldPath: string, newPath:string) => {
    sendPOSTRequest('/api/onMoveDirOrFile', {
        old_path: genRelativePath(oldPath),
        new_path: genRelativePath(newPath)
    })
    return  {}
}

export const adjustChildFolderTreeNodeLocation = (node: IFolderTreeNodeProps, preLocation:string=null)=>{
    if(preLocation !== null){
        node.location = preLocation + node.name
    }
    if(node.children){
        let childRes = []
        for(let child of node.children){
            childRes.push(adjustChildFolderTreeNodeLocation(child, node.location + '/'))
        }
        if(childRes.length > 0){
            node.children = childRes
        }
    }
    return node
}

export interface IFolderTreeService {
    addFolderTreeNode: (node: IFolderTreeNodeProps, parentNodeId:string)=>Promise<void>
    removeFolderTreeNode: (node: IFolderTreeNodeProps)=>Promise<void>
    updateFolderTreeNodeValueOnEditorChange: (tabId:string, newValue: string)=>Promise<boolean>
    renameFolderTreeNode: (node: IFolderTreeNodeProps, newName:string)=>Promise<void>
    reloadFolderTreeDataFromServer: ()=>Promise<void>
}

@singleton()
export class FolderTreeService
    implements IFolderTreeService 
{
    reloadFolderTreeDataFromServer = async ()=>{
        const folderTreeDataApi = await getFileExplorerData()
        if(folderTreeDataApi.err){
            const errorPageService = getErrorPageStatusService()
            errorPageService.setState({
                isOpen: true,
                title: '加载文件系统失败',
                subTitle: '请检查网络连接或刷新页面',
                extra: [
                    {
                        type: 'primary',
                        key: 'reload',
                        name: '刷新页面',
                        onClick: async ()=>{
                            errorPageService.setState({isOpen: false})
                            window.location.reload();
                        }
                    }
                ]
            })
            return
        }
        const folderTreeDataServer = cloneDeep(folderTreeDataApi) as IFolderTreeNodeProps;
        const folderTreeData = addIconToFolderTree(folderTreeDataServer)
        const folderState = molecule.folderTree.getState()
        const { folderTree, autoSort} = folderState;
        if (autoSort) {
            sortTree(folderTreeData.children || []);
        }
        molecule.folderTree.setState({
            folderTree: { ...folderTree, data: [folderTreeData] },
        });
        const { SAMPLE_FOLDER_PANEL_ID } = molecule.builtin.getConstants();
        molecule.explorer.updatePanel({
            id: SAMPLE_FOLDER_PANEL_ID,
            name: folderTreeData.name || 'Default Root Folder',
        });
        updateEditorAfterFolderTreeChange()
    }

    addFolderTreeNode = async (node: IFolderTreeNodeProps, parentNodeId:string)=>{
        molecule.folderTree.add(node, parentNodeId)
        const fileNode = molecule.folderTree.get(node.id)
        const location = fileNode.location
        const newLocation = location.split('/').join('/');
        const ret = await onCreateFileOrDir(newLocation, node.data.value, fileNode.fileType !== 'File')
    }

    removeFolderTreeNode = async (node: IFolderTreeNodeProps)=>{
        molecule.folderTree.remove(node.id)
        updateEditorAfterFolderTreeChange()
        const ret = await onRemoveFileOrDir(node.location)
    }

    updateFolderTreeNodeValueOnEditorChange = async (tabId:string, newValue: string)=>{
        // Reduce the number of requests to the server
        return await updateFileAntiSharkService.run(tabId, async ()=>{            
            // update folderTree
            const currentFolderNode = molecule.folderTree.get(tabId)
            if(!currentFolderNode) return false
            const newNode = {
                ...currentFolderNode,
                data: {
                    ...currentFolderNode.data,
                    value: newValue
                }
            }
            molecule.folderTree.update(newNode)

            // send update info to server
            await onUpdateFileData({
                path: newNode.location,
                value: newValue
            })

            return true
        })
    }

    renameFolderTreeNode = async(node: IFolderTreeNodeProps, newName:string)=>{
        const { id, location, isOnCreate} = node
        const brotherNodes = molecule.folderTree.getParentNode(id).children
        // check name Conflict
        for(let i=0; i<brotherNodes.length; i++){
            if(brotherNodes[i].id !== id && brotherNodes[i].name===newName){
                message.error('该名称已经存在于同目录下，请尝试用其他名称！')
                return 
            }
        }
        const newLoc = location?.split('/') || [];
        newLoc[newLoc.length - 1] = newName;
        const newLocation = newLoc.join('/');
        const suffix = newName.indexOf('.') > -1 ? newName.split('.').pop() : ''
        let language: ILanguageName = 'textile'
        let value = (node.data && node.data.value) || ''
        switch(suffix){
            case 'sg':
                language = 'sqlgraph'
                if(isOnCreate){
                    value = JSON.stringify({graphData: {nodes:[], edges:[]}, graphParams:[]})
                }
                break
            case 'css':
                language = 'css'
                break 
            case 'sql':
                language = 'sql'
                break
        }
        await onRename(location, newLocation)
        const tmpNode = {
            ...node,
            name: newName,
            location:newLocation,
            isEditable:false,
            data: {...node.data, language:language, value:value},
            icon: getFileIconByLanguage(language)
        }
        const newNode = adjustChildFolderTreeNodeLocation(tmpNode)
        molecule.folderTree.update(newNode)
        updateEditorAfterFolderTreeChange()
    }
}

const regularLocation = (loc:string)=>{
    return loc.split('/').join('/')
}

const isDescendant = (assumHighLevel:IFolderTreeNodeProps, assumLowLevel:IFolderTreeNodeProps )=>{
    if(regularLocation(assumHighLevel.location) === regularLocation(assumLowLevel.location)){
        return true
    }
    if(assumHighLevel.children){
        for(let child of assumHighLevel.children){
            if(isDescendant(child, assumLowLevel)){
                return true
            }
        }
        return false 
    }
    else {
        return false 
    }
}

// avoid name conflict on same folder
export const adjustFolderTreeNodeName = (parentNode: IFolderTreeNodeProps, childName:string)=>{
    if(parentNode.children){
        for(let child of parentNode.children){
            if(child.name === childName){
                // has suffix
                if(childName.indexOf('.') > -1){
                    const nameParts = childName.split('.')
                    const prefix = nameParts.slice(0, -1).join('.')
                    const suffix = nameParts.slice(-1)[0]
                    const newName = prefix + '-copy' + '.' + suffix
                    return adjustFolderTreeNodeName(parentNode, newName)
                }
                else {
                    return adjustFolderTreeNodeName(parentNode, childName + '-copy')
                }
            }
        }
        return childName
    }
    else{
        return childName
    }
}

const adjustSourceFolderTreeNodeOnCopy = (sourceNode: IFolderTreeNodeProps, targetNode:IFolderTreeNodeProps, isChild:boolean=false)=>{
    let newNode = cloneDeep(sourceNode)
    newNode.id = genUniqId()
    if(!(newNode.data && newNode.data.value)){
        newNode.data = {value:''}
    }
    if(!isChild){
        newNode.name = adjustFolderTreeNodeName(targetNode, newNode.name)
    }
    newNode.location = targetNode.location.split('/').join('/') + '/' + newNode.name
    let newChilds = []
    if(newNode.children){
        for(let child of newNode.children){
            newChilds.push(adjustSourceFolderTreeNodeOnCopy(child, newNode, true))
        }
    }
    if(newChilds.length > 0){
        newNode.children = newChilds
    }
    return newNode
}

export interface IFolderTreeCopyServices {
    copy:(sourceFolderTree: IFolderTreeNodeProps)=>void,
    cut:(sourceFolderTree: IFolderTreeNodeProps)=>void,
    paste: (targetFolderTree:IFolderTreeNodeProps)=> Promise<void>
}

@singleton()
export class FolderTreeCopyServices
    implements IFolderTreeCopyServices
{
    private copyType: 'copy' | 'cut' | null;
    private cacheSourceFolderTree: IFolderTreeNodeProps | null
    constructor(){
        this.copyType = null
        this.cacheSourceFolderTree = null
    }

    public copy = (sourceFolderTree: IFolderTreeNodeProps) => {
        this.copyType = 'copy'
        this.cacheSourceFolderTree = sourceFolderTree
    }

    public cut = (sourceFolderTree: IFolderTreeNodeProps)=>{
        this.copyType = 'cut'
        this.cacheSourceFolderTree = sourceFolderTree
    }

    public paste = async (targetFolderTree:IFolderTreeNodeProps)=>{
        if(! this.cacheSourceFolderTree) return 
        if(! this.copyType) return 

        let targetNode: IFolderTreeNodeProps = targetFolderTree
        // use parent node as target when selected target is file
        if(targetFolderTree.isLeaf === true){
            targetNode = molecule.folderTree.getParentNode(targetFolderTree.id)
        }
        if(isDescendant(this.cacheSourceFolderTree, targetNode)){
            alert('不能把目录复制或粘贴到子目录中')
            return
        }
        const newNode = adjustSourceFolderTreeNodeOnCopy(this.cacheSourceFolderTree, targetNode)
        const folderTreeService = container.resolve(FolderTreeService)
        await folderTreeService.addFolderTreeNode(newNode, targetNode.id.toString())
        // molecule.folderTree.add(newNode, targetNode.id)
        if(this.copyType === 'cut'){
            molecule.folderTree.remove(this.cacheSourceFolderTree.id)
            await folderTreeService.removeFolderTreeNode(this.cacheSourceFolderTree)
        }
        this.cacheSourceFolderTree = null 
        this.copyType = null
    }
}

export const getFolderTreeService = ()=>{
    return container.resolve(FolderTreeService)
}

export const getFolderTreeCopyServices = ()=>{
    return container.resolve(FolderTreeCopyServices)
}