import React, { useContext, useEffect, useState } from "react";
import { reservationService } from "../../services/reservation.service";
import { Button, Popconfirm, Table } from "antd";
import { LuPencilLine, LuTrash } from "react-icons/lu";
import { NotificationContext } from "../../App";
import dayjs from "dayjs";
const ManagerReservation = () => {
  const { handleNotification } = useContext(NotificationContext);
  // tạo state quản lý dữ liệu
  const [listReservation, setListReservation] = useState([]);
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
    <div>
      <Table
        dataSource={listReservation}
        scroll={{ x: 1300 }}
        columns={columns}
      />
    </div>
  );
};

export default ManagerReservation;
