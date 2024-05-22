import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../components/layout';
import { Button, Space, Row, notification } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined, CopyrightCircleOutlined } from '@ant-design/icons';
import CustomTable from '../../common/table/custom_table';
import CustomModal from '../../common/modal/custom_modal';
import { getAllSoftware, getSoftware, addSoftware, editSoftware, deleteSoftware } from '../../providers/options/software';
import { CustomColors } from '../../common/constantsCommon'


export const Software = () => {
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllSoftware()
      .then((result:any) => {
        if (result.success) {
          setDataSource(result.software);
        } else {
          console.error(result.error.message);
          notification.error({
            message: 'Error de obtención de datos',
            description: `No se pudo obtener el Software: ${result.error.message}`
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
    // const locationObject = { 
    //   name: values.NAME.toUpperCase(),
    //   buildingId : values.BUILDING
    // }
    // const result:any = await editLocation(selectedRecord.ID, locationObject);
    // if (!result.success) {
    //   setIsEditModalVisible(false);
    //   notification.error({
    //     message: 'Error de actualización',
    //     description: `No se pudo actualizar la ubicación: ${result.error.message}`
    //   });
    //   return
    // }
    // const record:any = await getLocation(selectedRecord.ID);
    // const editedRaw = record.location
    // const updatedData:any = dataSource.map((item:any) =>
    //   item.ID == editedRaw.ID ? editedRaw : item
    // );
    // setDataSource(updatedData);
    // setIsEditModalVisible(false);
    // notification.success({
    //   message: 'Ubicación actualizada',
    //   description: 'La ubicación ha sido actualizada exitosamente.'
    // });
  };

  const handleDeleteOk = async () => {
    // const result:any = await deleteLocation(selectedRecord.ID);
    // if (!result.success) {
    //   setIsDeleteModalVisible(false);
    //   notification.error({
    //     message: 'Error de eliminación',
    //     description: `No se pudo eliminar la ubicación: ${result.error.message}`
    //   });
    //   return
    // }
    // const newData = dataSource.filter((item:any) => item.ID !== selectedRecord.ID);
    // setDataSource(newData);
    // setIsDeleteModalVisible(false);
    // notification.success({
    //   message: 'Ubicación eliminada',
    //   description: 'La ubicación ha sido eliminada exitosamente.'
    // });
  };

  const handleAddOk = async (values: any) => {
    // const locationObject = { 
    //   name: values.NAME.toUpperCase(),
    //   buildingId : values.BUILDING
    // }
    // const result:any = await addLocation(locationObject);
    // if (!result.success) {
    //   setIsAddModalVisible(false);
    //   notification.error({
    //     message: 'Error de agregación',
    //     description: `No se pudo agregar la ubicación: ${result.error.message}`
    //   });
    //   return
    // }

    // const newRecord:any = await getLocation(result.location.insertId);
    // const updatedDataSource:any = [...dataSource, newRecord.location];
    // setDataSource(updatedDataSource);
    // setIsAddModalVisible(false);
    // notification.success({
    //   message: 'Ubicación agregada',
    //   description: 'La ubicación ha sido agregada exitosamente.'
    // });
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
        { required: true, message: '¡Por favor ingresa el software!' },
        { max: 50, message: '¡Debe contener máximo 50 caracteres!' },
      ]
    },
    {
      title: 'Versión',
      dataIndex: 'VERSION',
      key: 'version',
      rules: [
        { required: true, message: '¡Por favor ingresa la versión!' },
        { max: 20, message: '¡Debe contener máximo 20 caracteres!' },
      ]
    },
    {
      title: 'Licencia',
      dataIndex: 'LICENSE',
      key: 'license',
      rules: [
        { required: true, message: '¡Por favor ingresa la licencia!' },
      ]
    },
    {
      title: 'Duración Licencia',
      dataIndex: 'LICENSE_DURATION',
      key: 'license_duration',
      rules: [
        { required: true, message: '¡Por favor ingresa la duración de la licencia!' },
        { max: 20, message: '¡Debe contener máximo 20 caracteres!' },
      ]
    },
    {
      title: 'Tipo Laboratorio',
      dataIndex: 'LAB_TYPE',
      key: 'lab_type',
      rules: [
        { required: true, message: '¡Por favor ingresa el tipo de laboratorio!' },
        { max: 50, message: '¡Debe contener máximo 50 caracteres!' },
      ]
    },
    {
      title: 'Fecha de Ingreso',
      dataIndex: 'ENTRY_DATE',
      key: 'entry_date',
      rules: [
        { required: true, message: '¡Por favor ingresa la fecha de adquisición!' },
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

  const licenses = [
    {
     ID: 1,
     NAME: 'PROPIETARIO'
    },
    {
     ID: 2,
     NAME: 'LIBRE'
    },
  ]

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
          modalTitle="Editar Software"
          formColumns={['NAME', 'VERSION', 'LICENSE', 'LICENSE_DURATION', 'LAB_TYPE', 'ENTRY_DATE']}
          selectTypeInputs={[[2, licenses]]}
          dateTypeInputs={[5]}
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
        text='¿Estás seguro de que deseas eliminar este software?'
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
          modalTitle="Agregar Software"
          formColumns={['NAME', 'VERSION', 'LICENSE', 'LICENSE_DURATION', 'LAB_TYPE', 'ENTRY_DATE']}
          selectTypeInputs={[[2, licenses]]}
          dateTypeInputs={[5]}
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