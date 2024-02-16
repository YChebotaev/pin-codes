import { useState, type FC } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddGeneratorModal } from "./AddGeneratorModal";
import { useTenantId } from "../hooks/useTenantId";
import { useApiClient } from "../hooks/useApiClient";

export const AddGeneratorButton: FC = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const tenantId = useTenantId()!;
  const { mutate } = useMutation({
    async mutationFn() {
      return apiClient.tenant(tenantId).generators.create();
    },
    onSuccess({ token }) {
      setToken(token);
      setShowModal(true);
      queryClient.invalidateQueries({
        queryKey: ["tenants", tenantId, "generators"],
      });
    },
  });

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => mutate()}>
        Добавить генератор
      </Button>
      {showModal && (
        <AddGeneratorModal token={token!} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};
