import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Space, Row, notification, Tabs, Input } from 'antd';
import { EditOutlined, DeleteOutlined, UserAddOutlined, UserDeleteOutlined, UserSwitchOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { editComputerComponent,getAllComputerComponents, getComputerComponentsByComputerId, addComputerComponent
  ,deleteComputerComponent, getAllCaseComponents, getCaseComponentById,addCaseComponent,editCaseComponent,deleteCaseComponent
  ,unsubscribeCaseComponent, getCaseComponentsRelated
 } from '../../providers/options/components';
import CustomTable from '../../common/table/custom_table';
import CustomModal from '../../common/modal/custom_modal';
import { CustomColors } from '../../common/constantsCommon';
import Layout from '../../components/layout';
import { getAllBuildings } from '../../providers/options/building';
import { getAllLocations } from '../../providers/options/location';
import { getAllBrands } from '../../providers/options/brand';
const { TabPane } = Tabs;
/*Agregar crud de repotenciacion para repotenciar */
interface Component {
  ID: number;
  NAME: string;
  BRAND: string;
  MODEL: string;
  SERIES:string;
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
  const { id } = useParams<{ id: string }>();
  const [buildings, setBuildings] = useState([])
  const [locations, setLocations] = useState([])
  const [brands, setBrands] = useState([])
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
      getAllBuildings().then((buildData:any) => {
        setBuildings(buildData.buildings);
      })
      getAllLocations().then((locationData:any) => {
        setLocations(locationData.locations);
      })
      getAllBrands().then((brandData:any) => {
        setBrands(brandData.brands);
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
    }else{ // Inicializa la variable fuera del mapeo
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
        "status": values.STATUS === "ACTIVO" ? 1 : 0
    };
    console.log(objectEdit)
    console.log(ubicacion)
    var valoresMostrar = {
      "ASSET_KEY": null,
      "NAME": values.NAME,
      "BUILDING": ubicacion!.BUILDING,
      "LOCATION": ubicacion!.NAME,
      "POSITION": values.POSITION,
      "STATUS": values.STATUS
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
      "assetKey": null,
      "name": values.NAME,
      "isCase": isCase,
      "locationId": values.LOCATION,
      "position": values.POSITION,
      "status": values.STATUS === "ACTIVO" ? 1 : 0
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
    }else{ // Inicializa la variable fuera del mapeo
      brands.map((item: any) => {
          if (item.ID == values.BRAND) { 
            idMarca = item.ID; 
            nombreMarca = item.NAME
          }
          return item;
      });
    }
    console.log("id" + idMarca + "/nombre: " + nombreMarca)
    const objectEdit = {
      "assetKey": null,"name": values.NAME,"brandId": idMarca,
      "model": values.MODEL,"series": values.SERIES,"type": values.TYPE,"capacity": values.CAPACITY,"status": values.STATUS,
      "isUpgrade": values.IS_UPGRADE === "SI" ? 1 : 0,"upgradeDate": values.UPGRADE_DATE,"upgradeDetail": values.UPGRADE_DETAIL,
    }
    const objectShow = {
      "NAME": values.NAME,"BRAND": nombreMarca,
      "MODEL": values.MODEL,"SERIES": values.SERIES,"TYPE": values.TYPE,"CAPACITY": values.CAPACITY,"STATUS": values.STATUS,
      "IS_UPGRADE": values.IS_UPGRADE,"UPGRADE_DATE": values.UPGRADE_DATE,"UPGRADE_DETAIL": values.UPGRADE_DETAIL,
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
    console.log("values: "+ values.BRAND + "nombre: " +nombreMarca)
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
    const result: any = await addCaseComponent(values);
    if (!result.success) {
      setIsAddCaseComponentModalVisible(false);
      notification.error({
        message: 'Error de agregación',
        description: `No se pudo agregar el componente de gabinete: ${result.error.message}`,
      });
      return;
    }
    const newRecord = { ...values, ID: result.component.insertId };
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

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h1 style={{ marginBottom: '20px' }}>Repotenciación</h1>
        <Input.Search
          placeholder="Ingrese ID del componente"
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={handleSearchById}
          style={{ marginBottom: '20px' }}
        />
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
          selectTypeInputs={[[1, locations]]}
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
          formColumns={['NAME', 'LOCATION', 'POSITION', 'STATUS']}
          selectTypeInputs={[[1, locations]]}
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
          selectTypeInputs={[[1, brands]]}
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
          formColumns={['NAME', 'BRAND', 'MODEL', 'TYPE']}
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