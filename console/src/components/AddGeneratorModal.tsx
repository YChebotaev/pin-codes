import { type FC } from "react";
import { Modal, Typography } from "antd";

export const AddGeneratorModal: FC<{
  token: string;
  onClose(): void;
}> = ({ token, onClose }) => (
  <Modal
    open
    title="Добавить генератор"
    cancelButtonProps={{ style: { display: "none" } }}
    okText="Закрыть"
    onOk={onClose}
    onCancel={onClose}
  >
    <Typography.Paragraph>
      Ваш токен доступа к генератору через API
    </Typography.Paragraph>
    <Typography.Paragraph style={{ fontWeight: "bold" }}>
      Токен будет показан только один раз
    </Typography.Paragraph>
    <Typography.Paragraph>Сохраните его в надежном месте</Typography.Paragraph>
    <Typography.Paragraph code copyable>
      {token}
    </Typography.Paragraph>
  </Modal>
);
