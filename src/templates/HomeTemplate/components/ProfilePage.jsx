import React, { useEffect, useState } from "react";
import logoTest from "./../../../assets/img/logo_test.jpg";
import { FaCheck } from "react-icons/fa";
import { CameraOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "../../../services/users.service";
import { useNavigate } from "react-router-dom";
import { pathDefault } from "../../../common/path";
import { handleUpdateUser } from "../../../store/Slice/User.Slice";

const ProfilePage = () => {
  const user = useSelector((state) => state.UserSlice.user);

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

  return (
    <div className="container px-40">
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-4">
          <div className="p-10 shadow-xl rounded-3xl my-10">
            <div className="flex flex-col space-y-5">
              <div className="flex items-end gap-10 relative">
                <img
                  src={user.avatar}
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
        <div className="col-span-8 mt-10">
          <h2 className="text-3xl font-bold mt-2">
            Thông tin về <span>{user.name}</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
