import React from "react";
import "./CategoryNavbar.scss";
import Slider from "react-slick";
import { dataCategory } from "../../../common/constant";

const CategoryNavbar = () => {
  var settings = {
    infinite: false,
    arrow: false,
    speed: 500,
    slidesToShow: 16,
    slidesToScroll: 4,
  };
  return (
    <div className="shadow-sm sticky top-24 bg-white">
      <div className="py-2 container">
        <Slider {...settings}>
          {dataCategory.map((item, index) => {
            return (
              <div
                key={index}
                className="!flex flex-col justify-center items-center opacity-70 cursor-pointer hover:opacity-100 transition-all duration-200"
              >
                <img className="w-6 h-6" src={item.icon} alt="" />
                <h3 className="text-xs">{item.title}</h3>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default CategoryNavbar;
