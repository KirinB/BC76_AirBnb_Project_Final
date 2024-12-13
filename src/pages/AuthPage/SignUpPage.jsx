import React, { useState } from "react";
import {
  FacebookOutlined,
  GooglePlusOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import InputCustom from "../../components/ui/inputCustom/InputCustom";
import { ButtonOutLine } from "../../components/ui/button/ButtonCustom";
import { useFormik } from "formik";
import * as yup from "yup";
import { authService } from "../../services/auth.service";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";

const SignUpPage = () => {
  const styleIcon =
    "text-xl rounded-full border-2 p-2 hover:cursor-pointer shadow-xl";
  return (
    <div
      className={`absolute h-full w-full flex flex-col justify-center items-center text-center z-[5] opacity-100 bg-white duration-700 overflow-hidden ${
        handle ? "z-[5] opacity-100" : ""
      }`}
    >
      <div className="w-full p-10 space-y-3">
        <h2 className="font-bold text-3xl">Create Account</h2>
        <div className="space-x-5">
          <FacebookOutlined className={styleIcon} />
          <GooglePlusOutlined className={styleIcon} />
          <TwitterOutlined className={styleIcon} />
        </div>
        <p className="text-gray-500 font-medium">or register an account</p>
        <form>
          <div>
            <InputCustom placeholder="Name" />
            <p className="text-red-500 text-sm text-left mt-1 mb-3"></p>
          </div>
          <div>
            <InputCustom placeholder="Email" />
            <p className="text-red-500 text-sm text-left mt-1 mb-3"></p>
          </div>
          <div>
            <InputCustom type="password" placeholder="Password" />
            <p className="text-red-500 text-sm text-left mt-1 mb-3"></p>
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-14 py-4 rounded-full w-full mt-3"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
