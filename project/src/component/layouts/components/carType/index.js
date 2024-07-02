import React, { useState, useContext, useEffect } from "react";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaCar } from "react-icons/fa";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { CartContext } from "../../../ConText/CartContext";

const options = [
  { label: "Motorbike", value: 1, icon: <RiMotorbikeFill /> },
  { label: "4 seater Car", value: 2, icon: <FaCar /> },
  { label: "6 Seater Car", value: 3, icon: <FaCar /> },
];
console.log("skdmklsmslkmxk", options[0].label);
console.log("skdmklsmslkmxk", options[0].value);

const CarType = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  // console.log("selectedOptionselectedOption :", selectedOption);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const { setTheme } = useContext(CartContext);
  const heloo = selectedOption + " helosssso";

  useEffect(() => {
    setTheme((prev) => ({ ...prev, selectedOption, heloo }));
  }, [setTheme, selectedOption, heloo]);

  return (
    <div className="flex flex-col ">
      <label className="font-Roboto  font-bold">Select Type Car</label>
      <div className="relative flex flex-col items-center bg-slate-50 h-[52px] w-[216px]  border-[1px] rounded-md ">
        <button
          className="h-full p-4 w-full flex items-center justify-between font-bold text-2xl rounded-lg tracking-wider active:border-white duration-300 active:text-white"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selectedOption.label}
          {!isOpen ? (
            <AiOutlineCaretDown className="h-8" />
          ) : (
            <AiOutlineCaretUp className="h-8" />
          )}
        </button>
        {isOpen && (
          <div className="bg-white-500 border-vien absolute top-20 flex flex-col items-start rounded-lg p-2 w-full">
            {options.map((op, idx) => (
              <div
                className="flex w-full justify-between hover:bg-blue-300 rounded-r-lg cursor-pointer border-l-transparent hover:border-l-white border-l-4 p-2"
                key={idx}
                onClick={() => handleOptionClick(op)}
              >
                <h3 className="font-bold text-2xl">{op.label}</h3>
                <h3>{op.icon}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarType;