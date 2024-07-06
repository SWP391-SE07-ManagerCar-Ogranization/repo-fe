import React, { useState } from "react";
import Select from "react-dropdown-select";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaCar } from "react-icons/fa";

function PayMentMethod({ onChange }) {
  const [payMentType, setPayMentType] = useState([]);
  const options = [
    { label: "Cash", value: 1, icon: <RiMotorbikeFill /> },
    { label: "Wallet", value: 2, icon: <FaCar /> },
  ];

  const customItemRenderer = ({ item, methods }) => (
    <div
      onClick={() => {
        methods.addItem(item);
        onChange(item.value);
      }}
      className="flex items-center cursor-pointer p-2 gap-5 "
    >
      <span className="mr-2 text-white-500 ">{item.icon}</span>
      {item.label}
    </div>
  );
  return (
    <div className="w-[199px] border-white-700 border-solid">
      <label className="font-Roboto font-bold text-white-500">
        Select PayMent Method
      </label>
      <Select
        options={options}
        labelField="label"
        valueField="value"
        onChange={(values) => {
          setPayMentType(values);
          onChange(values[0].value);
        }}
        className="w-[199px] h-[30px] rounded-md text-bold flex text-center font-Roboto font-semibold"
        itemRenderer={customItemRenderer}
      />
    </div>
  );
}

export default PayMentMethod;
