import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Space, Divider, Select } from 'antd';

const { Option } = Select;

interface Props {
    modalTitle: string;
    isVisible: boolean;
    handleOk?: () => void;
    handleVisible: any;
    text?: string;
    isAdding?: boolean;
    handleAddEdit?: any;
    columns?: any;
    selectedRecord?: any;
    icon?: React.ReactNode;
    iconColor?: string;
    iconBackgroundColor?: string;
    formColumns?: string[];
    selectTypeInputs?: any[];
    dateTypeInputs?: number[];
}

const CustomModal: React.FC<Props> = ({
    modalTitle,
    isVisible,
    handleOk,
    handleVisible,
    text = "",
    isAdding = false,
    handleAddEdit,
    columns,
    selectedRecord,
    icon,
    iconColor,
    iconBackgroundColor,
    formColumns = [],
    selectTypeInputs = [],
    dateTypeInputs = []
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (isAdding && selectTypeInputs.length > 0) {
            const initialValues: any = {};
            selectTypeInputs.forEach(([index, options]) => {
                if (options.length > 0) {
                    initialValues[formColumns[index]] = options[0].ID;
                }
            });
            form.setFieldsValue(initialValues);
        } else if (selectedRecord) {
            const building = selectTypeInputs.find(([index]) => index === 1)?.[1]?.find((b: any) => b.NAME === selectedRecord.BUILDING);
            const initialValues = {
                ...selectedRecord,
                BUILDING: building ? building.ID : undefined,
            };
            form.setFieldsValue(initialValues);
        }
    }, [isAdding, selectTypeInputs, formColumns, form, selectedRecord]);

    const formContent: any = [];
    if (typeof handleAddEdit === 'function') {
        formColumns.forEach((columnName, index) => {
            const column = columns.find((col: any) => col.dataIndex === columnName);
            if (column) {
                const selectInput = selectTypeInputs.find(([i]) => i === index);
                formContent.push(
                    <Form.Item
                        key={index}
                        label={<span style={{ color: '#191970', fontWeight: '600' }}>{column.title}</span>}
                        name={column.dataIndex}
                        rules={column.rules}>
                        {selectInput ? (
                            <Select>
                                {selectInput[1].map((opt: any) => (
                                    <Option key={opt.ID} value={opt.ID}>{opt.NAME}</Option>
                                ))}
                            </Select>
                        ) : dateTypeInputs.includes(index) ? (
                            <input type='date' style={{borderRadius:'8px', padding:'4px', borderStyle:'solid', borderWidth:'1px', width:'100%'}} />
                        ) : (
                            <Input />
                        )}
                    </Form.Item>
                );
            }
        });
    }

    const titleStyles: any = {
        fontWeight: 'bold',
        fontSize: '1.3em',
        ...(text === "" && { textAlign: 'center' })
    };

    const iconContainerStyles: any = {
        backgroundColor: iconBackgroundColor,
        borderRadius: '50%',
        width: '1.6em',
        height: '1.6em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return (
        <div>
            <Modal
                title={
                    <div style={titleStyles}>
                        <Space>
                            <div style={iconContainerStyles}>
                                {icon && <span style={{ color: iconColor, fontSize: '1.2em' }}>{icon}</span>}
                            </div>
                            <span style={{ color: 'rgb(14,17,17)' }}>{modalTitle}</span>
                        </Space>
                        <Divider />
                    </div>
                }
                visible={isVisible}
                onOk={handleOk}
                onCancel={() => handleVisible(false)}
                footer={text === "" ? null : undefined}
            >
                {text !== "" ?
                    <p style={{ fontSize: '1.05em' }}>{text}</p>
                    :
                    <Form
                        layout="vertical"
                        form={form}
                        onFinish={handleAddEdit}
                        initialValues={selectedRecord}
                    >
                        {formContent}
                        <Form.Item style={{ textAlign: 'right' }}>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    {isAdding ? 'Agregar' : 'Actualizar'}
                                </Button>
                                <Button onClick={() => handleVisible(false)}>
                                    Cancelar
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                }
            </Modal>
        </div>
    );
};

export default CustomModal;
