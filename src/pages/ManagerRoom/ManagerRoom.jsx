import { Button, Input, Modal, Popconfirm, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { phongService } from "../../services/phong.service";
import { ButtonAdmin } from "../../components/ui/button/ButtonCustom";
import { NotificationContext } from "../../App";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FormAddRoom from "./components/FormAddRoom/FormAddRoom";
import { LuPencilLine, LuTrash } from "react-icons/lu";
const ManagerRoom = () => {
  const [initialValues, setInitialValues] = useState({
    id: 0,
    tenPhong: "",
    khach: 0,
    phongNgu: 0,
    giuong: 0,
    phongTam: 0,
    moTa: "",
    giaTien: 0,
    mayGiat: true,
    banLa: true,
    tivi: true,
    dieuHoa: true,
    wifi: true,
    bep: true,
    doXe: true,
    hoBoi: true,
    banUi: true,
    maViTri: 0,
    hinhAnh: "",
  });
  //Sử lý hình ảnh
  const [previewImage, setPreviewImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isOnSubmit, setIsOnSubmit] = useState(true);
  const { user, token } = useSelector((state) => state.userSlice);
  const [listRoom, setListRoom] = useState([]);
  const { handleNotification } = useContext(NotificationContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // InputSearch
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRow, setTotalRow] = useState(0);
  const [keyword, setKeyword] = useState("");

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const handlePageChange = (page, pageSize) => {
    console.log("Current page:", page);
    console.log("Page size:", pageSize);
    setCurrentPage(page);
  };
  const Render = (res) => {
    const setRoom = res.data.content.data.map((room) => ({
      ...room,
      key: room.id,
    }));
    setListRoom(setRoom);
    setTotalRow(res.data.content.totalRow);
  };
  const getAllRoom = () => {
    phongService
      .searchByKeyword(currentPage, keyword)
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
      title: "Room's Name",
      dataIndex: "tenPhong",
      key: "tenPhong",
      render: (text, record, index) => {
        return text ? <p className="uppercase font-bold">{text}</p> : "";
      },
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text, record, index) => {
        return (
          <img
            src={text}
            className="w-36 h-16 object-cover mr-2 rounded-xl"
            alt=""
          />
        );
      },
    },
    {
      title: "Location",
      dataIndex: "tinhThanh",
      key: "tinhThanh",
    },
    {
      title: "Information",
      key: "information",
      render: (text, record, index) => {
        return <Link>Thông tin chi tiết</Link>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <div className="space-x-5">
            {/* Nút sửa */}
            <Button
              icon={<LuPencilLine size={25} />}
              color="default"
              type="text"
              onClick={() => {
                setIsModalOpen(true);
                setIsOnSubmit(false);
                phongService
                  .getRoomById(record.id)
                  .then((res) => {
                    console.log(res);
                    setInitialValues(res.data.content);
                    setPreviewImage(record.hinhAnh);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            />
            {/* Nút xóa */}
            <Popconfirm
              title="Thực hiện xóa phòng"
              description="Bạn có chắc muốn xóa phòng này không?"
              onConfirm={() => {
                phongService
                  .deleteRoom(record.id, token)
                  .then((res) => {
                    getAllRoom();
                    handleNotification("success", res.data.message);
                  })
                  .catch((err) => {
                    getAllRoom();
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
    getAllRoom();
  }, [currentPage, keyword, getAllRoom]);
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center border-gray-500 border-b-2">
        <h1
          className="text-3xl font-bold text-gray-800 py-10
    "
        >
          Quản lý danh sách phòng
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
          {/* Nút thêm */}
          <ButtonAdmin
            content={"Add New Room"}
            icon={<FaUserPlus size={20} />}
            onClick={() => {
              setIsModalOpen(true);
              setIsOnSubmit(true);
              setInitialValues({
                id: 0,
                tenPhong: "",
                khach: 0,
                phongNgu: 0,
                giuong: 0,
                phongTam: 0,
                moTa: "",
                giaTien: 0,
                mayGiat: true,
                banLa: true,
                tivi: true,
                dieuHoa: true,
                wifi: true,
                bep: true,
                doXe: true,
                hoBoi: true,
                banUi: true,
                maViTri: 0,
                hinhAnh: "",
              });
              setPreviewImage(null);
            }}
          />
          <Modal
            title={isOnSubmit ? "Add Room" : "Edit Room Information"}
            open={isModalOpen}
            onCancel={() => {
              setIsModalOpen(false);
            }}
            footer={null}
          >
            <FormAddRoom
              handleCloseModal={() => {
                setIsModalOpen(false);
              }}
              previewImage={previewImage}
              setPreviewImage={setPreviewImage}
              getAllRoom={() => {
                getAllRoom();
              }}
              isOnSubmit={isOnSubmit}
              initialValues={initialValues}
            />
          </Modal>
        </div>
      </div>
      <Table
        dataSource={listRoom}
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

export default ManagerRoom;
