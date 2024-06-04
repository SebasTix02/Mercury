import React, { useState } from 'react';
import { Row, Button, Space, Modal, Form, Input, Select, Spin, notification } from 'antd';
import { UnorderedListOutlined, DesktopOutlined, CodeOutlined, BookOutlined, UngroupOutlined, ClockCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import Layout from "../../components/layout";
const { Option } = Select;

const Reports: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [specialModalVisible, setSpecialModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reportType, setReportType] = useState("");
    const [reportId, setReportId] = useState("");
    const [outputFormat, setOutputFormat] = useState("pdf");

    const handleModalOk = () => {
        let url = `http://localhost:4000/mercury/report/${outputFormat}/${reportType}`;
        if (reportId) {
            url += `/${reportId}`;
        }

        if (url) {
            setLoading(true);
            if (outputFormat === "pdf") {
                window.open(url, '_blank');
            } else if (outputFormat === "xlsx") {
                const link = document.createElement('a');
                link.href = url;
                link.download = `${reportType}_report.xlsx`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            setLoading(false);
        }

        setModalVisible(false);
        setSpecialModalVisible(false);
    };

    const openModal = (type: string, isSpecial: boolean) => {
        setReportType(type);
        setReportId("");
        setOutputFormat("pdf");
        if (isSpecial) {
            setSpecialModalVisible(true);
        } else {
            setModalVisible(true);
        }
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
                                    onClick={() => openModal("location", false)}
                                >
                                    Ubicaciones
                                </Button>
                                <Button 
                                    type="primary" 
                                    icon={<DesktopOutlined />} 
                                    className="custom-button"
                                    onClick={() => openModal("computer", false)}
                                >
                                    Computadores
                                </Button>
                                <Button 
                                    type="primary" 
                                    icon={<ClockCircleOutlined />} 
                                    className="custom-button"
                                    onClick={() => openModal("age", true)}
                                >
                                    Antigüedad
                                </Button>
                                <Button 
                                    type="primary" 
                                    icon={<UngroupOutlined />} 
                                    className="custom-button"
                                    onClick={() => openModal("dependency", false)}
                                >
                                    Dependencia
                                </Button>
                                <Button 
                                    type="primary" 
                                    icon={<CodeOutlined />} 
                                    className="custom-button"
                                    onClick={() => openModal("software", true)}
                                >
                                    Software
                                </Button>
                                <Button 
                                    type="primary" 
                                    icon={<BookOutlined />} 
                                    className="custom-button"
                                    onClick={() => openModal("upe", true)}
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
                    <Form.Item label="Formato de reporte">
                        <Select value={outputFormat} onChange={(value: string) => setOutputFormat(value)} style={{ width: 120 }}>
                            <Option value="pdf">PDF</Option>
                            <Option value="xlsx">Excel</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Nº Laboratorio o Dependencia (opcional)">
                        <Input value={reportId} onChange={(e) => setReportId(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Seleccione el tipo de reporte"
                visible={specialModalVisible}
                onOk={handleModalOk}
                onCancel={() => setSpecialModalVisible(false)}
            >
                <Form layout="vertical">
                    <Form.Item label="Formato de reporte">
                        <Select value={outputFormat} onChange={(value: string) => setOutputFormat(value)} style={{ width: 120 }}>
                            <Option value="pdf">PDF</Option>
                            <Option value="xlsx">Excel</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                visible={loading}
                footer={null}
                closable={false}
                centered
            >
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} tip="Generando reporte..." />
            </Modal>
        </>
    );
};

export default Reports;
