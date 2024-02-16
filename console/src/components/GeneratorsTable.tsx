import { type FC } from "react";
import { Table, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useTenantId } from "../hooks/useTenantId";
import { useApiClient } from "../hooks/useApiClient";
import { DeleteGeneratorButton } from "./DeleteGeneratorButton";

export const GeneratorsTable: FC = () => {
  const apiClient = useApiClient();
  const tenantId = useTenantId()!;
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tenants", tenantId, "generators"],
    async queryFn() {
      return apiClient.tenant(tenantId).generators.list();
    },
  });

  return (
    <Table
      loading={isLoading}
      rowKey="id"
      dataSource={data}
      columns={[
        {
          key: "id",
          title: "Номер генератора",
          dataIndex: "id",
          render(value: number) {
            return <Typography.Text code>{value}</Typography.Text>;
          },
        },
        {
          key: "generatedCount",
          title: "Сгенерировано пин-кодов",
          dataIndex: "generatedCount",
        },
        {
          key: "size",
          title: "Длина пин-кода",
          dataIndex: "size",
        },
        {
          key: "actions",
          title: "Удалить",
          render(_, { id }) {
            return (
              <DeleteGeneratorButton
                generatorId={id}
                onRefresh={() => refetch()}
              />
            );
          },
        },
      ]}
    />
  );
};
