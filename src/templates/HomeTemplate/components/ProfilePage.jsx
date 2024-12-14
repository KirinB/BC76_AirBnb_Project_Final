import React from "react";
import logoTest from "./../../../assets/img/logo_test.jpg";
import { FaCheck } from "react-icons/fa";

const ProfilePage = () => {
  return (
    <div className="container px-40">
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-4">
          <div className="p-10 shadow-xl rounded-3xl my-10">
            <div className="flex gap-10">
              <div className="text-center">
                <img src={logoTest} alt="" className="rounded-full w-full" />
                <h2 className="text-3xl font-bold mt-2">Lực</h2>
                <p className="font-medium">Khách</p>
              </div>
              <div className="flex justify-center items-start flex-col">
                <h2 className="text-2xl font-bold">1</h2>
                <p className="font-medium text-xs">
                  Tháng hoạt động trên Airbnb
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border-2 p-10 space-y-3 mb-10">
            <h2 className="text-xl font-medium">
              Thông tin đã được xác nhận của <span>Lực</span>
            </h2>
            <div className="flex items-center">
              <FaCheck />
              <p className="ml-3">Địa chỉ email</p>
            </div>
          </div>
        </div>
        <div className="col-span-8 mt-10">
          <h2 className="text-3xl font-bold mt-2">
            Thông tin về <span>Lực</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
