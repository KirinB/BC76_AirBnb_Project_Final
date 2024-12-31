import React from "react";
import { IoIosStar } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../common/formatCurrency";

const RoomSearch = ({ id, image, title, description, price, giuong }) => {
  const { rates, currentCurrency, currentSymbol } = useSelector(
    (state) => state.exchangeRate
  );

  return (
    <Link to={`/rooms/${id}`} className="flex flex-col space-y-4">
      <div>
        <img
          src={image}
          alt=""
          className="rounded-md h-80 w-full object-cover"
        />
      </div>
      <div className="space-y-1">
        <div className="flex justify-between gap-4 items-center">
          <h2 className="truncate font-semibold text-[#222222]">{title}</h2>
          <p className="flex items-baseline space-x-1">
            <IoIosStar />
            <span>4,5(14)</span>
          </p>
        </div>
        <p className="text-[#6A6A6A] truncate">{description}</p>
        <p className="text-[#6A6A6A]">{giuong} giường</p>
        <div className="flex space-x-2">
          <p className="text-[#6A6A6A]">
            <strong className="text-[#222222] dark:text-white">
              {currentSymbol}
              {formatCurrency(price * rates[currentCurrency])}
            </strong>
            / đêm
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RoomSearch;
