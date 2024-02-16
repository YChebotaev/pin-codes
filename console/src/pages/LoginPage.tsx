import { type FC } from "react";
import { Typography, Form, Input, Space, Button } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { useApiClient } from "../hooks/useApiClient";
import { refresh } from "../main";

type FieldType = {
  email?: string;
  password?: string;
};

export const LoginPage: FC = () => {
  const apiClient = useApiClient();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    async mutationFn() {
      return apiClient.auth.login({
        email: form.getFieldValue("email"),
        password: form.getFieldValue("password"),
      });
    },
    onSuccess({ token }) {
      localStorage.setItem("token", token);

      refresh()

      navigate("/");
    },
  });

  return (
    <AuthLayout>
      <Typography.Title>Вход</Typography.Title>
      <br />
      <Form
        form={form}
        name="registerForm"
        layout="vertical"
        onFinish={() => {
          mutate();
        }}
      >
        <Form.Item<FieldType>
          label="Контактный емейл"
          name="email"
          rules={[
            {
              type: "email",
              message: "Введите корректный емейл",
            },
            {
              required: true,
              message: "Введите емейл",
            },
          ]}
        >
          <Input maxLength={250} style={{ width: 300 }} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Пароль"
          name="password"
          rules={[
            {
              required: true,
              message: "Введите пароль",
            },
          ]}
        >
          <Input type="password" maxLength={250} style={{ width: 300 }} />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button htmlType="submit" type="primary">
              Войти
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};
