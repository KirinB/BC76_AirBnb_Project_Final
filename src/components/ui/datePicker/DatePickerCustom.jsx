import { DatePicker } from "antd";

export const DatePickerCustom = ({
  id,
  name,
  handleChange,
  value,
  error,
  touched,
  labelContent,
  handleBlur,
  format,
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor="" className="block font-medium text-sm">
        {labelContent}
      </label>
      <DatePicker
        className="w-full"
        id={id}
        name={name}
        format={format}
        onChange={handleChange}
        value={value}
        onBlur={handleBlur}
      />
      {error && touched ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : null}
    </div>
  );
};
