import React, { useEffect, useState } from "react";
import { phongService } from "../../../services/phong.service";
import LoadingCustom from "../../../components/ui/loading/LoadingCustom";
import RoomSearch from "../../SearchPage/components/RoomSearch";

const Experience = () => {
  const [listPhong, setListPhong] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    phongService
      .getListPhong()
      .then((res) => {
        setListPhong(res.data.content);
        setIsLoading(false);
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
    <div className="container py-4 px-6 md:px-10 lg:px-0">
      <h2 className="text-3xl font-semibold mb-4">Trải nghiệm đã qua</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {listPhong.slice(0, 20).map((phong, index) => {
          return (
            <RoomSearch
              title={phong.tenPhong}
              description={phong.moTa}
              giuong={phong.phongNgu}
              key={index}
              id={phong.id}
              image={phong.hinhAnh}
              price={phong.giaTien}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Experience;
