import React from 'react'
import {Modal, ConfigProvider, theme, Space} from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons'
import {
    useColorThemeServiceModel,
    useDeleteFileModalModel,
    getDeleteFileModalService,
    getFolderTreeService,
} from '@/globalServices'

const folderTreeService = getFolderTreeService()

interface IProps {
}

interface ITreeData {
    title: string,
    value:string,
    path:string,
    selectable: boolean,
    isLeaf: boolean,
    disabled: boolean,
    children?: ITreeData[]
}

interface IFormValue {
    fileType: string
    fileName: string, 
    parentNodeId:string
}

const deleteFileModalService = getDeleteFileModalService()

export const DeleteFileModal: React.FC<IProps> = (props)=>{
    const {currentTheme} =  useColorThemeServiceModel()
    const {isOpen, folderNode, title, afterOk, afterCanceel} = useDeleteFileModalModel()
    const reactTitle = (
        <Space>
            <InfoCircleOutlined style={{fontSize: '20px', color: '#faad14'}}/>
            <div style={{fontSize: '18px'}}>{title}</div>
        </Space>
    ) 
    const handleOk = async () => {
        try {
            folderTreeService.removeFolderTreeNode(folderNode)
        } catch (error) {
            console.error(error)
            afterOk()
        }
        deleteFileModalService.reset()
    }

    const handleCancel = ()=>{
        afterCanceel()
        deleteFileModalService.reset()
    }
    return (
        <div>
            <ConfigProvider
                theme={{
                    algorithm: currentTheme.themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
                }}
            >
                <Modal title={reactTitle} open={isOpen} onOk={handleOk} onCancel={handleCancel} width={600}>
                </Modal>
            </ConfigProvider>
        </div>
    )
}