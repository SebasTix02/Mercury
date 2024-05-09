import {Col, Row} from 'antd'
import Layout from '../../components/layout'
import { Charts, ChartsLabs, DashboardCards } from '../../components'
import { useCustom } from '@refinedev/core'
import { BookOutlined, CodeOutlined, HddOutlined, IeOutlined, RedditSquareFilled, UsbOutlined } from '@ant-design/icons'
export const Home = () => {
    
    const isLoading = false;
    const totalGeneral = 1000;
    const bienesGenerales={nombre: "Bienes Generales",
        icono: <BookOutlined/>,
        total: 340
    }
    const computadoras={nombre: "Computadoras",
        icono: <UsbOutlined/>,
        total: 50
        
    }
    const software={nombre: "Software",
        icono: <CodeOutlined/>,
        total: 30
        
    }
    return(
        <Layout>
        <div style={{marginTop:'32px'}}>
            <Row gutter={[32,32]}>
                <Col xs={24} sm={24} xl={8}>
                    <DashboardCards 
                    resource={bienesGenerales}
                    isLoading={isLoading}
                    total= {totalGeneral}
                    color = "#586F9B"/>
                </Col>
                
                <Col xs={24} sm={24} xl={8}>
                    <DashboardCards 
                    resource={computadoras}
                    isLoading={isLoading}
                    total= {totalGeneral}
                    color= "#97BB80"/>
                </Col>

                <Col xs={24} sm={24} xl={8}>
                    <DashboardCards 
                    resource={software}
                    isLoading={isLoading}
                    total= {totalGeneral}
                    color= "#A56A5D"/>
                </Col>
            </Row>

            <Row
                gutter={[32,32]}
                style={{
                    marginTop: "32px"
                }}>
                <Col
                xs={24}
                sm={24}
                xl={8}
                style={{
                    height: '460px'
                }}>
                    <ChartsLabs/>
                </Col>
                <Col
                xs={24}
                sm={24}
                xl={16}
                style={{
                    height: '460px'
                }}>
                    <Charts/>
                </Col>
            </Row>
        </div>
        </Layout>
        
    )
}