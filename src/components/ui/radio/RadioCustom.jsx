import { Radio } from "antd";
import { useState } from "react";

export const RadioCustom = ({ labelContent, handleChange, value }) => {
  return (
    <div className="space-y-1 block">
      <label htmlFor="" className="block text-sm font-semibold">
        {labelContent}
      </label>
      <Radio.Group onChange={handleChange} value={value}>
        <Radio value="USER">USER</Radio>
        <Radio value="ADMIN">ADMIN</Radio>
      </Radio.Group>
    </div>
  );
};
