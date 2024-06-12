import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../components/layout';
import { Button, Space, Row, notification } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined, CopyrightCircleOutlined } from '@ant-design/icons';
import CustomTable from '../../common/table/custom_table';
import CustomModal from '../../common/modal/custom_modal';
import { getAllDependencies, getDependency, addDependency, editDependency, deleteDependency } from '../../providers/options/dependency';
import { CustomColors } from '../../common/constantsCommon'


export const Dependency = () => {
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllDependencies()
      .then((result:any) => {
        if (result.success) {
          setDataSource(result.dependencies);
        } else {
          console.error(result.error.message);
          notification.error({
            message: 'Error de obtención de datos',
            description: `No se pudo obtener las dependencias: ${result.error.message}`
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

  const handleEditOk = async (values:any) => {
    const dependencyObject = { name: values.NAME.toUpperCase()}
    const result:any = await editDependency(selectedRecord.ID, dependencyObject);
    if (!result.success) {
      setIsEditModalVisible(false);
      notification.error({
        message: 'Error de actualización',
        description: `No se pudo actualizar la dependencia: ${result.error.message}`
      });
      return
    }
    const record:any = await getDependency(selectedRecord.ID);
    const editedRaw = record.dependency
    const updatedData:any = dataSource.map((item:any) =>
      item.ID == editedRaw.ID ? editedRaw : item
    );
    setDataSource(updatedData);
    setIsEditModalVisible(false);
    notification.success({
      message: 'Dependencia actualizada',
      description: 'La dependencia ha sido actualizada exitosamente.'
    });
  };

  const handleDeleteOk = async () => {
    const result:any = await deleteDependency(selectedRecord.ID);
    if (!result.success) {
      setIsDeleteModalVisible(false);
      notification.error({
        message: 'Error de eliminación',
        description: `No se pudo eliminar la dependencia: ${result.error.message}`
      });
      return
    }
    const newData = dataSource.filter((item:any) => item.ID !== selectedRecord.ID);
    setDataSource(newData);
    setIsDeleteModalVisible(false);
    notification.success({
      message: 'Dependencia eliminada',
      description: 'La dependencia ha sido eliminada exitosamente.'
    });
  };

  const handleAddOk = async (values: any) => {
    const dependencyObject = { name: values.NAME.toUpperCase()}
    const result:any = await addDependency(dependencyObject);
    if (!result.success) {
      setIsAddModalVisible(false);
      notification.error({
        message: 'Error de agregación',
        description: `No se pudo agregar la dependencia: ${result.error.message}`
      });
      return
    }

    const newRecord:any = await getDependency(result.dependency.insertId);
    const updatedDataSource:any = [...dataSource, newRecord.dependency];
    setDataSource(updatedDataSource);
    setIsAddModalVisible(false);
    notification.success({
      message: 'Dependencia agregada',
      description: 'La dependencia ha sido agregada exitosamente.'
    });
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'ID',
      key: 'id',
    },
    {
      title: 'Nombre',
      dataIndex: 'NAME',
      key: 'name',
      rules: [
        { required: true, message: '¡Por favor ingresa la dependencia!' },
        { max: 50, message: '¡Debe contener máximo 50 caracteres!' },
      ]
    },
    {
      title: 'Fecha de Creación',
      dataIndex: 'CREATION_DATE',
      key: 'date',
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
        <h1 style={{ marginBottom: '20px' }}>Lista de dependencias</h1>
        <Row gutter={[16, 16]}>
        </Row>
        <CustomTable dataSource={dataSource} columns={columns} rowKey="ID" handleAdd={handleAdd} 
          searchFields={['NAME', 'CREATION_DATE']}/>
      </div>

      {isEditModalVisible && (
        <CustomModal
          modalTitle="Editar Dependencia"
          formColumns={['NAME']}
          isVisible={isEditModalVisible}
          handleVisible={setIsEditModalVisible}
          handleAddEdit={handleEditOk}
          columns={columns}
          selectedRecord={selectedRecord}
          icon={<CopyrightCircleOutlined/>}
          iconColor={CustomColors.WHITE}
          iconBackgroundColor={CustomColors.PRIMARY}
        />
      )}

      <CustomModal
        text='¿Estás seguro de que deseas eliminar esta dependencia?'
        modalTitle="Confirmar Eliminación"
        isVisible={isDeleteModalVisible}
        handleOk={handleDeleteOk}
        handleVisible={setIsDeleteModalVisible}
        icon={<MinusCircleOutlined/>}
          iconColor={CustomColors.WHITE}
          iconBackgroundColor={CustomColors.DANGEROUS}
      />

      {isAddModalVisible && (
        <CustomModal
          modalTitle="Agregar Dependencia"
          formColumns={['NAME']}
          isVisible={isAddModalVisible}
          handleVisible={setIsAddModalVisible}
          isAdding ={true}
          handleAddEdit={handleAddOk}
          columns={columns}
          selectedRecord={selectedRecord}
          icon={<PlusCircleOutlined/>}
          iconColor={CustomColors.WHITE}
          iconBackgroundColor={CustomColors.SUCCESS}
        />
      )}

    </Layout>
  );
};