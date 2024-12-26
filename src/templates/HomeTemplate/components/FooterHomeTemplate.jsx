import React from "react";
import { dataFooter } from "../../../common/constant";
import { Link } from "react-router-dom";
import { RiGlobalLine } from "react-icons/ri";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram, FaSquareTwitter } from "react-icons/fa6";

const FooterHomeTemplate = () => {
  return (
    <footer className="bg-[#F7F7F7] text-[#222222] py-10">
      <div className="container px-6 lg:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {dataFooter.map((item, i) => {
            return (
              <ul key={i} className="space-y-3 text-sm">
                <h3 className="font-semibold">{item.title}</h3>
                {item.children.map((child, i) => {
                  return (
                    <li key={i}>
                      <Link className="hover:underline transition-all duration-200">
                        {child.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </div>
        <div className="w-full h-px bg-gray-200 my-10"></div>
        <div className="flex flex-col-reverse gap-6 md:gap-0 lg:flex-row justify-between items-center ">
          <div>
            <span className="text-sm">
              © 2024 Airbnb, Inc.<span className="mx-2">·</span>
              <Link className="hover:underline transition-all duration-200">
                Quyền riêng tư
              </Link>
              <span className="mx-2">·</span>
              <Link className="hover:underline transition-all duration-200">
                Điều khoản
              </Link>
              <span className="mx-2">·</span>
              <Link className="hover:underline transition-all duration-200">
                Sơ đồ trang web
              </Link>
            </span>
          </div>
          <div className="space-x-4 items-center flex">
            <button className="flex items-center justify-center space-x-2 hover:underline transition-all duration-300 font-semibold">
              <RiGlobalLine /> <span>Tiếng Việt (VN)</span>
            </button>
            <button className="flex items-center justify-center space-x-2 hover:underline transition-all duration-300 font-semibold">
              <span>₫</span>
              <span>VND</span>
            </button>
            <div>
              <Link>
                <FaFacebookSquare size={20} />
              </Link>
            </div>
            <div>
              <Link>
                <FaSquareTwitter size={20} />
              </Link>
            </div>
            <div>
              <Link>
                <FaSquareInstagram size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterHomeTemplate;
