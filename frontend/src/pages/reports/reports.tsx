import React, { useState, useEffect } from 'react';
import { Row, Button, Space, Modal, Form, Select, Spin, notification, Checkbox } from 'antd';
import { UnorderedListOutlined, DesktopOutlined, CodeOutlined, BookOutlined, UngroupOutlined, ClockCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import Layout from "../../components/layout";

const { Option } = Select;

interface Location {
  ID: string;
  NAME: string;
  BUILDING: string;
}

interface Computer {
  ASSET_KEY: string;
  LOCATION: string;
}

interface Dependency {
  ID: string;
  NAME: string;
}

const Reports: React.FC = () => {
    const [modalState, setModalState] = useState({
        visible: false,
        specialVisible: false,
        reportType: "",
        reportId: "",
        outputFormat: "pdf",
    });
    const [loading, setLoading] = useState(false);
    const [completeReport, setCompleteReport] = useState(false);

    const [locations, setLocations] = useState<Location[]>([]);
    const [computers, setComputers] = useState<Computer[]>([]);
    const [dependencies, setDependencies] = useState<Dependency[]>([]);

    useEffect(() => {
        // Fetch locations
        fetch('http://localhost:4000/mercury/location')
            .then(response => response.json())
            .then(data => setLocations(data))
            .catch(error => handleFetchError(error, "ubicaciones"));

        // Fetch computers
        fetch('http://localhost:4000/mercury/computer')
            .then(response => response.json())
            .then(data => setComputers(data))
            .catch(error => handleFetchError(error, "computadores"));

        // Fetch dependencies
        fetch('http://localhost:4000/mercury/dependency')
            .then(response => response.json())
            .then(data => setDependencies(data))
            .catch(error => handleFetchError(error, "dependencias"));
    }, []);

    const handleFetchError = (error: unknown, resourceName: string) => {
        let errorMessage = `Hubo un problema al cargar los ${resourceName}. Por favor, intenta nuevamente.`;
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        notification.error({
            message: `Error al cargar ${resourceName}`,
            description: errorMessage,
        });
    };

    const handleModalOk = async () => {
        const { reportType, reportId, outputFormat } = modalState;
        let url = `http://localhost:4000/mercury/report/${outputFormat}/${reportType}`;
        if (!completeReport && reportId) {
            url += `/${reportId}`;
        }

        try {
            setLoading(true);
            const response = await fetch(url);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('No se encontraron datos para el filtro aplicado.');
                } else {
                    throw new Error('Error al generar el reporte');
                }
            }

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
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.message.includes('No se encontraron datos')) {
                    notification.warning({
                        message: 'Reporte vacío',
                        description: error.message,
                    });
                } else {
                    notification.error({
                        message: 'Error al generar el reporte',
                        description: error.message,
                    });
                }
            } else {
                notification.error({
                    message: 'Error desconocido',
                    description: 'Hubo un problema desconocido al generar el reporte. Por favor, intenta nuevamente.',
                });
            }
        } finally {
            setLoading(false);
            setModalState(prevState => ({ ...prevState, visible: false, specialVisible: false }));
            setCompleteReport(false); // Reset checkbox state
        }
    };

    const openModal = (type: string, isSpecial: boolean) => {
        setModalState({
            visible: !isSpecial,
            specialVisible: isSpecial,
            reportType: type,
            reportId: "",
            outputFormat: "pdf",
        });
    };

    const getOptions = () => {
        switch (modalState.reportType) {
            case 'location':
                return locations.map(location => (
                    <Option key={location.ID} value={location.ID}>
                        {location.BUILDING} - {location.NAME}
                    </Option>
                ));
            case 'computer':
                return locations.map(location => (
                    <Option key={location.ID} value={location.ID}>
                        {location.BUILDING} - {location.NAME}
                    </Option>
                ));
            case 'dependency':
                return dependencies.map(dependency => (
                    <Option key={dependency.ID} value={dependency.ID}>
                        {dependency.NAME}
                    </Option>
                ));
            default:
                return null;
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
                visible={modalState.visible}
                onOk={handleModalOk}
                onCancel={() => setModalState(prevState => ({ ...prevState, visible: false }))}
            >
                <Form layout="vertical">
                    <Form.Item label="Formato de reporte">
                        <Select value={modalState.outputFormat} onChange={(value: string) => setModalState(prevState => ({ ...prevState, outputFormat: value }))} style={{ width: 120 }}>
                            <Option value="pdf">PDF</Option>
                            <Option value="xlsx">Excel</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Checkbox checked={completeReport} onChange={e => setCompleteReport(e.target.checked)}>
                            Reporte Completo
                        </Checkbox>
                    </Form.Item>
                    {!completeReport && (modalState.reportType === 'location' || modalState.reportType === 'dependency' || modalState.reportType === 'computer') && (
                        <Form.Item label={modalState.reportType === 'location' ? "Ubicación" : modalState.reportType === 'dependency' ? "Dependencia" : "Ubicación"}>
                            <Select value={modalState.reportId} onChange={(value: string) => setModalState(prevState => ({ ...prevState, reportId: value }))} style={{ width: '100%' }}>
                                {getOptions()}
                            </Select>
                        </Form.Item>
                    )}
                </Form>
            </Modal>
            <Modal
                title="Seleccione el tipo de reporte"
                visible={modalState.specialVisible}
                onOk={handleModalOk}
                onCancel={() => setModalState(prevState => ({ ...prevState, specialVisible: false }))}
            >
                <Form layout="vertical">
                    <Form.Item label="Formato de reporte">
                        <Select value={modalState.outputFormat} onChange={(value: string) => setModalState(prevState => ({ ...prevState, outputFormat: value }))} style={{ width: 120 }}>
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
                bodyStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '150px' }}
            >
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} tip="Generando reporte..." />
            </Modal>
        </> 
        
    );
};

export default Reports;
