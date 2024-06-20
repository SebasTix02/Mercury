import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../../components/layout';
import { Button, Space, Row, notification } from 'antd';
import { EditOutlined, DeleteOutlined, UserAddOutlined, UserDeleteOutlined, UserSwitchOutlined, ToolOutlined } from '@ant-design/icons';
import CustomTable from '../../../common/table/custom_table';
import CustomModal from '../../../common/modal/custom_modal';
import { CustomColors } from '../../../common/constantsCommon';
import { addComputer, deleteComputer, editComputer, getAllComputers, getComputerByAssetKey } from '../../../providers/options/computer';
import { getAllBuildings } from '../../../providers/options/building';
import { getAllLocations } from '../../../providers/options/location';
import { getAllCategories } from '../../../providers/options/category';
import { getAllBrands } from '../../../providers/options/brand';
import { getAllDependencies } from '../../../providers/options/dependency';
import { getAllUsers } from '../../../providers/options/users';
import { useNavigate, useParams } from 'react-router-dom';
export const Inventario_Computadores = () => {
  var datos_a_guardar = {}
  const { scannedCode } = useParams();
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [buildings, setBuildings] = useState([])
  const [locations, setLocations] = useState([])
  const [categories, setCategories] = useState<any>([])
  const [brands, setBrands] = useState([])
  const [dependencies, setDependencies] = useState([])
  const [custodians, setCustodians] = useState<any>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: any = await getAllComputers();
        if (result.success) {
          setDataSource(result.computers);
          const [buildData, locationData, categoriesData, brandsData, dependenciesData, custodiansData] = await Promise.all([
            getAllBuildings(),
            getAllLocations(),
            getAllCategories(),
            getAllBrands(),
            getAllDependencies(),
            getAllUsers(),
          ]);
          const filteredCategory = categoriesData.categories.filter((category: any) => category.NAME === "EQUIPO ELECTRONICO")
          setBuildings(buildData.buildings);
          setLocations(locationData.locations);
          setCategories(filteredCategory);
          setBrands(brandsData.brands);
          setDependencies(dependenciesData.dependencies);
          setCustodians(custodiansData.users);

          if (scannedCode) {
            const parsedCode = parseInt(scannedCode, 10);
            const computerResult: any = await getComputerByAssetKey(parsedCode);
            if (computerResult.success) {
              setSelectedRecord(computerResult.computer);
              setIsEditModalVisible(true);
            } else {
              notification.error({
                message: 'Error de obtención de datos',
                description: `No se pudo obtener el computador con el código escaneado: ${computerResult.error.message}`,
              });
            }
          }
        } else {
          notification.error({
            message: 'Error de obtención de datos',
            description: `No se pudo obtener los computadores: ${result.error.message}`,
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
  const handleRepower = (record: any) => {
    navigate('/repotenciar/' + record.COMPUTER_ID);
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

  const getCustodianName = (values: any) => {
    const custodian = typeof values.CURRENT_CUSTODIAN === 'number'
      ? custodians.find((l: any) => l.ID === values.CURRENT_CUSTODIAN)
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

    // Construir el objeto de edición
    var objectEdit = {
        "categoryId": categories[0].ID,
        "name": updatedValues.NAME,
        "brandId": getColumnNameId(updatedValues, 'BRAND', false, brands),
        "model": updatedValues.MODEL,
        "feature": null,
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

    // Realizar la llamada API para editar
    const result: any = await editComputer(selectedRecord.ASSET_KEY, objectEdit);
    if (!result.success) {
        setIsEditModalVisible(false);
        notification.error({
            message: 'Error de actualización',
            description: `No se pudo actualizar el computador: ${result.error.message}`,
        });
        return;
    }

    // Preparar el objeto editado para actualizar la tabla
    const editedRaw = { ...selectedRecord, ...updatedValues };

    // Convertir IDs a nombres en editedRaw si es necesario
    const convertField = (field: string, statusList: any[]) => {
        const statusItem = statusList.find((item: any) => item.ID === updatedValues[field]);
        return statusItem ? statusItem.NAME : updatedValues[field];
    };

    editedRaw.BRAND = convertField('BRAND', brands);
    editedRaw.ACQUISITION_DEPENDENCY = convertField('ACQUISITION_DEPENDENCY', dependencies);
    editedRaw.LOCATION = convertField('LOCATION', locations);
    editedRaw.BORROWED = convertField('BORROWED', status);

    // Obtener el BUILDING basado en el LOCATION
    const locationItem:any = locations.find((loc: any) => loc.ID === updatedValues.LOCATION);
    if (locationItem) {
        editedRaw.BUILDING = locationItem.BUILDING;
    }

    // Actualizar la fuente de datos de la tabla
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
      "currentCustodian": getCustodianName(values),
      "locationId": values.LOCATION,
      "ip": values.IP,
      "operativeSystem": values.OPERATIVE_SYSTEM,
      "borrowed": values.BORROWED,
      "position": values.POSITION
    }

    const result: any = await addComputer(objectAdd);
    if (!result.success) {
      notification.error({
        message: 'Error de agregación',
        description: `No se pudo agregar el computador: ${result.error.message}`,
      });
      return;
    }

    setIsAddModalVisible(false);
    const newRecord = { ...values };
    newRecord.ASSET_KEY = result.computer.insertId;
    newRecord.BORROWED = getColumnNameId(values, 'BORROWED', true, status);

    const updatedDataSource: any = [...dataSource, newRecord];
    setDataSource(updatedDataSource);
    setIsAddModalVisible(false);
    notification.success({
      message: 'Computador agregado',
      description: 'El computador ha sido agregado exitosamente.',
    });
  };

  const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

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
      rules: [
        { pattern: ipv4Regex, message: '¡Por favor ingresa una IP válida!' },
      ]
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
      title: 'Localización',
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
        <CustomTable dataSource={dataSource} columns={columns} rowKey="ASSET_KEY" searchFields={['NAME', 'CATEGORY', 'BRAND', 'MODEL', 'CURRENT_CUSTODIAN', 'BUILDING']} handleAdd={handleAdd} />
      </div>

      {isEditModalVisible && (
        <CustomModal
          modalTitle="Editar Computador"
          formColumns={['ASSET_KEY', 'CATEGORY', 'NAME', 'BRAND', 'MODEL', 'SERIES', 'ACQUISITION_DEPENDENCY', 'ENTRY_DATE', 'CURRENT_CUSTODIAN', 'LOCATION', 'IP', 'OPERATIVE_SYSTEM', 'POSITION', 'BORROWED']}
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
          handleRepowerButton={() => handleRepower(selectedRecord)}
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
          formColumns={['ASSET_KEY', 'CATEGORY', 'NAME', 'BRAND', 'MODEL', 'SERIES', 'ACQUISITION_DEPENDENCY', 'ENTRY_DATE', 'CURRENT_CUSTODIAN', 'LOCATION', 'IP', 'OPERATIVE_SYSTEM', 'POSITION', 'BORROWED']}
          selectTypeInputs={[[1, categories], [3, brands], [6, dependencies], [8, custodians], [9, locations], [13, status]]}
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
