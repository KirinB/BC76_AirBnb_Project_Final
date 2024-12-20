import { Dropdown } from "antd";
import { useState } from "react";

import { DownOutlined } from "@ant-design/icons";

export const DropdownCustom = ({
  items = [{ label: "The function is not working yet" }],
  children,
  icon = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenChange = (flag) => {
    setIsOpen(flag);
  };
  return (
    <Dropdown
      menu={{ items: items }}
      trigger={["click"]}
      open={isOpen}
      onOpenChange={handleOpenChange}
      className="border border-gray-200 !rounded-full"
      {...props}
    >
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={`text-[#222222] capitalize py-2 px-4 hover:bg-gray-100 rounded-md`}
      >
        {children}
        <span className="ml-2">
          <DownOutlined
            className={`${
              isOpen ? "rotate-180" : "rotate-0"
            } transition-all duration-300 text-xs text-[#222222]`}
          />
        </span>
      </button>
    </Dropdown>
  );
};
