import React, { useState } from 'react';
import { Button, Row, Table, Checkbox, Space, notification } from 'antd';

import Layout from '../../components/layout';
import CustomTable from '../../common/table/custom_table';

interface Component {
    ID: number;
    IP: string;
    BUILDING: string;
    LOCATION: string;
}

export const Etiquetas = () => {
    const [dataSource, setDataSource] = useState<Component[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

    const handleSelectChange = (selectedKeys: number[]) => {
        setSelectedRowKeys(selectedKeys);
    };
    
    const generatePDF = () => {
        notification.success({ message: 'Etiquetas generadas con exito' });
    };
    
    const columns = [
        {
            title: 'Código',
            dataIndex: 'ASSET_KEY',
            key: 'asset_key',
        },
        {
            title: 'Cód. Computador',
            dataIndex: 'COMPUTER_ID',
            key: 'computer_id',
        },
        {
            title: 'Categoría',
            dataIndex: 'CATEGORY',
            key: 'category',
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
        },
        {
            title: 'Modelo',
            dataIndex: 'MODEL',
            key: 'model',
        },
        {
            title: 'Característica',
            dataIndex: 'FEATURE',
            key: 'feature',
        },
        {
            title: 'Serie',
            dataIndex: 'SERIES',
            key: 'series',
        },
        {
            title: 'Dependencia',
            dataIndex: 'ACQUISITION_DEPENDENCY',
            key: 'acquisition_dependency',
        },
        {
            title: 'Fecha adquisición',
            dataIndex: 'ENTRY_DATE',
            key: 'entry_date',
        },
        {
            title: 'Custodio actual',
            dataIndex: 'CURRENT_CUSTODIAN',
            key: 'current_custodian',
        },
        {
            title: 'Edificio',
            dataIndex: 'BUILDING',
            key: 'building',
        },
        {
            title: 'Localización',
            dataIndex: 'LOCATION',
            key: 'location',
        },
        {
            title: 'Seleccionar...',
            key: 'isSelected',
            render: (_: any, record: Component) => (
                <Checkbox
                    checked={selectedRowKeys.includes(record.ID)}
                    onChange={() => {
                        const newSelectedRowKeys = selectedRowKeys.includes(record.ID)
                            ? selectedRowKeys.filter(key => key !== record.ID)
                            : [...selectedRowKeys, record.ID];
                        handleSelectChange(newSelectedRowKeys);
                    }}
                />
            ),
        },
    ];

    return (
        <Layout>
            <div style={{ padding: '20px' }}>
                <h1 style={{ marginBottom: '20px' }}>Lista de Componentes</h1>
                <Row gutter={[16, 16]}>
                </Row>
                <CustomTable
                    dataSource={dataSource}
                    columns={columns}
                    rowKey="ASSET_KEY"
                    searchFields={['ASSET_KEY', 'COMPUTER_ID', 'CATEGORY', 'NAME', 'BRAND', 'MODEL', 'FEATURE', 'SERIES', 'ACQUISITION_DEPENDENCY', 'ENTRY_DATE', 'CURRENT_CUSTODIAN', 'BUILDING', 'LOCATION']}
                    />
                <Button type="primary" onClick={generatePDF}>Generar Etiquetas (QR)</Button>
            </div>
        </Layout>
    );
};
