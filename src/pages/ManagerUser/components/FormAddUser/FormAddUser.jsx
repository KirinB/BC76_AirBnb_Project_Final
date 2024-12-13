import React, { useState } from "react";
import { Button, DatePicker } from "antd";

import { useFormik } from "formik";
import {
  InputNormal,
  InputPasswordCustom,
} from "../../../../components/ui/input/InputCustom";
import { SelectCustom } from "../../../../components/ui/select/SelectCustom";
import { RadioCustom } from "../../../../components/ui/radio/RadioCustom";
const FormAddUser = () => {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      id: 0,
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: true,
      role: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const [value, setValue] = useState("");
  return (
    <form action="" onSubmit={handleSubmit} className="space-y-3">
      <InputNormal
        labelContent={"Name"}
        id="name"
        name={"name"}
        placeholder={"Vui lòng nhập tên"}
        value={values.name}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.name}
        touched={touched.name}
      />
      <InputNormal
        labelContent={"Email"}
        id="email"
        name={"email"}
        placeholder={"Vui lòng nhập email"}
        value={values.email}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.email}
        touched={touched.email}
      />
      <InputPasswordCustom
        labelContent={"password"}
        id="password"
        name={"password"}
        placeholder={"Vui lòng nhập password"}
        value={values.password}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.password}
        touched={touched.password}
      />
      <InputNormal
        labelContent={"Phone"}
        id="phone"
        name={"phone"}
        placeholder={"Vui lòng nhập số điện thoại"}
        value={values.phone}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.phone}
        touched={touched.phone}
      />
      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-1">
          <label htmlFor="" className="block font-medium text-sm">
            Birthday
          </label>
          <DatePicker
            className="w-full"
            format={"DD/MM/YYYY"}
            onChange={(date, dateString) => {
              console.log(date, dateString);
            }}
          />
        </div>
        <div className="w-full">
          <SelectCustom
            labelContent={"Gender"}
            options={[
              { label: "Male", value: true },
              { label: "Female", value: false },
            ]}
            handleChange={(value, option) => {
              setFieldValue("gender", value);
            }}
            error={errors.gender}
            touched={touched.gender}
          />
        </div>
      </div>

      <RadioCustom
        labelContent={"ROLE"}
        handleChange={(e) => {
          setFieldValue("role", e.target.value);
        }}
        value={values.role}
      />
      <div className="text-center">
        <Button htmlType="submit" className="p-5">
          Add User
        </Button>
      </div>
    </form>
  );
};

export default FormAddUser;
