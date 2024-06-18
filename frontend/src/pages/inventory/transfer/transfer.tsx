import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../../components/layout';
import { Button, Row, Col, Select, Table, Input, notification } from 'antd';
import { getAssetsByCustodian, transferAssets } from '../../../providers/options/transfer';
import { getAllUsers } from '../../../providers/options/users';

const { Option } = Select;
const { Search } = Input;

const TransferAssets = () => {
    const [custodians, setCustodians] = useState([]);
    const [assets, setAssets] = useState([]);
    const [filteredAssets, setFilteredAssets] = useState([]);
    const [selectedAssets, setSelectedAssets] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [currentCustodian, setCurrentCustodian] = useState<any>(null);
    const [newCustodian, setNewCustodian] = useState<any>(null);
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        getAllUsers()
            .then((result: any) => {
                if (result.success) {
                    setCustodians(result.users);
                } else {
                    console.error(result.error.message);
                    notification.error({
                        message: 'Error de obtención de datos',
                        description: `No se pudo obtener los custodios: ${result.error.message}`
                    });
                }
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (searchText === '') {
            setFilteredAssets(assets);
        } else {
            setFilteredAssets(
                assets.filter((asset: any) =>
                    Object.values(asset).some((value) =>
                        String(value).toLowerCase().includes(searchText.toLowerCase())
                    )
                )
            );
        }
    }, [searchText, assets]);

    const handleCustodianChange = (custodianId: number) => {
        const custodian: any = custodians.find((c: any) => c.ID === custodianId);
        if (newCustodian && (newCustodian.ID === custodian.ID)) {
            notification.error({
                message: 'Error de transferencia',
                description: 'Debes seleccionar un custodio diferente para la transferencia.'
            });
        }
        setCurrentCustodian(custodian);
        setLoading(true);
        getAssetsByCustodian(custodian.NAME + " " + custodian.LASTNAME)
            .then((result: any) => {
                if (result.success) {
                    setAssets(result.assets);
                    setFilteredAssets(result.assets);
                } else {
                    console.error(result.error.message);
                    notification.error({
                        message: 'Error de obtención de datos',
                        description: `No se pudo obtener los bienes: ${result.error.message}`
                    });
                }
            })
            .catch((error: any) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleTransfer = () => {
        transferAssets({ newCustodian: newCustodian.NAME + " " + newCustodian.LASTNAME, assets: selectedAssets })
            .then((result: any) => {
                if (result.success) {
                    notification.success({
                        message: 'Transferencia exitosa',
                        description: `Se han transferido ${result.transfer.changedRows} bienes exitosamente.`
                    });
                    setAssets([]);
                    setFilteredAssets([]);
                    setSelectedAssets([]);
                    setCurrentCustodian(null);
                    setNewCustodian(null);
                } else {
                    notification.error({
                        message: 'Error de transferencia',
                        description: `No se pudo transferir los bienes: ${result.error.message}`
                    });
                }
            })
            .catch((error: any) => {
                console.error(error);
            });
    };

    const handleNewCustodian = (custodianId: number) => {
        const custodian: any = custodians.find((c: any) => c.ID === custodianId);
        if (currentCustodian && (currentCustodian.ID === custodian.ID)) {
            notification.error({
                message: 'Error de transferencia',
                description: 'Debes seleccionar un custodio diferente para la transferencia.'
            });
        }
        setNewCustodian(custodian);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const columns = [
        { title: 'ID', dataIndex: 'ASSET_KEY', key: 'id' },
        { title: 'Nombre', dataIndex: 'NAME', key: 'name' },
        { title: 'Categoría', dataIndex: 'CATEGORY', key: 'category' },
        { title: 'Marca', dataIndex: 'BRAND', key: 'brand' },
        { title: 'Modelo', dataIndex: 'MODEL', key: 'model' },
        { title: 'Ubicación', dataIndex: 'LOCATION', key: 'location' },
        { title: 'Estado', dataIndex: 'BORROWED', key: 'borrowed' },
        { title: 'Fecha de Ingreso', dataIndex: 'ENTRY_DATE', key: 'entry_date' },
    ];

    return (
        <Layout>
            <div style={{ padding: '20px' }}>
                <h1 style={{ marginBottom: '20px' }}>Transferencia de Bienes</h1>
                <Row gutter={[16, 16]} justify="center">
                    <Col xs={24} sm={24} md={10} lg={6} xl={6}>
                        <h3>Custodio de Origen</h3>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Selecciona un custodio"
                            onChange={(custodianId) => handleCustodianChange(custodianId)}
                            value={currentCustodian ? currentCustodian.ID : null}
                        >
                            {custodians.map((custodian: any) => (
                                <Option key={custodian.ID} value={custodian.ID}>
                                    {custodian.NAME + " " + custodian.LASTNAME}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col xs={8} sm={6} md={4} lg={3} xl={3}>
                        <Button
                            type="primary"
                            onClick={handleTransfer}
                            style={{ marginTop: '33px', width: '100%' }}
                            disabled={!selectedAssets.length || !newCustodian || (currentCustodian && currentCustodian.ID === newCustodian.ID)}
                        >
                            Transferir
                        </Button>
                    </Col>
                    <Col xs={24} sm={24} md={10} lg={6} xl={6}>
                        <h3>Custodio de Destino</h3>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Selecciona un custodio"
                            onChange={(custodianId) => handleNewCustodian(custodianId)}
                            value={newCustodian ? newCustodian.ID : null}
                        >
                            {custodians.map((custodian: any) => (
                                <Option key={custodian.ID} value={custodian.ID}>
                                    {custodian.NAME + " " + custodian.LASTNAME}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px' }} justify="center">
                    <Col xs={24} sm={24} md={10} lg={6} xl={6}>
                        <Input
                            placeholder="Buscar en los bienes"
                            value={searchText}
                            onChange={handleSearch}
                            allowClear
                            style={{ marginBottom: '20px' }}
                        />
                    </Col>
                    <Col span={24}>
                        <Table
                            dataSource={filteredAssets}
                            columns={columns}
                            rowKey="ASSET_KEY"
                            loading={loading}
                            rowSelection={{
                                selectedRowKeys: selectedAssets,
                                onChange: (selectedRowKeys) => setSelectedAssets(selectedRowKeys),
                            }}
                            pagination={{ pageSize: 10 }}
                            scroll={{ x: 'max-content' }}
                        />
                    </Col>
                </Row>
            </div>
        </Layout>
    );
};

export default TransferAssets;
