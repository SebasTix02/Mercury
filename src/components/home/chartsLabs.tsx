import { FallOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React from 'react'
import { Text } from '../text'
import { Area, AreaConfig } from '@ant-design/plots'

function ChartsLabs() {
    const config:AreaConfig = {
        data: [
            {laboratorios: 'Laboratorio 1', Valores:30},
            {laboratorios: 'Laboratorio 2', Valores:80},
            {laboratorios: 'Laboratorio 3', Valores:50},
            {laboratorios: 'Laboratorio 4', Valores:60},
            {laboratorios: 'Laboratorio 5', Valores:10},
        ],
        color: "#323E2A",
        xField:'laboratorios',
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
                    return `Total = ${Number(v)}`
                }
            }
        },
        areaStyle: function areaStyle(){
            return {fill: '#97BB80'}
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
                Inventario Laboratorios
            </Text>
        </div>
    }
    >
        <Area {...config} height={325}/>
    </Card>
  )
}

export default ChartsLabs