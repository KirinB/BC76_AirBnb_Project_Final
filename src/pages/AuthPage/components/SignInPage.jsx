import { useFormik } from "formik";
import React from "react";
import { FaFacebookF, FaGooglePlusG, FaTwitter } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Icons } from "../../../assets/Icons";
import { pathDefault } from "../../../common/path";
import InputCustom from "../../../components/ui/inputCustom/InputCustom";
import { authService } from "../../../services/auth.service";
import { handleUpdateUser } from "../../../store/slice/user.slice";

const SignInPage = ({ styleIcon, handle }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

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
            dispatch(handleUpdateUser(res.data.content.user));
            localStorage.setItem("userInfo", JSON.stringify(res.data.content));
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
            <FaFacebookF fill="#FF385C" />
          </div>
          <div className={styleIcon}>
            <FaGooglePlusG fill="#FF385C" />
          </div>
          <div className={styleIcon}>
            <FaTwitter fill="#FF385C" />
          </div>
        </div>
        <p className="text-gray-500 font-medium">or register an account</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-7">
            <InputCustom
              handleChange={handleChange}
              handleBlur={handleBlur}
              className="py-3"
              name="email"
              value={values.email}
              placeholder="Email"
              error={errors.email}
              touched={touched.email}
            />
          </div>
          <div>
            <InputCustom
              handleChange={handleChange}
              handleBlur={handleBlur}
              className="py-3"
              name="password"
              value={values.password}
              type="password"
              placeholder="Password"
              error={errors.password}
              touched={touched.password}
            />
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
