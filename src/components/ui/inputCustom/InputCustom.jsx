import { Input } from "antd";
import React from "react";

const InputCustom = ({
  type = "text",
  placeholder,
  handleChange,
  handleBlur,
  name,
  value,
}) => {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      className="py-3"
      onChange={handleChange}
      onBlur={handleBlur}
      name={name}
      value={value}
    />
  );
};

export default InputCustom;
