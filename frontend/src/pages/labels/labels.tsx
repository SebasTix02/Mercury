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
            key: 'building',
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
        {
            title: 'Seleccionar',
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
                    rowKey="ID"
                    searchFields={['ID', 'CATEGORY', 'NAME', 'BRAND', 'MODEL', 'FEATURE', 'SERIES', 'ACQUISITION_DEPENDENCY', '', '', '']}
                />
                <Button type="primary" onClick={generatePDF}>Generar Etiquetas (QR)</Button>
            </div>
        </Layout>
    );
};
