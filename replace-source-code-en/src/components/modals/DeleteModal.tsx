import { Button, Modal } from 'antd';
import './deleteModal.scss';

const DeleteModal = ({
  title,
  content,
  handleOk,
  handleCancel,
  showModal,
}: {
  title: string;
  content: string;
  showModal: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}) => {
  return (
    <Modal
      className="delete-modal"
      open={showModal}
      title={title}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="delete-modal-ok-btn" type="primary" onClick={handleOk}>
          confirm
        </Button>,
        <Button key="delete-modal-cancel-btn" onClick={handleCancel}>
          cancel
        </Button>,
      ]}
    >
      {content}
    </Modal>
  );
};

export default DeleteModal;
