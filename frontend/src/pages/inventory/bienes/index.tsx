import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../../components/layout';
import { Button, Space, Row, notification } from 'antd';
import { EditOutlined, DeleteOutlined, UserAddOutlined, UserDeleteOutlined, UserSwitchOutlined, ToolOutlined } from '@ant-design/icons';
import CustomTable from '../../../common/table/custom_table';
import CustomModal from '../../../common/modal/custom_modal';
import { CustomColors } from '../../../common/constantsCommon';
import { addAsset, deleteAsset, editAsset, getAllAssets, getAssetByAssetKey } from '../../../providers/options/asset';
import { getAllBuildings } from '../../../providers/options/building';
import { getAllLocations } from '../../../providers/options/location';
import { getAllCategories } from '../../../providers/options/category';
import { getAllBrands } from '../../../providers/options/brand';
import { getAllDependencies } from '../../../providers/options/dependency';
import { getAllUsers } from '../../../providers/options/users';
import { useNavigate, useParams } from 'react-router-dom';

export const Inventario_Bienes = () => {
  const { scannedCode } = useParams();
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState<any>([]);
  const [brands, setBrands] = useState([]);
  const [dependencies, setDependencies] = useState([]);
  const [custodians, setCustodians] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: any = await getAllAssets();
        if (result.success) {
          setDataSource(result.assets);
          const [buildData, locationData, categoriesData, brandsData, dependenciesData, custodiansData] = await Promise.all([
            getAllBuildings(),
            getAllLocations(),
            getAllCategories(),
            getAllBrands(),
            getAllDependencies(),
            getAllUsers(),
          ]);
          setBuildings(buildData.buildings);
          setLocations(locationData.locations);
          setCategories(categoriesData.categories);
          setBrands(brandsData.brands);
          setDependencies(dependenciesData.dependencies);
          setCustodians(custodiansData.users);
          
          if (scannedCode) {
            const parsedCode = parseInt(scannedCode, 10);
            const assetResult: any = await getAssetByAssetKey(parsedCode);
            if (assetResult.success) {
              setSelectedRecord(assetResult.asset);
              setIsEditModalVisible(true);
            } else {
              notification.error({
                message: 'Error de obtención de datos',
                description: `No se pudo obtener el bien con el código escaneado: ${assetResult.error.message}`,
              });
            }
          }
        } else {
          notification.error({
            message: 'Error de obtención de datos',
            description: `No se pudo obtener los bienes: ${result.error.message}`,
          });
        }
      } catch (error: any) {
        console.error(error);
        notification.error({
          message: 'Error de obtención de datos',
          description: `Ocurrió un error al obtener los datos: ${error.message}`,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [scannedCode]);

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
    setSelectedRecord(null);
    setIsAddModalVisible(true);
  };

  const status = [
    {
     ID: 0,
     NAME: 'NO PRESTADO'
    },
    {
     ID: 1,
     NAME: 'PRESTADO'
    },
  ]

  const getCustodianName = (values:any) => {
    const custodian = typeof values.CURRENT_CUSTODIAN === 'number'
    ? custodians.find((l:any) => l.ID === values.CURRENT_CUSTODIAN)
    : values.CURRENT_CUSTODIAN;

    const custodianName = typeof custodian === 'object' && custodian !== null 
    ? `${custodian.NAME} ${custodian.LASTNAME}` 
    : custodian;
    return custodianName;
  }

  const getColumnNameId = (values: any, field: string, isName: boolean, status: any[]) => {
    const statusItem = typeof values[field] === 'number'
      ? status.find((l: any) => l.ID === values[field])
      : status.find((l: any) => l.NAME === values[field]);
    return isName ? statusItem?.NAME : statusItem?.ID;
  };

  const handleEditOk = async (values: any) => {
    console.table(values);

    // Mantener los valores existentes para los campos no editados
    const updatedValues = {
        ...selectedRecord,
        ...values
    };
    var objectEdit = {
      "categoryId": categories[0].ID,
      "name": updatedValues.NAME,
      "brandId": getColumnNameId(updatedValues, 'BRAND', false, brands),
      "model": updatedValues.MODEL,
      "feature": updatedValues.FEATURE,
      "series": updatedValues.SERIES,
      "acquisitionDependencyId": getColumnNameId(updatedValues, 'ACQUISITION_DEPENDENCY', false, dependencies),
      "entryDate": updatedValues.ENTRY_DATE,
      "currentCustodian": getCustodianName(updatedValues),
      "locationId": getColumnNameId(updatedValues, 'LOCATION', false, locations),
      "ip": updatedValues.IP,
      "operativeSystem": updatedValues.OPERATIVE_SYSTEM,
      "borrowed": getColumnNameId(updatedValues, 'BORROWED', false, status),
      "position": updatedValues.POSITION
  };
    const result: any = await editAsset(selectedRecord.ASSET_KEY, objectEdit);
    if (!result.success) {
      setIsEditModalVisible(false);
      notification.error({
        message: 'Error de actualización',
        description: `No se pudo actualizar el activo: ${result.error.message}`,
      });
      return;
    }

    const editedRaw = { ...selectedRecord, ...updatedValues };

    const convertField = (field: string, statusList: any[]) => {
      const statusItem = statusList.find((item: any) => item.ID === updatedValues[field]);
      return statusItem ? statusItem.NAME : updatedValues[field];
  };
      editedRaw.BRAND = convertField('BRAND', brands);
      editedRaw.ACQUISITION_DEPENDENCY = convertField('ACQUISITION_DEPENDENCY', dependencies);
      editedRaw.LOCATION = convertField('LOCATION', locations);
      editedRaw.BORROWED = convertField('BORROWED', status);
      editedRaw.ASSET_KEY = selectedRecord.ASSET_KEY;

    const locationItem:any = locations.find((loc: any) => loc.ID === updatedValues.LOCATION);
    if (locationItem) {
        editedRaw.BUILDING = locationItem.BUILDING;
    }

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
      "feature": values.FEATURE,
      "series": values.SERIES,
      "acquisitionDependencyId": values.ACQUISITION_DEPENDENCY,
      "entryDate": values.ENTRY_DATE,
      "currentCustodian": getCustodianName(values),
      "locationId": values.LOCATION,
      "ip": values.IP,
      "operativeSystem": values.OPERATIVE_SYSTEM,
      "borrowed": values.BORROWED,
      "position": values.POSITION
    };
    const result: any = await addAsset(objectAdd);
    if (!result.success) {
      notification.error({
        message: 'Error de agregación',
        description: `No se pudo agregar el activo: ${result.error.message}`,
      });
      return;
    }

    setIsAddModalVisible(false);
    const newRecord = { ...values };
    newRecord.ASSET_KEY = result.asset.insertId;
    newRecord.BORROWED = getColumnNameId(values, 'BORROWED', true, status);

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
      key: 'entryDate',
    },
    {
      title: 'Custodio Actual',
      dataIndex: 'CURRENT_CUSTODIAN',
      key: 'current_custodian',
    },
    {
      title: 'Posición',
      dataIndex: 'POSITION',
      key: 'position',
      rules: [
        { max: 100, message: '¡Debe contener máximo 100 caracteres!' },
      ]
    },
    {
      title: 'Estado',
      dataIndex: 'BORROWED',
      key: 'borrowed',
    },
    {
      title: 'Característica',
      dataIndex: 'FEATURE',
      key: 'feature',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}></Button>
          <Button type="dashed" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}></Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h1 style={{ marginBottom: '20px' }}>Inventario Bienes Generales</h1>
        <Row gutter={[16, 16]}>
        </Row>
        <CustomTable 
          dataSource={dataSource} 
          columns={columns} 
          rowKey="ASSET_KEY" 
          searchFields={['NAME', 'CATEGORY', 'BRAND', 'MODEL', 'CURRENT_CUSTODIAN']} handleAdd={handleAdd} />
      </div>

      {isEditModalVisible && (
        <CustomModal
        modalTitle="Editar Bien"
        formColumns={['ASSET_KEY', 'CATEGORY', 'NAME', 'BRAND', 'MODEL', 'SERIES', 'ACQUISITION_DEPENDENCY', 'ENTRY_DATE', 'CURRENT_CUSTODIAN', 'LOCATION', 'IP', 'OPERATIVE_SYSTEM', 'POSITION', 'BORROWED','FEATURE']}
        selectTypeInputs={[[1, categories], [3, brands], [6, dependencies], [8, custodians], [9, locations], [13, status]]}
        dateTypeInputs={[7]}
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
          formColumns={['ASSET_KEY', 'CATEGORY', 'NAME', 'BRAND', 'MODEL', 'SERIES', 'ACQUISITION_DEPENDENCY', 'ENTRY_DATE', 'CURRENT_CUSTODIAN', 'LOCATION', 'IP', 'OPERATIVE_SYSTEM', 'POSITION', 'BORROWED','FEATURE']}
          selectTypeInputs={[[1, categories], [3, brands], [6, dependencies], [9, locations]]}
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
