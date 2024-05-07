import { Popover, Button } from 'antd'
import React, { useState } from 'react'
import CustomAvatar from '../custom-avatar'
import { useGetIdentity } from '@refinedev/core'
import { Text } from '../text'
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons'

const CurrentUser = () => {
    const [isOpen, setIsOpen] = useState(false)
 const nombreUsuario = "Sebas"
 const content = (<div style={{display: "flex", flexDirection: 'column'}}>
    <Text strong
    style={{padding: "12px 20px"}}>
        {nombreUsuario}
    </Text>
    <div style={{ borderTop: '1px solid #d9d9d9',
        padding: '4px',
        display: 'flex',
        flexDirection:'column',
        gap: '4px'
    }}>
        <Button style={{ textAlign: "left"}}
        icon={<LogoutOutlined/>}
        type='text'
        block
        onClick={()=>setIsOpen(true)}>
            Salir
        </Button>
    </div>
 </div>)
  return (
    <>
        <Popover
        placement='bottomRight'
        trigger="click"
        overlayInnerStyle={{padding:0}}
        overlayStyle={{zIndex:999}}
        content= {content}>
            <CustomAvatar name={nombreUsuario}
            src = {"src/images/uta.png"}
            size="default"
            style={{cursor: 'pointer'}}/>
        </Popover>
    </>
  )
}

export default CurrentUser