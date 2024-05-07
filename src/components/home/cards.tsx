import { Card } from 'antd'
import React from 'react'
import { Text } from '../text'
import { Area, AreaConfig } from '@ant-design/plots'
type Props = {
    resource: {nombre: string,
    icono: any, total: Number},
    isLoading: Boolean,
    total: Number,
    color: string
}
function DashboardCards({
    resource, isLoading, total, color
}: Props) {
    const config: AreaConfig = {
        data: [{nombre: resource.nombre,valor: resource.total},
            {nombre: "TOTAL", valor: total},
        ],
        xField: 'valor',
        yField: 'nombre',
        appendPadding: [1,0,0,0],
        padding: 0,
        syncViewPadding:true,
        autoFit: true,
        tooltip: false,
        animation: false,
        xAxis: false,
        yAxis:{
            tickCount:12,
            label:{
                style:{
                    stroke:'transparent'
                }
            },
            grid:{
                line:{
                    style:{
                        stroke: 'transparent'
                    }
                }

            }
        },
        smooth:true,
        line:{ color },
        areaStyle: function areaStyle(){
            return {fill: color}
        }
        
    }
  return (
    <Card
    style={{height:'96px', padding: 0}}
    bodyStyle={{padding: '8px 8px 8px 12px'}}
    size="small">
        <div 
        style={{display:'flex',
            alignItems:'center',
            gap:'8px',
            whiteSpace: 'nowrap'

        }}>
            {resource.icono}
            <Text size="md" className='secondary'
            style={{
                marginLeft:'8px'
            }}>{resource.nombre}</Text>
        </div>
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <Text size='xxxl'
            strong
            style={{
                flex:1,
                whiteSpace:'nowrap',
                flexShrink:0,
                textAlign:'start',
                marginLeft:'48px',
                fontVariantNumeric: 'tabular-nums'
            }}>
                {resource.total.toString()}
            </Text>
            <Area {...config} style={{width:'50%'}}/>
        </div>

    </Card>
  )
}

export default DashboardCards