import React from 'react';
import { Tree, ConfigProvider, theme } from 'antd';
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';
import {useColorThemeServiceModel} from '@/globalServices/colorThemeService'
import {Header, Content} from '@dtinsight/molecule/esm/workbench/sidebar';

const { DirectoryTree } = Tree;

const treeData: DataNode[] = [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
    ],
  },
];

export const DataSourceTree: React.FC = () => {
    const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    };

    const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    };
    const {currentTheme} =  useColorThemeServiceModel()
    const onRightClick = ({event, node})=>{
        event.preventDefault()
    }
    const onDragStart = ({event, node})=>{
        event.dataTransfer.setData('text/plain', node.key);
        event.dataTransfer.setData('nodeData', JSON.stringify(node));
        // event.dataTransfer.dropEffect = "copy";
    }
    return (
        <ConfigProvider
            theme={{
                algorithm: currentTheme.themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
            }}
        >
            <Header
                title={'数据源'}
                toolbar={<></>}
            />
            <Content>
                <DirectoryTree
                    multiple
                    // defaultExpandAll
                    draggable
                    onSelect={onSelect}
                    onExpand={onExpand}
                    treeData={treeData}
                    // onRightClick={onRightClick}
                    onDragStart={onDragStart}
                />
            </Content>
        </ConfigProvider>
    );
}