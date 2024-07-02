import React from "react";
import PropTypes from "prop-types";
import { FaMapMarkerAlt } from "react-icons/fa";

function Input_Tradition(props) {
  const { label, placeholder, setPickup, setEnd } = props;

  const handleChange = (e) => {
    const value = e.target.value;
    if (setPickup) {
      setPickup(value);
    } else if (setEnd) {
      setEnd(value);
    }
  };

  return (
    <div>
      <label className="font-Roboto font-bold">{label}</label>
      <div className="mr-5 flex flex-row w-[216px] items-center h-[52px] gap-5 rounded-md border-solid border-white-700 border-[1px] bg-slate-50 px-[0.75rem]">
        <FaMapMarkerAlt className="w-[20px] h-[20px]" />
        <input
          id="start-input"
          className="rounded-md w-[200px] h-[40px] border-vien"
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

Input_Tradition.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  setPickup: PropTypes.func,
  setEnd: PropTypes.func,
};

export default Input_Tradition;