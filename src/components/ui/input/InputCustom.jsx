import { Form, Input, InputNumber } from "antd";
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
  readOnly = false,
  disabled = false,
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
        readOnly={readOnly}
        disabled={disabled}
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
  readOnly = false,
  disabled = false,
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
        disabled={disabled}
      />
      {touched && error ? (
        <p className="text-red-500 mt-1 text-sm">{error}</p>
      ) : null}
    </div>
  );
};
export const InputNumberCustom = ({
  labelContent,
  placeholder,
  className,
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
      <InputNumber
        value={value}
        className={`${className} block w-full`}
        name={name}
        id={id}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={placeholder}
        min={0}
      />
      {touched && error ? (
        <p className="text-red-500 mt-1 text-sm">{error}</p>
      ) : null}
    </div>
  );
};
// export const InputForm = ({
//   labelContent,
//   name,
//   className = "",
//   rules,
//   placeholder,
//   value,
// }) => {
//   return (
//     <Form.Item
//       label={labelContent}
//       name={name}
//       id={name}
//       className={`${className} !mb-2`}
//       rules={rules}
//     >
//       <Input placeholder={placeholder} />
//     </Form.Item>
//   );
// };
