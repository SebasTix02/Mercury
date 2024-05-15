import { Button, Modal, Form, Input, Space, Divider } from 'antd';

interface Props {
    modalTitle: string,
    isVisible: boolean,
    handleOk?: () => void;
    handleVisible: any;
    text?: string;
    isAdding?: boolean,
    handleAddEdit?: any;
    columns?: any;
    selectedRecord?: any;
    icon?: React.ReactNode;
    iconColor?: string;
    iconBackgroundColor?: string;
    formColumns?:string[];
}

const CustomModal: React.FC<Props> = (
    { modalTitle, 
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
        formColumns = [] }
    ) => {


    let formContent:any = []
    if (typeof handleAddEdit === 'function') {
        formColumns.forEach((columnName, index) => {
            const column = columns.find((col:any) => col.dataIndex === columnName);
            if (column) {
                formContent.push(
                    <Form.Item 
                        key={index} 
                        label={<span style={{color:'#191970', fontWeight:'600'}}>{column.title}</span>}
                        name={column.dataIndex} 
                        rules={column.rules}>
                        <Input />
                    </Form.Item>
                );
            }
        });
    }
    const titleStyles:any = { 
        fontWeight: 'bold', 
        fontSize: '1.3em' 
    }

    const iconContainerStyles:any = {
        backgroundColor:iconBackgroundColor, 
        borderRadius:'50%', 
        width:'1.6em', 
        height:'1.6em', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
    }

    text == "" ? titleStyles.textAlign = 'center' : null
    return (
        <div>
            <Modal
                title={
                    <div style={titleStyles}>
                        <Space>
                        <div style={iconContainerStyles}>
                            {icon && <span style={{ color: iconColor, fontSize:'1.2em'}}>{icon}</span>}
                        </div>

                            <span style={{color:'rgb(14,17,17)'}}>{modalTitle}</span>
                        </Space>
                        <Divider/>
                    </div>
                }
                visible={isVisible}
                onOk={handleOk}
                onCancel={() => handleVisible(false)}
                footer={text == "" ? null : undefined}
            >
                {text !== "" ?
                    <p style={{fontSize:'1.05em'}}>{text}</p>
                :
                    <Form layout="vertical"
                        onFinish={handleAddEdit}
                        initialValues={selectedRecord}>
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