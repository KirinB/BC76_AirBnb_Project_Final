import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import { AiOutlineClockCircle } from "react-icons/ai";
import { pathDefault } from "../../common/path";
import { MdMyLocation } from "react-icons/md";
import { BiHomeHeart } from "react-icons/bi";
import { TbDeviceDesktopCog } from "react-icons/tb";
import { Icons } from "../../assets/Icons";
import {
  DropdownNormal,
  DropdownNoti,
} from "../../components/ui/dropdown/DropdownCustom";
import { useSelector } from "react-redux";
import { IoMdCheckboxOutline, IoMdNotificationsOutline } from "react-icons/io";
const AdminTemplate = () => {
  const { user, token } = useSelector((state) => state.userSlice);
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items = [
    {
      key: "1",
      label: <Link>Thông tin đăng nhập</Link>,
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
      <Sider
        theme="light"
        className="shadow-md shadow-fuchsia-500 rounded-e-2xl bg-white"
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
      >
        <div className="demo-logo-vertical" />
        <div className="my-4 flex justify-center">
          <Link to={pathDefault.homePage}>
            {collapsed ? <Icons.logo fill="#FF385C" /> : <Icons.logoFull />}
          </Link>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <AiOutlineClockCircle />,
              label: (
                <NavLink
                  className={({ isActive }) => {
                    return `px-3 rounded-md inline-block ${
                      isActive || location.pathname === "/admin"
                        ? "item-active"
                        : ""
                    }`;
                  }}
                  to={pathDefault.dashBoard}
                >
                  DashBoard
                </NavLink>
              ),
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: (
                <NavLink
                  className={({ isActive }) => {
                    return `px-3 rounded-md inline-block ${
                      isActive ? "item-active" : ""
                    }`;
                  }}
                  to={pathDefault.managerUser}
                >
                  Manager User
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
                  Manager Location
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
                  Manager Room
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
                  Manager Reservation
                </NavLink>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="flex justify-between">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Space size={30} wrap className="mr-4">
              <DropdownNoti
                icon={<IoMdNotificationsOutline color="#969696" size={25} />}
              />

              <DropdownNoti
                icon={<IoMdCheckboxOutline color="#969696" size={25} />}
              />
              <DropdownNormal
                content={"English"}
                icon={
                  <DownOutlined
                    style={{ fontSize: "13px", marginLeft: "5px" }}
                  />
                }
              />
              {user ? (
                <div className="flex items-center space-x-3 font-semibold">
                  <p>
                    Hello, <i>{user.name}</i>
                  </p>
                  <Dropdown
                    menu={{
                      items,
                    }}
                  >
                    {/* thông tin đăng nhập */}
                    <a onClick={(e) => e.preventDefault()}>
                      <Avatar size={40} style={{ backgroundColor: "#f56a00" }}>
                        <span className="uppercase">{user.name[0]}</span>
                      </Avatar>
                    </a>
                  </Dropdown>
                </div>
              ) : null}
            </Space>
          </div>
        </Header>
        <Content
          style={{
            margin: "0px",
            padding: 30,
            minHeight: 1000,
            background:
              "linear-gradient(66deg, rgba(63,94,251,0.5) 0%, rgba(252,70,107,1) 100%)",
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
