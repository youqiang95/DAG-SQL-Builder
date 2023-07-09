import { IEditorTab, IFolderTreeNodeProps } from '@dtinsight/molecule/esm/model';
import EditorView from '@/components/editor'
import type {ITabData} from '@/common/interface'
import {getFolderTreeService} from '@/globalServices'
import molecule from '@dtinsight/molecule'
import React from 'react';

const onOpenNewEditorTab = (
    newTabId: string,
    value:string,
    language: string,
    tabNameConstructor: (fileName:string)=>string,
    renderPane: (item:ITabData)=>React.ReactNode,
    extraData?: {[key:string]:any},
    icon?: string | JSX.Element
)=>{
    const {current} = molecule.editor.getState()
    if(!current) return
    if(!current.tab) return 
    const preLoc = current.tab.data.path.split('/').slice(0, -1)
    const fileName = current.tab.data.path.split('/').pop()
    const tabName = tabNameConstructor(fileName)
    const path = preLoc.join('/') + '/' + tabName
    let data = {
        tabId: newTabId,
        path:path, 
        language: language, 
        value: value
    }
    if(extraData){
        data = {
            ...data, 
            ...extraData
        }
    }
    const tabData: IEditorTab = {
        id: newTabId,
        name: tabName,
        data: data,
        breadcrumb: path.split('/').map((local: string) => ({ id: local, name: local })),
        renderPane: renderPane,
        icon: icon
    }
    molecule.editor.open(tabData)
}

// item is IEditorTab->data
const renderPane : IEditorTab['renderPane']  = (item: ITabData) => {
    return <EditorView
        language={item.language}
        value={item.value}
        tabId={item.tabId}
        path={item.path}
        onValueChange={(newValue)=>{
            const folderTreeService = getFolderTreeService()
            folderTreeService.updateFolderTreeNodeValueOnEditorChange(item.tabId, newValue)
        }}
        onOpenNewEditorTab={onOpenNewEditorTab}
    />
}

export const transformToEditorTab = (item: IFolderTreeNodeProps): IEditorTab =>{
    const tabData: IEditorTab = {
        ...item,
        id: item.id?.toString(),
        data: {
            tabId: item.id?.toString() || '',
            path: item.location,
            ...(item.data || {}),
        },
        
        breadcrumb: item.location 
            ? item.location
                .split('/')
                .map((local: string) => ({ id: local, name: local }))
            : [],
        renderPane: renderPane
    }
    return tabData;
}