"use client";

import { deleteEmployee, insert, update } from "@/api/API";
import { Button, Col, DatePicker, Form, Input, message, Modal, Popconfirm, Select, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import Password from "antd/es/input/Password";
import moment from "moment";
import { useState } from "react";

type ColumnsType<T extends object> = TableProps<T>["columns"];

interface Employee {
  EMP_ID: number;
  EMP_NAME: string;
  BIRTH_DATE: string;
  DEPT_ID: number;
  EMAIL: string;
  MANAGER_ID: number | null;
  SALARY: number;
  TAX_CODE: string;
}

interface DataTableProps {
  data: Employee[];
  onChange: any;
}



export const DataTable: React.FC<DataTableProps> = ({ data, onChange }) => {
  const dataWithKeys = data.map((item) => ({ ...item, key: item.EMP_ID.toString() }));
  const [messageApi, contextHolder] = message.useMessage();
  
  const storedUser = JSON.parse(sessionStorage.getItem("user") || '{}');
  const user = storedUser.username;
  const pass = storedUser.password;
  const deptName = storedUser.dept_name;
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [id, setID] = useState(0);
  //console.log(deptName);

  const columns: ColumnsType<Employee> = [
    {
      title: "Employee ID",
      dataIndex: "EMP_ID",
      key: "EMP_ID",
    },
    {
      title: "Name",
      dataIndex: "EMP_NAME",
      key: "EMP_NAME",
      render: (text: string) => (text ? text : "NULL"),
    },
    {
      title: "Birth Date",
      dataIndex: "BIRTH_DATE",
      key: "BIRTH_DATE",
      render: (text: string) => (text ? new Date(text).toLocaleDateString() : "NULL"),
    },
    {
      title: "Department ID",
      dataIndex: "DEPT_ID",
      key: "DEPT_ID",
      render: (text: string) => (text ? text : "NULL"),
    },
    {
      title: "Email",
      dataIndex: "EMAIL",
      key: "EMAIL",
      render: (text: string) => (text ? text : "NULL"),
    },
    {
      title: "Salary",
      dataIndex: "SALARY",
      key: "SALARY",
      render: (text: number) => (text ? text : "NULL"),
    },
    {
      title: "Tax Code",
      dataIndex: "TAX_CODE",
      key: "TAX_CODE",
      render: (text: string) => (text ? text : "NULL"),
    },
    {
      title: "Manager ID",
      dataIndex: "MANAGER_ID",
      key: "MANAGER_ID",
      render: (text: number | null) => (text !== null ? text : "NULL"),
    },
    {
      title: <p style={{textAlign:"center"}}>Action</p>,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => {onUpdate(record), setID(record.EMP_ID)}}>
            Update
          </Button>
          <Popconfirm
            title="Delete Employee"
            description="Are you sure to delete this employee?"
            onConfirm={() => handleDelete(record.EMP_ID)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onInsert = () => {
    if(deptName === "HR"){
      setModalInsert(true)
    }
    else{
      messageApi.error({
      content: "Bạn không được phép insert!",
      className: "custom-message",
    });
    }
  }

  const options = [
    { value: '1', label: 'HR' },
    { value: '2', label: 'Accounting' },
    { value: '3', label: 'IT' },
  ];

  

  const onUpdate = (record:any) => {
    console.log(record);
    const department = options.find((option) => option.value === String(record.DEPT_ID));
    if(deptName === "HR"){
      setModalEdit(true)
      form1.setFieldsValue({
        empname: record.EMP_NAME,
        birthdate: record.BIRTH_DATE ? moment(record.BIRTH_DATE) : null,
        email: record.EMAIL,
        salary: record.SALARY,
        taxcode: record.TAX_CODE,
        deptid: department?.value,
      });
    }
    else{
      messageApi.error({
      content: "Bạn không được phép update!",
      className: "custom-message",
    });
    }
  }
  

  const handleInsert = async(values:any) => {
    if (values.birthdate && values.birthdate.isValid()) {
      values.birthdate = values.birthdate.format("YYYY-MM-DD");
    }  
    //console.log(values)
    try{
      await insert(user,pass,values);
      messageApi.success({
        content: "Thêm thành công!",
        className: 'custom-message', 
      });
      form.resetFields(); 
      setModalInsert(false);
      onChange();
    }catch (error: any) {
      const errorMessage = error.message || "Đã có lỗi xảy ra!";
      messageApi.error({
        content: errorMessage,
        className: "custom-message", 
      });
      console.log("Thêm thất bại!")
    }
  };

  type Data = {
    empid: number;
    empname:string,
    birthdate:string,
    email:string,
    salary:number,
    taxcode:string,
    deptid:number
  };
  
  const handleUpdate = async(values:any) => {
    if (values.birthdate && values.birthdate.isValid()) {
      values.birthdate = values.birthdate.format("YYYY-MM-DD");
    } 
    const data: Data = {
      empid: id,
      empname:values.empname,
      birthdate:values.birthdate,
      email:values.email,
      salary:values.salary,
      taxcode:values.taxcode,
      deptid:values.deptid     
    };
    try{
      await update(user,pass,data);
      messageApi.success({
        content: "Sửa thành công!",
        className: 'custom-message', 
      });
      form1.resetFields(); 
      setModalEdit(false);
      onChange();
    }catch (error: any) {
      const errorMessage = error.message || "Đã có lỗi xảy ra!";
      messageApi.error({
        content: errorMessage,
        className: "custom-message", 
      });
      console.log("Sửa thất bại!")
    }
  };
  
  
  const handleDelete = async(empId: number) => {
    if(deptName === "HR"){
      try {
        const res = await deleteEmployee(user, pass, empId);
        onChange();
      } catch (error: any) {
        const errorMessage = error.message || "Đã có lỗi xảy ra!";
        messageApi.error({
          content: errorMessage,
          className: "custom-message", 
        });
      }  
    }
    else{
        messageApi.error({
        content: "Bạn không được phép delete!",
        className: "custom-message",
      });
    }
  };


  const [modalInsert, setModalInsert] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  return (
    <>
      {contextHolder}
      <Button style={{marginBottom:"30px", marginLeft:"865px"}} type="primary" onClick={() => onInsert()}>
        Thêm nhân viên mới
      </Button>
      <Table<Employee>
        columns={columns}
        dataSource={dataWithKeys}
        pagination={{
          position: ["bottomCenter"],
          pageSize: 5,
        }}
        style={{textAlign:"center"}}
      />
      <Modal
        centered
        open={modalInsert}
        onCancel={() => {
          setModalInsert(false);
        }}
        footer={null}
        width={720}
        
      >
        <Form form={form} onFinish={handleInsert} style={{marginTop:"30px"}}>
          <Col span={24}>
            <p style={{fontSize:"15px", marginBottom:'10px'}}>*Tên nhân viên</p>
            <Form.Item name="empname" rules={[{ required: true, message: "Nhập tên danh mục" }]}>
              <Input size="large" placeholder="Nhập tên nhân viên" />
            </Form.Item>
          </Col>
          <Col style={{display:"flex", justifyContent:'space-between'}} span={24}>
            <Col span={11}>
              <p style={{fontSize:"15px", marginBottom:'10px'}}>*Ngày sinh</p>
              <Form.Item name="birthdate" rules={[{ required: true, message: "Chọn ngày sinh" }]}>
                <DatePicker placeholder="DD/MM/YYYY" style={{ width: "100%" }} size="large" format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <p style={{fontSize:"15px", marginBottom:'10px'}}>*Email</p>
              <Form.Item name="email" rules={[{ required: true, message: "Nhập email" }]}>
                <Input size="large" placeholder="abc@gmail.com" />
              </Form.Item>
            </Col>
          </Col>
          <Col style={{display:"flex", justifyContent:'space-between'}} span={24}>
            <Col span={11}>
              <p style={{fontSize:"15px", marginBottom:'10px'}}>*Lương</p>
              <Form.Item name="salary" rules={[{ required: true, message: "Nhập lương" }]}>
                <Input size="large" placeholder="3000$" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <p style={{fontSize:"15px", marginBottom:'10px'}}>*Tax code</p>
              <Form.Item name="taxcode" rules={[{ required: true, message: "Nhập tax code" }]}>
                <Input size="large" placeholder="TX0" />
              </Form.Item>
            </Col>
          </Col>
          <Col style={{display:"flex", justifyContent:'space-between'}} span={24}>
            <Col span={11}>
              <p style={{fontSize:"15px", marginBottom:'10px'}}>*Username</p>
              <Form.Item name="username" rules={[{ required: true, message: "Nhập username" }]}>
                <Input size="large" placeholder="abc" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <p style={{fontSize:"15px", marginBottom:'10px'}}>*Password</p>
              <Form.Item name="password" rules={[{ required: true, message: "Nhập mật khẩu" }]}>
                <Input type="password" size="large" placeholder="*******" />
              </Form.Item>
            </Col>
          </Col>
          <Col style={{display:"flex", justifyContent:'space-between'}} span={24}>
            <Col span={11}>
              <p style={{fontSize:"15px", marginBottom:'10px'}}>*Phòng ban</p>
              <Form.Item name="deptid" rules={[{ required: true, message: "Chọn phòng ban" }]}>
                <Select options={[
                  { value: '1', label: 'HR' },
                  { value: '2', label: 'Accounting' },
                  { value: '3', label: 'IT' },
                ]}
                size="large"
                placeholder="" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <p style={{fontSize:"15px", marginBottom:'10px'}}>*Manager ID</p>
              <Form.Item name="managerid" rules={[{ required: true, message: "Chọn manager ID" }]}>
                <Select options={[
                    { value: '1', label: 'HR' },
                    { value: '2', label: 'Accounting' },
                    { value: '3', label: 'IT' },
                  ]}
                  size="large" 
                  placeholder="" />
              </Form.Item>
            </Col>
          </Col>
          <Col span={24}>
            <Button htmlType="submit" size="large" type="primary" style={{width:"100%"}}>Lưu</Button>
          </Col>
        </Form>
      </Modal>
      <Modal
        centered
        open={modalEdit}
        onCancel={() => {
          setModalEdit(false);
        }}
        footer={null}
        width={720}      
      >
        <Form form={form1} onFinish={handleUpdate} style={{marginTop:"30px"}}>
          <Col style={{display:"flex", justifyContent:'space-between'}} span={24}>
            <Col span={11}>
              <p style={{fontSize:"15px", marginBottom:'10px'}}>*Tên nhân viên</p>
              <Form.Item name="empname" rules={[{ required: true, message: "Nhập tên danh mục" }]}>
                <Input size="large" placeholder="Nhập tên nhân viên" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <p style={{fontSize:"15px", marginBottom:'10px'}}>*Ngày sinh</p>
              <Form.Item name="birthdate" rules={[{ required: true, message: "Chọn ngày sinh" }]}>
                <DatePicker placeholder="DD/MM/YYYY" style={{ width: "100%" }} size="large" format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
          </Col>
          <Col style={{display:"flex", justifyContent:'space-between'}} span={24}>        
            <Col span={11}>
              <p style={{fontSize:"15px", marginBottom:'10px'}}>*Email</p>
              <Form.Item name="email" rules={[{ required: true, message: "Nhập email" }]}>
                <Input size="large" placeholder="abc@gmail.com" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <p style={{fontSize:"15px", marginBottom:'10px'}}>*Lương</p>
              <Form.Item name="salary" rules={[{ required: true, message: "Nhập lương" }]}>
                <Input size="large" placeholder="3000$" />
              </Form.Item>
            </Col>
          </Col>
          <Col style={{display:"flex", justifyContent:'space-between'}} span={24}>        
            <Col span={11}>
              <p style={{fontSize:"15px", marginBottom:'10px'}}>*Tax code</p>
              <Form.Item name="taxcode" rules={[{ required: true, message: "Nhập tax code" }]}>
                <Input size="large" placeholder="TX0" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <p style={{fontSize:"15px", marginBottom:'10px'}}>*Phòng ban</p>
              <Form.Item name="deptid" rules={[{ required: true, message: "Chọn phòng ban" }]}>
                <Select options={[
                  { value: '1', label: 'HR' },
                  { value: '2', label: 'Accounting' },
                  { value: '3', label: 'IT' },
                ]}
                size="large"
                placeholder="" />
              </Form.Item>
            </Col>
          </Col>
          <Col span={24}>
            <Button htmlType="submit" size="large" type="primary" style={{width:"100%"}}>Lưu</Button>
          </Col>
        </Form>
      </Modal>
    </>
  );
};
