import DeleteModal from '@/components/modals/DeleteModal';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Space, Upload, UploadProps, message } from 'antd';
import { useRef, useState } from 'react';
import { deleteUser, getUserList } from './api';
import ModifyModal from './modals/ModifyModal';
import { TUser } from './types';

const columns: ProColumns<TUser>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'name',
    dataIndex: 'name',
  },
];

const UserManagement = () => {
  const ref = useRef<ActionType>();
  const [showAddUserModal, setShowAddUserModal] = useState<boolean | string>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<false | string>(false);
  const uploadProps: UploadProps = {
    // name: 'file',
    accept:
      'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    multiple: false,
    maxCount: 1,
    action: `/api/management/user/import`,
    showUploadList: false,
    beforeUpload: (file) => {
      const { size, name } = file;
      if (size > 1024 * 1024 * 30) {
        message.error(`${name} file size limit 30M, upload fail.`);
        return false;
      }
    },
    onChange({ file }) {
      const { status, name, response } = file;

      if (status === 'done') {
        message.success(`${name} upload success.`);
        ref.current?.reload();
      } else if (status === 'error') {
        if (response.code === 401) {
          // 登录失效
          history.push('/login');
          message.error('session expired, please login again.');
          return;
        }
        message.error(`${name} upload fail.`);
      }
    },
  };

  return (
    <PageContainer>
      <ProTable
        actionRef={ref}
        toolBarRender={() => [
          <Button key="add-btn" type="primary" onClick={() => setShowAddUserModal(true)}>
            add
          </Button>,
          <Upload key="import-btn" {...uploadProps}>
            <Button type="primary">import</Button>
          </Upload>,
        ]}
        rowKey="id"
        columns={[
          ...columns,
          {
            title: 'operate',
            search: false,
            render: (_index, { id }) => {
              return (
                <Space>
                  <a
                    onClick={() => {
                      setShowAddUserModal(id);
                    }}
                  >
                    edit
                  </a>
                  <a
                    onClick={() => {
                      setShowDeleteModal(id);
                    }}
                  >
                    delete
                  </a>
                </Space>
              );
            },
          },
        ]}
        request={(values) => {
          return getUserList(values);
        }}
        pagination={{
          pageSize: 10,
        }}
      ></ProTable>
      <ModifyModal
        showModal={showAddUserModal}
        handleCancel={() => setShowAddUserModal(false)}
        handleOk={() => {
          ref.current?.reload();
          setShowAddUserModal(false);
        }}
      />
      <DeleteModal
        title="delete user"
        content="confirm to delete this user?"
        showModal={!!showDeleteModal}
        handleCancel={() => setShowDeleteModal(false)}
        handleOk={() => {
          if (showDeleteModal) {
            deleteUser(showDeleteModal).then(({ data }) => {
              if (data) {
                message.success('delete success!');
                ref.current?.reload();
                setShowDeleteModal(false);
              }
            });
          }
        }}
      />
    </PageContainer>
  );
};

export default UserManagement;
