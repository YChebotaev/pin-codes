import { type FC } from "react";
import { Space } from "antd";
import { AppLayout } from "../layouts/AppLayout";
import { AddGeneratorButton } from "../components/AddGeneratorButton";
import { GeneratorsTable } from "../components/GeneratorsTable";

export const GeneratorsPage: FC = () => (
  <AppLayout selectedMenuItem="generators">
    <div>
      <Space>
        <AddGeneratorButton />
      </Space>
    </div>
    <br />
    <div>
      <GeneratorsTable />
    </div>
  </AppLayout>
);
