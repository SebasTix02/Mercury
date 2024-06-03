import { FallOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React from 'react'
import { Text } from '../text'
import { Area, AreaConfig } from '@ant-design/plots'

interface Props {
    data: any;
    color: any;
    title: any;
    max:any;
}

const Charts: React.FC<Props> = ({ data, color, title, max }) => {
    const config:AreaConfig = {
        data: data.sort((a: { COUNT: number }, b: { COUNT: number }) => b.COUNT - a.COUNT).slice(0, max),
        color: color,
        xField:'TAG',
        yField:'COUNT',
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
                    return `${Number(v)/10}`
                }
            }
        },
        areaStyle: function areaStyle(){
            return {fill: color}
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
            <Text size="sm" style={{marginLeft:'0.5rem'}}>
                {title}
            </Text>
        </div>
    }
    >
        <Area {...config} height={325}/>
    </Card>
  )
}

export default Charts