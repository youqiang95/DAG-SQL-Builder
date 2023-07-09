import React from 'react'
import { Button} from 'antd';


interface IAsyncButtonProps {
    title: string,
    onClick: ()=>void| Promise<void>,
    disabled?: boolean
}

export const AsyncButton: React.FC<IAsyncButtonProps> = (props)=>{
    const {title, onClick, disabled=false} = props
    const [loading, setLoading] = React.useState<boolean>(false)
    const onAsyncClick = async ()=>{
        setLoading(true)
        await onClick()
        setLoading(false)
    }
    return (
        <Button disabled={disabled} onClick={onAsyncClick} type="primary" loading={loading}>
            {title}
        </Button>
    )
}