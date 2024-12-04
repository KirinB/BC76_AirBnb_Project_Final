import React from "react";
import { Outlet } from "react-router-dom";
import HeaderHomeTemplate from "./components/HeaderHomeTemplate";
import FooterHomeTemplate from "./components/FooterHomeTemplate";

const HomeTemplate = () => {
  return (
    <>
      <HeaderHomeTemplate />
      <main>
        <Outlet />
      </main>
      <FooterHomeTemplate />
    </>
  );
};

export default HomeTemplate;
