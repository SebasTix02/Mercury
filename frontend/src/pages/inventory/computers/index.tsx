import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../../components/layout';
import { Button, Space, Row, notification } from 'antd';
import { EditOutlined, DeleteOutlined, UserAddOutlined, UserDeleteOutlined, UserSwitchOutlined, ToolOutlined } from '@ant-design/icons';
import CustomTable from '../../../common/table/custom_table';
import CustomModal from '../../../common/modal/custom_modal';
import { CustomColors } from '../../../common/constantsCommon';
import { addComputer, deleteComputer, editComputer, getAllComputers } from '../../../providers/options/computer';
import { getAllBuildings } from '../../../providers/options/building';
import { getAllLocations } from '../../../providers/options/location';
import { getAllCategories } from '../../../providers/options/category';
import { getAllBrands } from '../../../providers/options/brand';
import { getAllDependencies } from '../../../providers/options/dependency';

export const Inventario_Computadores = () => {
  const [dataSource, setDataSource] = useState([]);
  const [buildings, setBuildings] = useState([])
  const [locations, setLocations] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [dependencies, setDependencies] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllComputers()
      .then((result: any) => {
        if (result.success) {
          setDataSource(result.computers);
          getAllBuildings().then((buildData:any) => {
            setBuildings(buildData.buildings);
          })
          getAllLocations().then((locationData:any) => {
            setLocations(locationData.locations);
          })
          getAllCategories().then((categoriesData:any) => {
            setCategories(categoriesData.categories);
          })
          getAllBrands().then((brandsData:any) => {
            setBrands(brandsData.brands);
          })
          getAllDependencies().then((dependenciesData:any) => {
            setDependencies(dependenciesData.dependencies);
          })
        } else {
          console.error(result.error.message);
          notification.error({
            message: 'Error de obtención de datos',
            description: `No se pudo obtener los computadores: ${result.error.message}`,
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
  const handleRepower = (record: any) => {
    alert("repotenciacion en proceso")
  };

  const handleAdd = () => {
    setSelectedRecord(null);
    setIsAddModalVisible(true);
  };

  const handleEditOk = async (values: any) => {
    var objectEdit={
      "categoryId": values.CATEGORY,
      "name": values.NAME,
      "brandId": values.BRAND,
      "model": values.MODEL,
      "feature": null,
      "series": values.SERIES,
      "acquisitionDependencyId": values.ACQUISITION_DEPENDENCY,
      "entryDate": values.ENTRY_DATE,
      "currentCustodian": values.CURRENT_CUSTODIAN,
      "locationId": values.LOCATION,
      "ip": values.IP,
      "operativeSystem": values.OPERATIVE_SYSTEM
  }
  console.log(values);
    const result: any = await editComputer(selectedRecord.ASSET_KEY, objectEdit);
    if (!result.success) {
      setIsEditModalVisible(false);
      notification.error({
        message: 'Error de actualización',
        description: `No se pudo actualizar el computador: ${result.error.message}`,
      });
      return;
    }
    const editedRaw = values;
    editedRaw.ASSET_KEY = selectedRecord.ASSET_KEY;
    const updatedData: any = dataSource.map((item: any) =>
      item.ASSET_KEY === editedRaw.ASSET_KEY ? editedRaw : item
    );
    setDataSource(updatedData);
    setIsEditModalVisible(false);
    notification.success({
      message: 'Computador actualizado',
      description: 'El computador ha sido actualizado exitosamente.',
    });
  };

  const handleDeleteOk = async () => {
    const result: any = await deleteComputer(selectedRecord.ASSET_KEY);
    if (!result.success) {
      setIsDeleteModalVisible(false);
      notification.error({
        message: 'Error de eliminación',
        description: `No se pudo eliminar el computador: ${result.error.message}`,
      });
      return;
    }
    const newData = dataSource.filter((item: any) => item.ASSET_KEY !== selectedRecord.ASSET_KEY);
    setDataSource(newData);
    setIsDeleteModalVisible(false);
    notification.success({
      message: 'Computador eliminado',
      description: 'El computador ha sido eliminado exitosamente.',
    });
  };

  const handleAddOk = async (values: any) => {
    var objectAdd={
      "assetKey": values.ASSET_KEY,
      "categoryId": values.CATEGORY,
      "name": values.NAME,
      "brandId": values.BRAND,
      "model": values.MODEL,
      "feature": null,
      "series": values.SERIES,
      "acquisitionDependencyId": values.ACQUISITION_DEPENDENCY,
      "entryDate": values.ENTRY_DATE,
      "currentCustodian": values.CURRENT_CUSTODIAN,
      "locationId": values.LOCATION,
      "ip": values.IP,
      "operativeSystem": values.OPERATIVE_SYSTEM
  }
    const result: any = await addComputer(objectAdd);
    if (!result.success) {
      setIsAddModalVisible(false);
      notification.error({
        message: 'Error de agregación',
        description: `No se pudo agregar el computador: ${result.error.message}`,
      });
      return;
    }

    const newRecord = { ...values };
    newRecord.ASSET_KEY = result.computer.insertId;

    const updatedDataSource: any = [...dataSource, newRecord];
    setDataSource(updatedDataSource);
    setIsAddModalVisible(false);
    notification.success({
      message: 'Computador agregado',
      description: 'El computador ha sido agregado exitosamente.',
    });
  };

  const columns = [
    {
      title: 'ID_Activo',
      dataIndex: 'ASSET_KEY',
      key: 'asset_Key',
    },
    {
      title: 'ID',
      dataIndex: 'COMPUTER_ID',
      key: 'computer_id',
    },
    {
      title: 'Categoría',
      dataIndex: 'CATEGORY',
      key: 'category',
      rules: [
        { required: true, message: '¡Por favor selecciona la categoria!' },
      ]
    },
    {
      title: 'Nombre',
      dataIndex: 'NAME',
      key: 'name',
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
      title: 'Ubicación',
      dataIndex: 'LOCATION',
      key: 'location',
      rules: [
        { required: true, message: '¡Por favor selecciona la ubicacion!' },
      ]
    },
    {
      title: 'Marca',
      dataIndex: 'BRAND',
      key: 'brand',
      rules: [
        { required: true, message: '¡Por favor selecciona la marca!' },
      ]
    },
    {
      title: 'Modelo',
      dataIndex: 'MODEL',
      key: 'model',
    },
    {
      title: 'Sistema Operativo',
      dataIndex: 'OPERATIVE_SYSTEM',
      key: 'operativeSystem',
    },
    {
      title: 'IP',
      dataIndex: 'IP',
      key: 'ip',
    },
    {
      title: 'Capacidad de RAM',
      dataIndex: 'RAM_CAPACITY',
      key: 'ramCapacity',
    },
    {
      title: 'Capacidad de Disco',
      dataIndex: 'DISK_CAPACITY',
      key: 'diskCapacity',
    },
    {
      title: 'Capacidad Gráfica',
      dataIndex: 'GRAPH_CAPACITY',
      key: 'graphCapacity',
    },
    {
      title: 'Serie',
      dataIndex: 'SERIES',
      key: 'series',
    },
    {
      title: 'Dependencia de Adquisición',
      dataIndex: 'ACQUISITION_DEPENDENCY',
      key: 'acquisitionDependency',
      rules: [
        { required: true, message: '¡Por favor selecciona la dependencia de adquisicion!' },
      ]
    },
    {
      title: 'Fecha de Ingreso',
      dataIndex: 'ENTRY_DATE',
      key: 'entryDate',
    },
    {
      title: 'Custodio Actual',
      dataIndex: 'CURRENT_CUSTODIAN',
      key: 'currentCustodian',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}></Button>
          <Button type="dashed" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}></Button>
          <Button type="dashed" icon={<ToolOutlined />} onClick={() => handleRepower(record)}></Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h1 style={{ marginBottom: '20px' }}>Inventario de Computadores</h1>
        <Row gutter={[16, 16]}>
        </Row>
        <CustomTable dataSource={dataSource} columns={columns} rowKey="ASSET_KEY" searchFields={['NAME','CATEGORY', 'BRAND', 'MODEL', 'CURRENT_CUSTODIAN']} handleAdd={handleAdd}/>
      </div>

      {isEditModalVisible && (
        <CustomModal
          modalTitle="Editar Computador"
          formColumns={['ASSET_KEY','CATEGORY', 'NAME', 'BRAND', 'MODEL','SERIES', 'ACQUISITION_DEPENDENCY', 'ENTRY_DATE', 'CURRENT_CUSTODIAN', 'LOCATION', 'IP', 'OPERATIVE_SYSTEM']}
          selectTypeInputs={[[1, categories],[3,brands],[6, dependencies],[9, locations]]}
          isVisible={isEditModalVisible}
          handleVisible={setIsEditModalVisible}
          handleAddEdit={handleEditOk}
          columns={columns}
          selectedRecord={selectedRecord}
          icon={<UserSwitchOutlined />}
          iconColor={CustomColors.WHITE}
          iconBackgroundColor={CustomColors.PRIMARY}
        />
      )}

      <CustomModal
        text='¿Estás seguro de que deseas eliminar este computador?'
        modalTitle="Confirmar Eliminación"
        isVisible={isDeleteModalVisible}
        handleOk={handleDeleteOk}
        handleVisible={setIsDeleteModalVisible}
        icon={<UserDeleteOutlined />}
        iconColor={CustomColors.WHITE}
        iconBackgroundColor={CustomColors.DANGEROUS}
      />

      {isAddModalVisible && (
        <CustomModal
          modalTitle="Agregar Computador"
          formColumns={['ASSET_KEY','CATEGORY', 'NAME', 'BRAND', 'MODEL','SERIES', 'ACQUISITION_DEPENDENCY', 'ENTRY_DATE', 'CURRENT_CUSTODIAN', 'LOCATION', 'IP', 'OPERATIVE_SYSTEM']}
          selectTypeInputs={[[1, categories],[3,brands],[6, dependencies],[9, locations]]}
          isVisible={isAddModalVisible}
          handleVisible={setIsAddModalVisible}
          isAdding={true}
          handleAddEdit={handleAddOk}
          columns={columns}
          selectedRecord={selectedRecord}
          icon={<UserAddOutlined />}
          iconColor={CustomColors.WHITE}
          iconBackgroundColor={CustomColors.SUCCESS}
        />
      )}
    </Layout>
  );
};
