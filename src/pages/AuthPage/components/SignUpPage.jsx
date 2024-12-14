import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { authService } from "../../../services/auth.service";
import { Input } from "antd";
import { FaFacebookF, FaGooglePlusG, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Icons } from "../../../assets/Icons";
import { pathDefault } from "../../../common/path";

const SignUpPage = ({ styleIcon, handle }) => {
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        authService
          .signUp(values)
          .then((res) => {
            alert("Đăng ký thành công");
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      },
      validationSchema: yup.object({
        name: yup.string().required("Vui lòng không bỏ trống"),
        email: yup
          .string()
          .email("Vui lòng nhập đúng định dạng Email")
          .required("Vui lòng không bỏ trống"),
        password: yup.string().required("Vui lòng không bỏ trống"),
      }),
    });

  return (
    <div
      className={`absolute h-full w-full flex flex-col justify-center items-center text-center z-[5] opacity-100 bg-white duration-700 overflow-hidden ${
        handle ? "z-[5] opacity-100" : ""
      }`}
    >
      <div>
        <Link to={pathDefault.homePage}>
          <Icons.logoFull fill="#FF385C" />
        </Link>
      </div>
      <div className="w-full p-10 space-y-3">
        <h2 className="font-bold text-3xl">Create Account</h2>
        <div className="space-x-5 flex text-2xl justify-center">
          <div className={styleIcon}>
            <FaFacebookF />
          </div>
          <div className={styleIcon}>
            <FaGooglePlusG />
          </div>
          <div className={styleIcon}>
            <FaTwitter />
          </div>
        </div>
        <p className="text-gray-500 font-medium">or register an account</p>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <Input
              placeholder="Name"
              name="name"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              className="py-3 "
            />
            {errors.name && touched.name && (
              <p className="text-red-500 text-sm mt-1 mb-3 text-left">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder="Email"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              className="py-3 "
            />
            {errors.email && touched.email && (
              <p className="text-red-500 text-sm mt-1 mb-3 text-left">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <Input
              type="password"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              className="py-3 "
              placeholder="Password"
            />
            {errors.password && touched.password && (
              <p className="text-red-500 text-sm mt-1 mb-3 text-left">
                {errors.password}
              </p>
            )}
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
