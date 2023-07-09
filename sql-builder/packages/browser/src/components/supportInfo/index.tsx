import { Image, ConfigProvider, theme} from 'antd';
import React from 'react';
import {SUPPORT_WX_CODE_SRC} from '@/common'
import {useColorThemeServiceModel} from '@/globalServices/colorThemeService'
import molecule from '@dtinsight/molecule'
import { IEditorTab} from '@dtinsight/molecule/esm/model';

export const SupportInfoTab: React.FC = ()=>{
    const {currentTheme} =  useColorThemeServiceModel()
    return (
        <div style={{padding: 20}}>
            <ConfigProvider
                theme={{
                    algorithm: currentTheme.themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
                }}
            >
                <h2>SQL助手用户支持交流群:</h2>
                <Image
                    src={SUPPORT_WX_CODE_SRC} 
                    width={200}
                />
            </ConfigProvider>
        </div>
    )
}


export const openSupportInfoTab = ()=>{
    const tabData: IEditorTab = {
        id: 'supportInfoTab',
        name: 'SQL助手用户支持交流群',
        data: {},
        breadcrumb: [],
        renderPane: item=><SupportInfoTab/>,
        icon: <span className="setting-editor-icon codicon codicon-comment-discussion"></span>
    }
    molecule.editor.open(tabData)
}