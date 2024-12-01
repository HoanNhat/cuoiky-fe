"use client";

import { Button, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";

type ColumnsType<T extends object> = TableProps<T>["columns"];

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (tag: string) => (
      <span>
        <Tag color={tag === "employee" ? "geekblue" : "green"} key={tag}>
          {tag.toUpperCase()}
        </Tag>
      </span>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_) => (
      <Space size="middle">
        <Button type="primary" danger>
          Delete
        </Button>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: "employee",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: "manager",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: "employee",
  },
];

export const DataTable: React.FC = () => {
  return (
    <Table<DataType>
      columns={columns}
      pagination={{
        position: ["bottomCenter"],
        pageSize: 2,
      }}
      dataSource={data}
    />
  );
};
