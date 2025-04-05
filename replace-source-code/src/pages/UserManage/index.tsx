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
    title: '姓名',
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
        message.error(`文件大小 ${name} 超出最大上限，上传失败.`);
        return false;
      }
    },
    onChange({ file }) {
      const { status, name, response } = file;

      if (status === 'done') {
        message.success(`${name} 文件上传完成.`);
        ref.current?.reload();
      } else if (status === 'error') {
        if (response.code === 401) {
          // 登录失效
          history.push('/login');
          message.error('登录失效，请重新登录');
          return;
        }
        message.error(`${name} 文件上传失败.`);
      }
    },
  };

  return (
    <PageContainer>
      <ProTable
        actionRef={ref}
        toolBarRender={() => [
          <Button key="add-btn" type="primary" onClick={() => setShowAddUserModal(true)}>
            新增
          </Button>,
          <Upload key="import-btn" {...uploadProps}>
            <Button type="primary">导入用户</Button>
          </Upload>,
        ]}
        rowKey="id"
        columns={[
          ...columns,
          {
            title: '操作',
            search: false,
            render: (_index, { id }) => {
              return (
                <Space>
                  <a
                    onClick={() => {
                      setShowAddUserModal(id);
                    }}
                  >
                    编辑
                  </a>
                  <a
                    onClick={() => {
                      setShowDeleteModal(id);
                    }}
                  >
                    删除
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
        title="删除用户"
        content="确定要删除该用户吗？"
        showModal={!!showDeleteModal}
        handleCancel={() => setShowDeleteModal(false)}
        handleOk={() => {
          if (showDeleteModal) {
            deleteUser(showDeleteModal).then(({ data }) => {
              if (data) {
                message.success('删除成功！');
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
