import React, { useState } from 'react';

const FormularioBG: React.FC = () => {
  const [codigoBien, setCodigoBien] = useState<string>('');
  const [categoria, setCategoria] = useState<string>('');
  const [nombre, setNombre] = useState<string>('');
  const [marca, setMarca] = useState<string>('');
  const [modelo, setModelo] = useState<string>('');
  const [caracteristica, setCaracteristica] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Enviar los datos del formulario al servidor
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="codigoBien">Código Bien:</label>
      <input
        type="text"
        id="codigoBien"
        value={codigoBien}
        onChange={(event) => setCodigoBien(event.target.value)}
      />

      <label htmlFor="categoria">Categoría:</label>
      <select
        id="categoria"
        value={categoria}
        onChange={(event) => setCategoria(event.target.value)}
      >
        <option value="">Seleccione una categoría</option>
        <option value="muebles">Muebles</option>
        <option value="electrodomesticos">Electrodomésticos</option>
        <option value="equipos-de-oficina">Equipos de oficina</option>
      </select>

      <label htmlFor="nombre">Nombre:</label>
      <input
        type="text"
        id="nombre"
        value={nombre}
        onChange={(event) => setNombre(event.target.value)}
      />

      <label htmlFor="marca">Marca:</label>
      <input
        type="text"
        id="marca"
        value={marca}
        onChange={(event) => setMarca(event.target.value)}
      />

      <label htmlFor="modelo">Modelo:</label>
      <input
        type="text"
        id="modelo"
        value={modelo}
        onChange={(event) => setModelo(event.target.value)}
      />

      <label htmlFor="caracteristica">Característica:</label>
      <textarea
        id="caracteristica"
        value={caracteristica}
        onChange={(event) => setCaracteristica(event.target.value)}
      />

      <button type="submit">Guardar</button>
    </form>
  );
};

export default FormularioBG;
