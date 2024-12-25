import React, { useState } from "react";
import { Icons } from "../../../assets/Icons";
import { ButtonGhost } from "../../../components/ui/button/ButtonCustom";
import { RiGlobalLine } from "react-icons/ri";
import { FaBars, FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { pathDefault } from "../../../common/path";
import useViewPort from "../../../hooks/useViewPort";
import HeaderSearch from "./HeaderSearch";
import { FaArrowLeft, FaMagnifyingGlass } from "react-icons/fa6";
import { Modal } from "antd";
import HeaderSearchMobile from "./HeaderSearchMobile";
import { useHeaderContext } from "../../../store/HeaderContext";
import { useDispatch, useSelector } from "react-redux";
import { handleDeleteUser } from "../../../store/Slice/User.Slice";

const HeaderHomeTemplate = () => {
  const { width } = useViewPort();
  const location = useLocation();
  const { keySearch } = useHeaderContext();
  const isSearchRoom = location.pathname.includes("/search");
  const isRoomDetail = location.pathname.includes("/rooms");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOk = () => {
    navigate(`${pathDefault.searchPage}/?key=${keySearch}`);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const user = useSelector((state) => state.UserSlice.user);

  const dispatch = useDispatch();

  const handlelogOut = () => {
    localStorage.removeItem("userInfo");
    dispatch(handleDeleteUser());
    alert("Đăng xuất thành công");
  };

  return width < 768 && !isRoomDetail ? (
    <>
      <header className="sticky top-0 w-full bg-white z-20 flex items-center justify-between py-3 px-6 border-b border-gray-200">
        {isSearchRoom && (
          <div className="p-3">
            <Link to={pathDefault.homePage}>
              <FaArrowLeft />
            </Link>
          </div>
        )}
        <div className="p-3">
          <Link to={pathDefault.homePage}>
            <Icons.logoFull />
          </Link>
        </div>
        {isSearchRoom ? (
          <div className="p-3 border-[#222222] border rounded-full">
            <Icons.filter />
          </div>
        ) : (
          <>
            <div
              className="p-3 border-[#222222] border rounded-full"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <FaMagnifyingGlass />
            </div>
            <Modal
              title="Tìm kiếm"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <HeaderSearchMobile />
            </Modal>
          </>
        )}
      </header>
      <nav className="fixed bottom-0 left-0 right-0 w-full z-10 py-2 bg-white flex justify-center gap-6 border-t border-gray-200">
        <div className="flex flex-col items-center gap-1">
          <FaMagnifyingGlass size={20} className="text-primary" />
          <h3 className="text-[10px] text-primary">Khám phá</h3>
        </div>
        <div className="flex flex-col items-center gap-1">
          <FaRegHeart size={20} />
          <h3 className="text-[10px]">Yêu thích</h3>
        </div>
        <div className="flex flex-col items-center gap-1">
          <FaRegUserCircle size={20} />
          <h3 className="text-[10px]">Đăng nhập</h3>
        </div>
      </nav>
    </>
  ) : (
    <header
      className={`sticky bg-white shadow-sm z-20 h-[96px] py-4 top-0 items-center hidden md:flex`}
    >
      <div className="container flex gap-4 justify-between items-center px-10 lg:px-0">
        <div>
          <Link to={pathDefault.homePage}>
            {width < 1024 ? (
              <Icons.logo fill="#FF385C" />
            ) : (
              <Icons.logoFull fill="#FF385C" />
            )}
          </Link>
        </div>
        <HeaderSearch />
        <div className="flex items-center space-x-2 ">
          <ButtonGhost className={"!px-2 py-5 font-semibold rounded-full"}>
            Cho thuê chỗ ở qua Airbnb
          </ButtonGhost>
          <ButtonGhost className={"!px-2 py-5 rounded-full"}>
            <RiGlobalLine size={20} />
          </ButtonGhost>
          <div className="py-2 px-4 rounded-full group border relative border-gray-200 shadow-sm flex items-center space-x-4 cursor-pointer hover:shadow-md">
            <FaBars size={18} />
            <div className="w-8 h-8 text-[#6A6A6A]">
              <Icons.avatar />
            </div>
            <div className="absolute bg-white w-52 top-12 right-0 rounded-lg shadow-xl hidden group-hover:block duration-1000">
              <Link
                to={pathDefault.Profile}
                className="block py-2 pl-5 hover:bg-gray-200 my-2 font-medium"
              >
                Trang cá nhân
              </Link>

              {user ? (
                <Link
                  to={pathDefault.homePage}
                  className="block py-2 pl-5 hover:bg-gray-200 my-2 font-medium"
                  onClick={handlelogOut}
                >
                  Đăng xuất
                </Link>
              ) : (
                <>
                  <Link
                    to={pathDefault.AuthPage}
                    className="block py-2 pl-5 hover:bg-gray-200 my-2 font-medium"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to={pathDefault.AuthPage}
                    className="block py-2 pl-5 hover:bg-gray-200 my-2 font-medium"
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderHomeTemplate;
