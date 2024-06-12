import React, { useState, useEffect } from 'react';
import { Col, Row, notification } from 'antd';
import Layout from '../../components/layout';
import { Charts, ChartsLabs, DashboardCards } from '../../components';
import { BookOutlined, CodeOutlined, FundProjectionScreenOutlined, UsbOutlined, UserOutlined } from '@ant-design/icons';
import { getDashboardValues } from '../../providers/options/dashboard';
import CategoriesChart from '../../components/home/chartsCategories';
import { BarChartPro } from '../../components/home/chartsBar';

export const Home = () => {
    const [data, setData] = useState<any>({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getDashboardValues()
            .then((result: any) => {
                if (result.success) {
                    setData(result.dashboard);
                } else {
                    console.error(result.error.message);
                    notification.error({
                        message: 'Error de obtención de datos',
                        description: `No se pudo obtener los valores del Dashboard: ${result.error.message}`
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const totalGeneral = 1;

    const card1 = {
        nombre: data.assetsCount?.title || 'Cargando...',
        icono: <BookOutlined />,
        total: data.assetsCount?.values || 0
    };
    const card2 = {
        nombre: data.commonAssetsCount?.title || 'Cargando...',
        icono: <UsbOutlined />,
        total: data.commonAssetsCount?.values || 0
    };
    const card3 = {
        nombre: data.computersCount?.title || 'Cargando...',
        icono: <FundProjectionScreenOutlined />,
        total: data.computersCount?.values || 0
    };
    const card4 = {
        nombre: data.softwareCount?.title || 'Cargando...',
        icono: <CodeOutlined />,
        total: data.softwareCount?.values || 0
    };
    const card5 = {
        nombre: data.usersCount?.title || 'Cargando...',
        icono: <UserOutlined />,
        total: data.usersCount?.values || 0
    };

    return (
        <Layout>
            <div style={{ marginTop: '32px' }}>
                <Row gutter={[1, 32]}>
                    <Col xs={24} sm={12} xl={8}>
                        <DashboardCards
                            resource={card1}
                            isLoading={isLoading}
                            total={totalGeneral}
                            color="#586F9B"
                        />
                    </Col>

                    <Col xs={24} sm={12} xl={8}>
                        <DashboardCards
                            resource={card2}
                            isLoading={isLoading}
                            total={totalGeneral}
                            color="#97BB80"
                        />
                    </Col>

                    <Col xs={24} sm={12} xl={8}>
                        <DashboardCards
                            resource={card3}
                            isLoading={isLoading}
                            total={totalGeneral}
                            color="#A56A5D"
                        />
                    </Col>

                    <Col xs={24} sm={12} xl={8}>
                        <DashboardCards
                            resource={card4}
                            isLoading={isLoading}
                            total={totalGeneral}
                            color="#ffa500"
                        />
                    </Col>
                    <Col xs={24} sm={12} xl={8}>
                        <DashboardCards
                            resource={card5}
                            isLoading={isLoading}
                            total={totalGeneral}
                            color="#c0c0c0"
                        />
                    </Col>
                </Row>

                <Row
                    gutter={[32, 32]}
                    style={{ marginTop: '32px' }}
                >
                    <Col
                        xs={24}
                        sm={12}
                        lg={8}
                        xl={6}
                        style={{ height: '460px' }}
                    >
                        {data.countByCategory ? (
                            <ChartsLabs 
                                title={data.countByCategory.title}
                                data={data.countByCategory.values}
                                color="#323E2A"
                                max={5}
                            />
                        ) : (
                            <div>Cargando...</div>
                        )}
                    </Col>

                    <Col
                        xs={24}
                        sm={12}
                        lg={8}
                        xl={6}
                        style={{ height: '460px' }}
                    >
                        {data.countByBrand ? (
                            <Charts 
                                title={data.countByBrand.title}
                                data={data.countByBrand.values}
                                color="#990000"
                                max={6}
                            />
                        ) : (
                            <div>Cargando...</div>
                        )}
                    </Col>

                    <Col
                        xs={24}
                        sm={12}
                        lg={8}
                        xl={6}
                        style={{ height: '460px' }}
                    >
                        {data.countByLocation ? (
                            <BarChartPro
                                title={data.countByLocation.title}
                                data={data.countByLocation.values}
                                max={3}
                            />
                        ) : (
                            <div>Cargando...</div>
                        )}
                    </Col>

                    <Col
                        xs={24}
                        sm={12}
                        lg={8}
                        xl={6}
                        style={{ height: '460px' }}
                    >
                        {data.countByBuilding ? (
                            <CategoriesChart
                                data={data.countByBuilding.values}
                                title={data.countByBuilding.title}
                                max={2}
                            />
                        ) : (
                            <div>Cargando...</div>
                        )}
                    </Col>

                    <Col
                        xs={24}
                        sm={12}
                        lg={8}
                        xl={6}
                        style={{ height: '460px' }}
                    >
                        {data.countByLicense ? (
                            <CategoriesChart
                                data={data.countByLicense.values}
                                title={data.countByLicense.title}
                                max={2}
                            />
                        ) : (
                            <div>Cargando...</div>
                        )}
                    </Col>

                    <Col
                        xs={24}
                        sm={12}
                        lg={8}
                        xl={6}
                        style={{ height: '460px' }}
                    >
                        {data.countByAge ? (
                            <BarChartPro
                                title={data.countByAge.title}
                                data={data.countByAge.values}
                                max={4}
                            />
                        ) : (
                            <div>Cargando...</div>
                        )}
                    </Col>

                    <Col
                        xs={24}
                        sm={12}
                        lg={8}
                        xl={6}
                        style={{ height: '460px' }}
                    >
                        {data.countByBrand ? (
                            <Charts 
                                title={data.countByCustodian.title}
                                data={data.countByCustodian.values}
                                color="#0000ff"
                                max={6}
                            />
                        ) : (
                            <div>Cargando...</div>
                        )}
                    </Col>

                    <Col
                        xs={24}
                        sm={12}
                        lg={8}
                        xl={6}
                        style={{ height: '460px' }}
                    >
                        {data.countByCategory ? (
                            <ChartsLabs 
                                title={data.countByYear.title}
                                data={data.countByYear.values}
                                color="#ffa500"
                                max={5}
                            />
                        ) : (
                            <div>Cargando...</div>
                        )}
                    </Col>
                    
                </Row>
            </div>
        </Layout>
    );
};
