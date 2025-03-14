import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  Select,
  Space,
  theme,
} from "antd";
import { AiOutlineClockCircle } from "react-icons/ai";
import { pathDefault } from "../../common/path";
import { MdMyLocation } from "react-icons/md";
import { BiHomeHeart } from "react-icons/bi";
import { TbDeviceDesktopCog } from "react-icons/tb";
import { Icons } from "../../assets/Icons";
import { DropdownNoti } from "../../components/ui/dropdown/DropdownCustom";
import { useSelector } from "react-redux";
import {
  IoMdCheckboxOutline,
  IoMdClose,
  IoMdNotificationsOutline,
  IoMdStats,
} from "react-icons/io";
import "./adminTemplate.scss";
import useViewPort from "../../hooks/useViewPort";
import { FaBars, FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import { useTheme } from "../../store/ThemeContext";
import { useTranslation } from "react-i18next";

import { Helmet } from "react-helmet";
const AdminTemplate = () => {
  const { t, i18n } = useTranslation();
  const { width } = useViewPort();
  const { user } = useSelector((state) => state.userSlice);
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(true);
  const { isDarkMode, setIsDarkMode } = useTheme();

  const changeLangue = (value) => {
    i18n.changeLanguage(value);
    localStorage.setItem("language", value);
  };
  const location = useLocation();
  // xử lý onload sidebar
  const menuKeyMapping = {
    [pathDefault.dashBoard]: "1",
    [pathDefault.managerUser]: "2",
    [pathDefault.managerLocation]: "3",
    [pathDefault.managerRoom]: "4",
    [pathDefault.managerReservation]: "5",
  };
  const selectedKey = menuKeyMapping[location.pathname] || "1";
  // xử lý onload Translation
  const changeTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  const items = [
    {
      key: "1",
      label: <Link to={pathDefault.Profile}>Thông tin đăng nhập</Link>,
    },
    {
      key: "2",
      label: (
        <Link
          onClick={() => {
            localStorage.removeItem("userInfo");
            dispatch(handleUpdateUser(null));
            window.location.href = pathDefault.homePage;
          }}
        >
          Đăng xuất
        </Link>
      ),
    },
  ];
  const itemsSider = [
    {
      key: "1",
      icon: <IoMdStats size={23} />,
      label: (
        <NavLink
          className={({ isActive, isPending }) => {
            return `px-3 rounded-md inline-block ${
              isActive || location.pathname === "/admin" ? "item-active" : ""
            }`;
          }}
          to={pathDefault.dashBoard}
        >
          {t("dashboard")}
        </NavLink>
      ),
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: (
        <NavLink
          className={({ isActive, isPending }) => {
            return `px-3 rounded-md inline-block ${
              isActive || location.pathname === "/admin/manager-user"
                ? "item-active"
                : ""
            }`;
          }}
          to={pathDefault.managerUser}
        >
          {t("userLink")}
        </NavLink>
      ),
    },
    {
      key: "3",
      icon: <MdMyLocation />,
      label: (
        <NavLink
          className={({ isActive }) => {
            return `px-3 rounded-md inline-block ${
              isActive ? "item-active" : ""
            }`;
          }}
          to={pathDefault.managerLocation}
        >
          {t("locationLink")}
        </NavLink>
      ),
    },
    {
      key: "4",
      icon: <BiHomeHeart />,
      label: (
        <NavLink
          className={({ isActive }) => {
            return `px-3 rounded-md inline-block ${
              isActive ? "item-active" : ""
            }`;
          }}
          to={pathDefault.managerRoom}
        >
          {t("roomLink")}
        </NavLink>
      ),
    },
    {
      key: "5",
      icon: <TbDeviceDesktopCog />,
      label: (
        <NavLink
          className={({ isActive }) => {
            return `px-3 rounded-md inline-block ${
              isActive ? "item-active" : ""
            }`;
          }}
          to={pathDefault.managerReservation}
        >
          {t("bookingLink")}
        </NavLink>
      ),
    },
  ];
  const [isNavBar, setIsNavBar] = useState(false);
  const handleOpenNavbar = () => {
    setIsNavBar(true);
  };

  const handleCloseNavbar = () => {
    setIsNavBar(false);
  };

  useEffect(() => {
    const dataString = localStorage.getItem("userInfo");
    if (!dataString) {
      window.location.href = pathDefault.signInAdmin;
    } else {
      const data = JSON.parse(dataString);
      if (data.user.role != "ADMIN") {
        window.location.href = pathDefault.homePage;
      }
    }
  }, []);
  return (
    <Layout className="h-full">
      {width >= 1024 && (
        <Sider
          theme="light"
          className="dark:bg-slate-900 bg-gray-800"
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={250}
        >
          <Helmet>
            <title>AirBnb - Admin Dashboard</title>
          </Helmet>
          <div className="demo-logo-vertical" />
          <div className="my-4 flex justify-center">
            <Link to={pathDefault.homePage}>
              {collapsed ? <Icons.logo fill="#FF385C" /> : <Icons.logoFull />}
            </Link>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            className="bg-transparent"
            defaultSelectedKeys={[selectedKey]}
            selectedKeys={[selectedKey]}
            items={itemsSider}
          />
        </Sider>
      )}

      <Layout>
        <Header
          className="bg-white dark:bg-slate-900 dark:border-y-white dark:border-y dark:text-white dark:fill-white"
          style={{
            padding: 0,
          }}
        >
          <div className="flex justify-between items-center">
            <div>
              {width >= 1024 && (
                <Button
                  type="text"
                  icon={
                    collapsed ? (
                      <MenuUnfoldOutlined className="dark:text-white" />
                    ) : (
                      <MenuFoldOutlined className="dark:text-white" />
                    )
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
              )}
              <div
                className="lg:hidden"
                onClick={() => {
                  handleOpenNavbar();
                }}
              >
                <FaBars
                  size={20}
                  className="ml-5 fill-black dark:fill-white cursor-pointer"
                />
              </div>
              {isNavBar && (
                <div className="fixed inset-0 z-50 lg:hidden">
                  <div
                    className="absolute inset-0 bg-black opacity-50"
                    onClick={handleCloseNavbar}
                  ></div>
                  <div
                    id="navBar"
                    className={`absolute top-0 left-0 w-1/2 md:w-1/3 h-full bg-white text-black dark:bg-slate-800 dark:text-white font-medium md:text-lg sm:text-base text-sm transform transition-transform texmotion-preset-slide-right duration-300 ${
                      isNavBar ? "translate-x-0" : "translate-x-full"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="closeIcon absolute top-4 right-4 hover:bg-slate-50 dark:hover:bg-slate-900 hover:rounded-sm duration-200">
                      <IoMdClose
                        size={20}
                        className="fill-black dark:fill-white"
                        cursor="pointer"
                        onClick={() => {
                          handleCloseNavbar();
                        }}
                      />
                    </div>
                    <div className="p-6 h-full flex flex-col space-y-6 navbar text-center">
                      <Link
                        className="flex justify-center"
                        to={pathDefault.homePage}
                      >
                        <Link to={pathDefault.homePage}>
                          <Icons.logo />
                        </Link>
                      </Link>
                      <NavLink
                        className={({ isActive, isPending }) => {
                          return `p-2 rounded-md inline-block hover:text-sky-800 dark:hover:text-slate-800 hover:bg-pink-200 ${
                            isActive || location.pathname == "/admin"
                              ? "item_active"
                              : ""
                          }`;
                        }}
                        to={pathDefault.dashBoard}
                      >
                        <span>Dashboard</span>
                      </NavLink>
                      <NavLink
                        className={({ isActive, isPending }) => {
                          return `p-2 rounded-md inline-block hover:text-sky-800 dark:hover:text-slate-800 hover:bg-pink-200 ${
                            isActive ? "item_active" : ""
                          }`;
                        }}
                        to={pathDefault.managerUser}
                      >
                        <span>{t("userLink")}</span>
                      </NavLink>
                      <NavLink
                        className={({ isActive, isPending }) => {
                          return `p-2 rounded-md inline-block hover:text-sky-800 dark:hover:text-slate-800 hover:bg-pink-200 ${
                            isActive ? "item_active" : ""
                          }`;
                        }}
                        to={pathDefault.managerLocation}
                      >
                        <span>{t("locationLink")}</span>
                      </NavLink>
                      <NavLink
                        className={({ isActive, isPending }) => {
                          return `p-2 rounded-md inline-block hover:text-sky-800 dark:hover:text-slate-800 hover:bg-pink-200 ${
                            isActive ? "item_active" : ""
                          }`;
                        }}
                        to={pathDefault.managerRoom}
                      >
                        <span>{t("roomLink")}</span>
                      </NavLink>
                      <NavLink
                        className={({ isActive, isPending }) => {
                          return `p-2 rounded-md inline-block hover:text-sky-800 dark:hover:text-slate-800 hover:bg-pink-200 ${
                            isActive ? "item_active" : ""
                          }`;
                        }}
                        to={pathDefault.managerReservation}
                      >
                        <span>{t("bookingLink")}</span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Space size={15} className="mr-4">
              <DropdownNoti
                icon={
                  <IoMdNotificationsOutline
                    color="#969696"
                    className="dark:fill-white md:size-7 size-5"
                  />
                }
              />

              <DropdownNoti
                icon={
                  <IoMdCheckboxOutline
                    color="#969696"
                    className="dark:fill-white md:size-7 size-5"
                  />
                }
              />
              <Select
                style={{ width: 80 }}
                defaultValue={i18n.language}
                options={[
                  {
                    value: "en",
                    label: (
                      <p
                        onClick={(e) => {
                          changeLangue("en");
                        }}
                        className="text-center"
                      >
                        ENG
                      </p>
                    ),
                  },
                  {
                    value: "vi",
                    label: (
                      <p
                        onClick={(e) => {
                          changeLangue("vi");
                        }}
                        className="text-center"
                      >
                        VIE
                      </p>
                    ),
                  },
                ]}
              />
              <Button
                onClick={changeTheme}
                icon={
                  isDarkMode ? (
                    <FaMoon
                      className="md:size-5 size-4"
                      fill="rgb(44, 181, 242)"
                    />
                  ) : (
                    <BsSunFill size={20} fill="#ffd700" />
                  )
                }
                className="flex items-center hover:!bg-transparent bg-transparent border-transparent"
              />
              {user ? (
                <div className="flex items-center space-x-3 font-semibold">
                  {width > 768 && (
                    <p>
                      {t("hello")}, <i>{user.name}</i>
                    </p>
                  )}
                  <Dropdown
                    menu={{
                      items,
                    }}
                    className="flex items-center"
                  >
                    {/* thông tin đăng nhập */}
                    <Link onClick={(e) => e.preventDefault()}>
                      {user.avatar ? (
                        <Avatar
                          className="md:size-10 size-8"
                          src={user.avatar}
                        />
                      ) : (
                        <Avatar
                          className="md:size-10 size-8"
                          style={{ backgroundColor: "#f56a00" }}
                        >
                          <span className="uppercase">{user.name[0]}</span>
                        </Avatar>
                      )}
                    </Link>
                  </Dropdown>
                </div>
              ) : null}
            </Space>
          </div>
        </Header>
        <Content
          className={
            isDarkMode ? "bg-slate-900" : "bg-gray-100"
            // : "bg-gradient-to-tr from-blue-300 via-purple-300 to-pink-400"
          }
          style={{
            margin: "0px",
            padding: 20,
            minHeight: 1000,
          }}
        >
          <Outlet isDarkMode={isDarkMode} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
