import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../components/layout';
import { Button, Modal, Table, Form, Input, Space, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import CustomTable from '../../common/table/custom_table';
import CustomModal from '../../common/modal/custom_modal';
import { getAllUsers, addUser, editUser, deleteUser } from '../../providers/options/users';


export const ListaUsuarios = () => {
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers()
      .then((result:any) => {
        if (result.success) {
          setDataSource(result.users);
        } else {
          console.error(result.error.message);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

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

  const convertUserObject = (values:any) => {
    return {
      "idNumber": values.ID_NUMBER,
      "firstName": values.FIRST_NAME,
      "middleName": values.MIDDLE_NAME,
      "lastname": values.LASTNAME,
      "secondLastname": values.SECOND_LASTNAME,
      "cellphone": values.CELLPHONE,
      "email": values.EMAIL,
      "password": values.PASSWORD
    }
  }

  const handleEditOk = async (values:any) => {
    const userService = convertUserObject(values)
    const result:any = await editUser(selectedRecord.ID, userService);
    if (!result.success) {
      console.error("Error al actualizar usuario:", result.error.message);
      return
    }
    const editedRaw = values
    editedRaw.ID = selectedRecord.ID
    const updatedData:any = dataSource.map((item:any) =>
      item.ID == editedRaw.ID ? editedRaw : item
    );
    setDataSource(updatedData);
    setIsEditModalVisible(false);
  };

  const handleDeleteOk = async () => {
    const resultado:any = await deleteUser(selectedRecord.ID);
    if (!resultado.success) {
      console.error("Error al eliminar usuario:", resultado.error.message);
    }
    const newData = dataSource.filter((item:any) => item.ID !== selectedRecord.ID);
    setDataSource(newData);
    setIsDeleteModalVisible(false);
  };

  const handleAddOk = async (values: any) => {
    const newUser = convertUserObject(values)
  
    const result:any = await addUser(newUser);
    if (!result.success) {
      console.error("Error al añadir usuario:", result.error.message);
      return
    }

    const newRecord = {...values}
    newRecord.ID = result.user.insertId;
    
    const updatedDataSource:any = [...dataSource, newRecord];
    setDataSource(updatedDataSource);
    setIsAddModalVisible(false);
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'ID',
      key: 'id',
    },
    {
      title: 'Cédula',
      dataIndex: 'ID_NUMBER',
      key: 'idNumber',
      rules: [{ required: true, message: '¡Por favor ingrese la cédula!' }]
    },
    {
      title: 'Nombre',
      dataIndex: 'FIRST_NAME',
      key: 'firstName',
      rules: [{ required: true, message: '¡Por favor ingresa el nombre!' }]
    },
    {
      title: 'Segundo Nombre',
      dataIndex: 'MIDDLE_NAME',
      key: 'middleName',
      rules: []
    },
    {
      title: 'Apellido',
      dataIndex: 'LASTNAME',
      key: 'lastName',
      rules: [{ required: true, message: '¡Por favor ingresa el apellido!' }]
    },
    {
      title: 'Segundo Apellido',
      dataIndex: 'SECOND_LASTNAME',
      key: 'secondLastName',
      rules: []
    },
    {
      title: 'Teléfono',
      dataIndex: 'CELLPHONE',
      key: 'cellphone',
      rules: [{ required: true, message: '¡Por favor ingresa el teléfono!' }]
    },
    {
      title: 'Correo',
      dataIndex: 'EMAIL',
      key: 'email',
      rules: [{ required: true, message: '¡Por favor ingresa el correo!' }]
    },
    {
      title: 'Contraseña',
      dataIndex: 'PASSWORD',
      key: 'password',
      rules: [{ required: true, message: '¡Por favor ingresa la contraseña!' }]
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
        <CustomTable dataSource={dataSource} columns={columns} rowKey="ID" handleAdd={handleAdd} 
          searchFields={['ID_NUMBER', 'FIRST_NAME', 'LASTNAME', 'CELLPHONE', 'EMAIL']}/>
      </div>

      {isEditModalVisible && (
        <CustomModal
          modalTitle="Editar Usuario"
          isVisible={isEditModalVisible}
          handleVisible={setIsEditModalVisible}
          handleAddEdit={handleEditOk}
          columns={columns}
          selectedRecord={selectedRecord}
        />
      )}

      <CustomModal
        text='¿Estás seguro de que deseas eliminar este usuario?'
        modalTitle="Confirmar Eliminación"
        isVisible={isDeleteModalVisible}
        handleOk={handleDeleteOk}
        handleVisible={setIsDeleteModalVisible}
        >
      </CustomModal>

      <CustomModal
        modalTitle="Agregar Usuario"
        isVisible={isAddModalVisible}
        handleVisible={setIsAddModalVisible}
        isAdding ={true}
        handleAddEdit={handleAddOk}
        columns={columns}
      ></CustomModal>

    </Layout>
  );
};