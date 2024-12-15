import { Select } from "antd";

export const SelectCustom = ({
  labelContent,
  handleChange,
  options,
  mode,
  error,
  touched,
  value,
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor="" className="text-sm font-semibold">
        {labelContent}
      </label>
      <Select
        options={options}
        onChange={handleChange}
        mode={mode && mode}
        className="block"
        placeholder={"Vui lòng chọn giới tính"}
        value={value}
      />
      {error && touched && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
