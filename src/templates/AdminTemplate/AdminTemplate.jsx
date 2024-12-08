import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout, Menu, Space, theme } from "antd";
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
const AdminTemplate = () => {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="h-screen">
      <Sider
        theme="dark"
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
          theme="dark"
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
            <Space wrap className="mr-4">
              <DropdownNoti />
              <Avatar />
            </Space>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
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
