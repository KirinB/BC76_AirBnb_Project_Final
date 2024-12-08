import { Input } from "antd";
import React from "react";

export const InputNormal = ({
  type = "text",
  className,
  labelContent,
  placeholder,
  handleChange,
  handleBlur,
  name,
  id = "",
  value,
  error,
  touched,
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="font-medium text-sm">
        {labelContent}
      </label>
      <Input
        name={name}
        id={id}
        type={type}
        value={value}
        className={`${className}`}
        placeholder={placeholder}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      {touched && error ? (
        <p className="text-red-500 mt-1 text-sm">{error}</p>
      ) : null}
    </div>
  );
};
export const InputPasswordCustom = ({
  labelContent,
  placeholder,
  handleChange,
  handleBlur,
  name,
  id = "",
  value,
  error,
  touched,
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="font-medium text-sm">
        {labelContent}
      </label>
      <Input.Password
        value={value}
        name={name}
        id={id}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {touched && error ? (
        <p className="text-red-500 mt-1 text-sm">{error}</p>
      ) : null}
    </div>
  );
};
