import React, { useContext, useEffect, useRef, useState } from "react";
import { reservationService } from "../../services/reservation.service";
import { Button, Input, Modal, Popconfirm, Table } from "antd";
import { LuPencilLine, LuTrash } from "react-icons/lu";
import { NotificationContext } from "../../App";
import dayjs from "dayjs";
import { CloseOutlined } from "@ant-design/icons";
import { IoCheckmark } from "react-icons/io5";
import { FcCancel } from "react-icons/fc";
import FormEditBooking from "./components/FormEditBooking/FormEditBooking";
import useViewPort from "../../hooks/useViewPort";
import TableCustom from "../../components/ui/table/TableCustom";
import { useTranslation } from "react-i18next";
import { nguoiDungSerivce } from "../../services/nguoiDung.service";
const ManagerReservation = ({ isDarkMode }) => {
  const { t } = useTranslation("booking");
  const { width } = useViewPort();
  const { handleNotification } = useContext(NotificationContext);
  // tạo state quản lý dữ liệu
  const [listReservation, setListReservation] = useState([]);
  const [originalListReservation, setOriginalListReservation] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [initialValues, setInitialValues] = useState({
    id: 0,
    maPhong: 0,
    ngayDen: "",
    ngayDi: "",
    soLuongKhach: 0,
    maNguoiDung: 0,
  });
  // call API lấy dữ liệu về render
  const setReservationTable = (res) => {
    const setTable = res.data.content.map((reser) => ({
      ...reser,
      key: reser.id,
    }));
    setListReservation(setTable);
    setOriginalListReservation(setTable);
  };
  const getAllReservation = () => {
    reservationService
      .getAllReservation()
      .then((res) => {
        setReservationTable(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllUsers = () => {
    nguoiDungSerivce
      .getUsers()
      .then((res) => {
        setListUsers(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // quản lý dữ liệu search
  const [keyword, setKeyword] = useState("");
  const [value, setValue] = useState("");
  const TimeOutRef = useRef(null);
  const searchKeyWord = (data) => {
    setKeyword(data);
    let soPhongNguoiDungDat = originalListReservation.filter((item, index) => {
      // Tìm user có maNguoiDung tương ứng
      const user = listUsers.find((user) => user.id == item.maNguoiDung);
      return user
        ? user.name.toLowerCase().includes(data.trim().toLowerCase()) ||
            user.email.toLowerCase().includes(data.trim().toLowerCase())
        : false;
    });
    setListReservation(soPhongNguoiDungDat);
  };
  const handleChangeKeyword = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (TimeOutRef.current) {
      clearTimeout(TimeOutRef.current);
    }
    setTimeout(() => {
      if (newValue == "") {
        setListReservation(originalListReservation);
      } else {
        searchKeyWord(newValue);
      }
    }, 1000);
  };
  // columns set dữ liệu cho table
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: t("roomCode"),
      dataIndex: "maPhong",
      key: "maPhong",
    },
    {
      title: t("userName"),
      dataIndex: "maNguoiDung",
      key: "maNguoiDung",
      render: (text, record, index) => {
        const Obj = listUsers.find((user) => user.id == record.maNguoiDung);
        return Obj ? (
          <div>
            <p className="font-semibold text-base">{Obj.name}</p>
          </div>
        ) : (
          <p className="font-semibold text-base">Not Found</p>
        );
      },
    },
    {
      title: t("userEmail"),
      dataIndex: "maNguoiDung",
      key: "maNguoiDung",
      render: (text, record, index) => {
        const Obj = listUsers.find((user) => user.id == record.maNguoiDung);
        return Obj ? (
          <div>
            <p className="font-semibold text-base">{Obj.email}</p>
          </div>
        ) : (
          <p className="font-semibold text-base">Not Found</p>
        );
      },
    },
    {
      title: t("arrival"),
      dataIndex: "ngayDen",
      key: "ngayDen",
      render: (text, record, index) => {
        return dayjs(record.ngayDen).format("DD/MM/YYYY");
      },
    },
    {
      title: t("departure"),
      dataIndex: "ngayDi",
      key: "ngayDi",
      render: (text, record, index) => {
        return dayjs(record.ngayDi).format("DD/MM/YYYY");
      },
    },
    {
      title: t("guest"),
      dataIndex: "soLuongKhach",
      key: "soLuongKhach",
    },
    {
      title: t("status"),
      render: (text, record, index) => {
        const currentDay = dayjs();
        const checkBooking = currentDay.isBefore(dayjs(record.ngayDi));
        return checkBooking ? (
          <IoCheckmark size={25} color="#DC143C" />
        ) : (
          <FcCancel size={25} />
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
              icon={
                <LuPencilLine
                  className="dark:text-white dark:hover:text-white"
                  size={25}
                />
              }
              color="default"
              type="text"
              onClick={() => {
                setIsModalOpen(true);
                reservationService
                  .getReservationByID(record.id)
                  .then((res) => {
                    setInitialValues(res.data.content);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            />
            <Popconfirm
              title="Thực hiện xóa đặt phòng"
              description="Bạn có chắc muốn xóa đặt phòng này không?"
              onConfirm={() => {
                reservationService
                  .deleteReservation(record.id)
                  .then((res) => {
                    getAllReservation();
                    handleNotification("success", "Deleted successfully");
                  })
                  .catch((err) => {
                    getAllReservation();
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
    getAllReservation();
    getAllUsers();
  }, []);
  useEffect(() => {}, [getAllReservation]);
  return (
    <div className="space-y-5">
      <div className="md:flex md:justify-between items-center border-gray-500 border-b-2 space-y-3 py-5">
        <h1
          className="xl:text-3xl md:2xl text-xl font-bold text-gray-800 dark:text-white
        "
        >
          {t("title")}
        </h1>
        <div className="flex w-full md:w-1/3">
          <Input.Search
            placeholder={t("phSearch")}
            value={value}
            onChange={handleChangeKeyword}
            size="large"
            onSearch={(value) => {
              searchKeyWord(value);
            }}
          />
          <Modal
            title={
              <h2 className="dark:text-white text-center text-2xl">
                {t("titleUpdate")}
              </h2>
            }
            closeIcon={<CloseOutlined size={20} className="dark:text-white" />}
            open={isModalOpen}
            onCancel={() => {
              setIsModalOpen(false);
            }}
            footer={null}
          >
            <FormEditBooking
              initialValues={initialValues}
              getAllReservation={getAllReservation}
              setIsModalOpen={setIsModalOpen}
              handleCloseModal={() => {
                setIsModalOpen(false);
              }}
            />
          </Modal>
        </div>
      </div>
      <TableCustom dataSource={listReservation} columns={columns} />
    </div>
  );
};

export default ManagerReservation;
