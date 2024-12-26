import { Dropdown, Modal } from "antd";
import React, { useState } from "react";
import { FaBars, FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import { FaArrowLeft, FaMagnifyingGlass } from "react-icons/fa6";
import { RiGlobalLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/Icons";
import { pathDefault } from "../../../common/path";
import { ButtonGhost } from "../../../components/ui/button/ButtonCustom";
import useViewPort from "../../../hooks/useViewPort";
import LineSpace from "../../../pages/RoomDetail/components/LineSpace";
import { useHeaderContext } from "../../../store/HeaderContext";
import HeaderSearch from "./HeaderSearch";
import HeaderSearchMobile from "./HeaderSearchMobile";

const HeaderHomeTemplate = () => {
  const { width } = useViewPort();
  const user = useSelector((state) => state.userSlice.user);
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
        <div className="flex items-center space-x-2">
          <ButtonGhost className={"!px-2 py-5 font-semibold rounded-full"}>
            Cho thuê chỗ ở qua Airbnb
          </ButtonGhost>
          <ButtonGhost className={"!px-2 py-5 rounded-full"}>
            <RiGlobalLine size={20} />
          </ButtonGhost>
          {!user ? (
            <Dropdown
              menu={{
                items: [
                  {
                    label: (
                      <div className="flex flex-col">
                        <div className="py-2 px-4 hover:bg-gray-100 font-semibold">
                          Đăng ký
                        </div>
                        <Link
                          to={pathDefault.AuthPage}
                          className="py-2 px-4 hover:bg-gray-100 hover:text-current"
                        >
                          Đăng nhập
                        </Link>
                        <LineSpace className="my-1" />
                        <div className="py-2 px-4 hover:bg-gray-100">
                          Cho thuê chỗ ở qua Airbnb
                        </div>
                        <div className="py-2 px-4 hover:bg-gray-100">
                          Tổ chức trải nghiệm
                        </div>
                        <div className="py-2 px-4 hover:bg-gray-100">
                          Trung tâm hỗ trợ
                        </div>
                      </div>
                    ),
                  },
                ],
              }}
              overlayClassName="header-dropdown-menu"
              placement="bottomRight"
              trigger={["click"]}
            >
              <a
                onClick={() => {
                  (e) => e.preventDefault();
                }}
                className="py-2 px-4 rounded-full border border-gray-200 shadow-sm flex items-center space-x-4 cursor-pointer hover:shadow-md"
              >
                <FaBars size={18} />
                <div className="w-8 h-8 text-[#6A6A6A]">
                  <Icons.avatar />
                </div>
              </a>
            </Dropdown>
          ) : (
            <Dropdown
              menu={{
                items: [
                  {
                    label: (
                      <div className="flex flex-col">
                        <div className="py-2 px-4 hover:bg-gray-100 font-semibold">
                          Quản lý hồ sơ
                        </div>
                        <LineSpace className="my-1" />
                        <div className="py-2 px-4 hover:bg-gray-100">
                          Cho thuê chỗ ở qua Airbnb
                        </div>
                        <div className="py-2 px-4 hover:bg-gray-100">
                          Tổ chức trải nghiệm
                        </div>
                        <div className="py-2 px-4 hover:bg-gray-100">
                          Trung tâm hỗ trợ
                        </div>
                        <LineSpace className="my-1" />
                        <div
                          className="py-2 px-4 hover:bg-gray-100"
                          onClick={() => {
                            localStorage.removeItem("userInfo");
                            navigate(pathDefault.homePage);
                            window.location.reload();
                          }}
                        >
                          Đăng xuất
                        </div>
                      </div>
                    ),
                  },
                ],
              }}
              overlayClassName="header-dropdown-menu"
              placement="bottomRight"
              trigger={["click"]}
            >
              <a
                onClick={() => {
                  (e) => e.preventDefault();
                }}
                className="py-2 px-4 rounded-full border border-gray-200 shadow-sm flex items-center space-x-4 cursor-pointer hover:shadow-md"
              >
                <FaBars size={18} />
                <div className="w-8 h-8 text-[#6A6A6A]">
                  <img
                    src={user.avatar || "/default_avatar.jpg"}
                    className="rounded-full"
                    alt=""
                  />
                </div>
              </a>
            </Dropdown>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderHomeTemplate;
