import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Layout, Menu, Space, theme } from "antd";
import { AiOutlineClockCircle } from "react-icons/ai";
import { pathDefault } from "../../common/path";
import { MdMyLocation } from "react-icons/md";
import { BiHomeHeart } from "react-icons/bi";
import { TbDeviceDesktopCog } from "react-icons/tb";
import { Icons } from "../../assets/Icons";
import {
  DropdownCustom,
  DropdownNoti,
} from "../../components/ui/dropdown/DropdownCustom";
import { useSelector } from "react-redux";
const AdminTemplate = () => {
  const { user, token } = useSelector((state) => state.userSlice);
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
            <Space size={250} wrap className="mr-4">
              <Badge count={0} showZero className="flex">
                <DropdownNoti />
              </Badge>

              {user ? (
                <div className="flex items-center space-x-3 font-semibold">
                  <p>
                    Xin chào, <i>{user.name}</i>
                  </p>
                  <Avatar size={40} style={{ backgroundColor: "#f56a00" }}>
                    <span className="uppercase">{user.name[0]}</span>
                  </Avatar>
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
