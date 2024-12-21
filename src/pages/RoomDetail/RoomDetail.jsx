import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { phongService } from "../../services/phong.service";
import PageNotFound from "../../components/PageNotFound";
import LoadingCustom from "../../components/ui/loading/LoadingCustom";
import { ButtonGhost } from "../../components/ui/button/ButtonCustom";
import { LuHeart, LuShare } from "react-icons/lu";
import { IoIosStar } from "react-icons/io";
import HighlightsRoom from "./components/HighlightsRoom";
import LineSpace from "./components/LineSpace";
import DetailRoom from "./components/DetailRoom";
import AmenitiesRoom from "./components/AmenitiesRoom";
import { MOCKUP_COMMENT } from "../../common/constant";
import { FaAngleRight } from "react-icons/fa";
import AsideRoomDetail from "./components/AsideRoomDetail";
import { FaAngleLeft } from "react-icons/fa6";
import { pathDefault } from "../../common/path";
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
          <div className="flex justify-between px-4 md:px-10 lg:px-0">
            <h1 className="text-2xl flex-1 font-semibold hidden md:block">
              {roomDetail.tenPhong}
            </h1>
            <Link
              to={pathDefault.homePage}
              className="md:hidden flex items-center gap-2"
            >
              <FaAngleLeft />
              <span>Nhà riêng</span>
            </Link>
            <div className="flex space-x-1">
              <ButtonGhost
                children={
                  <p className="underline font-semibold flex items-center space-x-2">
                    <LuShare /> <span className="hidden md:block">Chia sẻ</span>
                  </p>
                }
                className={"px-2 md:px-4"}
              />
              <ButtonGhost
                children={
                  <p className="underline font-semibold flex items-center space-x-2">
                    <LuHeart />
                    <span className="hidden md:block">Lưu</span>
                  </p>
                }
                className={"px-2 md:px-4"}
              />
            </div>
          </div>
          <div className="shadow-sm px-0 md:px-10 lg:px-0">
            <img
              src={roomDetail.hinhAnh}
              className="w-full md:rounded-2xl max-h-[500px] object-cover"
              alt=""
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 relative md:px-10 lg:px-0">
            <div className="col-span-2 px-6 md:px-0">
              <div className="pt-6">
                <h2 className="text-2xl font-semibold">
                  {roomDetail.tenPhong}
                </h2>
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
                  <p className="text-[#6A6A6A] text-sm md:text-base">
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
              {/* <LineSpace />
              <div className="py-6">
                <h2 className="text-2xl font-semibold">Chọn ngày nhận phòng</h2>
                <p className="text-sm text-[#6A6A6A]">
                  Thêm ngày đi để biết giá chính xác
                </p>
                <div className="mt-6">Lich</div>
              </div> */}
            </div>
            <AsideRoomDetail
              max={roomDetail.khach}
              priceRoom={roomDetail.giaTien}
            />
          </div>
          <LineSpace />
          <div className="py-6 space-x-6 px-6 md:px-10 lg:px-0">
            <div>
              <h2 className="text-2xl font-semibold">2 đánh giá</h2>
              <p className="text-[#6a6a6a] text-sm">
                Xếp hạng trung bình sẽ được hiển thị sau khi có 3 đánh giá
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:gap-6 lg:gap-0 md:grid-cols-2 mt-10 !mx-0">
              {MOCKUP_COMMENT.map((item, index) => {
                return (
                  <div className="flex flex-col space-y-4 lg:pr-24" key={index}>
                    <div className="flex gap-4">
                      <div>
                        <img
                          src={item.avatar}
                          className="w-12 h-12 rounded-full"
                          alt={item.author}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.author}</h3>
                        <p className="text-sm">{item.yearOfOperation}</p>
                      </div>
                    </div>
                    <div>
                      <p>{item.comment}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <LineSpace />
          <div className="py-6 space-y-4 px-6 md:px-10 lg:px-0">
            <h2 className="font-semibold text-2xl">Nơi bạn sẽ tới</h2>
            <p>Quận 1, Hồ Chí Minh, Việt Nam</p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31356.733751529093!2d106.67949018359035!3d10.765915810662738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f9ed887b%3A0x14aded5703768989!2zUXXhuq1uIDEsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1733132503217!5m2!1svi!2s"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full min-h-96"
            />
          </div>
          <LineSpace />
          <div className="py-6 px-6 md:px-10 lg:px-0">
            <h2 className="text-2xl font-semibold mb-6">Những điều cần biết</h2>
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold">Nội quy nhà</h3>
                <p>Nhận phòng sau 14:00</p>
                <p>Tối đa 3 khách</p>
                <p>Được phép mang theo thú cưng</p>
                <p className="flex gap-1 items-center font-semibold">
                  <span className="underline">Hiển thị thêm</span>
                  <FaAngleRight />
                </p>
              </div>
              <div className="block md:hidden">
                <LineSpace />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold">An toàn và chỗ ở</h3>
                <p>Chỗ ở có camera an ninh ngoài nhà</p>
                <p>Máy phát hiện khí CO</p>
                <p>Máy báo khói</p>
                <p className="flex gap-1 items-center font-semibold">
                  <span className="underline">Hiển thị thêm</span>
                  <FaAngleRight />
                </p>
              </div>
              <div className="block md:hidden">
                <LineSpace />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold">Chính sách hủy</h3>
                <p>
                  Thêm ngày cho chuyến đi của bạn để nhận thông tin về chính
                  sách hủy cho đặt phòng này.
                </p>
                <p className="flex gap-1 items-center font-semibold">
                  <span className="underline">Hiển thị thêm</span>
                  <FaAngleRight />
                </p>
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
