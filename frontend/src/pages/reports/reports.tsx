import React, { useState } from 'react';
import { Row, Button, Space, Modal, Form, Input, Select } from 'antd';
import { UnorderedListOutlined, DesktopOutlined, CodeOutlined, BookOutlined, UngroupOutlined, ClockCircleOutlined } from '@ant-design/icons';
import Layout from "../../components/layout";
const { Option } = Select;

const Reports: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [reportType, setReportType] = useState("");
    const [reportId, setReportId] = useState("");

    const handleModalOk = () => {
        let url = "";
        if (reportType && reportId) {
            url = `http://localhost:4000/mercury/report/${reportType}/${reportId}`;
        } else if (reportType) {
            url = `http://localhost:4000/mercury/report/${reportType}`;
        }
        if (url) {
            window.location.href = url;
        }
        setModalVisible(false);
    };

    return (
        <>
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
                                    onClick={() => {
                                        setReportType("location");
                                        setModalVisible(true);
                                    }}
                                >
                                    Ubicaciones
                                </Button>
                                <Button 
                                    type="primary" 
                                    icon={<DesktopOutlined />} 
                                    className="custom-button"
                                    onClick={() => {
                                        setReportType("computer");
                                        setModalVisible(true);
                                    }}
                                >
                                    Computadores
                                </Button>
                                <Button 
                                    type="primary" 
                                    icon={<ClockCircleOutlined />} 
                                    className="custom-button"
                                    onClick={() => {
                                        setReportType("age");
                                        setModalVisible(true);
                                    }}
                                >
                                    Antigüedad
                                </Button>
                                <Button 
                                    type="primary" 
                                    icon={<UngroupOutlined />} 
                                    className="custom-button"
                                    onClick={() => {
                                        setReportType("dependency");
                                        setModalVisible(true);
                                    }}
                                >
                                    Dependencia
                                </Button>
                                <Button 
                                    type="primary" 
                                    icon={<CodeOutlined />} 
                                    className="custom-button"
                                    onClick={() => {
                                        setReportType("software");
                                        setModalVisible(true);
                                    }}
                                >
                                    Software
                                </Button>
                                <Button 
                                    type="primary" 
                                    icon={<BookOutlined />} 
                                    className="custom-button"
                                    onClick={() => {
                                        setReportType("upe");
                                        setModalVisible(true);
                                    }}
                                >
                                    UPE
                                </Button>
                            </div>
                        </Space>
                    </Row>
                </div>
            </Layout>
            <Modal
                title="Seleccione el tipo de reporte"
                visible={modalVisible}
                onOk={handleModalOk}
                onCancel={() => setModalVisible(false)}
            >
                <Form layout="vertical">
                    <Form.Item label="Tipo de reporte">
                        <Select onChange={(value: string) => setReportType(value)} defaultValue="" style={{ width: 120 }}>
                            <Option value="pdf">PDF</Option>
                            <Option value="xlsx">Excel</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="ID (opcional)">
                        <Input onChange={(e) => setReportId(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Reports;
