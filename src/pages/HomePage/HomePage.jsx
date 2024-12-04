import React from "react";
import CategoryNavbar from "../../templates/HomeTemplate/components/CategoryNavbar";
import Experience from "./components/Experience";

const HomePage = () => {
  return (
    <>
      <CategoryNavbar />
      <Experience />
      <section className="mb-10"></section>
    </>
  );
};

export default HomePage;
