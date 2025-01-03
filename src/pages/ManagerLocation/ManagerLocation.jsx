import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Input, Modal, Popconfirm, Table } from "antd";
import { NotificationContext } from "../../App";
import { useSelector } from "react-redux";
import { locationService } from "../../services/viTri.service";
import { ButtonAdmin } from "../../components/ui/button/ButtonCustom";
import { FaUserPlus } from "react-icons/fa";
import { LuPencilLine, LuTrash } from "react-icons/lu";
import FormAddRoom from "../ManagerRoom/components/FormAddRoom/FormAddRoom";
import FormAddLocation from "./FormAddLocation/FormAddLocation";
import { BiLocationPlus, BiSolidLocationPlus } from "react-icons/bi";
const ManagerLocation = () => {
  const [initialValues, setInitialValues] = useState({
    id: 0,
    tenViTri: "",
    tinhThanh: "",
    quocGia: "",
    hinhAnh: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  //Xử lý phần add , edit
  const [isOnSubmit, setIsOnSubmit] = useState(true);
  const { user, token } = useSelector((state) => state.userSlice);
  const { handleNotification } = useContext(NotificationContext);
  //Xử lý phần Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  //Xử lý current Page,render giao diện
  const [currentPage, setCurrentPage] = useState(1);

  const [totalRow, setTotalRow] = useState(0);
  // Xử lý InputSearch
  const [keyword, setKeyword] = useState("");
  // Xử lý phần vị trí
  const [location, setLocation] = useState([]);
  // handleChange InputSearch
  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };
  //handleChange khi bấm chuyển page
  const handlePageChange = (page, pageSize) => {
    console.log("Current page:", page);
    console.log("Page size:", pageSize);
    setCurrentPage(page);
  };
  const renderLocation = (res) => {
    const setLocationbyID = res.data.content.data.map((location) => ({
      ...location,
      key: location.id,
    }));
    setLocation(setLocationbyID);
    setTotalRow(res.data.content.totalRow);
  };
  const getAllLocation = () => {
    locationService
      .getAllLocation(currentPage, keyword)
      .then((res) => {
        console.log(res);
        renderLocation(res);
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
      title: "Image",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text, record, index) => {
        return (
          <div className="flex gap-5 items-center">
            <img
              src={text}
              className="w-36 h-16 object-cover mr-2 rounded-md"
              alt=""
            />
            <p className="text-lg font-medium">{record.tenViTri}</p>
          </div>
        );
      },
    },
    {
      title: "Province",
      dataIndex: "tinhThanh",
      key: "tinhThanh",
      render: (text, record, index) => {
        return <p className="text-base font-medium">{text}</p>;
      },
    },
    {
      title: "Country",
      dataIndex: "quocGia",
      key: "quocGia",
      render: (text, record, index) => {
        return <p className="text-base font-medium underline">{text}</p>;
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
                locationService
                  .getLocationByID(record.id)
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
              title="Thực hiện xóa vị trí"
              description="Bạn có chắc muốn xóa vị trí này không?"
              onConfirm={() => {
                locationService
                  .deleteLocation(record.id, token)
                  .then((res) => {
                    getAllLocation();
                    handleNotification("success", res.data.message);
                  })
                  .catch((err) => {
                    getAllLocation();
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
    getAllLocation();
  }, [currentPage, keyword]);
  useEffect(() => {}, [getAllLocation]);
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center border-gray-500 border-b-2">
        <h1
          className="text-3xl font-bold text-gray-800 dark:text-white py-10
        "
        >
          Manager List Location
        </h1>
        <div className="flex space-x-3 w-1/3">
          <Input.Search
            placeholder="enter search location..."
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
            content={"Add New Location"}
            icon={<BiSolidLocationPlus size={20} />}
            onClick={() => {
              setIsModalOpen(true);
              setIsOnSubmit(true);
              setInitialValues({
                id: 0,
                tenViTri: "",
                tinhThanh: "",
                quocGia: "",
                hinhAnh: "",
              });
              setPreviewImage(null);
            }}
          />
          <Modal
            title={isOnSubmit ? "Add Location" : "Edit Location Information"}
            open={isModalOpen}
            onCancel={() => {
              setIsModalOpen(false);
            }}
            footer={null}
          >
            <FormAddLocation
              handleCloseModal={() => {
                setIsModalOpen(false);
              }}
              previewImage={previewImage}
              setPreviewImage={setPreviewImage}
              getAllLocation={() => {
                getAllLocation();
              }}
              location={location}
              isOnSubmit={isOnSubmit}
              initialValues={initialValues}
            />
          </Modal>
        </div>
      </div>
      <Table
        dataSource={location}
        scroll={{ x: 1300 }}
        columns={columns}
        pagination={{
          total: totalRow,
          current: currentPage,
          pageSize: 3,
          onChange: handlePageChange,
        }}
      />
    </div>
  );
};

export default ManagerLocation;
