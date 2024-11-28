import React from "react";
import { Outlet } from "react-router-dom";
import HeaderHomeTemplate from "./HomeTemplate/HeaderHomeTemplate";
import FooterHomeTemplate from "./HomeTemplate/FooterHomeTemplate";

const HomeTemplate = () => {
  return (
    <>
      <HeaderHomeTemplate />
      <Outlet />
      <FooterHomeTemplate />
    </>
  );
};

export default HomeTemplate;
