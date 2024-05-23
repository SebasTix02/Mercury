import { Row, Button, Space, Modal } from "antd";
import Layout from "../../components/layout";
import React, { useState, useEffect } from 'react';
import { GoldOutlined, DesktopOutlined, CodeOutlined } from '@ant-design/icons';
import "../options.css";
import FormularioBG from "./formBG";
import FormComp from "./formComp";
import FormSoft from "./formSoft";
import { useNavigate } from "react-router-dom";

export const Inventario = () => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [isBienesModalOpen, setIsBienesModalOpen] = useState(false);
  const [isComputadoresModalOpen, setIsComputadoresModalOpen] = useState(false);
  const [isSoftwareModalOpen, setIsSoftwareModalOpen] = useState(false);

  const showBienesModal = () => {
    setIsBienesModalOpen(true);
  };

  const handleBienesOk = () => {
    setIsBienesModalOpen(false);
  };

  const handleBienesCancel = () => {
    setIsBienesModalOpen(false);
  };

  const showComputadoresModal = () => {
    navigate('/computadores');
    //setIsComputadoresModalOpen(true);
  };

  const handleComputadoresOk = () => {
    setIsComputadoresModalOpen(false);
  };

  const handleComputadoresCancel = () => {
    setIsComputadoresModalOpen(false);
  };

  const showSoftwareModal = () => {
    setIsSoftwareModalOpen(true);
  };

  const handleSoftwareOk = () => {
    setIsSoftwareModalOpen(false);
  };

  const handleSoftwareCancel = () => {
    setIsSoftwareModalOpen(false);
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
              <Button 
                type="primary" 
                icon={<DesktopOutlined />} 
                className="custom-button"
                onClick={showComputadoresModal}  
              >
                Computadores
              </Button>
              <Button 
                type="primary" 
                icon={<CodeOutlined />} 
                className="custom-button"
                onClick={() => navigate("/software")}
                >
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
        <Modal
          title="Agregar Computadores"
          open={isComputadoresModalOpen}
          onOk={handleComputadoresOk}
          onCancel={handleComputadoresCancel}
          footer={null}
        >
          <FormComp />
        </Modal>
        <Modal
          title="Agregar Software"
          open={isSoftwareModalOpen}
          onOk={handleSoftwareOk}
          onCancel={handleSoftwareCancel}
          footer={null}
        >
          <FormSoft />
        </Modal>
      </div>
    </Layout>
  );
};
