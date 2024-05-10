import React, { useState } from 'react';
import { Table, Button, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

interface Props {
  dataSource: any[];
  columns: any[];
  rowKey: string;
  handleAdd: () => void;
  searchFields: string[];
}

const CustomTable: React.FC<Props> = ({ dataSource, columns, rowKey, handleAdd,searchFields }) => {
  const [searchText, setSearchText] = useState('');
  const [searchColumn, setSearchColumn] = useState<string | undefined>(undefined);

  const handleSearch = () => {
    if (searchText && searchColumn) {
      const filteredData = dataSource.filter((item) =>
        item[searchColumn].toLowerCase().includes(searchText.toLowerCase())
      );
      return filteredData;
    }
    return dataSource;
  };

  const clearFilters = () => {
    setSearchText('');
    setSearchColumn(undefined);
  };

  return (
    <div>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <Select
          style={{ width: 120, marginRight: '8px' }}
          placeholder="Seleccione campo"
          allowClear
          onChange={(value) => setSearchColumn(value)}
        >
          {columns.map((column) => (
            // Mostrar opciones solo para los campos relevantes
            searchFields.includes(column.dataIndex) && (
              <Option key={column.key} value={column.dataIndex}>
                {column.title}
              </Option>
            )
          ))}
        </Select>
          <Input
            placeholder="Buscar..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200, marginRight: '8px' }}
          />
          <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
            Buscar
          </Button>
          <Button onClick={clearFilters} style={{ marginLeft: '8px' }}>
            Limpiar
          </Button>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Agregar
        </Button>
      </div>
      <Table
        dataSource={searchColumn ? handleSearch() : dataSource}
        columns={columns}
        scroll={{ x: '100%' }}
        style={{ overflowX: 'auto', marginTop: '20px' }}
        pagination={{ pageSize: 6 }}
        rowKey={rowKey}
        expandable={{
            expandedRowRender: (record) => (
              <div style={{ margin: '10px 0' }}>
                {searchFields.map((field) => (
                  <p key={field}>
                    <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong> {record[field]}
                  </p>
                ))}
              </div>
            ),
          }}
          
      />
    </div>
  );
};

export default CustomTable;
