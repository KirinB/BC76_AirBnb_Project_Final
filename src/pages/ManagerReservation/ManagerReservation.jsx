import React, { useContext, useEffect, useState } from "react";
import { reservationService } from "../../services/reservation.service";
import { Button, Input, Modal, Popconfirm, Table } from "antd";
import { LuPencilLine, LuTrash } from "react-icons/lu";
import { NotificationContext } from "../../App";
import dayjs from "dayjs";
import { IoCheckmark } from "react-icons/io5";
import { FcCancel } from "react-icons/fc";
import FormEditBooking from "./components/FormEditBooking/FormEditBooking";
const ManagerReservation = () => {
  const { handleNotification } = useContext(NotificationContext);
  // tạo state quản lý dữ liệu
  const [listReservation, setListReservation] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  };
  const getAllReservation = () => {
    reservationService
      .getAllReservation()
      .then((res) => {
        console.log(res);
        setReservationTable(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // quản lý dữ liệu search
  const [keyword, setKeyword] = useState("");
  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
    setTimeout(() => {
      let soPhongNguoiDungDat = listReservation.filter((item, index) => {
        return String(item.maNguoiDung).includes(keyword.trim());
      });
      setListReservation(soPhongNguoiDungDat);
    }, 1000);
  };
  // columns set dữ liệu cho table
  const columns = [
    {
      title: "Mã đặt phòng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Mã phòng",
      dataIndex: "maPhong",
      key: "maPhong",
    },
    {
      title: "Mã người dùng",
      dataIndex: "maNguoiDung",
      key: "maNguoiDung",
    },
    {
      title: "Ngày đến",
      dataIndex: "ngayDen",
      key: "ngayDen",
      render: (text, record, index) => {
        return dayjs(record.ngayDen).format("DD/MM/YYYY");
      },
    },
    {
      title: "Ngày đi",
      dataIndex: "ngayDi",
      key: "ngayDi",
      render: (text, record, index) => {
        return dayjs(record.ngayDi).format("DD/MM/YYYY");
      },
    },
    {
      title: "Số khách",
      dataIndex: "soLuongKhach",
      key: "soLuongKhach",
    },
    {
      title: "Trạng thái",
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
                reservationService
                  .getReservationByID(record.id)
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
              title="Thực hiện xóa đặt phòng"
              description="Bạn có chắc muốn xóa đặt phòng này không?"
              onConfirm={() => {
                reservationService
                  .deleteReservation(record.id)
                  .then((res) => {
                    getAllReservation();
                    handleNotification("success", res.data.message);
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
  }, []);
  useEffect(() => {}, [getAllReservation]);
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center border-gray-500 border-b-2">
        <h1
          className="text-3xl font-bold text-gray-800 dark:text-white py-10
        "
        >
          Manager Booking
        </h1>
        <div className="flex space-x-3 w-1/3">
          <Input.Search
            placeholder="enter search user's code..."
            value={keyword}
            onChange={handleChangeKeyword}
            className=""
            size="large"
            onSearch={(value) => {
              setKeyword(value);
              setTimeout(() => {
                let soPhongNguoiDungDat = listReservation.filter(
                  (item, index) => {
                    return String(item.maNguoiDung).includes(keyword.trim());
                  }
                );
                setListReservation(soPhongNguoiDungDat);
              }, 3000);
            }}
          />
          <Modal
            title={"Edit Booking"}
            open={isModalOpen}
            onCancel={() => {
              setIsModalOpen(false);
            }}
            footer={null}
          >
            <FormEditBooking initialValues={initialValues} />
          </Modal>
        </div>
      </div>
      <Table
        dataSource={listReservation}
        scroll={{ x: 1300 }}
        columns={columns}
      />
    </div>
  );
};

export default ManagerReservation;
