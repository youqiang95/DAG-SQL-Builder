import { Button, Modal, Space, Image} from 'antd';
import React from 'react';

export const showInfoModal = (title:string, content:React.ReactNode)=>{
    Modal.info({
        title: title,
        content: content,
        okText: '知道了'
    })
}