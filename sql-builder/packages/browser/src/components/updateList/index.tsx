import React from 'react';
import { Divider, List, Typography,  ConfigProvider, theme} from 'antd';
import {useColorThemeServiceModel} from '@/globalServices/colorThemeService'
import molecule from '@dtinsight/molecule'
import { IEditorTab} from '@dtinsight/molecule/esm/model';

const remindStartTimeStamp = 1685648334273
const remindEndTimeStamp = remindStartTimeStamp + 2*24*60*60*1000

const lastUpdateTimeKey = 'lastUpdateTime'

const isShouldShowUpList = ()=>{
    const nowTime = new Date().getTime()
    if(nowTime > remindEndTimeStamp){
        return false
    }
    let lastUpdateTime = localStorage.getItem(lastUpdateTimeKey)
    if (!lastUpdateTime) {
        return true
    }
    else {
        try {
            const lastWelcomeTimeNumber = Number(lastUpdateTime)
            if(lastWelcomeTimeNumber > remindStartTimeStamp && (nowTime-lastWelcomeTimeNumber)>10000){
                return false
            }
            else {
                return true
            }
        } catch (error) {
            console.error('isShouldShowUpList error:', error)
        }
        return true
    }
}

const data = [
    '1. 修复编译结果复制功能bug。',
    '2. 编译节点SQL时自动去除结尾的分号(;)'
]

const footerText = '更新时间：2023年6月2日'

export const UpdateList: React.FC = ()=>{
    const {currentTheme} =  useColorThemeServiceModel()    
    return (
        <ConfigProvider
            theme={{
                algorithm: currentTheme.themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
            }}
        >
            <div className='welcome-updatelist'>
                <List
                    header={<div>本次更新内容：</div>}
                    footer={<div>{footerText}</div>}
                    bordered
                    dataSource={data}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                />
            </div>
        </ConfigProvider>
    )
}

export const openUpdateListEditor = ()=>{
    const isShow = isShouldShowUpList()
    if(!isShow){
        return 
    }
    const tabData: IEditorTab = {
        id: 'welcome-updatelist',
        name: '版本更新信息',
        data: {},
        breadcrumb: [],
        renderPane: item=><UpdateList/>,
        icon: <span className="setting-editor-icon codicon codicon-checklist"></span>
    }
    molecule.editor.open(tabData)
    const lastUpdateTime = (new Date().getTime()).toString();
    localStorage.setItem(lastUpdateTimeKey, lastUpdateTime);
}