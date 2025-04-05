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

  const prefix = isEdit ? '修改' : '新增';

  return (
    <Modal
      className="add-modal"
      open={!!showModal}
      title={`${prefix}用户`}
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
          label="用户ID"
          rules={[{ required: true }]}
          disabled={isEdit}
        ></ProFormText>
        <ProFormText name="name" label="姓名"></ProFormText>
        <Row justify={'end'}>
          <Space>
            <Button onClick={handleCancel}>取消</Button>
            <SubmitButton
              form={form}
              btnText="保存"
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
                    message.success(`${prefix}成功`);
                    handleOk();
                  } else {
                    message.error(errorMessage || `${prefix}失败`);
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
