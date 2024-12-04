import React, { useEffect, useState } from "react";
import { phongService } from "../../../services/phong.service";
import LoadingCustom from "../../../components/ui/loading/LoadingCustom";

const Experience = () => {
  const [listPhong, setListPhong] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    phongService
      .getListPhong()
      .then((res) => {
        // console.log(res);
        setListPhong(res.data.content);
        setIsLoading(false);
        console.log(listPhong);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return isLoading ? (
    <div className="min-h-screen">
      <LoadingCustom />
    </div>
  ) : (
    <div className="container py-4">
      <h2 className="text-3xl font-semibold mb-4">Trải nghiệm đã qua</h2>
      <div className="grid grid-cols-6 gap-10">
        {listPhong.slice(0, 20).map((phong) => {
          return (
            <div className="space-y-2" key={phong.id}>
              <img
                src={phong.hinhAnh}
                alt={phong.tenPhong}
                className="w-[270px] h-[255px] rounded-lg object-cover"
              />
              <div>
                <h1 className="font-semibold truncate overflow-hidden whitespace-nowrap w-full">
                  {phong.tenPhong}
                </h1>
                <p className="text[#6A6A6A] text-sm">Chủ nhà: Minh Nhân</p>
                <p className="font-semibold">Đã hết phòng</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Experience;
