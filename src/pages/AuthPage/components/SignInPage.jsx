import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { pathDefault } from "../../../common/path";
import { Input } from "antd";
import { authService } from "../../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGooglePlusG, FaTwitter } from "react-icons/fa";
import { Icons } from "../../../assets/Icons";
import InputCustom from "../../../components/ui/inputCustom/InputCustom";

const SignInPage = ({ styleIcon, handle }) => {
  const navigate = useNavigate();
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
    <div
      className={`absolute h-full w-full flex flex-col justify-center items-center text-center opacity-100 duration-700 z-10 bg-white overflow-hidden ${
        handle ? "z-[1] opacity-0" : ""
      }`}
    >
      <div className="!text-left">
        <Link to={pathDefault.homePage}>
          <Icons.logoFull fill="#FF385C" />
        </Link>
      </div>
      <div className="space-y-3 w-full p-10">
        <h2 className="font-bold text-3xl">Sign in</h2>
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
        <form onSubmit={handleSubmit}>
          {/* <div className="mb-7">
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
          </div> */}
          <div className="mb-7">
            <InputCustom
              name={"email"}
              handleBlur={handleBlur}
              value={values.email}
              placeholder={"Email"}
              handleChange={handleChange}
              error={errors.email}
              touched={touched.email}
            />
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
  );
};

export default SignInPage;
