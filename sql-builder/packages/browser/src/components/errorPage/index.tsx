import { Button, Result } from 'antd';
import React from 'react';
import {useErrorPageStatusModel} from '@/globalServices'

const ErrorPage: React.FC = ()=> {
    const {isOpen, status, title, subTitle, extra} = useErrorPageStatusModel()  
    return (
      <Result
        status={status}
        title={title}
        subTitle={subTitle}
        extra={
            extra.map((extraItem)=>{
                return (
                    <Button type={extraItem.type} onClick={extraItem.onClick}>
                        {extraItem.name}
                    </Button>
                )
            })
          
        }
      />
    );
}
  
export default ErrorPage;