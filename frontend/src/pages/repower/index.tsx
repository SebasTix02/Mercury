import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Space, Row, notification, Tabs, Input, Table } from 'antd';
import { EditOutlined, DeleteOutlined, UserAddOutlined, UserDeleteOutlined, UserSwitchOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import {
  editComputerComponent, getAllComputerComponents, getComputerComponentsByComputerId, addComputerComponent
  , deleteComputerComponent, getAllCaseComponents, getCaseComponentById, addCaseComponent, editCaseComponent, deleteCaseComponent
  , unsubscribeCaseComponent, getCaseComponentsRelated
} from '../../providers/options/components';
import CustomTable from '../../common/table/custom_table';
import CustomModal from '../../common/modal/custom_modal';
import { CustomColors } from '../../common/constantsCommon';
import Layout from '../../components/layout';
import { getAllBuildings } from '../../providers/options/building';
import { getAllLocations } from '../../providers/options/location';
import { getAllBrands } from '../../providers/options/brand';
import { getAllComputers } from '../../providers/options/computer';
const { TabPane } = Tabs;
/*Agregar crud de repotenciacion para repotenciar */
interface Component {
  ID: number;
  NAME: string;
  BRAND: string;
  MODEL: string;
  SERIES: string;
  TYPE: string;
  CAPACITY: string;
  STATUS: string;
  IS_UPGRADE: string;
  UPGRADE_DATE: string;
  UPGRADE_DETAIL: string;
}

interface ComputerComponent {
  ASSET_KEY: number;
  NAME: string;
  BUILDING: string;
  LOCATION: string;
  POSITION: string;
  STATUS: string;
}

export const Repotenciacion = () => {
  var { id } = useParams<{ id: string }>();
  const [buildings, setBuildings] = useState([])
  const [locations, setLocations] = useState([])
  const [brands, setBrands] = useState([])
  const [caseId, setCases] = useState()
  const [computers, setComputers] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  // Computer Components State
  const [computerComponents, setComputerComponents] = useState<ComputerComponent[]>([]);
  const [loadingComputerComponents, setLoadingComputerComponents] = useState(true);
  const [isEditComputerComponentModalVisible, setIsEditComputerComponentModalVisible] = useState(false);
  const [isDeleteComputerComponentModalVisible, setIsDeleteComputerComponentModalVisible] = useState(false);
  const [isAddComputerComponentModalVisible, setIsAddComputerComponentModalVisible] = useState(false);
  const [selectedComputerComponent, setSelectedComputerComponent] = useState<Component | null>(null);

  // Case Components State
  const [caseComponents, setCaseComponents] = useState<Component[][]>([]);
  const [loadingCaseComponents, setLoadingCaseComponents] = useState(true);
  const [isEditCaseComponentModalVisible, setIsEditCaseComponentModalVisible] = useState(false);
  const [isDeleteCaseComponentModalVisible, setIsDeleteCaseComponentModalVisible] = useState(false);
  const [isAddCaseComponentModalVisible, setIsAddCaseComponentModalVisible] = useState(false);
  const [selectedCaseComponent, setSelectedCaseComponent] = useState<Component | null>(null);

  // Fetch Data by ID
  useEffect(() => {
    if (id) {
      fetchComponentsById(id);
      getAllBuildings().then((buildData: any) => {
        setBuildings(buildData.buildings);
      })
      getAllLocations().then((locationData: any) => {
        setLocations(locationData.locations);
      })
      getAllBrands().then((brandData: any) => {
        setBrands(brandData.brands);
      })
      getCaseComponentsRelated(Number.parseInt(id)).then((casesData: any) => {
        setCases(casesData.components[0].CASE_ID);
      })
      getAllComputers().then((computers: any) => {
        const computer = computers.computers.find((computer: any) => computer.COMPUTER_ID == id);
        const computadora: any = [computer]
        setComputers(computers.computers)
        setDataSource(computadora)
      })
    }
  }, [id]);
  const fetchComponentsById = async (id: string) => {
    try {
      // Reiniciar los estados para evitar duplicados
      setComputerComponents([]);
      setCaseComponents([]);

      setLoadingComputerComponents(true);
      setLoadingCaseComponents(true);

      const computerComponentResult = await getComputerComponentsByComputerId(Number.parseInt(id));
      const caseComponentResult = await getCaseComponentsRelated(Number.parseInt(id));

      if (computerComponentResult.success) {
        setComputerComponents(computerComponentResult.components);
      } else {
        notification.error({
          message: 'Error de obtención de datos',
          description: `No se pudo obtener los componentes de computadora: ${computerComponentResult.error?.message}`,
        });
      }

      if (caseComponentResult.success) {
        setCaseComponents(caseComponentResult.components);
      } else {
        notification.error({
          message: 'Error de obtención de datos',
          description: `No se pudo obtener los componentes de gabinete: ${caseComponentResult.error?.message}`,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingComputerComponents(false);
      setLoadingCaseComponents(false);
    }
  };



  const handleSearchById = async (searchId: string) => {
    await fetchComponentsById(searchId);
    const computer = computers.find((computer: any) => computer.COMPUTER_ID == searchId);
    const computadora: any = [computer]
    setDataSource(computadora)
    id = searchId
    const newUrl = `/repotenciar/${searchId}`; // Define la nueva URL
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  // Handlers and other functions remain the same
  const handleEditComputerComponent = (record: any) => {
    setSelectedComputerComponent(record);
    setIsEditComputerComponentModalVisible(true);
  };

  const handleDeleteComputerComponent = (record: any) => {
    setSelectedComputerComponent(record);
    setIsDeleteComputerComponentModalVisible(true);
  };

  const handleAddComputerComponent = () => {
    setSelectedComputerComponent(null);
    setIsAddComputerComponentModalVisible(true);
  };

  const status = [
    {
      ID: 0,
      NAME: 'INACTIVO'
    },
    {
      ID: 1,
      NAME: 'ACTIVO'
    },
  ]

  const isUpgrade = [
    {
      ID: 0,
      NAME: 'NO'
    },
    {
      ID: 1,
      NAME: 'SI'
    },
  ]

  const getColumnNameId = (values: any, field: string, isName: boolean, status: any[]) => {
    const statusItem = typeof values[field] === 'number'
      ? status.find((l: any) => l.ID === values[field])
      : status.find((l: any) => l.NAME === values[field]);
    return isName ? statusItem?.NAME : statusItem?.ID;
  };

  const handleEditComputerComponentOk = async (values: any) => {
    let ubicacion = null;
    console.log(typeof values.LOCATION)
    if (typeof values.LOCATION === 'number') {
      locations.map((item: any) => {
        if (item.ID === values.LOCATION) {
          ubicacion = item;
        }
        return item;
      });
    } else { // Inicializa la variable fuera del mapeo
      locations.map((item: any) => {
        if (item.NAME === values.LOCATION) {
          ubicacion = item;
        }
        return item;
      });
    }

    var objectEdit = {
      "assetKey": null, // Asegúrate de incluir el assetKey si es necesario
      "name": values.NAME,
      "isCase": 0,
      "locationId": ubicacion!.ID,
      "position": values.POSITION,
      "status": getColumnNameId(values, 'STATUS', false, status)
    };
    console.log(objectEdit)
    console.log(ubicacion)
    var valoresMostrar = {
      "ASSET_KEY": null,
      "NAME": values.NAME,
      "BUILDING": ubicacion!.BUILDING,
      "LOCATION": ubicacion!.NAME,
      "POSITION": values.POSITION,
      "STATUS": getColumnNameId(values, 'STATUS', true, status)
    }

    const result: any = await editComputerComponent(selectedComputerComponent!.ID, objectEdit);
    if (!result.success) {
      notification.error({
        message: 'Error de actualización',
        description: `No se pudo actualizar el componente de computadora: ${result.error.message}`,
      });
      setIsEditComputerComponentModalVisible(false);
      return;
    }

    const updatedData = computerComponents.map((item: any) =>
      item.ID === selectedComputerComponent!.ID ? { ...item, ...valoresMostrar } : item
    );
    console.log(locations)
    console.log(updatedData)
    setComputerComponents(updatedData); // Actualiza el estado con los datos editados
    setIsEditComputerComponentModalVisible(false); // Cierra el modal
    notification.success({
      message: 'Componente de Computadora actualizado',
      description: 'El componente de computadora ha sido actualizado exitosamente.',
    });
  };


  const handleDeleteComputerComponentOk = async () => {
    console.log(selectedComputerComponent!.ID)
    const result: any = await deleteComputerComponent(selectedComputerComponent!.ID);
    if (!result.success) {
      setIsDeleteComputerComponentModalVisible(false);
      notification.error({
        message: 'Error de eliminación',
        description: `No se pudo eliminar el componente de computadora: ${result.error.message}`,
      });
      return;
    }
    const newData = computerComponents.filter((item: any) => item.ID !== selectedComputerComponent!.ID);
    setComputerComponents(newData);
    setIsDeleteComputerComponentModalVisible(false);
    notification.success({
      message: 'Componente de Computadora eliminado',
      description: 'El componente de computadora ha sido eliminado exitosamente.',
    });
  };

  const handleAddComputerComponentOk = async (values: any) => {
    const nombre = values.NAME.toLowerCase();
    var isCase = 0;
    if (nombre.includes('case') || nombre.includes('gabinete')) {
      isCase = 1;
    }
    var objectAdd = {
      "computerId": id,
      "assetKey": values.ASSET_KEY,
      "name": values.NAME,
      "isCase": isCase,
      "locationId": values.LOCATION,
      "position": values.POSITION,
      "status": getColumnNameId(values, 'STATUS', false, status)
    }
    const result: any = await addComputerComponent(objectAdd);
    if (!result.success) {
      setIsAddComputerComponentModalVisible(false);
      notification.error({
        message: 'Error de agregación',
        description: `No se pudo agregar el componente de computadora: ${result.error.message}`,
      });
      return;
    }
    if (id) {
      await fetchComponentsById(id);
    } else {
      console.error("ID is undefined. Cannot fetch components.");
    }
    const newRecord = { ...values, ID: id };
    setIsAddComputerComponentModalVisible(false);
    notification.success({
      message: 'Componente de Computadora agregado',
      description: 'El componente de computadora ha sido agregado exitosamente.',
    });

  };

  // Case Component Handlers
  const handleEditCaseComponent = (record: any) => {
    setSelectedCaseComponent(record);
    setIsEditCaseComponentModalVisible(true);
  };

  const handleDeleteCaseComponent = (record: any) => {
    setSelectedCaseComponent(record);
    setIsDeleteCaseComponentModalVisible(true);
  };

  const handleAddCaseComponent = () => {
    setSelectedCaseComponent(null);
    setIsAddCaseComponentModalVisible(true);
  };

  const handleEditCaseComponentOk = async (values: any) => {
    let nombreMarca = null;
    let idMarca = null;
    console.log(typeof values.BRAND + "/dato: " + values.BRAND)
    if (typeof values.BRAND === 'string') {
      brands.map((item: any) => {
        if (item.NAME == values.BRAND) {
          idMarca = item.ID;
          nombreMarca = item.NAME
        }
        return item;
      });
    } else { // Inicializa la variable fuera del mapeo
      brands.map((item: any) => {
        if (item.ID == values.BRAND) {
          idMarca = item.ID;
          nombreMarca = item.NAME
        }
        return item;
      });
    }
    const capacidad: string = values.CAPACITY;
    const numero = parseInt(capacidad.substring(0, capacidad.indexOf(' ')))
    var sufijo = "GB"
    if (capacidad.includes("T")) {
      sufijo = "TB"
      values.CAPACITY = numero * 1000
    } else if (capacidad.includes("M")) {
      sufijo = "MB"
      values.CAPACITY = numero / 1000
    } else if (capacidad.includes("K")) {
      sufijo = "KB"
      values.CAPACITY = numero / 1000000
    }

    console.log("id" + idMarca + "/nombre: " + nombreMarca)
    const objectEdit = {
      "assetKey": null, "name": values.NAME, "brandId": idMarca,
      "model": values.MODEL, "series": values.SERIES, "type": values.TYPE, "capacity": values.CAPACITY, "status": getColumnNameId(values, 'STATUS', false, status),
      "isUpgrade": getColumnNameId(values, 'IS_UPGRADE', false, isUpgrade), "upgradeDate": values.UPGRADE_DATE, "upgradeDetail": values.UPGRADE_DETAIL,
    }
    const objectShow = {
      "NAME": values.NAME, "BRAND": nombreMarca,
      "MODEL": values.MODEL, "SERIES": values.SERIES, "TYPE": values.TYPE, "CAPACITY": numero + " " + sufijo, "STATUS": getColumnNameId(values, 'STATUS', true, status),
      "IS_UPGRADE": getColumnNameId(values, 'IS_UPGRADE', true, isUpgrade), "UPGRADE_DATE": values.UPGRADE_DATE, "UPGRADE_DETAIL": values.UPGRADE_DETAIL,
    }
    console.log(objectShow)
    const result: any = await editCaseComponent(selectedCaseComponent!.ID, objectEdit);
    if (!result.success) {
      setIsEditCaseComponentModalVisible(false);
      notification.error({
        message: 'Error de actualización',
        description: `No se pudo actualizar el componente de gabinete: ${result.error.message}`,
      });
      return;
    }
    const updatedData = caseComponents.map((item: any) =>
      item.ID === selectedCaseComponent!.ID ? { ...item, ...objectShow } : item
    );
    console.log("values: " + values.BRAND + "nombre: " + nombreMarca)
    console.log(updatedData)
    setCaseComponents(updatedData);
    setIsEditCaseComponentModalVisible(false);
    notification.success({
      message: 'Componente de Gabinete actualizado',
      description: 'El componente de gabinete ha sido actualizado exitosamente.',
    });
  };

  const handleDeleteCaseComponentOk = async () => {
    const result: any = await deleteCaseComponent(selectedCaseComponent!.ID);
    if (!result.success) {
      setIsDeleteCaseComponentModalVisible(false);
      notification.error({
        message: 'Error de eliminación',
        description: `No se pudo eliminar el componente de gabinete: ${result.error.message}`,
      });
      return;
    }
    const newData = caseComponents.filter((item: any) => item.ID !== selectedCaseComponent!.ID);
    setCaseComponents(newData);
    setIsDeleteCaseComponentModalVisible(false);
    notification.success({
      message: 'Componente de Gabinete eliminado',
      description: 'El componente de gabinete ha sido eliminado exitosamente.',
    });
  };

  const handleAddCaseComponentOk = async (values: any) => {
    const currentDate = new Date();
    const formattedDate = currentDate.getFullYear() + '-' +
      String(currentDate.getMonth() + 1).padStart(2, '0') + '-' +
      String(currentDate.getDate()).padStart(2, '0');
    const fecha = getColumnNameId(values, 'IS_UPGRADE', true, isUpgrade) === "SI" ? formattedDate : null;
    const objectEdit = {
      "caseId": caseId, "assetKey": null, "name": values.NAME, "brandId": values.BRAND,
      "model": values.MODEL, "series": values.SERIES, "type": values.TYPE, "capacity": values.CAPACITY, "status": getColumnNameId(values, 'STATUS', false, status),
      "isUpgrade": getColumnNameId(values, 'IS_UPGRADE', false, isUpgrade), "upgradeDate": fecha, "upgradeDetail": null,
    }
    console.log(objectEdit)
    const result: any = await addCaseComponent(objectEdit);
    if (!result.success) {
      setIsAddCaseComponentModalVisible(false);
      notification.error({
        message: 'Error de agregación',
        description: `No se pudo agregar el componente de gabinete: ${result.error.message}`,
      });
      return;
    }
    const newRecord = { ...values, ID: result.result.insertId };
    if (id) {
      await fetchComponentsById(id);
    } else {
      console.error("ID is undefined. Cannot fetch components.");
    }
    setIsAddCaseComponentModalVisible(false);
    notification.success({
      message: 'Componente de Gabinete agregado',
      description: 'El componente de gabinete ha sido agregado exitosamente.',
    });
  };

  const computerComponentColumns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'id',
    },
    {
      title: 'Codigo del bien',
      dataIndex: 'ASSET_KEY',
      key: 'asset_key',
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
        { required: true, message: '¡Por favor selecciona el edificio!' },
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
      title: 'Posición',
      dataIndex: 'POSITION',
      key: 'position',
    },
    {
      title: 'estado',
      dataIndex: 'STATUS',
      key: 'status',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEditComputerComponent(record)}></Button>
          <Button type="dashed" icon={<DeleteOutlined />} onClick={() => handleDeleteComputerComponent(record)}></Button>
        </Space>
      ),
    },
  ];
  const capacityRegex = /^\d+\s?[A-Z]B$/;
  const caseComponentColumns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'id',
    },
    {
      title: 'Nombre',
      dataIndex: 'NAME',
      key: 'name',
    },
    {
      title: 'Marca',
      dataIndex: 'BRAND',
      key: 'brand',
      rules: [
        { required: true, message: '¡Por favor selecciona la ubicacion!' },
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
      title: 'Tipo',
      dataIndex: 'TYPE',
      key: 'type',
    },
    {
      title: 'Capacidad',
      dataIndex: 'CAPACITY',
      key: 'capacity',
      rules: [
        { pattern: capacityRegex, message: '¡Por favor ingresa un capacidad valida EJ. 100 GB!' },
      ]
    },
    {
      title: 'Estado',
      dataIndex: 'STATUS',
      key: 'status',
    },
    {
      title: 'Es Mejora?',
      dataIndex: 'IS_UPGRADE',
      key: 'is_upgrade',
    },
    {
      title: 'fecha_mejora',
      dataIndex: 'UPGRADE_DATE',
      key: 'upgrade_date',
    },
    {
      title: 'detalle_mejora',
      dataIndex: 'UPGRADE_DETAIL',
      key: 'upgrade_detail',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEditCaseComponent(record)}></Button>
          <Button type="dashed" icon={<DeleteOutlined />} onClick={() => handleDeleteCaseComponent(record)}></Button>
        </Space>
      ),
    },
  ];
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
      key: 'category'
    },
    {
      title: 'Nombre',
      dataIndex: 'NAME',
      key: 'name',
    },
    {
      title: 'Bloque',
      dataIndex: 'BUILDING',
      key: 'building'
    },
    {
      title: 'Ubicación',
      dataIndex: 'LOCATION',
      key: 'location'
    },
    {
      title: 'Marca',
      dataIndex: 'BRAND',
      key: 'brand'
    },
    {
      title: 'Modelo',
      dataIndex: 'MODEL',
      key: 'model',
    },
    {
      title: 'Custodio Actual',
      dataIndex: 'CURRENT_CUSTODIAN',
      key: 'currentCustodian',
    },
    {
      title: 'Localización',
      dataIndex: 'POSITION',
      key: 'position'
    },
    {
      title: 'Estado',
      dataIndex: 'BORROWED',
      key: 'borrowed',
    }
  ];
  return (
    <Layout>

      <div style={{ padding: '20px' }}>
        <h1 style={{ marginBottom: '20px' }}>Repotenciación</h1>
        <Input.Search
          placeholder="Ingrese ID del computador a repotenciar"
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={handleSearchById}
          style={{ marginBottom: '20px' }}
        />
        <Table dataSource={dataSource} columns={columns} pagination={false} scroll={{ x: '100%' }} size="small" bordered={false} />
        <Tabs defaultActiveKey="1">
          <TabPane tab="Componentes de Computadora" key="1">
            <CustomTable
              dataSource={computerComponents}
              columns={computerComponentColumns}
              rowKey="ID"
              searchFields={['NAME', 'BUILDING', 'LOCATION', 'POSITION']}
              handleAdd={handleAddComputerComponent}
            />
          </TabPane>
          <TabPane tab="Componentes de Gabinete" key="2">
            <CustomTable
              dataSource={caseComponents}
              columns={caseComponentColumns}
              rowKey="ID"
              searchFields={['NAME', 'BRAND', 'MODEL', 'TYPE']}
              handleAdd={handleAddCaseComponent}
            />
          </TabPane>
        </Tabs>
      </div>

      {isEditComputerComponentModalVisible && (
        <CustomModal
          modalTitle="Editar Componente de Computadora"
          formColumns={['NAME', 'LOCATION', 'POSITION', 'STATUS']}
          selectTypeInputs={[[1, locations], [3, status]]}
          isVisible={isEditComputerComponentModalVisible}
          handleVisible={setIsEditComputerComponentModalVisible}
          handleAddEdit={handleEditComputerComponentOk}
          columns={computerComponentColumns}
          selectedRecord={selectedComputerComponent}
          icon={<UserSwitchOutlined />}
          iconColor={CustomColors.WHITE}
          iconBackgroundColor={CustomColors.PRIMARY}
        />
      )}

      <CustomModal
        text='¿Estás seguro de que deseas eliminar este componente de computadora?'
        modalTitle="Confirmar Eliminación"
        isVisible={isDeleteComputerComponentModalVisible}
        handleOk={handleDeleteComputerComponentOk}
        handleVisible={setIsDeleteComputerComponentModalVisible}
        icon={<UserDeleteOutlined />}
        iconColor={CustomColors.WHITE}
        iconBackgroundColor={CustomColors.DANGEROUS}
      />

      {isAddComputerComponentModalVisible && (
        <CustomModal
          modalTitle="Agregar Componente de Computadora"
          formColumns={['ASSET_KEY', 'NAME', 'LOCATION', 'POSITION', 'STATUS']}
          selectTypeInputs={[[2, locations], [4, status]]}
          isVisible={isAddComputerComponentModalVisible}
          handleVisible={setIsAddComputerComponentModalVisible}
          isAdding={true}
          handleAddEdit={handleAddComputerComponentOk}
          columns={computerComponentColumns}
          selectedRecord={selectedComputerComponent}
          icon={<UserAddOutlined />}
          iconColor={CustomColors.WHITE}
          iconBackgroundColor={CustomColors.SUCCESS}
        />
      )}

      {isEditCaseComponentModalVisible && (
        <CustomModal
          modalTitle="Editar Componente de Gabinete"
          formColumns={['NAME', 'BRAND', 'MODEL', 'SERIES', 'TYPE', 'CAPACITY', 'STATUS', 'IS_UPGRADE', 'UPGRADE_DATE', 'UPGRADE_DETAIL']}
          selectTypeInputs={[[1, brands], [6, status], [7, isUpgrade]]}
          dateTypeInputs={[8]}
          isVisible={isEditCaseComponentModalVisible}
          handleVisible={setIsEditCaseComponentModalVisible}
          handleAddEdit={handleEditCaseComponentOk}
          columns={caseComponentColumns}
          selectedRecord={selectedCaseComponent}
          icon={<UserSwitchOutlined />}
          iconColor={CustomColors.WHITE}
          iconBackgroundColor={CustomColors.PRIMARY}
        />
      )}

      <CustomModal
        text='¿Estás seguro de que deseas eliminar este componente de gabinete?'
        modalTitle="Confirmar Eliminación"
        isVisible={isDeleteCaseComponentModalVisible}
        handleOk={handleDeleteCaseComponentOk}
        handleVisible={setIsDeleteCaseComponentModalVisible}
        icon={<UserDeleteOutlined />}
        iconColor={CustomColors.WHITE}
        iconBackgroundColor={CustomColors.DANGEROUS}
      />

      {isAddCaseComponentModalVisible && (
        <CustomModal
          modalTitle="Agregar Componente de Gabinete"
          formColumns={['NAME', 'BRAND', 'MODEL', 'SERIES', 'TYPE', 'CAPACITY', 'STATUS', 'IS_UPGRADE', 'UPGRADE_DATE', 'UPGRADE_DETAIL']}
          selectTypeInputs={[[1, brands], [6, status], [7, isUpgrade]]}
          dateTypeInputs={[8]}
          isVisible={isAddCaseComponentModalVisible}
          handleVisible={setIsAddCaseComponentModalVisible}
          isAdding={true}
          handleAddEdit={handleAddCaseComponentOk}
          columns={caseComponentColumns}
          selectedRecord={selectedCaseComponent}
          icon={<UserAddOutlined />}
          iconColor={CustomColors.WHITE}
          iconBackgroundColor={CustomColors.SUCCESS}
        />
      )}
    </Layout>
  );
};