import React from "react";
import { DropdownCustom } from "../../../components/ui/dropdown/DropdownCustom";
import { ButtonOutLine } from "../../../components/ui/button/ButtonCustom";
import { Icons } from "../../../assets/Icons";
const FilterSearch = () => {
  return (
    <div className="shadow-sm relative lg:sticky lg:top-24 hidden md:flex bg-white items-center py-4 lg:z-10">
      <div className="container flex space-x-4">
        <div className="border-r pr-4 border-gray-200 flex flex-wrap gap-2">
          <DropdownCustom icon={true}>Giá</DropdownCustom>
          <DropdownCustom icon={true}>Thời gian trong ngày</DropdownCustom>
          <DropdownCustom icon={true}>Ngôn ngữ có thể sử dụng</DropdownCustom>
        </div>
        <div className="flex flex-wrap gap-2">
          <ButtonOutLine className={"text-base !py-5"} roundedfull={true}>
            Nghệ thuật và văn hóa
          </ButtonOutLine>
          <ButtonOutLine className={"text-base !py-5"} roundedfull={true}>
            Giải trí
          </ButtonOutLine>
          <ButtonOutLine className={"text-base !py-5"} roundedfull={true}>
            Thức ăn và đồ uống
          </ButtonOutLine>
          <ButtonOutLine className={"text-base !py-5"} roundedfull={true}>
            Thể thao
          </ButtonOutLine>
          <ButtonOutLine className={"text-base !py-5"} roundedfull={true}>
            Tour
          </ButtonOutLine>
          <ButtonOutLine className={"text-base !py-5"} roundedfull={true}>
            Tham quan
          </ButtonOutLine>
          <ButtonOutLine className={"text-base !py-5"} roundedfull={true}>
            <Icons.filter />
            Bộ lọc
          </ButtonOutLine>
        </div>
      </div>
    </div>
  );
};

export default FilterSearch;
