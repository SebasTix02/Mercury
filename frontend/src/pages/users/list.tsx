import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../components/layout';
import { Button, Modal, Table, Form, Input, Space, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import CustomTable from '../../common/table/custom_table';

export const ListaUsuarios = () => {
  const [dataSource, setDataSource] = useState([
    { id: '1', nombre: 'John Doe',  telefono: '0999999991', cedula: '1850876632', correo: 'johndoe@gmail.com' },
      { id: '2', nombre: 'Jane Smith', telefono: '0999999992', cedula: '1850876232', correo: 'janesmith@gmail.com' },
      { id: '3', nombre: 'Bob Johnson', telefono: '0999999993', cedula: '1850875632', correo: 'bjohnson@gmail.com' },
      { id: '4', nombre: 'Alice Brown',  telefono: '0999999994', cedula: '1850832632', correo: 'alicebrown@gmail.com' },
      { id: '5', nombre: 'David Lee', telefono: '0999999995', cedula: '1850876552', correo: 'davidlee@gmail.com' },
      { id: '6', nombre: 'Emma White', telefono: '0999999996', cedula: '1850877732', correo: 'emmawhite@gmail.com' },
      { id: '7', nombre: 'Michael Clark',  telefono: '0999999997', cedula: '1858876632', correo: 'michaelclark@gmail.com' },
      { id: '8', nombre: 'Sara Adams',  telefono: '0999999998', cedula: '1850879932', correo: 'saraadams@gmail.com' },
      { id: '9', nombre: 'Chris Taylor',  telefono: '0999999999', cedula: '1850006632', correo: 'christaylor@gmail.com' },
      { id: '10', nombre: 'Eva Martinez',  telefono: '0999999910', cedula: '1853276632', correo: 'evamartinez@gmail.com' },
      { id: '11', nombre: 'Peter Wang', telefono: '0999999911', cedula: '18508456632', correo: 'peterwang@gmail.com' },
      { id: '12', nombre: 'Sophia Kim', telefono: '0999999912', cedula: '1850877832', correo: 'sophiakim@gmail.com' },
      { id: '13', nombre: 'Kevin Patel', telefono: '0999999913', cedula: '1850898632', correo: 'kevinpatel@gmail.com' },
      { id: '14', nombre: 'Linda Johnson',telefono: '0999999914', cedula: '1852176632', correo: 'lindajohnson@gmail.com' },
      { id: '15', nombre: 'Tom Wilson', telefono: '0999999915', cedula: '1850872121', correo: 'tomwilson@gmail.com' }
  ]);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [filteredDataSource, setFilteredDataSource] = useState(dataSource);

  const handleEdit = (record: any) => {
    setSelectedRecord(record);
    setIsEditModalVisible(true);
  };

  const handleDelete = (record: any) => {
    setSelectedRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleAdd = () => {
    setIsAddModalVisible(true);
  };

  const handleEditOk = () => {
    setIsEditModalVisible(false);
  };

  const handleDeleteOk = () => {
    const newData = dataSource.filter((item) => item.id !== selectedRecord.id);
    setDataSource(newData);
    setIsDeleteModalVisible(false);
  };

  const handleAddOk = (values: any) => {
    const newRecord = {
      id: (dataSource.length + 1).toString(),
      nombre: values.nombre,
      telefono: values.telefono,
      cedula: values.cedula,
      correo: values.correo,
    };
    const updatedDataSource = [...dataSource, newRecord];
    setDataSource(updatedDataSource);
    setIsAddModalVisible(false);
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Teléfono',
      dataIndex: 'telefono',
      key: 'telefono',
    },
    {
      title: 'Cédula',
      dataIndex: 'cedula',
      key: 'cedula',
    },
    {
      title: 'Correo',
      dataIndex: 'correo',
      key: 'correo',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            
          </Button>
          <Button type="dashed" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
            
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h1 style={{ marginBottom: '20px' }}>Lista de Usuarios</h1>
        <Row gutter={[16, 16]}>
        </Row>

        <CustomTable dataSource={dataSource} columns={columns} rowKey="id" handleAdd={handleAdd} searchFields={['nombre', 'telefono', 'correo']}/>


      </div>

      <Modal
        title="Editar Usuario"
        visible={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={() => setIsEditModalVisible(false)}
      >
        <Form
          layout="vertical"
          onFinish={(values) => handleEditOk()}
          initialValues={selectedRecord}
        >
          <Form.Item label="Nombre" name="nombre">
            <Input />
          </Form.Item>
          <Form.Item label="Teléfono" name="telefono">
            <Input />
          </Form.Item>
          <Form.Item label="Cédula" name="cedula">
            <Input />
          </Form.Item>
          <Form.Item label="Correo" name="correo">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Confirmar Eliminación"
        visible={isDeleteModalVisible}
        onOk={handleDeleteOk}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <p>¿Estás seguro de que deseas eliminar este usuario?</p>
      </Modal>

      <Modal
        title="Agregar Usuario"
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleAddOk}>
          <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: '¡Por favor ingresa el nombre!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Teléfono" name="telefono" rules={[{ required: true, message: '¡Por favor ingresa el teléfono!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Cédula" name="cedula" rules={[{ required: true, message: '¡Por favor ingresa la cédula!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Correo" name="correo" rules={[{ required: true, message: '¡Por favor ingresa el correo!' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Agregar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};