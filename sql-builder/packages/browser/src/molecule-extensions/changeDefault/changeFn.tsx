import molecule from '@dtinsight/molecule'
import {constants} from '@dtinsight/molecule/esm/services/builtinService/const'
import {openGloablSettingEditor} from '../../components/globalSettingEditor'
import {openSupportInfoTab} from '../../components/supportInfo'
import {showConfirmModal} from '../../components/confirmModal'
import {openUpdateListEditor} from '../../components/updateList'
import Welcome from '../../components/welcome'
import {showFeedbackForm} from '../../components/feedbackForm'
import {runFolderTreePlugin} from './folderTree'
import {
    getUserService, 
    getGlobalSettingService, 
    SQLColumnsPreviewPanelItem, 
    updateEditorTabOnSelectTab,
    resetSQLColumnsPreviewPanel,
    updateOtherTabDataOnCloseTab,
    getDataWarehouseConfigservice,
    CustomOutputPanel,
    registerMessageErrorHandler
} from '@/globalServices'
import {EasySQLDocLocation} from '../../common'
import {menuBarData} from './menuBarData'
import { message } from 'antd'
import {sendPOSTRequest} from '../../api'
import {registerDagSql} from '../../languages'
import {DataSourceTree} from '@/components/dataSourceTree'

export const changeSettingData = () => {
    const oldSettingData = molecule.activityBar.getState().data
    for(let i=0; i<oldSettingData.length; i++){
        // 禁用设置中的主题选择
        if(oldSettingData[i].id === constants.ACTIVITY_BAR_GLOBAL_SETTINGS){
            oldSettingData[i].contextMenu = oldSettingData[i].contextMenu.filter((item)=>item.id!==constants.ACTION_SELECT_THEME)
        }
    }
    molecule.activityBar.setState({
        data: oldSettingData
    })
}

//移除outline
export const changeExplorerPanel = () => {
    const {builtInExplorerOutlinePanel, builtInExplorerEditorPanel} = molecule.builtin.getModules()
    if(builtInExplorerOutlinePanel) molecule.explorer.removePanel(builtInExplorerOutlinePanel.id)
    if(builtInExplorerEditorPanel) molecule.explorer.removePanel(builtInExplorerEditorPanel.id)
}


export const changeMenuBarMode = () => {
    molecule.layout.setMenuBarMode('horizontal')
}

export const FOLDER_MENU_COPY_ID = 'explore.copy'
export const FOLDER_MENU_CUT_ID = 'explore.cut'
export const FOLDER_MENU_PASTE_ID = 'explore.paste'

export const changeFolderTreeMenu = () =>{
    const state = molecule.folderTree.getState()
    const {folderTree} =  state 
    if(! folderTree) return 
    const oldMenus = folderTree.contextMenu
    const addMenus: molecule.component.IMenuItemProps[] = [
        {
            id: FOLDER_MENU_COPY_ID,
            name: '复制',
        },
        {
            id: FOLDER_MENU_CUT_ID,
            name: '剪切'
        },
        {
            id: FOLDER_MENU_PASTE_ID,
            name: '粘贴'
        },

    ]
    molecule.folderTree.setState({
        ...state, 
        folderTree: {
            ...state.folderTree,
            contextMenu: [
                ...oldMenus, 
                ...addMenus
            ]
        }
    })
}   

export const changeDefaultActivityBar = () => {
    molecule.activityBar.remove('sidebar.search.title')
    const state = molecule.activityBar.getState()
    let newData = [...state.data]
    for(let i=0; i<newData.length; i++){
        if(newData[i].id === 'global.menu.settings'){
            // newData[i].contextMenu = newData[i].contextMenu.filter((item)=>{return item.id !== 'editor.action.quickCommand'})
            newData[i].contextMenu = []
        }
    }
    // add customer support
    newData.push({
        id: 'global.menu.customerSupport',
        type: 'global',
        name: '用户支持',
        title: '用户支持',
        icon: 'comment-discussion'
    })
    molecule.activityBar.setState({
        ...state,
        data: [...newData]
    })

    molecule.activityBar.onClick((selectedKey, item)=>{
        if(selectedKey === 'global.menu.settings'){
            openGloablSettingEditor()
        }
        else if(selectedKey === 'global.menu.customerSupport'){
            openSupportInfoTab()
        }
    })
}

