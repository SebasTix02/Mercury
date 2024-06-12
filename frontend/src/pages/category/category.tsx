import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../components/layout';
import { Button, Space, Row, notification } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined, CopyrightCircleOutlined } from '@ant-design/icons';
import CustomTable from '../../common/table/custom_table';
import CustomModal from '../../common/modal/custom_modal';
import { getAllCategories, getCategory, addCategory, editCategory, deleteCategory } from '../../providers/options/category';
import { CustomColors } from '../../common/constantsCommon'


export const Categorias = () => {
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCategories()
      .then((result:any) => {
        if (result.success) {
          setDataSource(result.categories);
        } else {
          console.error(result.error.message);
          notification.error({
            message: 'Error de obtención de datos',
            description: `No se pudo obtener las categorías: ${result.error.message}`
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
    const categoryObject = { name: values.NAME.toUpperCase()}
    const result:any = await editCategory(selectedRecord.ID, categoryObject);
    if (!result.success) {
      setIsEditModalVisible(false);
      notification.error({
        message: 'Error de actualización',
        description: `No se pudo actualizar la categoría: ${result.error.message}`
      });
      return
    }
    const record:any = await getCategory(selectedRecord.ID);
    const editedRaw = record.category
    const updatedData:any = dataSource.map((item:any) =>
      item.ID == editedRaw.ID ? editedRaw : item
    );
    setDataSource(updatedData);
    setIsEditModalVisible(false);
    notification.success({
      message: 'Categoría actualizada',
      description: 'La categoría ha sido actualizada exitosamente.'
    });
  };

  const handleDeleteOk = async () => {
    const result:any = await deleteCategory(selectedRecord.ID);
    if (!result.success) {
      setIsDeleteModalVisible(false);
      notification.error({
        message: 'Error de eliminación',
        description: `No se pudo eliminar la categoría: ${result.error.message}`
      });
      return
    }
    const newData = dataSource.filter((item:any) => item.ID !== selectedRecord.ID);
    setDataSource(newData);
    setIsDeleteModalVisible(false);
    notification.success({
      message: 'Categoría eliminada',
      description: 'La categoría ha sido eliminada exitosamente.'
    });
  };

  const handleAddOk = async (values: any) => {
    const categoryObject = { name: values.NAME.toUpperCase()}
    const result:any = await addCategory(categoryObject);
    if (!result.success) {
      setIsAddModalVisible(false);
      notification.error({
        message: 'Error de agregación',
        description: `No se pudo agregar la categoría: ${result.error.message}`
      });
      return
    }

    const newRecord:any = await getCategory(result.category.insertId);
    const updatedDataSource:any = [...dataSource, newRecord.category];
    setDataSource(updatedDataSource);
    setIsAddModalVisible(false);
    notification.success({
      message: 'Categoría agregada',
      description: 'La categoría ha sido agregada exitosamente.'
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
        { required: true, message: '¡Por favor ingresa la categoría!' },
        { max: 100, message: '¡Debe contener máximo 100 caracteres!' },
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
        <h1 style={{ marginBottom: '20px' }}>Lista de Categorías</h1>
        <Row gutter={[16, 16]}>
        </Row>
        <CustomTable dataSource={dataSource} columns={columns} rowKey="ID" handleAdd={handleAdd} 
          searchFields={['NAME', 'CREATION_DATE']}/>
      </div>

      {isEditModalVisible && (
        <CustomModal
          modalTitle="Editar Categoría"
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
        text='¿Estás seguro de que deseas eliminar esta categoría?'
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
          modalTitle="Agregar Categoría"
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