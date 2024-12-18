"use client";

import Title from "antd/es/typography/Title";
import { Button, Flex, Form, FormProps, Input, message, Radio } from "antd";
import { DataTable } from "@/component/DataTable";
import { useEffect, useState } from "react";
import { getAllEmployees, login } from "@/api/API";
import { useRouter } from "next/navigation";

const page = () => {


  const [dataEmployee, setDataEmployee] = useState<Employee[]>([]);
  const storedUser = JSON.parse(sessionStorage.getItem("user") || '{}');
  const deptName = storedUser.dept_name || "";
  const username = storedUser.username;
  const pass = storedUser.password;
  
  const fetchApiData = async () => {
    
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
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <Button style={{margin:"30px 0", marginRight:"870px"}} danger onClick={handleLogout} type="primary">Đăng xuất</Button>
          <Button color="primary" variant="outlined" style={{margin:"30px 0"}} onClick={() => router.push("/audit")}>
              Audit
            </Button>   
          {/* {deptName === "HR" && username === "ALICE" ?(
            <Button color="primary" variant="outlined" style={{margin:"30px 0"}} onClick={() => router.push("/audit")}>
              Audit
            </Button>
          ):(<></>)} */}
        </div>
      </Flex>
  );
};

export default page;
