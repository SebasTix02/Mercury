import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { getAllCategories } from '../../providers/options/category';

const { Option } = Select;

const FormComp: React.FC = () => {
  const [codigoBien, setCodigoBien] = useState<string>('');
  const [categorias, setCategorias] = useState<any[]>([]);
  const [nombre, setNombre] = useState<string>('');
  const [marca, setMarca] = useState<string>('');
  const [modelo, setModelo] = useState<string>('');
  const [caracteristica, setCaracteristica] = useState<string>('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>(''); // Estado para almacenar la categoría seleccionada
  const selectRef = useRef<any>(null); // Referencia al Select

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        if (response && response.success) {
          setCategorias(response.categories);
          console.log('Categorías establecidas en el estado:', response.categories);
        } else if (response && response.error) {
          console.error('Error al obtener las categorías:', response.error.message);
        } else {
          console.error('Error inesperado al obtener las categorías.');
        }
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };
  
    fetchCategories();
  }, []);

  const handleSubmit = (values: any) => {
    console.log(values);
    // Enviar los datos del formulario al servidor
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Código Bien" name="codigoBien" rules={[{ required: true, message: 'Por favor ingrese el código del bien' }]}>
        <Input value={codigoBien} onChange={(event) => setCodigoBien(event.target.value)} />
      </Form.Item>

      <Form.Item label="Categoría" name="categoria" rules={[{ required: true, message: 'Por favor seleccione una categoría' }]}>
        <Select value={categoriaSeleccionada} onChange={(value) => setCategoriaSeleccionada(value)}>
          <Option value="">Seleccione una categoría</Option>
          {categorias.map((cat) => (
            <Option key={cat.ID} value={cat.NAME}>{cat.NAME}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}>
        <Input value={nombre} onChange={(event) => setNombre(event.target.value)} />
      </Form.Item>

      <Form.Item label="Marca" name="marca" rules={[{ required: true, message: 'Por favor ingrese la marca' }]}>
        <Input value={marca} onChange={(event) => setMarca(event.target.value)} />
      </Form.Item>

      <Form.Item label="Modelo" name="modelo" rules={[{ required: true, message: 'Por favor ingrese el modelo' }]}>
        <Input value={modelo} onChange={(event) => setModelo(event.target.value)} />
      </Form.Item>

      <Form.Item label="Característica" name="caracteristica" rules={[{ required: true, message: 'Por favor ingrese las características' }]}>
        <Input.TextArea value={caracteristica} onChange={(event) => setCaracteristica(event.target.value)} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">Guardar</Button>
      </Form.Item>
    </Form>
  );
};

export default FormComp;
