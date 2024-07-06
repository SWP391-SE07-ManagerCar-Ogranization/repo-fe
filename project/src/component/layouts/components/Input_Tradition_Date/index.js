import React, { useState, useContext, useRef, useEffect } from "react";
import { FaRegCalendar } from "react-icons/fa";
import DropDownDate from "../dropDown/Date";
import DropDownTime from "../dropDown/Time";
import { CartContext } from "../../../ConText/CartContext";

function InputTraditionDate(props) {
  const { label } = props;
  const [isDate, setIsDate] = useState(false);
  const [isTime, setIsTime] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("12:30 PM");

  const { setTheme } = useContext(CartContext);
  useEffect(() => {
    setTheme((prev) => ({ ...prev, selectedDate, selectedTime }));
  }, [selectedDate, selectedTime, setTheme]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const date = new Date();
    const formattedDate = formatDate(date);
    setSelectedDate(formattedDate);
  }, []);

  const formatDate = (date) => {
    const day = date.getDate();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    return `${month} ${day}`;
  };

  const handleOpenDate = () => {
    setIsDate(!isDate);
    setIsTime(false);
  };

  const handleOpenTime = () => {
    setIsTime(!isTime);
    setIsDate(false);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsDate(false);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setIsTime(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDate(false);
      setIsTime(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex flex-col" ref={dropdownRef}>
      <div>
        <label className="font-Roboto font-bold">{label}</label>
        <div className="flex flex-row gap-5 w-[216px] h-[52px] rounded-md bg-slate-50 px-[0.75rem] border-white-700 border-[1px]">
          <button
            type="button"
            className="flex flex-row items-center w-[108px] gap-5"
            onClick={handleOpenDate}
          >
            <FaRegCalendar className="w-[20px] h-[20px]" />
            <div>{selectedDate}</div>
          </button>
          <button type="button" onClick={handleOpenTime}>
            <div className="text-ml">{selectedTime}</div>
          </button>
        </div>
      </div>
      {isDate && <DropDownDate onDateSelect={handleDateSelect} />}
      {isTime && <DropDownTime onTimeSelect={handleTimeSelect} />}
    </div>
  );
}

export default InputTraditionDate;
