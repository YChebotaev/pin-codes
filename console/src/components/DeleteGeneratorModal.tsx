import { type FC } from "react";
import { Modal } from "antd";

export const DeleteGeneratorModal: FC<{
  showProgress: boolean;
  onOk(): void;
  onCancel(): void;
}> = ({ showProgress, onOk, onCancel }) => {
  return (
    <Modal
      open
      title="Вы уверены что хотите удалить генератор?"
      okText="Удалить"
      cancelText="Отмена"
      okButtonProps={{ loading: showProgress }}
      cancelButtonProps={{ loading: showProgress }}
      onOk={onOk}
      onCancel={onCancel}
    ></Modal>
  );
};
