import { Avatar, Button, Input, Modal, Popconfirm, Tag } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { NotificationContext } from "../../App";
import { ButtonAdmin } from "../../components/ui/button/ButtonCustom";
import { FaUserPlus } from "react-icons/fa6";
import dayjs from "dayjs";
import { LuPencilLine, LuTrash } from "react-icons/lu";
import { nguoiDungSerivce } from "../../services/nguoiDung.service";
import FormAddUser from "./components/FormAddUser/FormAddUser";
import { CloseOutlined } from "@ant-design/icons";
import useViewPort from "../../hooks/useViewPort";
import TableCustom from "../../components/ui/table/TableCustom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../store/slice/managerUser.slice";

const ManagerUser = () => {
  // xử lý api với redux
  const dispatch = useDispatch();
  const { listUsers, totalRow } = useSelector((state) => state.users);
  // xử lý translate
  const { t } = useTranslation("user");
  const [initialValues, setInitialValues] = useState({
    id: 0,
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    gender: "",
    role: "",
  });
  const { width } = useViewPort();
  // xử lý Input search
  const [keyword, setKeyword] = useState("");
  const [value, setValue] = useState("");
  const timeOutRef = useRef(null);
  const handleChangeKeyword = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (timeOutRef) {
      clearTimeout(timeOutRef.current);
    }
    timeOutRef.current = setTimeout(() => {
      setKeyword(newValue);
      setCurrentPage(1);
    }, 1000);
  };
  const [isOnSubmit, setIsOnSubmit] = useState(true);
  const { handleNotification } = useContext(NotificationContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Xử lý resetForm
  const resetFormRef = useRef(null);
  const handleResetForm = (resetForm) => {
    resetFormRef.current = resetForm;
  };
  const resetUserForm = () => {
    if (resetFormRef.current) {
      resetFormRef.current();
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => {
        return text ? <p className="uppercase font-bold">{text}</p> : "";
      },
    },
    {
      title: t("avatar"),
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
      render: (text, record, index) => {
        return (
          <p className="font-semibold">
            <i>{text}</i>
          </p>
        );
      },
    },
    {
      title: t("phone"),
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: t("birthday"),
      dataIndex: "birthday",
      key: "birthday",
      render: (text, record, index) => {
        return dayjs(text).format("DD/MM/YYYY");
      },
    },
    {
      title: t("role"),
      dataIndex: "role",
      key: "role",
      render: (text, record, index) => {
        return text === "ADMIN" ? (
          <Tag color="red">{text}</Tag>
        ) : text === "USER" ? (
          <Tag color="cyan">{text}</Tag>
        ) : text === "" ? (
          <Tag color="purple">Chưa xác định</Tag>
        ) : (
          <Tag color="gold">{text}</Tag>
        );
      },
    },
    {
      title: t("action"),
      key: "action",
      fixed: "right",
      width: 150,
      render: (text, record, index) => {
        return (
          <div className="space-x-1">
            <Button
              icon={<LuPencilLine size={25} className="dark:text-white" />}
              color="default"
              type="text"
              onClick={() => {
                setIsModalOpen(true);
                setIsOnSubmit(false);
                nguoiDungSerivce
                  .getUserByID(record.id)
                  .then((res) => {
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
                    handleNotification("success", res.data.message);
                    dispatch(fetchAllUsers({ currentPage, keyword }));
                  })
                  .catch((err) => {
                    dispatch(fetchAllUsers({ currentPage, keyword }));
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
    dispatch(fetchAllUsers({ currentPage, keyword }));
  }, [currentPage, keyword]);

  return (
    <div className="space-y-5">
      <div className="lg:flex lg:justify-between items-center border-gray-500 border-b-2 py-3">
        <h1
          className="xl:text-3xl md:2xl text-xl font-bold text-gray-800 dark:text-white mb-3
        "
        >
          {t("titleUser")}
        </h1>
        <div className="flex space-x-3 lg:w-1/2 w-full">
          <Input.Search
            placeholder={t("phSearchUser")}
            value={value}
            onChange={handleChangeKeyword}
            className=""
            size="large"
            onSearch={(value) => {
              setKeyword(value);
            }}
          />
          <ButtonAdmin
            content={width > 768 && t("addUser")}
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
                gender: "",
                role: "",
              });
              resetUserForm();
            }}
          />
          <Modal
            title={
              <h2 className="dark:text-white text-2xl text-center">
                {isOnSubmit ? t("addUser") : t("updateUser")}
              </h2>
            }
            closeIcon={<CloseOutlined size={20} className="dark:text-white" />}
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
              currentPage={currentPage}
              keyword={keyword}
              onResetForm={handleResetForm}
              isOnSubmit={isOnSubmit}
              initialValues={initialValues}
            />
          </Modal>
        </div>
      </div>
      <TableCustom
        dataSource={listUsers}
        columns={columns}
        pagination={{
          total: totalRow,
          current: currentPage,
          pageSize: 10,
          onChange: handlePageChange,
        }}
      />
    </div>
  );
};

export default ManagerUser;
