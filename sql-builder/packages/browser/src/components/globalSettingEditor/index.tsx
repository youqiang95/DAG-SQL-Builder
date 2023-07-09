import { Form, ConfigProvider, Select, theme, Tabs} from 'antd'
import type { TabsProps } from 'antd';
import {getEditorSettingservice, getColorThemeService, getGlobalSettingService} from '@/globalServices/'
import {useColorThemeServiceModel} from '@/globalServices/colorThemeService'
import React from 'react'
import molecule from '@dtinsight/molecule'
import { IEditorTab} from '@dtinsight/molecule/esm/model';
import {DataSourceConfigTab} from './dataSourceConfig'

const BaseSettingEditor: React.FC= () => {
    let editorFontSizeOptions = []
    for (let i=10; i<73; i++){
        editorFontSizeOptions.push({label: i.toString(), value:i.toString()})
    } 
    let editorTabWidthOptions = []
    for (let i=1; i<9; i++){
        editorTabWidthOptions.push({label: i.toString(), value:i.toString()})
    }
    const  globalSettingService = getGlobalSettingService()
    const globalEditorSettingService =  getEditorSettingservice()
    const colorThemeService = getColorThemeService()
    const {themes} = colorThemeService.getState()
    const {currentTheme} =  useColorThemeServiceModel()
    let colorThemeOptions = []
    for(let theme of themes.values()){
        colorThemeOptions.push({label: theme.name, value:theme.id})
    }
    const onFontSizeSelectChange = (value:number, options: any) =>{
        globalSettingService.setFontSize(value)
    }
    const onTabWidthSelectChange = (value:number, options: any) =>{
        globalSettingService.setTabWidth(value)
    }
    const onColorThemeSelectChange = (value:string, options: any)=>{
        globalSettingService.setColorTheme(value)
    }
    const {fontSize, tabWidth} = globalEditorSettingService.getState()
    const layout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } }
    return (
        <div>
            <Form 
                {...layout}
                initialValues={{ editorFontSize: fontSize}}>
                <Form.Item
                    name='colorThemeId'
                    label="颜色主题"
                >
                    <Select
                        defaultValue={currentTheme.id}
                        value={currentTheme.id}
                        options={colorThemeOptions}
                        onChange={onColorThemeSelectChange}
                    />
                </Form.Item>
                <Form.Item
                    name='editorFontSize'
                    label="编辑器字体大小"
                >
                    <Select
                        defaultValue={fontSize}
                        value={fontSize}
                        options={editorFontSizeOptions}
                        onChange={onFontSizeSelectChange}
                    />
                </Form.Item>
                <Form.Item
                    name='editorTabWidth'
                    label="编辑器缩进空格数"
                >
                    <Select
                        defaultValue={tabWidth}
                        value={tabWidth}
                        options={editorTabWidthOptions}
                        onChange={onTabWidthSelectChange}
                    />
                </Form.Item>
            </Form>
        </div>
    )
}

const tabItems: TabsProps['items'] = [
    {
        key: '1',
        label: '基本设置',
        children: <BaseSettingEditor/>,
      },
      {
        key: '2',
        label: '数据源设置',
        children: <DataSourceConfigTab/>,
      }
]

const GlobalSettingEditor: React.FC = ()=>{
    const {currentTheme} =  useColorThemeServiceModel()
    return (
        <ConfigProvider
            theme={{
                algorithm: currentTheme.themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
            }}
        >
        <Tabs className='node-gui-editor-main-tabs' defaultActiveKey="1" items={tabItems}/>
        </ConfigProvider>
    )
}

export const openGloablSettingEditor = ()=>{
    const tabData: IEditorTab = {
        id: 'globalSettingEditor',
        name: '全局设置',
        data: {},
        breadcrumb: [],
        renderPane: item=><GlobalSettingEditor/>,
        icon: <span className="setting-editor-icon codicon codicon-settings-gear"></span>
    }
    molecule.editor.open(tabData)
}