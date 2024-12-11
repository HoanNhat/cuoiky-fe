"use client";

import Title from "antd/es/typography/Title";
import { Button, Flex, Form, FormProps, Input, message, Radio } from "antd";
import { BaseApi } from "@/api/BaseApi";
import { useRouter } from "next/navigation";
import { login } from "@/api/API";

const page = () => {
  type FieldType = {
    username?: string;
    password?: string;
    dept_name?: string;
  };
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {      
    try {
      const res = await login(values); 
  
      sessionStorage.setItem("user", JSON.stringify(values)); 
      messageApi.success({
        content: "Đăng nhập thành công!",
        className: 'custom-message', 
      });
      router.push('/data');
      
    } catch (error: any) {
      messageApi.error({
        content: error.response?.data?.message || "Đăng nhập thất bại!",
        className: "custom-message", 
      });
    }
  };
  


  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (    
    <>
      {contextHolder}
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
          form={form}
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
            name="dept_name"
            rules={[{ required: true, message: "Please select your role!" }]}
          >
            <Radio.Group buttonStyle="outline">
              <Radio value="HR">HR</Radio>
              <Radio value="Accounting">ACOUNTTING</Radio>
              <Radio value="IT">IT</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </>
  );
};

export default page;
