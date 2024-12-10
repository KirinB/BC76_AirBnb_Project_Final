import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { phongService } from "../../services/phong.service";
import PageNotFound from "../../components/PageNotFound";
import LoadingCustom from "../../components/ui/loading/LoadingCustom";
import { ButtonGhost } from "../../components/ui/button/ButtonCustom";
import { LuHeart, LuShare } from "react-icons/lu";
import { IoIosStar } from "react-icons/io";
const RoomDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [roomDetail, setRoomDetail] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    phongService
      .getRoomById(id)
      .then((res) => {
        setIsLoading(false);
        console.log(res.data.content);
        setRoomDetail(res.data.content);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, []);

  return id && !isError ? (
    isLoading ? (
      <div className="min-h-screen">
        <LoadingCustom />
      </div>
    ) : (
      <div className="container py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between">
            <h1 className="text-2xl flex-1 font-semibold">
              {roomDetail.tenPhong}
            </h1>
            <div className="flex space-x-1">
              <ButtonGhost
                children={
                  <p className="underline font-semibold flex items-center space-x-2">
                    <LuShare /> <span>Chia sẻ</span>
                  </p>
                }
              />
              <ButtonGhost
                children={
                  <p className="underline font-semibold flex items-center space-x-2">
                    <LuHeart />
                    <span>Lưu</span>
                  </p>
                }
              />
            </div>
          </div>
          <div className="shadow-sm">
            <img
              src={roomDetail.hinhAnh}
              className="w-full rounded-2xl max-h-[500px] object-cover"
              alt=""
            />
          </div>
          <div className="grid grid-cols-3 relative">
            <div className="col-span-2">
              <div className="py-8">
                <h2>{roomDetail.tenPhong}</h2>
                <p>1 giường</p>
                <p className="font-semibold flex items-center space-x-2">
                  <span className="flex items-center space-x-1">
                    <IoIosStar /> <span>Mới</span>
                  </span>
                  <span>·</span>
                  <span>2 đánh giá</span>
                </p>
              </div>
              <div className="w-full h-px bg-gray-200" />
              <div className="py-8 flex gap-6 items-center">
                <div>
                  <img
                    src="/avatar_mockup.jpg"
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <h3>Chủ nhà/ Người tổ chức: Minh Nhan</h3>
                  <p>
                    Chủ nhà siêu cấp<span> · </span>10 năm kinh nghiệm đón tiếp
                    khách
                  </p>
                </div>
              </div>
              <div className="w-full h-px bg-gray-200" />
            </div>
            <div className="sticky top-0">111111111111111</div>
          </div>
        </div>
      </div>
    )
  ) : (
    <PageNotFound />
  );
};

export default RoomDetail;
