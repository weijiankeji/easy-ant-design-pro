import SubmitButton from '@/components/SubmitButton';
import { ProFormText } from '@ant-design/pro-components';
import { Button, Form, Modal, Row, Space, message } from 'antd';
import { useEffect } from 'react';
import { addUser, getUser, updateUser } from '../api';

const ModifyModal = ({
  handleOk,
  handleCancel,
  showModal,
}: {
  showModal: boolean | string;
  handleOk: () => void;
  handleCancel: () => void;
}) => {
  const [form] = Form.useForm<{
    id: string;
    password: string;
    name: string;
    groupName: string;
  }>();
  const isEdit = typeof showModal === 'string';

  useEffect(() => {
    if (isEdit) {
      getUser(showModal).then(({ data }) => {
        form.setFieldsValue({
          ...data,
        });
      });
    }
  }, [isEdit]);

  const prefix = isEdit ? 'modify' : 'add';

  return (
    <Modal
      className="add-modal"
      open={!!showModal}
      title={`${prefix} user`}
      onCancel={() => {
        handleCancel();
      }}
      destroyOnClose
      footer={[]}
    >
      <Form
        form={form}
        name="validateOnly"
        autoComplete="off"
        requiredMark={false}
        layout="vertical"
        preserve={false}
      >
        <ProFormText
          name="id"
          label="id"
          rules={[{ required: true }]}
          disabled={isEdit}
        ></ProFormText>
        <ProFormText name="name" label="name"></ProFormText>
        <Row justify={'end'}>
          <Space>
            <Button onClick={handleCancel}>cancel</Button>
            <SubmitButton
              form={form}
              btnText="save"
              onSubmit={() => {
                const values = form.getFieldsValue();
                let func;

                if (isEdit) {
                  func = () => updateUser(values);
                } else {
                  func = () => addUser(values);
                }
                func().then(({ data, errorMessage }) => {
                  if (data) {
                    message.success(`${prefix} success`);
                    handleOk();
                  } else {
                    message.error(errorMessage || `${prefix} fail`);
                  }
                });
              }}
            />
          </Space>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModifyModal;
