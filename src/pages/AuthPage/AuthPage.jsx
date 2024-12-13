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
import SignUpPage from "./SignUpPage";

const AuthPage = () => {
  const [handle, setHandle] = useState(false);

  const navigate = useNavigate();

  const styleIcon =
    "text-xl rounded-full border-2 p-2 hover:cursor-pointer shadow-xl";

  const toggleForm = () => {
    setHandle(!handle);
  };

  // handle sign in
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        authService
          .signIn(values)
          .then((res) => {
            const token = res.data.content.token;
            localStorage.setItem("token", token);
            alert("Đăng nhập thành công!");
            navigate(pathDefault.homePage);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      // validationSchema
      validationSchema: yup.object({
        email: yup
          .string()
          .email("Vui lòng nhập đúng định dạng Email")
          .required("Vui lòng không bỏ trống"),
        password: yup.string().required("Vui lòng không bỏ trống"),
      }),
    });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-3/5 flex h-[650px] shadow-2xl rounded-xl overflow-hidden">
        <div
          className={`relative flex h-full w-1/2 translate-x-0 duration-700 bg-white z-[1] overflow-hidden ${
            handle ? "translate-x-full" : ""
          }`}
        >
          <div
            className={`absolute h-full w-full flex flex-col justify-center items-center text-center opacity-100 duration-700 z-10 bg-white overflow-hidden ${
              handle ? "z-[1] opacity-0" : ""
            }`}
          >
            <div className="space-y-3 w-full p-10">
              <h2 className="font-bold text-3xl">Sign in</h2>
              <div className="space-x-5">
                <FacebookOutlined className={styleIcon} />
                <GooglePlusOutlined className={styleIcon} />
                <TwitterOutlined className={styleIcon} />
              </div>
              <p className="text-gray-500 font-medium">
                or register an account
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-7">
                  <Input
                    onChange={handleChange}
                    className="py-3"
                    onBlur={handleBlur}
                    name="email"
                    value={values.email}
                    placeholder="Email"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-sm mt-1 text-left">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="py-3"
                    name="password"
                    value={values.password}
                    type="password"
                    placeholder="Password"
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-sm mt-1 text-left">
                      {errors.password}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white px-14 py-4 rounded-full w-full mt-3"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
          <SignUpPage />
        </div>
        <div
          className={`flex h-full w-1/2 duration-700 translate-x-0 bg-primary z-[5] opacity-100 overflow-hidden ${
            handle ? "!-translate-x-full" : ""
          }`}
        >
          <div
            className={`h-full min-w-full flex flex-col justify-center items-center text-center duration-700 opacity-100 ${
              handle ? "opacity-0 -ml-[100%]" : ""
            }`}
          >
            <div className="bg-primary lg:flex hidden justify-center items-center flex-col p-20 space-y-5 text-white">
              <h2 className="font-bold text-3xl ">Welcome Back!</h2>
              <p>Email your personal details and start journey with us</p>
              <button
                type="text"
                onClick={toggleForm}
                className="bg-primary text-white px-14 py-4 rounded-full w-full border border-white font-bold"
              >
                Sign In
              </button>
            </div>
          </div>
          <div
            className={`h-full min-w-full flex flex-col justify-center items-center text-center duration-700 opacity-100 ${
              handle ? "ml-0" : ""
            }`}
          >
            <div className="bg-primary lg:flex hidden justify-center items-center flex-col p-20 space-y-5 text-white">
              <h2 className="font-bold text-3xl ">Hello, Friend!</h2>
              <p>Email your personal details and start journey with us</p>
              <button
                type="text"
                onClick={toggleForm}
                className="bg-primary text-white px-14 py-4 rounded-full w-full border border-white font-bold"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
