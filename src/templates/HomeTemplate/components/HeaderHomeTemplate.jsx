import React from "react";
import { Icons } from "../../../assets/Icons";
import { ButtonGhost } from "../../../components/ui/button/ButtonCustom";
import { RiGlobalLine } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { pathDefault } from "../../../common/path";
import { IoSearch } from "react-icons/io5";

const HeaderHomeTemplate = () => {
  const location = useLocation();
  const isRoomDetail = location.pathname.includes("/rooms");
  return (
    <header
      // className={`${
      //   isRoomDetail ? "" : "sticky"
      // } bg-white shadow-sm z-20 h-[96px] py-4 top-0`}
      className="sticky bg-white shadow-sm z-20 h-[96px] py-4 top-0"
    >
      <div
        className={`${
          isRoomDetail ? "px-40" : ""
        } container flex justify-between items-center`}
      >
        <div>
          <Link to={pathDefault.homePage}>
            <Icons.logoFull fill="#FF385C" />
          </Link>
        </div>
        <div className="pl-4 pr-2 py-2 rounded-full shadow-sm relative border border-gray-200 space-x-4 flex items-center">
          <input
            type="text"
            className="py-1 min-w-96 outline-none text-gray-800 ml-2"
            placeholder="Test . . ."
          />
          <button className="bg-primary text-white py-3 px-3 rounded-full hover:bg-[#E43170] transition-all duration-200">
            <IoSearch />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <ButtonGhost className={"!px-2 py-5 font-semibold rounded-full"}>
            Cho thuê chỗ ở qua Airbnb
          </ButtonGhost>
          <ButtonGhost className={"!px-2 py-5 rounded-full"}>
            <RiGlobalLine size={20} />
          </ButtonGhost>
          <div className="py-2 px-4 rounded-full border border-gray-200 shadow-sm flex items-center space-x-4 cursor-pointer hover:shadow-md">
            <FaBars size={18} />
            <div className="w-8 h-8 text-[#6A6A6A]">
              <Icons.avatar />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderHomeTemplate;