export const changeDefaultSidebar = ()=>{
    const dataSourcePane = {
        id: 'sidebar.dataSourceconfig',
        title: '数据源',
        render() {
            return <DataSourceTree/>;
        },
    };
    molecule.sidebar.add(dataSourcePane)
}

export const loadUserInfo = async () =>{
    const userService = getUserService()
    await userService.loadUserFromServer()
}

export const loadGlobalSetting = async ()=>{
    const settingService = getGlobalSettingService()
    await settingService.loadConfigFromServer()
}

export const loadDataWarehouseConfig = async ()=>{
    const dataWarehouseConfigService = getDataWarehouseConfigservice()
    await dataWarehouseConfigService.loadConfigFromServer()
}

export const changeDefaultEditor = ()=>{
    const welcome = <Welcome/>
    molecule.editor.setEntry(welcome)
    molecule.editor.onSelectTab((tabId)=>{
        updateEditorTabOnSelectTab(tabId.toString())
        resetSQLColumnsPreviewPanel()
        
    })
    molecule.editor.onOpenTab((tabId)=>{
        resetSQLColumnsPreviewPanel()
    })
    molecule.editor.setDefaultActions([])
    molecule.editor.onCloseTab((tabId)=>{
        updateOtherTabDataOnCloseTab(tabId.toString())
        resetSQLColumnsPreviewPanel()
    })
    molecule.editor.onCloseAll(()=>{
        resetSQLColumnsPreviewPanel()
    })
}

export const changeDefaultMenu = ()=>{
    molecule.layout.setMenuBarMode('horizontal')
    molecule.menuBar.setState(menuBarData)
    molecule.menuBar.onSelect( async (menuId)=>{
        if(menuId === 'doc'){
            window.open(EasySQLDocLocation, '_blank')
        }
        else if(menuId === 'send_feedback'){
            const feebackContent = await showFeedbackForm()
            if(feebackContent){
                sendPOSTRequest('/api/sendFeedback', {
                    value: feebackContent
                })
                message.success('感谢您的反馈！')
            }
        }
        else if(menuId === 'customerSupport'){
            openSupportInfoTab()
        }
        else if(menuId === 'importLatestExamples'){
            const sureImport = await showConfirmModal('导入最新画布示例', '导入示例后将自动刷新页面，是否导入？')
            if(sureImport){
                const respData = await sendPOSTRequest('/api/importExamples/', {})
                if(respData.err){
                    message.error('导入最新画布示例错误')
                }
                else if(respData.result && respData.result === 'success'){
                    message.success('导入成功, 将自动刷新页面......')
                }
                window.location.href = '/'
            }
        }
    })
}

export const changeDefaultBottomPanel = ()=>{
    // molecule.panel.remove('panel.problems.title')
    molecule.panel.remove('panel.output.title')
    molecule.panel.add(CustomOutputPanel)
    molecule.panel.add(SQLColumnsPreviewPanelItem)
    // molecule.panel.setActive(SQLColumnsPreviewPanelItem.id)
}

export const changeDefaultFn = async () => {
    changeSettingData()
    changeExplorerPanel()
    changeFolderTreeMenu()
    changeDefaultActivityBar()
    changeDefaultSidebar()
    changeDefaultEditor()
    changeDefaultMenu()
    changeDefaultBottomPanel()
    registerDagSql()

    registerMessageErrorHandler()
    
    await loadUserInfo()
    await runFolderTreePlugin() 
    await loadGlobalSetting()
    await loadDataWarehouseConfig()
    openUpdateListEditor()
}