"use client";
import { getAudit } from "@/api/API";
import { Button, Flex, Table, TableProps } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const audit = () => {

  const [dataAudit, setDataAudit] = useState<AuditLog[]>([]);
  //const user = localStorage.getItem("user");
  
  const fetchApiData = async () => {
    const storedUser = JSON.parse(sessionStorage.getItem("user") || '{}');
    const username = storedUser.username;
    const pass = storedUser.password;
    try {
      const res = await getAudit(username, pass);
      setDataAudit(res)
    } catch (error) {
      console.error("Lỗi:", error);
    }  
  };

  useEffect(() => {   
    fetchApiData();
  }, []);

  const router = useRouter();
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    router.push("/")
  }

  interface AuditLog {
    auditId: number;          
    actionType: string;       
    empId: number;     
    changedBy: string;        
    actionTime: string;       
    oldData: string;   
    newData: string;   
  }

  type ColumnsType<T extends object> = TableProps<T>["columns"];
  const columns: ColumnsType<AuditLog> = [
    {
      title: "Audit ID",
      dataIndex: "AUDIT_ID",
      key: "AUDIT_ID",
    },
    {
      title: "Action Type",
      dataIndex: "ACTION_TYPE",
      key: "ACTION_TYPE",
      render: (text: string) => (text ? text : ""),
    },
    {
      title: "Employee ID",
      dataIndex: "EMP_ID",
      key: "EMP_ID",
      render: (text: number | null) => (text !== null ? text : ""),
    },
    {
      title: "Changed By",
      dataIndex: "CHANGED_BY",
      key: "CHANGED_BY",
      render: (text: string) => (text ? text : ""),
    },
    {
      title: "Action Time",
      dataIndex: "ACTION_TIME",
      key: "ACTION_TIME",
      render: (text: string) => (text ? new Date(text).toLocaleString() : ""),
    },
    {
      title: "Old Data",
      dataIndex: "OLD_DATA",
      key: "OLD_DATA",
      render: (text: string | null) => (text ? text : "null"),
      width: 300,
    },
    {
      title: "New Data",
      dataIndex: "NEW_DATA",
      key: "NEW_DATA",
      render: (text: string | null) => (text ? text : "null"),
      width: 300,
    },
  ];

  console.log(dataAudit);

  return(
    <>
      
      <Flex
        justify="center"
        align="center"
        vertical={true}
        style={{ height: "100vh" }}
      >
        <Title level={2}>Audit</Title>
        <Button style={{marginBottom:"30px", marginRight:"1080px"}} type="primary" onClick={() => router.push("/data")}>
          Quay lại
        </Button>
        <Table<AuditLog>
          
          columns={columns}
          dataSource={dataAudit}
          pagination={{
            position: ["bottomCenter"],
            pageSize: 3,
          }}
          style={{textAlign:"center"}}
        />
      </Flex>
    </>
  )
}

export default audit;