import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { CameraOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "../../../services/users.service";
import { Link, useNavigate } from "react-router-dom";
import { pathDefault } from "../../../common/path";
import { handleUpdateUser } from "../../../store/slice/user.slice";
import { Button, Carousel, DatePicker, Input, Modal } from "antd";
import dayjs from "dayjs";
import { phongService } from "../../../services/phong.service";

import Slider from "react-slick";

const ProfilePage = () => {
  const user = useSelector((state) => state.userSlice.user);

  const settings = {
    dots: true, // Hiển thị các chấm chuyển slide
    infinite: false, // Không lặp lại carousel
    speed: 500, // Tốc độ chuyển slide
    slidesToShow: 5, // Số item hiển thị mặc định (desktop)
    slidesToScroll: 5, // Số item cuộn mỗi lần
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 3, // Hiển thị 3 items
          slidesToScroll: 3, // Cuộn 3 items mỗi lần
        },
      },
      {
        breakpoint: 640, // Mobile
        settings: {
          slidesToShow: 2, // Hiển thị 2 items
          slidesToScroll: 2, // Cuộn 2 items mỗi lần
        },
      },
    ],
  };

  const [rooms, setRooms] = useState([]);
  const [roomDetails, setRoomDetails] = useState({});

  const [valueUser, setValueUser] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    birthday: user.birthday,
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate(pathDefault.homePage);
    }
  }, []);

  const handleUploadAvt = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("formFile", file);

    const { token } = JSON.parse(localStorage.getItem("userInfo"));

    userService
      .uploadAvt(formData, token)
      .then((res) => {
        alert("Ảnh đại diện đã được tải lên thành công!");

        const updatedAvatar = res.data.content.avatar;
        const updatedUser = {
          ...user,
          avatar: updatedAvatar,
        };
        dispatch(handleUpdateUser(updatedUser));

        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("userInfo")),
            user: updatedUser,
          })
        );
      })
      .catch((err) => {
        console.error(err);
        alert("Đã xảy ra lỗi khi tải lên ảnh đại diện.");
      });
  };

  const handleOk = () => {
    userService
      .thayDoiThongTinNguoiDung(user.id, valueUser)
      .then((res) => {
        const updatedUser = res.data.content;
        dispatch(handleUpdateUser(updatedUser));

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            ...userInfo,
            user: updatedUser,
          })
        );
        alert("Thông tin đã được cập nhật");
      })
      .catch((err) => {
        console.error("Lỗi khi cập nhật thông tin:", err);
      });
  };

  useEffect(() => {
    phongService
      .getRoomByNguoiDung(user.id)
      .then((res) => {
        const roomsData = res.data.content;
        setRooms(roomsData);

        // Tạo một bản sao chi tiết của từng phòng
        const roomDetailsTemp = {};

        // Lặp qua các phòng để lấy thông tin chi tiết từng phòng
        const fetchRoomDetails = roomsData.map((room) => {
          return phongService
            .getRoomById(room.maPhong)
            .then((res) => {
              roomDetailsTemp[room.maPhong] = res.data.content;
            })
            .catch((err) =>
              console.error(`Lỗi lấy thông tin phòng ${room.maPhong}:`, err)
            );
        });

        // Đợi tất cả các lời gọi API hoàn tất
        Promise.all(fetchRoomDetails).then(() =>
          setRoomDetails(roomDetailsTemp)
        );
      })
      .catch((err) => console.error("Lỗi lấy danh sách phòng:", err));
  }, [user.id]);

  return (
    <div className="container">
      <div className="grid grid-cols-12 gap-10">
        <div className="hidden lg:col-span-4 lg:block">
          <div className="p-10 shadow-xl rounded-3xl my-10">
            <div className="flex flex-col space-y-5">
              <div className="flex items-end gap-10 relative">
                <img
                  src={user.avatar || "/default_avatar.jpg"}
                  alt=""
                  className="w-[105px] h-[105px] object-cover rounded-full"
                />
                <button className="absolute left-1 -bottom-3 bg-white px-4 py-1 rounded-full shadow-xl">
                  <CameraOutlined /> Thêm
                  <input
                    type="file"
                    className="opacity-0 absolute left-0 w-[88px]"
                    onChange={handleUploadAvt}
                  />
                </button>
                <div>
                  <h2 className="font-bold text-2xl">1</h2>
                  <p className="font-medium text-xs">
                    Tháng hoạt động trên Airbnb
                  </p>
                </div>
              </div>
              <div className="ml-6">
                <h1 className="font-bold text-4xl">{user.name}</h1>
                <p className="ml-2">Khách</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border-2 p-10 space-y-3 mb-10">
            <h2 className="text-xl font-medium">
              Thông tin đã được xác nhận của <span>{user.name}</span>
            </h2>
            <div className="flex items-center">
              <FaCheck />
              <p className="ml-3">Địa chỉ email</p>
            </div>
          </div>
        </div>
        <div className="col-span-12 w-full lg:col-span-8">
          <h2 className="text-3xl font-bold mt-5">
            Thông tin về <span>{user.name}</span>
          </h2>
          <div className="grid grid-cols-2 gap-5 my-5">
            <div className="space-y-3">
              <label className="font-medium">Tên người dùng</label>
              <Input
                onChange={(e) =>
                  setValueUser((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                value={valueUser.name}
              />
            </div>
            <div className="space-y-3">
              <label className="font-medium">Email</label>
              <Input
                onChange={(e) =>
                  setValueUser((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                value={valueUser.email}
              />
            </div>
            <div className="space-y-3">
              <label className="font-medium">Số điện thoại</label>
              <Input
                onChange={(e) =>
                  setValueUser((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                value={valueUser.phone}
              />
            </div>
            <div className="space-y-3">
              <label className="font-medium">Ngày sinh nhật</label>
              <DatePicker
                className="block"
                value={valueUser.birthday ? dayjs(valueUser.birthday) : null}
                onChange={(dateString) =>
                  setValueUser((prev) => ({
                    ...prev,
                    birthday: dateString,
                  }))
                }
              />
            </div>
          </div>
          <Button onClick={handleOk}>Xác nhận thông tin</Button>
          <h2 className="text-3xl font-bold my-4">Thông tin đặt phòng</h2>

          <Slider {...settings}>
            {rooms.map((item, index) => {
              const roomDetail = roomDetails[item.maPhong];
              return (
                <div key={index} className="p-3">
                  <Link
                    to={`/rooms/${item.maPhong}`}
                    className="p-3 rounded-xl border space-y-3"
                  >
                    {roomDetail ? (
                      <>
                        <img
                          src={roomDetail.hinhAnh}
                          alt={roomDetail.tenPhong}
                          className="h-32 w-full object-cover rounded-xl"
                        />
                        <h2 className="font-medium line-clamp-1">
                          {roomDetail.tenPhong}
                        </h2>
                      </>
                    ) : (
                      <p>Đang tải...</p>
                    )}
                    <p>Ngày đặt: {item.ngayDen}</p>
                    <p>Ngày trả: {item.ngayDi}</p>
                  </Link>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
