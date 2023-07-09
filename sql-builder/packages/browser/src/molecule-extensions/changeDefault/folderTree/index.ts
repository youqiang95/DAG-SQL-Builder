import molecule from '@dtinsight/molecule'
import { IFolderTreeNodeProps } from '@dtinsight/molecule/esm/model'
import { transformToEditorTab } from './transformToEditortab'
import {FOLDER_MENU_COPY_ID, FOLDER_MENU_CUT_ID, FOLDER_MENU_PASTE_ID} from '../../changeDefault/changeFn'
import {
    getFolderTreeService, 
    getFolderTreeCopyServices, 
    getCreateFileModalService, 
    getDeleteFileModalService
} from '../../../globalServices'

const folderTreeService = getFolderTreeService()
const folderTreeCopyServices = getFolderTreeCopyServices()
const createFileModalService = getCreateFileModalService()
const deleteFileModalService = getDeleteFileModalService()
export const runFolderTreePlugin = async () => {
    // open autoSort
    const state = molecule.folderTree.getState()
    molecule.folderTree.setState({
        ...state,
        autoSort: true
    })
    // getData
    await folderTreeService.reloadFolderTreeDataFromServer()
    // onSelectFile
    molecule.folderTree.onSelectFile((file: IFolderTreeNodeProps) => {
        molecule.editor.open(transformToEditorTab(file))
    })
    // onCreate
    molecule.folderTree.onCreate((type, nodeId)=>{
        createFileModalService.setState({
            isOpen: true,
            folderId: nodeId.toString(),
            isCreateDir: type === 'File' ? false : true,
            presetLanguage: null
        })
    })
    // onUpdateFileName, prevent same file name in one folder
    molecule.folderTree.onUpdateFileName((file) => {
        const {name} = file;
        if(!name) return 
        folderTreeService.renameFolderTreeNode(file, name)
    })
    // onRename
    molecule.folderTree.onRename((id) => {
        molecule.folderTree.update({
            id,
            isEditable: true,
        });
    });
    // onExpandKeys
    molecule.folderTree.onExpandKeys((expandKeys) => {
        molecule.folderTree.setExpandKeys(expandKeys);
    });
    // onRemove
    molecule.folderTree.onRemove((id)=>{
        const node = molecule.folderTree.get(id)
        if(!node) return 
        const modalTitle = '确定要删除: ' + node.location + '?'
        deleteFileModalService.setState({
            isOpen: true,
            folderNode: node,
            title: modalTitle
        })
    })

    // onClickMenu 
    molecule.folderTree.onContextMenu((contextMenu, treeNode)=>{
        switch(contextMenu.id){
            case FOLDER_MENU_COPY_ID:
                folderTreeCopyServices.copy(treeNode)
                break 
            case FOLDER_MENU_CUT_ID:
                folderTreeCopyServices.cut(treeNode)
                break 
            case FOLDER_MENU_PASTE_ID:
                folderTreeCopyServices.paste(treeNode)
                break 
        }
    })
}