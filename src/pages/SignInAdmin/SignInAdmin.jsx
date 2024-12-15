import React, { useContext, useEffect, useState } from "react";
import Lottie from "react-lottie";
import * as animationData from "../../assets/animation/Animation - 1733495021462.json";
import { pathDefault } from "../../common/path";
import { Icons } from "../../assets/Icons";
import { Link, useNavigate } from "react-router-dom";
import {
  InputNormal,
  InputPasswordCustom,
} from "../../components/ui/input/InputCustom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "antd";
import { ButtonIcon } from "../../components/ui/button/ButtonCustom";
import { NotificationContext } from "../../App";
import { authService } from "../../services/auth.service";
import { useDispatch } from "react-redux";
import { handleUpdateUser } from "../../store/slice/user.slice";
const SignInAdmin = () => {
  const { handleNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const { handleSubmit, handleChange, handleBlur, touched, errors, values } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        console.log(values);
        authService
          .signIn(values)
          .then((res) => {
            localStorage.setItem("userInfo", JSON.stringify(res.data.content));
            dispatch(handleUpdateUser(res.data.content));
            handleNotification("success", "Đăng nhập thành công");
            setTimeout(() => {
              navigate(pathDefault.homePage);
            }, 1500);
          })
          .catch((err) => {
            handleNotification("error", err.response.data.content);
          });
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .required("Vui lòng không bỏ trống")
          .email("Vui lòng nhập đúng định dạng email"),
        password: Yup.string().required("Vui lòng không bỏ trống"),
      }),
    });
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: JSON.parse(JSON.stringify(animationData)),
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleOnClick = () => {
    handleNotification("error", "Chức năng chưa được cập nhập");
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user?.token) {
      navigate(pathDefault.admin);
    }
  }, []);
  return (
    <div className="sign_in bg-red-400">
      <div className="container">
        <div className="h-screen grid grid-cols-3 py-10">
          <div className="signin_animation h-full col-span-2 bg-pink-200 flex items-center rounded-s-2xl">
            <Lottie
              options={defaultOptions}
              height={400}
              width={400}
              isStopped={true}
            />
          </div>
          <div className="signin_form h-full col-span-1 p-3 rounded-e-2xl bg-white flex items-center">
            <div className="signIn_content w-full space-y-5">
              <div className="sigin_title">
                <Link to={pathDefault.homePage}>
                  <Icons.logoFull />
                </Link>{" "}
                <h1 className="text-3xl font-bold text-red-400">
                  Welcome Back !
                </h1>
              </div>
              <div className="sigin_form">
                <form
                  action=""
                  onSubmit={handleSubmit}
                  className="w-full space-y-5"
                >
                  <InputNormal
                    labelContent={"Email"}
                    placeholder={"Vui lòng nhập email"}
                    name={"email"}
                    value={values.email}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched.email}
                    error={errors.email}
                  />
                  <InputPasswordCustom
                    labelContent="Password"
                    placeholder="Vui lòng nhập password"
                    name="password"
                    value={values.password}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched.password}
                    error={errors.password}
                  />
                  <div className="font-semibold hover:underline duration-200">
                    <Link>Forgot password ?</Link>
                  </div>
                  <Button
                    htmlType="submit"
                    className="w-full text-2xl bg-red-400 p-8 text-white font-bold mt-5 hover:!bg-red-500 hover:!text-white hover:!border-transparent"
                    variant="filled"
                  >
                    Sign In
                  </Button>
                </form>
              </div>
              <div className="sign_Up text-center">
                <p>
                  Chưa có tài khoản ?{" "}
                  <Link>
                    <span className="text-red-500">Sign Up</span>
                  </Link>
                </p>
                <div className="h-px px-5 w-full bg-gray-200 mt-10 relative">
                  <span className="absolute top-2/4 right-2/4 -translate-y-2/4 translate-x-2/4 bg-white text-sm">
                    Or
                  </span>
                </div>
                <div className="text-center mt-5 space-x-4">
                  <ButtonIcon
                    icon={"/icon/social/google.svg"}
                    onClick={handleOnClick}
                  />
                  <ButtonIcon
                    icon={"/icon/social/github-mark.svg"}
                    className={"bg-slate-200"}
                    onClick={handleOnClick}
                  />
                  <ButtonIcon
                    icon={"/icon/social/icons8-facebook.svg"}
                    onClick={handleOnClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInAdmin;
