import { Avatar, Button, Input, Modal, Popconfirm, Table, Tag } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { NotificationContext } from "../../App";
import { ButtonAdmin } from "../../components/ui/button/ButtonCustom";
import { useSelector } from "react-redux";
import { FaUserPlus } from "react-icons/fa6";
import dayjs from "dayjs";
import { LuPencilLine, LuTrash } from "react-icons/lu";
import { nguoiDungSerivce } from "../../services/nguoiDung.service";
import FormAddUser from "./components/FormAddUser/FormAddUser";
const ManagerUser = () => {
  const [keyword, setKeyword] = useState("");
  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const { user, token } = useSelector((state) => state.userSlice);
  const [listUser, setListUser] = useState([]);
  const { handleNotification } = useContext(NotificationContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRow, setTotalRow] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const handlePageChange = (page, pageSize) => {
    console.log("Current page:", page);
    console.log("Page size:", pageSize);
    setCurrentPage(page); // Cập nhật state nếu cần
  };
  const Render = (res) => {
    const setUser = res.data.content.data.map((user) => ({
      ...user,
      key: user.id,
    }));
    setListUser(setUser);
    setTotalRow(res.data.content.totalRow);
  };

  const getAllUsers = () => {
    nguoiDungSerivce
      .getUserFind(currentPage, keyword)
      .then((res) => {
        console.log(res);
        Render(res);
      })
      .catch((err) => {
        handleNotification("error", err.response.data.content.data);
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
      render: (text, record, index) => {
        return text ? <p className="uppercase font-bold">{text}</p> : "";
      },
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, record, index) => {
        return text ? (
          <Avatar size={40} src={text} />
        ) : (
          <Avatar size={40} key={record.id}>
            <span className="uppercase">{record.name[0]}</span>
          </Avatar>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      render: (text, record, index) => {
        return dayjs(record.birthday).format("DD/MM/YYYY");
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text, record, index) => {
        return text === "ADMIN" ? (
          <Tag color="magenta">{text}</Tag>
        ) : text === "USER" ? (
          <Tag color="green">{text}</Tag>
        ) : text === "" ? (
          <Tag color="purple">Chưa xác định</Tag>
        ) : (
          <Tag color="gold">{text}</Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <div className="space-x-5">
            <Button
              icon={<LuPencilLine size={25} />}
              color="default"
              type="text"
            />
            <Popconfirm
              title="Thực hiện xóa người dùng"
              description="Bạn có chắc muốn xóa người dùng không?"
              onConfirm={() => {
                nguoiDungSerivce
                  .deleteUsers(record.id)
                  .then((res) => {
                    getAllUsers();
                    handleNotification("success", res.data.message);
                  })
                  .catch((err) => {
                    getAllUsers();
                    handleNotification("error", err.response.data.content);
                  });
              }}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <Button type="text">
                <LuTrash size={25} color="red" />
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getAllUsers();
  }, [currentPage, keyword]);
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
            placeholder="enter search keyword here"
            value={keyword}
            onChange={handleChangeKeyword}
            className=""
            size="large"
            onSearch={(value) => {
              setKeyword(value);
            }}
          />
          <ButtonAdmin
            content={"Add New User"}
            icon={<FaUserPlus size={20} />}
          />
          <Modal title={"Add User Form"} open={isModalOpen}>
            <FormAddUser />
          </Modal>
        </div>
      </div>
      <Table
        dataSource={listUser}
        scroll={{ x: 1300 }}
        columns={columns}
        pagination={{
          total: totalRow,
          current: currentPage,
          pageSize: 10, // Số dòng mỗi trang
          onChange: handlePageChange, // Hàm callback khi đổi trang
        }}
      />
      ;
    </div>
  );
};

export default ManagerUser;
