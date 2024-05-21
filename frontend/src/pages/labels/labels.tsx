import React, { useState } from 'react';
import { Button, Row, Table, Checkbox, Space, notification } from 'antd';
import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
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

    const generatePDF = async () => {
        if (selectedRowKeys.length === 0) {
            notification.warning({
                message: 'No hay componentes seleccionados',
                description: 'Por favor, selecciona al menos un componente para generar los códigos QR.'
            });
            return;
        }

        const doc = new jsPDF();
        for (let index = 0; index < selectedRowKeys.length; index++) {
            const key = selectedRowKeys[index];
            const record = dataSource.find(item => item.ID === key);
            if (!record) continue;

            const qrUrl = `http://localhost:4000/mercury/component/${record.ID}`;
            const qrDataUrl = await QRCode.toDataURL(qrUrl);

            doc.text(`Componente ID: ${record.ID}`, 10, 10 + index * 40);
            doc.text(`IP: ${record.IP}`, 10, 20 + index * 40);
            doc.text(`Ubicación: ${record.LOCATION}`, 10, 30 + index * 40);
            doc.addImage(qrDataUrl, 'PNG', 150, 10 + index * 40, 30, 30);
        }
        doc.save('codigos_qr.pdf');
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
                    searchFields={['ID', 'COMPUTER_ID', 'IP', 'BUILDING', 'LOCATION']}
                />
                <Button type="primary" onClick={generatePDF}>Generar Códigos QR</Button>
            </div>
        </Layout>
    );
};
