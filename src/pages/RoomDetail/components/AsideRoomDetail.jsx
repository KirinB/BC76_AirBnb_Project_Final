import React, { useState } from "react";

import { DatePicker } from "antd";
import Counter from "../../../components/Counter/Counter";
import { DropdownCustom } from "../../../components/ui/dropdown/DropdownCustom";
import { ButtonPrimary } from "../../../components/ui/button/ButtonCustom";
import LineSpace from "./LineSpace";
const AsideRoomDetail = ({ max, priceRoom }) => {
  const [counterAdult, setConterAdult] = useState(1);
  const [counterChild, setCounterChild] = useState(0);
  const [counterBaby, setCounterBaby] = useState(0);
  const [isSelectedDay, setIsSelectedDay] = useState(false);
  const [daysSelected, setDaysSelected] = useState(0);

  const totalPerson = counterAdult + counterChild;
  const isBlockMax = totalPerson >= max;

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
    console.log("Formatted Dates (strings):", dateStrings);
    const totalDays = calculateTotalDays(dateStrings);
    console.log({ totalDays });
    setDaysSelected(totalDays); // Lưu giá trị vào state
    setIsSelectedDay(totalDays > 0);
  };

  function calculateTotalDays(dateArray) {
    if (dateArray.length !== 2) {
      return 0;
    }

    // Hàm chuyển đổi định dạng 'dd-MM-yyyy' sang 'yyyy-MM-dd'
    function convertToDateFormat(dateString) {
      const [day, month, year] = dateString.split("-");
      return `${year}-${month}-${day}`;
    }

    // Chuyển đổi chuỗi thành đối tượng Date
    const startDate = new Date(convertToDateFormat(dateArray[0]));
    const endDate = new Date(convertToDateFormat(dateArray[1]));

    if (isNaN(startDate) || isNaN(endDate)) {
      return 0;
    }

    // Tính số ngày giữa hai ngày
    const timeDifference = endDate - startDate;
    return Math.abs(timeDifference / (1000 * 60 * 60 * 24));
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat("vi-VN").format(value);
  }

  console.log(isSelectedDay);

  return (
    <div className="sticky top-24 flex justify-end self-start">
      <div className="mt-6 w-4/5">
        <div className="border w-full border-gray-200 shadow-lg rounded-xl p-6 space-y-6">
          {isSelectedDay ? (
            <h2 className="text-xl font-semibold">
              ₫{formatCurrency(priceRoom * 20e3)}{" "}
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
              <ButtonPrimary className={"w-full py-6"}>Đặt phòng</ButtonPrimary>
            ) : (
              <ButtonPrimary className={"w-full py-6"}>
                Kiểm tra tình trạng còn phòng
              </ButtonPrimary>
            )}
            {isSelectedDay && (
              <>
                <div className="text-center text-sm mt-4">
                  Bạn vẫn chưa bị trừ tiền
                </div>
                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex justify-between items-center">
                    <h4 className="underline">
                      ₫{formatCurrency(priceRoom * 20e3)} x {daysSelected} đêm
                    </h4>
                    <h4>₫{formatCurrency(priceRoom * 20e3 * daysSelected)}</h4>
                  </div>
                  <div className="flex justify-between items-center">
                    <h4 className="underline">Phí vệ sinh</h4>
                    <h4>₫150.000</h4>
                  </div>
                  <div className="flex justify-between items-center">
                    <h4 className="underline">Phí dịch vụ AirBnb</h4>
                    <h4>₫200.000</h4>
                  </div>
                </div>
                <LineSpace />
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Tổng trước thuế</h4>
                  <h4 className="font-semibold">
                    ₫
                    {formatCurrency(
                      priceRoom * 20e3 * daysSelected + 150e3 + 200e3
                    )}
                  </h4>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsideRoomDetail;
