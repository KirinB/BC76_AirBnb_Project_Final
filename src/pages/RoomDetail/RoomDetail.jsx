import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { phongService } from "../../services/phong.service";
import PageNotFound from "../../components/PageNotFound";
import LoadingCustom from "../../components/ui/loading/LoadingCustom";
import {
  ButtonGhost,
  ButtonPrimary,
} from "../../components/ui/button/ButtonCustom";
import { LuHeart, LuShare } from "react-icons/lu";
import { IoIosStar } from "react-icons/io";
import HighlightsRoom from "./components/HighlightsRoom";
import LineSpace from "./components/LineSpace";
import DetailRoom from "./components/DetailRoom";
import AmenitiesRoom from "./components/AmenitiesRoom";
import { DatePicker } from "antd";
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
      <div className="container px-40 py-6">
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
              <div className="pt-6">
                <h2 className="text-xl font-semibold">{roomDetail.tenPhong}</h2>
                <p>{roomDetail.giuong} giường</p>
                <p className="font-semibold flex items-center space-x-2 mt-2">
                  <span className="flex items-center space-x-1">
                    <IoIosStar /> <span className="text-[17px]">Mới</span>
                  </span>
                  <span>·</span>
                  <span className="underline cursor-pointer">2 đánh giá</span>
                </p>
              </div>
              <LineSpace />
              <div className="flex gap-6 items-center">
                <div className="">
                  <img
                    src="/avatar_mockup.jpg"
                    alt=""
                    className="w-10 h-10 rounded-full "
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="font-semibold">
                    Chủ nhà/ Người tổ chức: Minh Nhan
                  </h3>
                  <p className="text-[#6A6A6A]">
                    Chủ nhà siêu cấp<span> · </span>10 năm kinh nghiệm đón tiếp
                    khách
                  </p>
                </div>
              </div>
              <LineSpace />
              <div className="py-6">
                <HighlightsRoom />
              </div>
              <LineSpace />
              <DetailRoom description={roomDetail.moTa} />
              <LineSpace />
              <AmenitiesRoom
                mayGiat={roomDetail.mayGiat}
                banLa={roomDetail.banLa}
                banUi={roomDetail.banUi}
                bep={roomDetail.bep}
                dieuHoa={roomDetail.dieuHoa}
                doXe={roomDetail.doXe}
                hoBoi={roomDetail.hoBoi}
                tivi={roomDetail.tivi}
                wifi={roomDetail.wifi}
              />
              <LineSpace />
            </div>
            <div className="sticky top-24 h-px flex justify-end">
              <div className="mt-6 w-4/5">
                <div className="border w-full border-gray-200 shadow-lg rounded-xl p-6 space-y-6">
                  <h2 className="font-semibold text-xl">
                    Thêm ngày để xem giá
                  </h2>
                  <div>
                    <DatePicker.RangePicker />
                  </div>
                  <div>
                    <ButtonPrimary className={"w-full py-6"}>
                      Kiểm tra tình trạng còn phòng
                    </ButtonPrimary>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  ) : (
    <PageNotFound />
  );
};

export default RoomDetail;
