import React, { useEffect, useState } from "react";
import LineSpace from "../RoomDetail/components/LineSpace";
import UserChartRole from "./components/UserChartRole";
import UserChartGender from "./components/UserChartGender";
import { userService } from "../../services/users.service";
import TopRoomsChart from "./components/TopRoomsChart";
import { setRoomService } from "../../services/setRoom.service";
import { phongService } from "../../services/phong.service";
import VisitCounterChart from "./components/VisitCounterChart";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

const DashBoard = () => {
  const { t } = useTranslation("dashboard");
  const [listUser, setListUser] = useState([]);
  const [listSetRoom, setListSetRoom] = useState([]);
  const [listRoom, setListRoom] = useState([]);
  const MOCKUP_DATA_DASHBOARD = [
    {
      title: t("revenue"),
      value: "$25K",
    },
    {
      title: `${t("brand")} 1`,
      value: "$3,500",
    },
    {
      title: `${t("brand")} 2`,
      value: "$2,387",
    },
    {
      title: t("wishlist"),
      value: "500",
    },
    {
      title: t("cart"),
      value: "150",
    },
    {
      title: t("payment"),
      value: "100",
    },
  ];

  useEffect(() => {
    userService
      .getListUser()
      .then((res) => {
        setListUser(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
    setRoomService
      .getListSetRoom()
      .then((res) => {
        setListSetRoom(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
    phongService.getListPhong().then((res) => {
      setListRoom(res.data.content);
    });
  }, []);
  return (
    <div>
      <h1 className="text-xl font-semibold">{t("title")}</h1>
      <LineSpace />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex gap-6">
          <div className="w-1/2 border border-gray-200 bg-white rounded-2xl p-6">
            <UserChartRole listUser={listUser} />
          </div>
          <div className="w-1/2 border border-gray-200 bg-white rounded-2xl p-6">
            <UserChartGender listUser={listUser} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {MOCKUP_DATA_DASHBOARD.map((item, index) => {
            return (
              <div
                className="bg-white rounded-2xl p-4 flex flex-col items-center lg:items-start"
                key={index}
              >
                <h4 className="text-black/70 text-sm dark:text-black/70">
                  {item.title}
                </h4>
                <p className="text-2xl font-semibold">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
      <LineSpace />

      <div className="w-full rounded-2xl bg-white p-12 hidden md:block mb-10">
        <TopRoomsChart bookingData={listSetRoom} roomData={listRoom} />
      </div>
      <div className="w-full rounded-2xl bg-white p-12 hidden md:block">
        <VisitCounterChart />
      </div>
    </div>
  );
};

export default DashBoard;
