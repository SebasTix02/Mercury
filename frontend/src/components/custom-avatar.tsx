import React from 'react'
import {Avatar as AntdAvatar, AvatarProps} from 'antd'

type Props = AvatarProps & {
    name: string;
}

function CustomAvatar({name, style, ...rest}: Props) {
  return (
    <AntdAvatar
    alt={'Usuario'}
    size="small"
    style={{ 
        backgroundColor: "#fff",
        display: "flex",
        alignItems: 'center',
        border: 'none',
        ...style
    }}
    {...rest}
    >
        {name}
    </AntdAvatar>
  )
}

export default CustomAvatar