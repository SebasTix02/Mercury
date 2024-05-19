import { Row, Button, Space, Modal } from "antd";
import Layout from "../../components/layout";
import { useState } from "react";
import { GoldOutlined, DesktopOutlined, CodeOutlined} from '@ant-design/icons';
import FormularioBG from "./formBG"
import "../options.css"


export const Inventario = () => {

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<any>(null);
    const [isBienesModalVisible, setIsBienesModalVisible] = useState(false);

  const showBienesModal = () => {
    setIsBienesModalVisible(true);
  };

  const handleBienesOk = () => {
    setIsBienesModalVisible(false);
  };

  const handleBienesCancel = () => {
    setIsBienesModalVisible(false);
  };
    return (
        <Layout>
            <div style={{ padding: '20px' }}>
                <h1 style={{ marginBottom: '20px' }}>Inventario</h1>
                <Row gutter={[16, 16]} justify={"center"}>
                    <Space>
                        <div className="listI">
                            <Button type="primary" icon={<GoldOutlined />} className="custom-buttonI" onClick={showBienesModal}>Bienes Generales</Button>
                            <Button type="primary" icon={<DesktopOutlined /> } className="custom-button" >Computadores</Button>
                            <Button type="primary" icon={<CodeOutlined/>} className="custom-button" >Software</Button>
                        </div>
                    </Space>
                </Row>
                <Modal 
                    title="Agregar Bien General"
                    visible={isBienesModalVisible}
                    onOk={handleBienesOk}
                    onCancel={handleBienesCancel}
                    footer={null}
                    ></Modal>
                    <FormularioBG/>
            </div>
        </Layout>
    );
}
