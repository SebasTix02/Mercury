import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { getAllLocations } from '../../providers/options/location';


const { Option } = Select;

const FormSoft: React.FC = () => {
  const [nombre, setNombre] = useState<string>('');
  const [version, setVersion] = useState<string>('');
  const [licencia, setLicencia] = useState<string>('');
  const [duracionLicencia, setDuracionLicencia] = useState<string>('');
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await getAllLocations();
      if (response.success) {
        setLocations(response.locations);
      } else if (response.error) {
        console.error(response.error.message);
      } else {
        console.error("Error inesperado al obtener las ubicaciones.");
      }
    };
    fetchLocations();
  }, []);


  const handleSubmit = (values: any) => {
    console.log(values);
    alert('Formulario enviado correctamente');
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <h2>Formulario de Software</h2>
      <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}>
        <Input value={nombre} onChange={(event) => setNombre(event.target.value)} />
      </Form.Item>

      <Form.Item label="Versión" name="version" rules={[{ required: true, message: 'Por favor ingrese la versión' }]}>
        <Input value={version} onChange={(event) => setVersion(event.target.value)} />
      </Form.Item>

      <Form.Item label="Licencia" name="licencia" rules={[{ required: true, message: 'Por favor seleccione una licencia' }]}>
        <Select value={licencia} onChange={(value) => setLicencia(value)}>
          <Option value="Libres">Libres</Option>
          <Option value="Pagadas">Pagadas</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Duración Licencia" name="duracionLicencia" rules={[{ required: true, message: 'Por favor ingrese la duración de la licencia' }]}>
        <Input value={duracionLicencia} onChange={(event) => setDuracionLicencia(event.target.value)} />
      </Form.Item>

      <Form.Item label="Tipo de Laboratorio" name="tipoLaboratorio" rules={[{ required: true, message: 'Por favor seleccione el tipo de laboratorio' }]}>
        <Select>
          {locations.map(location => (
            <Option key={location.id} value={location.NAME}>{location.NAME}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">Guardar</Button>
      </Form.Item>
    </Form>
  );
};

export default FormSoft;
