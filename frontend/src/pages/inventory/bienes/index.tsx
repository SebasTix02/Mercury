import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../../components/layout';
import { Button, Space, Row, notification } from 'antd';
import { EditOutlined, DeleteOutlined, UserAddOutlined, UserDeleteOutlined, UserSwitchOutlined, ToolOutlined } from '@ant-design/icons';
import CustomTable from '../../../common/table/custom_table';
import CustomModal from '../../../common/modal/custom_modal';
import { CustomColors } from '../../../common/constantsCommon';
import { addAsset, deleteAsset, editAsset, getAllAssets } from '../../../providers/options/asset';
import { getAllBuildings } from '../../../providers/options/building';
import { getAllLocations } from '../../../providers/options/location';
import { getAllCategories } from '../../../providers/options/category';
import { getAllBrands } from '../../../providers/options/brand';
import { getAllDependencies } from '../../../providers/options/dependency';

export const Inventario_Bienes = () => {
  type Category = {
    id: number;
    name: string;
  };
  
  type Brand = {
    id: number;
    name: string;
  };
  
  type Dependency = {
    id: number;
    name: string;
  };
  
  type Location = {
    id: number;
    name: string;
  };
  
  const [dataSource, setDataSource] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [dependencies, setDependencies] = useState<Dependency[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllAssets()
      .then((result: any) => {
        if (result.success) {
          setDataSource(result.assets);
          getAllBuildings().then((buildData: any) => {
            setBuildings(buildData.buildings);
          });
          getAllLocations().then((locationData: any) => {
            setLocations(locationData.locations);
          });
          getAllCategories().then((categoriesData: any) => {
            setCategories(categoriesData.categories);
          });
          getAllBrands().then((brandsData: any) => {
            setBrands(brandsData.brands);
          });
          getAllDependencies().then((dependenciesData: any) => {
            setDependencies(dependenciesData.dependencies);
          });
        } else {
          console.error(result.error.message);
          notification.error({
            message: 'Error de obtención de datos',
            description: `No se pudo obtener los activos: ${result.error.message}`,
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
    console.log("Record CATEGORY:", record.CATEGORY);
    console.log("Categories:", categories);
    const editRecord = {
      ...record,
      CATEGORY: categories.find((cat) => cat.id === record.CATEGORY) || {},
      BRAND: brands.find((brand) => brand.id === record.BRAND) || {},
      ACQUISITION_DEPENDENCY: dependencies.find((dep) => dep.id === record.ACQUISITION_DEPENDENCY) || {},
      LOCATION: locations.find((loc) => loc.id === record.LOCATION) || {},
    };
    setSelectedRecord(editRecord);
    setIsEditModalVisible(true);
  };
  
  
  

  const handleDelete = (record: any) => {
    setSelectedRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleRepower = (record: any) => {
    alert("repotenciacion en proceso");
  };

  const handleAdd = () => {
    setSelectedRecord(null);
    setIsAddModalVisible(true);
  };

  const handleEditOk = async (values: any) => {
    const objectEdit = {
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
    };
    console.log(values);
    const result: any = await editAsset(selectedRecord.ASSET_KEY, objectEdit);
    if (!result.success) {
      setIsEditModalVisible(false);
      notification.error({
        message: 'Error de actualización',
        description: `No se pudo actualizar el activo: ${result.error.message}`,
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
      message: 'Activo actualizado',
      description: 'El activo ha sido actualizado exitosamente.',
    });
  };
  

  const handleDeleteOk = async () => {
    const result: any = await deleteAsset(selectedRecord.ASSET_KEY);
    if (!result.success) {
      setIsDeleteModalVisible(false);
      notification.error({
        message: 'Error de eliminación',
        description: `No se pudo eliminar el activo: ${result.error.message}`,
      });
      return;
    }
    const newData = dataSource.filter((item: any) => item.ASSET_KEY !== selectedRecord.ASSET_KEY);
    setDataSource(newData);
    setIsDeleteModalVisible(false);
    notification.success({
      message: 'Activo eliminado',
      description: 'El activo ha sido eliminado exitosamente.',
    });
  };

  const handleAddOk = async (values: any) => {
    var objectAdd = {
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
    };
    const result: any = await addAsset(objectAdd);
    if (!result.success) {
      setIsAddModalVisible(false);
      notification.error({
        message: 'Error de agregación',
        description: `No se pudo agregar el activo: ${result.error.message}`,
      });
      return;
    }

    const newRecord = { ...values };
    newRecord.ASSET_KEY = result.asset.insertId;

    const updatedDataSource: any = [...dataSource, newRecord];
    setDataSource(updatedDataSource);
    setIsAddModalVisible(false);
    notification.success({
      message: 'Activo agregado',
      description: 'El activo ha sido agregado exitosamente.',
    });
  };

  const columns = [
    {
      title: 'ID_Activo',
      dataIndex: 'ASSET_KEY',
      key: 'asset_key',
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
      title: 'Serie',
      dataIndex: 'SERIES',
      key: 'series',
    },
    {
      title: 'Dependencia de Adquisición',
      dataIndex: 'ACQUISITION_DEPENDENCY',
      key: 'acquisition_dependency',
      rules: [
        { required: true, message: '¡Por favor selecciona la dependencia de adquisicion!' },
      ]
    },
    {
      title: 'Fecha de Ingreso',
      dataIndex: 'ENTRY_DATE',
      key: 'entry_date',
    },
    {
      title: 'Custodio Actual',
      dataIndex: 'CURRENT_CUSTODIAN',
      key: 'current_custodian',
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
        <h1 style={{ marginBottom: '20px' }}>Inventario Bienes Generales</h1>
        <Row gutter={[16, 16]}></Row>
        <CustomTable dataSource={dataSource} columns={columns} rowKey="ASSET_KEY" searchFields={['NAME','CATEGORY', 'BRAND', 'MODEL', 'CURRENT_CUSTODIAN']} handleAdd={handleAdd}/>
      </div>

      {isEditModalVisible && (
        <CustomModal
          modalTitle="Editar Activo"
          formColumns={['ASSET_KEY', 'CATEGORY', 'NAME', 'BRAND', 'MODEL', 'SERIES', 'ACQUISITION_DEPENDENCY', 'ENTRY_DATE', 'CURRENT_CUSTODIAN', 'LOCATION', 'IP', 'OPERATIVE_SYSTEM']}
          selectTypeInputs={[[1, categories], [3, brands], [6, dependencies], [9, locations]]}
          dateTypeInputs={[7]}
          isVisible={isEditModalVisible}
          handleVisible={setIsEditModalVisible}
          handleAddEdit={handleEditOk}
          columns={columns}
          selectedRecord={selectedRecord} // Asegurar que selectedRecord se pase aquí
          icon={<UserSwitchOutlined />}
          iconColor={CustomColors.WHITE}
          iconBackgroundColor={CustomColors.PRIMARY}
        />
      )}



      <CustomModal
        text='¿Estás seguro de que deseas eliminar este activo?'
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
          modalTitle="Agregar Activo"
          formColumns={['ASSET_KEY','CATEGORY', 'NAME', 'BRAND', 'MODEL','SERIES', 'ACQUISITION_DEPENDENCY', 'ENTRY_DATE', 'CURRENT_CUSTODIAN', 'LOCATION', 'IP', 'OPERATIVE_SYSTEM']}
          selectTypeInputs={[[1, categories],[3,brands],[6, dependencies],[9, locations]]}
          dateTypeInputs={[7]}
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