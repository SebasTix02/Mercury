import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../components/layout';
import { Button, Space, Row, notification } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined, CopyrightCircleOutlined } from '@ant-design/icons';
import CustomTable from '../../common/table/custom_table';
import CustomModal from '../../common/modal/custom_modal';
import { getAllLocations, getLocation, addLocation, editLocation, deleteLocation } from '../../providers/options/location';
import { getAllBuildings } from '../../providers/options/building';
import { CustomColors } from '../../common/constantsCommon'


export const Locations = () => {
  const [dataSource, setDataSource] = useState([])
  const [buildings, setBuildings] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllLocations()
      .then((result:any) => {
        if (result.success) {
          setDataSource(result.locations);
          getAllBuildings().then((buildData:any) => {
            setBuildings(buildData.buildings);
          })
        } else {
          console.error(result.error.message);
          notification.error({
            message: 'Error de obtención de datos',
            description: `No se pudo obtener las ubicaciones: ${result.error.message}`
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
    const locationObject = { 
      name: values.NAME.toUpperCase(),
      buildingId : values.BUILDING
    }
    const result:any = await editLocation(selectedRecord.ID, locationObject);
    if (!result.success) {
      setIsEditModalVisible(false);
      notification.error({
        message: 'Error de actualización',
        description: `No se pudo actualizar la ubicación: ${result.error.message}`
      });
      return
    }
    const record:any = await getLocation(selectedRecord.ID);
    const editedRaw = record.location
    const updatedData:any = dataSource.map((item:any) =>
      item.ID == editedRaw.ID ? editedRaw : item
    );
    setDataSource(updatedData);
    setIsEditModalVisible(false);
    notification.success({
      message: 'Ubicación actualizada',
      description: 'La ubicación ha sido actualizada exitosamente.'
    });
  };

  const handleDeleteOk = async () => {
    const result:any = await deleteLocation(selectedRecord.ID);
    if (!result.success) {
      setIsDeleteModalVisible(false);
      notification.error({
        message: 'Error de eliminación',
        description: `No se pudo eliminar la ubicación: ${result.error.message}`
      });
      return
    }
    const newData = dataSource.filter((item:any) => item.ID !== selectedRecord.ID);
    setDataSource(newData);
    setIsDeleteModalVisible(false);
    notification.success({
      message: 'Ubicación eliminada',
      description: 'La ubicación ha sido eliminada exitosamente.'
    });
  };

  const handleAddOk = async (values: any) => {
    const locationObject = { 
      name: values.NAME.toUpperCase(),
      buildingId : values.BUILDING
    }
    const result:any = await addLocation(locationObject);
    if (!result.success) {
      setIsAddModalVisible(false);
      notification.error({
        message: 'Error de agregación',
        description: `No se pudo agregar la ubicación: ${result.error.message}`
      });
      return
    }

    const newRecord:any = await getLocation(result.location.insertId);
    const updatedDataSource:any = [...dataSource, newRecord.location];
    setDataSource(updatedDataSource);
    setIsAddModalVisible(false);
    notification.success({
      message: 'Ubicación agregada',
      description: 'La ubicación ha sido agregada exitosamente.'
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
        { required: true, message: '¡Por favor ingresa la ubicación!' },
        { max: 50, message: '¡Debe contener máximo 50 caracteres!' },
      ]
    },
    {
      title: 'Bloque',
      dataIndex: 'BUILDING',
      key: 'building',
      rules: [
        { required: true, message: '¡Por favor selecciona el bloque!' },
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
        <h1 style={{ marginBottom: '20px' }}>Lista de Ubicaciones</h1>
        <Row gutter={[16, 16]}>
        </Row>
        <CustomTable dataSource={dataSource} columns={columns} rowKey="ID" handleAdd={handleAdd} 
          searchFields={['NAME', 'BUILDING']}/>
      </div>

      {isEditModalVisible && (
        <CustomModal
          modalTitle="Editar Ubicación"
          formColumns={['NAME', 'BUILDING']}
          selectTypeInputs={[[1, buildings]]}
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
        text='¿Estás seguro de que deseas eliminar esta ubicación?'
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
          modalTitle="Agregar Ubicación"
          formColumns={['NAME', 'BUILDING']}
          selectTypeInputs={[[1, buildings]]}
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