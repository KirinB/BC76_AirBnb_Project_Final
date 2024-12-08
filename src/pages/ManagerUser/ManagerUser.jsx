import { Avatar, Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { userService } from "../../services/user.service";
const ManagerUser = () => {
  const [listUser, setListUser] = useState([]);
  const getAllUsers = () => {
    userService
      .getAllUsers()
      .then((res) => {
        console.log(res);
        const setUser = res.data.content.map((user) => ({
          ...user,
          key: user.id,
        }));
        setListUser(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, record, index) => {
        return text ? (
          <img src={text} className="w-10 h-10" />
        ) : (
          <Avatar size={40} key={record.id}>
            <span className="uppercase">{record.name[0]}</span>
          </Avatar>
        );
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <div className="space-x-3">
            <Button>Sửa</Button>
            <Button danger>Xóa</Button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div>
      <h1>Danh sách người dùng trong hệ thống</h1>
      <Table
        dataSource={listUser}
        scroll={{ x: 1300, y: 600 }}
        columns={columns}
      />
      ;
    </div>
  );
};

export default ManagerUser;
