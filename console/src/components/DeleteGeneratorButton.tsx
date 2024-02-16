import { useState, type FC } from "react";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { DeleteGeneratorModal } from "./DeleteGeneratorModal";
import { useApiClient } from "../hooks/useApiClient";
import { useTenantId } from "../hooks/useTenantId";

export const DeleteGeneratorButton: FC<{
  generatorId: number;
  onRefresh(): void;
}> = ({ generatorId, onRefresh }) => {
  const apiClient = useApiClient();
  const tenantId = useTenantId()!;
  const [showModal, setShowModal] = useState(false);
  const { mutate, isPending } = useMutation({
    async mutationFn() {
      return apiClient.tenant(tenantId).generators.delete(generatorId);
    },
    onSuccess() {
      setShowModal(false);
      onRefresh();
    },
  });

  return (
    <>
      <Button
        danger
        type="default"
        size="small"
        icon={<DeleteOutlined />}
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <DeleteGeneratorModal
          showProgress={isPending}
          onOk={() => mutate()}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};
