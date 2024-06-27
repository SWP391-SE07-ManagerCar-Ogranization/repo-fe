import React from "react";
import { FaCar } from "react-icons/fa";
import { BsFilePerson } from "react-icons/bs";

function DriverType({ typeDriver, text, isSelected }) {
  const borderStyle = isSelected ? "border-2 border-orange-500" : "";

  return (
    <div
      className={`flex flex-row items-center justify-center gap-3 h-[30px] w-[70px] rounded-[30px] bg-black cursor-pointer ${borderStyle}`}
    >
      {typeDriver === "BsFilePerson" ? (
        <BsFilePerson className="text-white-500 h-[16px] w-[16px]" />
      ) : (
        <FaCar className="text-white-500 h-[16px] w-[16px]" />
      )}
      <h3 className="text-white-500 text-xl font-light">{text}</h3>
    </div>
  );
}

export default DriverType;
