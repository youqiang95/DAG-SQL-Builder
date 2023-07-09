import {Form, Input, Modal, Select, Spin, Space, Button, TreeSelect, ConfigProvider, theme, Table} from 'antd';
import {useColorThemeServiceModel} from '@/globalServices/colorThemeService'
import {genUniqId} from '@/common'
import React from 'react'

interface IProps {
    dataSource: any[],
    columns: any
}

export const NodeColumnsTable: React.FC<IProps> = (props)=>{
    const {dataSource, columns} = props
    return (
        <div className='node-columns-table'>
            <Table columns={columns} dataSource={dataSource} pagination={false}/>
        </div>
    )
}
