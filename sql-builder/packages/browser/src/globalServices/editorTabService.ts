import molecule from '@dtinsight/molecule'
import type {ITabData} from '@/common'
import { IEditorTab} from '@dtinsight/molecule/esm/model'

export const updateEditorTabValue = (tabId:string, newValue:string)=>{
    const { current } = molecule.editor.getState()
    if(!current){
        return
    }
    const tab = molecule.editor.getTabById(tabId, current.id) as molecule.model.IEditorTab<ITabData>
    if(!tab){
        return
    }
    const updatedTab = {
        ...tab,
        data: { ...tab.data, value: newValue},
    }
    molecule.editor.updateTab(updatedTab)
}

export const updateEditorTabData = (tabId:string, data:any)=>{
    const { current } = molecule.editor.getState()
    if(!current){
        return
    }
    const tab = molecule.editor.getTabById(tabId, current.id) as molecule.model.IEditorTab<ITabData>
    if(!tab){
        return
    }
    const updatedTab = {
        ...tab,
        data: { ...tab.data, ...data},
    }
    molecule.editor.updateTab(updatedTab)
}

export const updateEditorTabOnSelectTab = (tabId:string)=>{
    const folderNode = molecule.folderTree.get(tabId)
    if(!folderNode){
        return
    }
    const { current } = molecule.editor.getState()
    if(!current){
        return
    }
    const tab = molecule.editor.getTabById(tabId, current.id) as molecule.model.IEditorTab<ITabData>
    if(!tab){
        return
    }
    const updatedTab = {
        ...tab,
        data: { ...tab.data, ...(folderNode.data || {})},
        breadcrumb: folderNode.location 
        ? folderNode.location
            .split('/')
            .map((local: string) => ({ id: local, name: local }))
        : [],
    }
    molecule.editor.updateTab(updatedTab)
}

export const getEditorTabData = (tabId:string)=>{
    const { current } = molecule.editor.getState()
    if(!current){
        return null 
    }
    const tab = molecule.editor.getTabById(tabId, current.id) as molecule.model.IEditorTab<ITabData>
    return tab
}

export const updateOtherTabDataOnCloseTab = (closeTabId: string)=>{
    const editorState = molecule.editor.getState()
    for(let group of editorState.groups){
        // const groupId = group.id 
        for(let tab of group.data){
            // skip closeTab
            if(tab.id.toString() === closeTabId){
                continue
            }
            let newTab = {...tab} as IEditorTab
            // skip some editor which no related folderTree
            if(newTab.data && newTab.data.skipFolderTreeCheck !== undefined && newTab.data.skipFolderTreeCheck){
                continue
            }
            const folderNode = molecule.folderTree.get(tab.id.toString())
            if(!folderNode){
                continue
            }
            else {
                newTab.data = {
                    ...newTab.data,
                    ...folderNode.data
                }
            }
            molecule.editor.updateTab(newTab)
        }
    }
}