import React, { useContext, useState } from "react";

import { DatePicker, Modal } from "antd";
import Counter from "../../../components/Counter/Counter";
import { DropdownCustom } from "../../../components/ui/dropdown/DropdownCustom";
import { ButtonPrimary } from "../../../components/ui/button/ButtonCustom";
import LineSpace from "./LineSpace";
import { AiFillFlag } from "react-icons/ai";
import { Link } from "react-router-dom";
import useViewPort from "../../../hooks/useViewPort";
import { useSelector } from "react-redux";
import { setRoomService } from "../../../services/setRoom.service";
import { parse, formatISO } from "date-fns";
import { NotificationContext } from "../../../App";
import SignInPage from "../../AuthPage/components/SignInPage";
import ModalLogin from "../../../components/ModalLogin/ModalLogin";
import { formatCurrency } from "../../../common/formatCurrency";
import { IoMdClose } from "react-icons/io";
const AsideRoomDetail = ({ max, priceRoom, idRoom }) => {
  const { width } = useViewPort();
  const user = useSelector((state) => {
    return state.userSlice.user;
  });
  const rate = useSelector((state) => state.exchangeRate.rate);
  const { handleNotification } = useContext(NotificationContext);
  const [counterAdult, setConterAdult] = useState(1);
  const [counterChild, setCounterChild] = useState(0);
  const [counterBaby, setCounterBaby] = useState(0);
  const [isSelectedDay, setIsSelectedDay] = useState(false);
  const [daysSelected, setDaysSelected] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [dayStart, setDayStart] = useState();
  const [dayEnd, setDayEnd] = useState();

  const totalPerson = counterAdult + counterChild;
  const isBlockMax = totalPerson >= max;

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    const totalDays = calculateTotalDays([dayStart, dayEnd]);
    setDaysSelected(totalDays);
    setIsSelectedDay(totalDays > 0);
    setIsModalOpen(false);
  };

  const handleChangeDayStart = (date, dateString) => {
    setDayStart(dateString);
  };

  const handleChangeDayEnd = (date, dateString) => {
    setDayEnd(dateString);
  };

  const handleDecreasesAdult = () => {
    if (counterAdult > 1) {
      setConterAdult((prev) => prev - 1);
    }
  };

  const handleIncreasesAdult = () => {
    if (totalPerson < max) {
      setConterAdult((prev) => prev + 1);
    }
  };

  const handleDecreasesChild = () => {
    if (counterChild > 0) {
      setCounterChild((prev) => prev - 1);
    }
  };
  const handleIncreasesChild = () => {
    if (totalPerson < max) {
      setCounterChild((prev) => prev + 1);
    }
  };

  const handleDecreasesBaby = () => {
    if (counterBaby > 0) {
      setCounterBaby((prev) => prev - 1);
    }
  };

  const handleIncreasesBaby = () => {
    if (counterBaby < 5) {
      setCounterBaby((prev) => prev + 1);
    }
  };

  const handleRangeChange = (dates, dateStrings) => {
    setDayStart(dateStrings[0]);
    setDayEnd(dateStrings[1]);
    const totalDays = calculateTotalDays(dateStrings);
    setDaysSelected(totalDays);
    setIsSelectedDay(totalDays > 0);
  };

  const handleSetRoom = () => {
    if (user) {
      const dataDateStart = formatDate(dayStart);
      const dataDateEnd = formatDate(dayEnd);

      setRoomService
        .setRoomService({
          id: 0,
          maPhong: idRoom,
          ngayDen: dataDateEnd,
          ngayDi: dataDateStart,
          soLuongKhach: totalPerson,
          maNguoiDung: user.id,
        })
        .then((res) => {
          handleNotification("success", "Bạn đã đặt phòng thành công!");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      handleNotification("error", "Bạn cần đăng nhập để đặt phòng");
      setIsModalLoginOpen(true);
    }
  };

  function formatDate(date) {
    const parsedDate = parse(date, "dd-MM-yyyy", new Date());
    return formatISO(parsedDate);
  }

  function calculateTotalDays(dateArray) {
    if (dateArray.length !== 2) {
      return 0;
    }

    function convertToDateFormat(dateString) {
      const [day, month, year] = dateString.split("-");
      return `${year}-${month}-${day}`;
    }

    const startDate = new Date(convertToDateFormat(dateArray[0]));
    const endDate = new Date(convertToDateFormat(dateArray[1]));

    if (isNaN(startDate) || isNaN(endDate)) {
      return 0;
    }

    // Tính số ngày giữa hai ngày
    const timeDifference = endDate - startDate;
    return Math.abs(timeDifference / (1000 * 60 * 60 * 24));
  }

  return width < 768 ? (
    <>
      <div className="fixed bottom-0 w-full bg-white z-50 dark:bg-slate-900 border-t border-gray-200 flex gap-4 justify-between p-6">
        <div className="w-1/2 flex items-center ">
          {isSelectedDay ? (
            <h2 className="text-lg font-semibold">
              ₫{formatCurrency(priceRoom * rate)}{" "}
              <span className="font-normal text-base">/ đêm</span>
            </h2>
          ) : (
            <span className="">Thêm ngày để xem giá</span>
          )}
        </div>
        <div className="w-1/2 cursor-pointer">
          {isSelectedDay ? (
            <ButtonPrimary className={"w-full text-wrap py-6"}>
              <span className="text-sm">Đặt phòng</span>
            </ButtonPrimary>
          ) : (
            <ButtonPrimary
              className={"w-full text-wrap py-6"}
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <span className="text-sm">Kiểm tra tình trạng còn phòng</span>
            </ButtonPrimary>
          )}
        </div>
      </div>
      <Modal
        title={<span className="dark:text-white">Chọn ngày</span>}
        open={isModalOpen}
        closeIcon={<IoMdClose className="text-black dark:text-slate-200" />}
        onCancel={handleCancel}
        onOk={handleOk}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <div className="flex flex-col space-y-4 py-4">
          <div className="flex flex-col space-y-1">
            <h2 className="text-sm">Ngày nhận phòng</h2>
            <DatePicker
              format={"DD-MM-YYYY"}
              placeholder="Ngày nhận phòng"
              onChange={handleChangeDayStart}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <h2 className="text-sm">Ngày trả phòng</h2>
            <DatePicker
              format={"DD-MM-YYYY"}
              placeholder="Ngày trả phòng"
              onChange={handleChangeDayEnd}
            />
          </div>
        </div>
      </Modal>
    </>
  ) : (
    <div className="sticky top-24 hidden md:flex justify-end self-start">
      <div className="mt-6 w-4/5">
        <div className="border w-full border-gray-200 shadow-lg rounded-xl p-6 space-y-6">
          {isSelectedDay ? (
            <h2 className="text-xl font-semibold">
              ₫{formatCurrency(priceRoom * rate)}{" "}
              <span className="font-normal text-base">/ đêm</span>
            </h2>
          ) : (
            <h2 className="text-2xl">Thêm ngày để xem giá</h2>
          )}
          <div className="space-y-2">
            <DatePicker.RangePicker
              format={"DD-MM-YYYY"}
              placeholder={["Nhận phòng", "Trả phòng"]}
              onChange={handleRangeChange}
              className="w-full"
            />
            <DropdownCustom
              rounded={false}
              className={"w-full flex justify-between items-center relative"}
              items={[
                {
                  label: (
                    <div className="flex flex-col gap-4 w-full">
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <h3 className="font-semibold">Người lớn</h3>
                          <p className="text-sm">Từ 13 tuổi trở lên</p>
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation(); // Chặn sự kiện đóng dropdown
                          }}
                        >
                          <Counter
                            totalDefault={1}
                            max={max}
                            onDecrease={handleDecreasesAdult}
                            onIncrease={handleIncreasesAdult}
                            total={counterAdult}
                            isBlockMax={isBlockMax}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <h3 className="font-semibold">Trẻ em</h3>
                          <p className="text-sm">Độ tuổi 2-12</p>
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Counter
                            totalDefault={0}
                            max={max}
                            onDecrease={handleDecreasesChild}
                            onIncrease={handleIncreasesChild}
                            total={counterChild}
                            isBlockMax={isBlockMax}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <h3 className="font-semibold">Em bé</h3>
                          <p className="text-sm">Dưới 2 tuổi</p>
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Counter
                            totalDefault={0}
                            max={5}
                            onDecrease={handleDecreasesBaby}
                            onIncrease={handleIncreasesBaby}
                            total={counterBaby}
                          />
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            >
              <div className="absolute top-2 left-3 text-xs font-semibold">
                Khách
              </div>
              <div className="pt-5 text-sm lowercase">
                {totalPerson} khách
                {counterBaby > 0 ? `, ${counterBaby} em bé` : ""}
              </div>
            </DropdownCustom>
          </div>

          <div className="">
            {isSelectedDay ? (
              <ButtonPrimary className={"w-full py-6"} onClick={handleSetRoom}>
                Đặt phòng
              </ButtonPrimary>
            ) : (
              <ButtonPrimary className={"w-full md:py-10 lg:py-6 text-wrap"}>
                <span className="md:text-sm">
                  Kiểm tra tình trạng còn phòng
                </span>
              </ButtonPrimary>
            )}
            {isSelectedDay && (
              <>
                <div className="text-center text-sm mt-4">
                  Bạn vẫn chưa bị trừ tiền
                </div>
                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex justify-between items-center gap-2">
                    <h4 className="text-sm lg:text-base underline">
                      ₫{formatCurrency(priceRoom * rate)} x {daysSelected} đêm
                    </h4>
                    <h4 className="text-sm lg:text-base">
                      ₫{formatCurrency(priceRoom * rate * daysSelected)}
                    </h4>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <h4 className="text-sm lg:text-base underline">
                      Phí vệ sinh
                    </h4>
                    <h4 className="text-sm lg:text-base">₫150.000</h4>
                  </div>
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm lg:text-base underline">
                      Phí dịch vụ AirBnb
                    </h4>
                    <h4 className="text-sm lg:text-base">₫200.000</h4>
                  </div>
                </div>
                <LineSpace />
                <div className="flex justify-between items-center gap-2">
                  <h4 className="text-sm lg:text-base font-semibold">
                    Tổng trước thuế
                  </h4>
                  <h4 className="text-sm lg:text-base font-semibold">
                    ₫
                    {formatCurrency(
                      priceRoom * rate * daysSelected + 150e3 + 200e3
                    )}
                  </h4>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-4">
          <AiFillFlag fill="#6A6A6A" />
          <Link className="underline text-sm text-[#6A6A6A]">
            Báo cáo nhà/phòng cho thuê này
          </Link>
        </div>
      </div>
      <Modal
        title=""
        open={isModalLoginOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <ModalLogin setIsModalLoginOpen={setIsModalLoginOpen} />
      </Modal>
    </div>
  );
};

export default AsideRoomDetail;
