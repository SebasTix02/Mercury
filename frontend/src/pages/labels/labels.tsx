import React, { useState } from 'react';
import { Button, Row, Space, Table, Checkbox, Input } from 'antd';
import { QRCodeSVG } from 'qrcode.react';
import Layout from '../../components/layout';
import CustomTable from '../../common/table/custom_table';

export const Etiquetas = () => {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(true);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<any>(null);
  
    const columns = [
        {
          title: 'Código',
          dataIndex: 'ID',
          key: 'id',
        },
        
        {
          title: 'Cód. Computador',
          dataIndex: 'ID',
          key: 'id',
        },
          
        {
          title: 'IP',
          dataIndex: 'IP',
          key: 'ip',
        },
          
        {
          title: 'Bloque',
          dataIndex: 'BUILDING',
          key: 'id',
        },
          
        {
          title: 'Ubicación',
          dataIndex: 'ID',
          key: 'id',
        },
        {
            title: 'Localización',
            dataIndex: 'LOCATION',
            key: 'location',
          },
    ];

    const handleAdd = () => {}
    return(
        
    <Layout>
        <div style={{ padding: '20px' }}>
        <h1 style={{ marginBottom: '20px' }}>Lista de Componentes</h1>
        <Row gutter={[16, 16]}>
        </Row>
        <CustomTable dataSource={dataSource} columns={columns} rowKey="ASSET_KEY" handleAdd={handleAdd}
            searchFields={['ASSET_KEY', 'COMPUTER_ID', 'IP', 'BUILDING', '', 'LOCATION', 'isSelected']}/>
        </div>
    </Layout>
    )
}