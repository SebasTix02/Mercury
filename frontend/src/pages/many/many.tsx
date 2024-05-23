import { Row, Button, Space } from "antd";
import Layout from "../../components/layout";
import { useState,  } from "react";
import {  UnorderedListOutlined, DatabaseOutlined, AppstoreOutlined, CopyrightOutlined, UngroupOutlined } from '@ant-design/icons';
import "../options.css"
import { useNavigate } from "react-router-dom";

export const Many = () => {
    const navigate = useNavigate()
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<any>(null);

    return (
        <Layout>
            <div style={{ padding: '20px' }}>
                <h1 style={{ marginBottom: '20px' }}>Varios</h1>
                <Row gutter={[16, 16]} justify={"center"}>
                    <Space>
                        <div className="listI">
                            <Button type="primary" icon={ <UnorderedListOutlined />} 
                                className="custom-buttonI" onClick={() => navigate("/categorias")}>
                                Categorías
                            </Button>
                            <Button type="primary" icon={ <DatabaseOutlined />} 
                                className="custom-buttonI" onClick={() => navigate("/bloques")}>
                                Bloques
                            </Button>
                            <Button type="primary" icon={ <AppstoreOutlined />} 
                                className="custom-buttonI" onClick={() => navigate("/ubicaciones")}>
                                Ubicación
                            </Button>
                            <Button type="primary" icon={ <CopyrightOutlined />} 
                                className="custom-buttonI" onClick={() => navigate("/marcas")}>
                                Marcas
                            </Button>
                            <Button type="primary" icon={ <UngroupOutlined />} 
                                className="custom-buttonI" onClick={() => navigate("/dependencias")}>
                                Dependencias
                            </Button>
                        </div>
                    </Space>
                </Row>
            </div>
        </Layout>
    );
}
