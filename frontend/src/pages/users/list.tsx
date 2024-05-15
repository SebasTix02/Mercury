import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../components/layout';
import { Button, Space, Row, notification } from 'antd';
import { EditOutlined, DeleteOutlined, UserAddOutlined, UserDeleteOutlined, UserSwitchOutlined } from '@ant-design/icons';
import CustomTable from '../../common/table/custom_table';
import CustomModal from '../../common/modal/custom_modal';
import { getAllUsers, addUser, editUser, deleteUser } from '../../providers/options/users';
import { CustomColors, verifyIdNumber } from '../../common/constantsCommon'


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
          notification.error({
            message: 'Error de obtención de datos',
            description: `No se pudo obtener los usuarios: ${result.error.message}`
          });
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
    setSelectedRecord(null)
    setIsAddModalVisible(true);
  };

  const convertUserObject = (values:any) => {
    const names = values.NAME.split(' ')
    const lastnames = values.LASTNAME.split(' ')
    return {
      "idNumber": values.ID_NUMBER,
      "firstName": names[0],
      "middleName": names[1]  ? names[1] : undefined,
      "lastname": lastnames[0],
      "secondLastname": lastnames[1]  ? lastnames[1] : undefined,
      "cellphone": values.CELLPHONE,
      "email": values.EMAIL,
      "password": values.PASSWORD
    }
  }

  const handleEditOk = async (values:any) => {
    const userService = convertUserObject(values)
    const result:any = await editUser(selectedRecord.ID, userService);
    if (!result.success) {
      setIsEditModalVisible(false);
      notification.error({
        message: 'Error de actualización',
        description: `No se pudo actualizar el usuario: ${result.error.message}`
      });
      return
    }
    const editedRaw = values
    editedRaw.ID = selectedRecord.ID
    const updatedData:any = dataSource.map((item:any) =>
      item.ID == editedRaw.ID ? editedRaw : item
    );
    setDataSource(updatedData);
    setIsEditModalVisible(false);
    notification.success({
      message: 'Usuario actualizado',
      description: 'El usuario ha sido actualizado exitosamente.'
    });
  };

  const handleDeleteOk = async () => {
    const result:any = await deleteUser(selectedRecord.ID);
    if (!result.success) {
      setIsDeleteModalVisible(false);
      notification.error({
        message: 'Error de eliminación',
        description: `No se pudo eliminar el usuario: ${result.error.message}`
      });
      return
    }
    const newData = dataSource.filter((item:any) => item.ID !== selectedRecord.ID);
    setDataSource(newData);
    setIsDeleteModalVisible(false);
    notification.success({
      message: 'Usuario eliminado',
      description: 'El usuario ha sido eliminado exitosamente.'
    });
  };

  const handleAddOk = async (values: any) => {
    const newUser = convertUserObject(values)
  
    const result:any = await addUser(newUser);
    if (!result.success) {
      setIsAddModalVisible(false);
      notification.error({
        message: 'Error de agregación',
        description: `No se pudo agregar el usuario: ${result.error.message}`
      });
      return
    }

    const newRecord = {...values}
    newRecord.ID = result.user.insertId;
    
    const updatedDataSource:any = [...dataSource, newRecord];
    setDataSource(updatedDataSource);
    setIsAddModalVisible(false);
    notification.success({
      message: 'Usuario agregado',
      description: 'El usuario ha sido agregado exitosamente.'
    });
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
      rules: [
        { required: true, message: '¡Por favor ingrese la cédula!' },
        { validator: verifyIdNumber }
      ]
    },
    {
      title: 'Nombre',
      dataIndex: 'NAME',
      key: 'firstName',
      rules: [
        { required: true, message: '¡Por favor ingresa el nombre!' },
        {
          validator: (_:any, value:any) => {
            const names = value.split(' ');
            if (names.length > 2) {
              return Promise.reject('¡Por favor ingresa un nombre o dos separados por espacio!');
            }
            return Promise.resolve();
          },
        },
      ]
    },
    {
      title: 'Apellido',
      dataIndex: 'LASTNAME',
      key: 'lastName',
      rules: [
        { required: true, message: '¡Por favor ingresa el apellido!' },
        {
          validator: (_:any, value:any) => {
            const names = value.split(' ');
            if (names.length > 2) {
              return Promise.reject('¡Por favor ingresa un apellido o dos separados por espacio!');
            }
            return Promise.resolve();
          },
        },
      ]
    },
    {
      title: 'Teléfono',
      dataIndex: 'CELLPHONE',
      key: 'cellphone',
      rules: [
        { required: true, message: '¡Por favor ingresa el teléfono!' },
        { min: 10, message: 'El teléfono debe tener 10 dígitos.' },
        { max: 10, message: 'El teléfono debe tener 10 dígitos.' },
        { pattern: /^[0-9]+$/, message: 'El teléfono debe contener solo números.' }
      ]
    },
    {
      title: 'Correo',
      dataIndex: 'EMAIL',
      key: 'email',
      rules: [
        { required: true, message: '¡Por favor ingresa el correo!' },
        {
          type: 'email',
          message: '¡Por favor ingresa un correo electrónico válido!',
        },
        { max: 40, message: 'El correo debe tener máximo 40 caracteres.' },
      ]
    },
    {
      title: 'Contraseña',
      dataIndex: 'PASSWORD',
      key: 'password',
      rules: [
        { required: true, message: '¡Por favor ingresa la contraseña!' },
        { min: 8, message: 'La contraseña debe tener al menos 8 caracteres.' },
        { max: 16, message: 'La contraseña debe tener máximo 16 caracteres.' },
      ]
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
          searchFields={['ID_NUMBER', 'NAME', 'LASTNAME', 'CELLPHONE', 'EMAIL']}/>
      </div>

      {isEditModalVisible && (
        <CustomModal
          modalTitle="Editar Usuario"
          formColumns={['ID_NUMBER', 'NAME', 'LASTNAME', 'CELLPHONE', 'EMAIL', 'PASSWORD']}
          isVisible={isEditModalVisible}
          handleVisible={setIsEditModalVisible}
          handleAddEdit={handleEditOk}
          columns={columns}
          selectedRecord={selectedRecord}
          icon={<UserSwitchOutlined/>}
          iconColor={CustomColors.WHITE}
          iconBackgroundColor={CustomColors.PRIMARY}
        />
      )}

      <CustomModal
        text='¿Estás seguro de que deseas eliminar este usuario?'
        modalTitle="Confirmar Eliminación"
        isVisible={isDeleteModalVisible}
        handleOk={handleDeleteOk}
        handleVisible={setIsDeleteModalVisible}
        icon={<UserDeleteOutlined/>}
        iconColor={CustomColors.WHITE}
        iconBackgroundColor={CustomColors.DANGEROUS}
      />

      {isAddModalVisible && (
        <CustomModal
          modalTitle="Agregar Usuario"
          formColumns={['ID_NUMBER', 'NAME', 'LASTNAME', 'CELLPHONE', 'EMAIL', 'PASSWORD']}
          isVisible={isAddModalVisible}
          handleVisible={setIsAddModalVisible}
          isAdding ={true}
          handleAddEdit={handleAddOk}
          columns={columns}
          selectedRecord={selectedRecord}
          icon={<UserAddOutlined/>}
          iconColor={CustomColors.WHITE}
          iconBackgroundColor={CustomColors.SUCCESS}
        />
      )}

    </Layout>
  );
};