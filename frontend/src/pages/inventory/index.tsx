import { Row, Button, Space, Modal } from "antd";
import Layout from "../../components/layout";
import React, { useState, useEffect } from 'react';
import { GoldOutlined, DesktopOutlined, CodeOutlined } from '@ant-design/icons';
import "../options.css";
import FormularioBG from "./formBG";

export const Inventario = () => {

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [isBienesModalOpen, setIsBienesModalOpen] = useState(false);

  const showBienesModal = () => {
    setIsBienesModalOpen(true);
  };

  const handleBienesOk = () => {
    setIsBienesModalOpen(false);
  };

  const handleBienesCancel = () => {
    setIsBienesModalOpen(false);
  };

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h1 style={{ marginBottom: '20px' }}>Inventario</h1>
        <Row gutter={[16, 16]} justify={"center"}>
          <Space>
            <div className="listI">
              <Button
                type="primary"
                icon={<GoldOutlined />}
                className="custom-buttonI"
                onClick={showBienesModal}
              >
                Bienes Generales
              </Button>
              <Button type="primary" icon={<DesktopOutlined />} className="custom-button">
                Computadores
              </Button>
              <Button type="primary" icon={<CodeOutlined />} className="custom-button">
                Software
              </Button>
            </div>
          </Space>
        </Row>
        <Modal
          title="Agregar Bienes Generales"
          open={isBienesModalOpen}
          onOk={handleBienesOk}
          onCancel={handleBienesCancel}
          footer={null}
        >
          <FormularioBG />
        </Modal>
      </div>
    </Layout>
  );
};
