"use client";

import Title from "antd/es/typography/Title";
import { Button, Flex, Form, FormProps, Input, Radio } from "antd";

const page = () => {
  type FieldType = {
    username?: string;
    password?: string;
    role?: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Flex
      justify="center"
      align="center"
      vertical={true}
      style={{ height: "100vh" }}
    >
      <Title level={2}>Đăng nhập</Title>
      <Form
        size="large"
        layout="vertical"
        onFinish={onFinish}
        style={{ width: 500 }}
        initialValues={{ role: "a" }}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="role"
          rules={[{ required: true, message: "Please select your role!" }]}
        >
          <Radio.Group buttonStyle="outline">
            <Radio value="employee">Employee</Radio>
            <Radio value="manager">Manager</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default page;
