import React, { useEffect, useState } from 'react';
import { Button, Row, Table, Checkbox, Space, notification } from 'antd';

import Layout from '../../components/layout';
import CustomTable from '../../common/table/custom_table';
import { getInfoLabels, sendAssetKeys } from '../../providers/options/label';

interface Component {
    ASSET_KEY: number;
    COMPUTER_ID: number | null;
    CATEGORY: string;
    NAME: string;
    BRAND: string;
    MODEL: string;
    FEATURE: string | null;
    SERIES: string;
    ACQUISITION_DEPENDENCY: string;
    ENTRY_DATE: string;
    CURRENT_CUSTODIAN: string;
    BUILDING: string | null;
    LOCATION: string | null;
}

export const Etiquetas = () => {
    const [dataSource, setDataSource] = useState<Component[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLabels = async () => {
            try {
                const result = await getInfoLabels();
                if (result.success) {
                    setDataSource(result.categories);
                } else {
                    console.error(result.error?.message);
                    notification.error({
                        message: 'Error de obtención de datos',
                        description: `No se pudo obtener las categorías: ${result.error?.message}`
                    });
                }
            } catch (error) {
                console.error(error);
                notification.error({
                    message: 'Error de obtención de datos',
                    description: 'Ocurrió un error al obtener las categorías.'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchLabels();
    }, []);
    
    const handleSelectChange = (selectedKeys: number[]) => {
        setSelectedRowKeys(selectedKeys);
    };
    
    const handleSelectAllChange = (checked: boolean) => {
        if (checked) {
            setSelectedRowKeys(dataSource.map(item => item.ASSET_KEY));
        } else {
            setSelectedRowKeys([]);
        }
    };

    const handleGenerateQrTags = async () => {
        // Filtra los activos seleccionados
        const selectedAssets = dataSource.filter(item => selectedRowKeys.includes(item.ASSET_KEY));
        
        // Mapea los activos seleccionados al formato correcto
        const formattedAssets = selectedAssets.map(item => ({
            assetKey: item.ASSET_KEY,
            isComputer: item.COMPUTER_ID !== null ? item.COMPUTER_ID : null,
        }));
        
        try {
            // Envía los activos formateados al backend para generar las etiquetas QR
            const response = await sendAssetKeys(formattedAssets);
            // Maneja la respuesta, por ejemplo, muestra un mensaje de éxito
            notification.success({
                message: 'Etiquetas generadas con éxito',
                description: 'Las etiquetas QR han sido generadas y descargadas.',
            });
        } catch (error) {
            // Maneja errores, por ejemplo, muestra un mensaje de error
            console.error(error);
            notification.error({
                message: 'Error al generar etiquetas',
                description: 'Ha ocurrido un error al generar las etiquetas QR.',
            });
        }
    };
    

    const columns = [
        {
            title: 'Seleccionar...',
            key: 'isSelected',
            render: (_: any, record: Component) => (
                
                <Checkbox
                    checked={selectedRowKeys.includes(record.ASSET_KEY)}
                    onChange={() => {
                        const newSelectedRowKeys = selectedRowKeys.includes(record.ASSET_KEY)
                            ? selectedRowKeys.filter(key => key !== record.ASSET_KEY)
                            : [...selectedRowKeys, record.ASSET_KEY];
                        handleSelectChange(newSelectedRowKeys);
                    }}
                />
            ),
        },
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
            title: 'Fecha...',
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
                
                    <Checkbox
                        indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < dataSource.length}
                        onChange={e => handleSelectAllChange(e.target.checked)}
                        checked={selectedRowKeys.length === dataSource.length}
                    >
                        Seleccionar todos
                    </Checkbox>

                    <Button
                        type="primary"
                        onClick={handleGenerateQrTags}
                        disabled={selectedRowKeys.length === 0}
                    >
                        Generar Etiquetas (QR)
                    </Button>
            </div>
        </Layout>
    );
};