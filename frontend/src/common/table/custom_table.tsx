import React, { useState } from 'react';
import { Table, Button, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import './table.css'; 


const { Option } = Select;

interface Props {
  dataSource: any[];
  columns: any[];
  rowKey: string;
  handleAdd?: () => void;
  searchFields: string[];
}

const CustomTable: React.FC<Props> = ({ dataSource, columns, rowKey, handleAdd, searchFields }) => {
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
      <div className="search-bar-container">
        <div className="search-bar">
          <Select
            className="search-select"
            placeholder="Seleccione campo"
            allowClear
            onChange={(value) => setSearchColumn(value)}
          >
            {columns.map((column) => (
              searchFields.includes(column.dataIndex) && (
                <Option key={column.dataIndex} value={column.dataIndex}>
                  {column.title}
                </Option>
              )
            ))}
          </Select>
          <Input
            placeholder="Buscar..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search-input"
          />
          <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch} className="search-button">
            Buscar
          </Button>
          <Button onClick={clearFilters} className="clear-button">
            Limpiar
          </Button>
        </div>
        {handleAdd && (
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} className="add-button">
            Agregar
          </Button>
        )}
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
              {columns.map((column) => (
                searchFields.includes(column.dataIndex) && (
                  <p key={column.dataIndex}>
                    <strong>{column.title}:</strong> {record[column.dataIndex]}
                  </p>
                )
              ))}
            </div>
          ),
        }}
      />
    </div>
  );
};

export default CustomTable;
