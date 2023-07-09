import molecule from '@dtinsight/molecule'
import type {IPanelItem} from '@dtinsight/molecule/esm/model'
import SQLColumnsPreview from '@/components/SQLColumnsPreview'
import type {SQLColumn} from '@/common/interface'
import React from 'react'
import {OutputText} from '@/components/outputText'

const DefaultSQLColumnPreviewMessage = '无选中节点'
export const SQLColumnsPreviewItemId = 'panel.SQLColumnsPreview.title'
interface ISQLColumnsPreviewPanelItemData {
    columns: SQLColumn[],
    message?: string
}

export const SQLColumnsPreviewPanelItem: IPanelItem<ISQLColumnsPreviewPanelItemData>  = {
    id: SQLColumnsPreviewItemId,
    name: '节点输出字段',
    sortIndex: 3,
    closable: false,
    data: {
        columns: [],
        message: DefaultSQLColumnPreviewMessage
    },
    renderPane: (item: IPanelItem<ISQLColumnsPreviewPanelItemData>)=>{
        return <SQLColumnsPreview
            columns={item.data.columns}
            message={item.data.message || null}
        />
    }
}

export const CustomOutputPanelId = 'panel.customOutput.title'
export const CustomOutputPanel: IPanelItem = {
    id: CustomOutputPanelId,
    name: '输出',
    sortIndex: 2,
    closable: false
}


export const updateSQLColumnsPreviewPanelColumns = (columns: SQLColumn[])=>{
    let sqlColumnsPreviewItem = molecule.panel.getPanel(SQLColumnsPreviewItemId)
    if(!sqlColumnsPreviewItem){
        sqlColumnsPreviewItem = {...SQLColumnsPreviewPanelItem}
        molecule.panel.add(SQLColumnsPreviewPanelItem)
    }
    molecule.panel.update({
        ...sqlColumnsPreviewItem,
        data: {
            ...sqlColumnsPreviewItem.data,
            columns: columns,
            message: null
        }
    })
}

export const updateSQLColumnsPreviewPanelMessage = (message: string)=>{
    let sqlColumnsPreviewItem = molecule.panel.getPanel(SQLColumnsPreviewItemId)
    if(!sqlColumnsPreviewItem){
        sqlColumnsPreviewItem = {...SQLColumnsPreviewPanelItem}
        molecule.panel.add(SQLColumnsPreviewPanelItem)
    }
    molecule.panel.update({
        ...sqlColumnsPreviewItem,
        data: {
            ...sqlColumnsPreviewItem.data,
            message: message
        }
    })
}

export const removeSQLColumnsPreviewPanel = ()=>{
    const sqlColumnsPreviewItem = molecule.panel.getPanel(SQLColumnsPreviewItemId)
    if(!sqlColumnsPreviewItem){
        return
    }
    molecule.panel.remove(SQLColumnsPreviewItemId)
}

export const resetSQLColumnsPreviewPanel= ()=>{
    // updateSQLColumnsPreviewPanelColumns([])
    updateSQLColumnsPreviewPanelMessage(DefaultSQLColumnPreviewMessage)
}

export const sendReactToPanel = (panelId:string, renderNode: React.ReactNode)=>{
    const targetPanel = molecule.panel.getPanel(panelId)
    if(!targetPanel){
        return 
    }
    targetPanel.renderPane = (item)=>{
        return renderNode
    }
    molecule.panel.update(targetPanel)

    const {panel} = molecule.layout.getState()
    if(panel.hidden){
        molecule.layout.setState({ panel: { ...panel, hidden: false} });
    }
    molecule.panel.setActive(panelId)
}

export const sendMessageToOutput = (message:string)=>{
    const outputPanel = molecule.panel.getPanel(CustomOutputPanelId)
    if(!outputPanel){
        return 
    }
    outputPanel.renderPane = (item)=>{
        return <OutputText message={message}/>
    }
    molecule.panel.update(outputPanel)

    const {panel} = molecule.layout.getState()
    if(panel.hidden){
        molecule.layout.setState({ panel: { ...panel, hidden: false} });
    }
    molecule.panel.setActive(CustomOutputPanelId)
}




