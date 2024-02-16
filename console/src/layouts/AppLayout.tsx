import { type FC, type ReactNode } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const MENU_ITEMS = [
  {
    key: "generators",
    label: "Генераторы",
    path: "/generators",
  },
  {
    key: "documentation",
    label: "Интеграция",
    path: "/documentation",
  },
];

export const AppLayout: FC<{
  selectedMenuItem?: "generators" | "documentation";
  children: ReactNode;
}> = ({ selectedMenuItem, children }) => {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Sider width={200}>
        <Menu
          theme="light"
          mode="inline"
          items={MENU_ITEMS}
          selectedKeys={
            selectedMenuItem == null ? undefined : [selectedMenuItem]
          }
          onSelect={({ key }) => {
            const item = MENU_ITEMS.find((item) => item.key === key);

            if (!item) {
              return;
            }

            navigate(item.path);
          }}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Content style={{ padding: "1rem" }}>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};
