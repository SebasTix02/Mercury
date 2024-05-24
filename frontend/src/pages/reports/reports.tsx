import React, { useState } from 'react';
import { Row, Button, Space, notification } from 'antd';
import Layout from "../../components/layout";
import { UnorderedListOutlined, DesktopOutlined, CodeOutlined, BookOutlined, UngroupOutlined, ClockCircleOutlined } from '@ant-design/icons';

const Reports: React.FC = () => {
    return (
        <Layout>
            <div style={{ padding: '20px' }}>
                <h1 style={{ marginBottom: '20px' }}>Reportes</h1>
                <Row gutter={[16, 16]} justify={"center"}>
                    <Space>
                        <div className="listI">
                            <Button 
                                type="primary" 
                                icon={<UnorderedListOutlined />} 
                                className="custom-buttonI"
                            >
                                Ubicaciones
                            </Button>
                            <Button 
                                type="primary" 
                                icon={<DesktopOutlined />} 
                                className="custom-button" 
                            >
                                Computadores
                            </Button>
                            <Button 
                                type="primary" 
                                icon={<ClockCircleOutlined />} 
                                className="custom-button" 
                            >
                                Antigüedad
                            </Button>
                            <Button 
                                type="primary" 
                                icon={<UngroupOutlined />} 
                                className="custom-button" 
                            >
                                Dependencia
                            </Button>
                            <Button 
                                type="primary" 
                                icon={<CodeOutlined />} 
                                className="custom-button" 
                            >
                                Software
                            </Button>
                            <Button 
                                type="primary" 
                                icon={<BookOutlined />} 
                                className="custom-button" 
                            >
                                UPE
                            </Button>
                        </div>
                    </Space>
                </Row>
            </div>
        </Layout>
    );
};

export default Reports;
