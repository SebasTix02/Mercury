import { Button, Modal, Form, Input, Space } from 'antd';

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
        selectedRecord }
    ) => {


    let formContent = []
    if (typeof handleAddEdit === 'function') {
        for (let i = 1; i < columns!.length - 1; i++) {
            formContent.push(
                <Form.Item 
                key={i} 
                label={columns![i].title} 
                name={columns![i].dataIndex} 
                rules={columns![i].rules}>
                    <Input />
                </Form.Item>
            )
        }
    }
    return (
        <div>
            <Modal
                title={modalTitle}
                visible={isVisible}
                onOk={handleOk}
                onCancel={() => handleVisible(false)}
                footer={text == "" ? null : undefined}
            >
                {text !== "" ?
                    <p>{text}</p>
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


