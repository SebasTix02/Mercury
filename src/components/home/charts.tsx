import { FallOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React from 'react'
import { Text } from '../text'
import { Area, AreaConfig } from '@ant-design/plots'

function Charts() {
    const config:AreaConfig = {
        data: [
            {bienes: 'computadoras', Valores:30},
            {bienes: 'Generales', Valores:80},
            {bienes: 'software', Valores:50},
        ],
        color: "#FF4A4A",
        xField:'bienes',
        yField:'Valores',
        isStack: false,
        animation:true,
        startOnZero:false,
        smooth:false,
        legend:{
            offsetY: -6
        },
        yAxis:{
            tickCount:4,
            label:{
                formatter:(v:string)=>{
                    return `Total / 10 = ${Number(v)/10}`
                }
            }
        },
        areaStyle: function areaStyle(){
            return {fill: '#9A031E'}
        }
    }
  return (
    <Card
    style={{height:'100%'}}
    headStyle={{padding: '8px 16px'}}
    bodyStyle={{padding: '24px 24px 0 24px'}}
    title={
        <div style={{
            display:'flex',
            alignItems: 'center',
            gap: '8px',
        }}>
            <FallOutlined/>
            <Text size="sm" style={{marginLeft:'0.5rem'}}>
                Inventario General
            </Text>
        </div>
    }
    >
        <Area {...config} height={325}/>
    </Card>
  )
}

export default Charts