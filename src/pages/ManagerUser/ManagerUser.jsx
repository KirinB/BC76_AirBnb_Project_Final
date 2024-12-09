import { Avatar, Button, Input, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { userService } from "../../services/user.service";
import { NotificationContext } from "../../App";
import { VerticalLeftOutlined } from "@ant-design/icons";
import { ButtonAdmin } from "../../components/ui/button/ButtonCustom";
import { useSelector } from "react-redux";

const ManagerUser = () => {
  const { user, token } = useSelector((state) => state.userSlice);
  const [listUser, setListUser] = useState([]);
  const { handleNotification } = useContext(NotificationContext);
  const getAllUsers = () => {
    userService
      .getAllUsers()
      .then((res) => {
        console.log(res);
        const setUser = res.data.content.map((user) => ({
          ...user,
          key: user.id,
        }));
        setListUser(setUser);
      })
      .catch((err) => {
        handleNotification("error", err.response.data.content);
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
    <div className="space-y-5">
      <div className="flex justify-between items-center border-gray-500 border-b-2">
        <h1
          className="text-3xl font-bold text-gray-800 py-10
        "
        >
          Quản lý danh sách người dùng
        </h1>
        <div className="flex space-x-3 w-1/3">
          <Input.Search
            placeholder="nhập tên người dùng"
            className=""
            size="large"
          />
          <ButtonAdmin content={"New User"} />
        </div>
      </div>
      <Table dataSource={listUser} scroll={{ x: 1300 }} columns={columns} />;
    </div>
  );
};

export default ManagerUser;
