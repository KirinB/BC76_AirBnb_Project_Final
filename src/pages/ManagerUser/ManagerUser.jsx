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
  const [initialValues, setInitialValues] = useState({
    id: 0,
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    gender: true,
    role: "",
  });
  const [keyword, setKeyword] = useState("");
  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const [isOnSubmit, setIsOnSubmit] = useState(true);
  const { user, token } = useSelector((state) => state.userSlice);
  const [listUser, setListUser] = useState([]);
  const { handleNotification } = useContext(NotificationContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRow, setTotalRow] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        return dayjs(text).format("DD/MM/YYYY");
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
              onClick={() => {
                setIsModalOpen(true);
                setIsOnSubmit(false);
                nguoiDungSerivce
                  .getUserByID(record.id)
                  .then((res) => {
                    console.log(res);
                    setInitialValues(res.data.content);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
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
  // thiếu put user khi thay đổi chưa render lại được dannh sách
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
          Manager List User
        </h1>
        <div className="flex space-x-3 w-1/3">
          <Input.Search
            placeholder="enter search name's user..."
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
            onClick={() => {
              setIsModalOpen(true);
              setIsOnSubmit(true);
              setInitialValues({
                id: 0,
                name: "",
                email: "",
                password: "",
                phone: "",
                birthday: "",
                gender: true,
                role: "",
              });
            }}
          />
          <Modal
            title={isOnSubmit ? "Add User" : "Edit User Information"}
            open={isModalOpen}
            onCancel={() => {
              setIsModalOpen(false);
            }}
            footer={null}
          >
            <FormAddUser
              handleCloseModal={() => {
                setIsModalOpen(false);
              }}
              getAllUsers={() => {
                getAllUsers();
              }}
              isOnSubmit={isOnSubmit}
              initialValues={initialValues}
            />
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
          pageSize: 10,
          onChange: handlePageChange,
        }}
      />
      ;
    </div>
  );
};

export default ManagerUser;
