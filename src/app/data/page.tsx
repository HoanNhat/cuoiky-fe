"use client";

import Title from "antd/es/typography/Title";
import { Button, Flex, Form, FormProps, Input, message, Radio } from "antd";
import { DataTable } from "@/component/DataTable";
import { useEffect, useState } from "react";
import { getAllEmployees, login } from "@/api/API";
import { useRouter } from "next/navigation";

const page = () => {


  const [dataEmployee, setDataEmployee] = useState<Employee[]>([]);
  //const user = localStorage.getItem("user");
  
  const fetchApiData = async () => {
    const storedUser = JSON.parse(sessionStorage.getItem("user") || '{}');
    const username = storedUser.username;
    const pass = storedUser.password;
    try {
      const res = await getAllEmployees(username, pass);
      setDataEmployee(res)
    } catch (error) {
      console.error("Lỗi:", error);
    }  
  };

  useEffect(() => {   
    fetchApiData();
  }, []);

  //console.log(localStorage.getItem("user"));
  const router = useRouter();
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    router.push("/")
  }


  return (
      <Flex
      justify="center"
      align="center"
      vertical={true}
      style={{ height: "100vh" }}
      >
        <Title level={2}>Employee</Title>
        <DataTable data={dataEmployee} onChange={fetchApiData}/>     
        <Button onClick={handleLogout} type="primary" style={{marginTop:"30px"}}>Đăng xuất</Button>   
      </Flex>
  );
};

export default page;
