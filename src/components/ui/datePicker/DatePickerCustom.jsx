import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CalendarOutlined } from "@ant-design/icons";
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
  disabledDate,
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor="" className="block font-medium text-sm">
        {labelContent}
      </label>
      <DatePicker
        suffixIcon={<CalendarOutlined className="dark:text-white" size={20} />}
        allowClear={false}
        disabledDate={disabledDate}
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
