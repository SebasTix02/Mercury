import { Button, Modal, Table, Form, Input, Space, Row, Col } from 'antd';

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
    { modalTitle, isVisible, handleOk, handleVisible, text = "" , isAdding = false, handleAddEdit, columns, selectedRecord}) => {
    
    let formContent = []
    if (typeof handleAddEdit === 'function'){
        for (let i = 1; i < columns!.length - 1; i++) {
            formContent.push(
                <Form.Item label={columns![i].title} name={columns![i].dataIndex} rules={columns![i].rules}>
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
        footer={isAdding ? null : undefined}
        >
        {text !== "" ? 
            <p>{text}</p> 
        : 
            <Form layout="vertical" 
            onFinish={handleAddEdit}
            initialValues={selectedRecord}>
            {formContent}
            {isAdding && (
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Agregar
                    </Button>
                </Form.Item>
            )}
            </Form>
        }        
      </Modal>
      </div>
    );
  };
  
  export default CustomModal;