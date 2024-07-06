import React from "react";
import { FaCar } from "react-icons/fa";
import { BsFilePerson } from "react-icons/bs";

function DriverType({ typeDriver, text, isSelected }) {
  const borderStyle = isSelected ? "border-2 border-orange-500" : "";

  return (
    <div
      className={`flex flex-row items-center justify-center gap-1 h-[30px] w-[70px] text-white rounded-[30px] bg-black cursor-pointer ${borderStyle}`}
    >
      {typeDriver === "BsFilePerson" ? (
        <BsFilePerson className="text-[#FFFFFF] h-[20px] w-[17px]" />
      ) : (
        <FaCar className="text-[#FFFFFF] h-[20px] w-[15px]" />
      )}
      <h3 className="text-[#FFFFFF] text-[17px] font-light">{text}</h3>
    </div>
  );
}

export default DriverType;
