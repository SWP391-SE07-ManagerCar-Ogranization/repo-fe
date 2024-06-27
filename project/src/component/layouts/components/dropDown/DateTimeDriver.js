import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../../../ConText/CartContext";

const DateTimeDriver = () => {
  const currentTime = new Date();
  const formattedTime = currentTime.toISOString().slice(0, 16);
  const [timeDriver, setTimeDriver] = useState(formattedTime);
  console.log("dateDriver:", timeDriver);
  const { theme } = useContext(CartContext);
  const { setTheme } = useContext(CartContext);
  useEffect(() => {
    setTheme((prev) => ({ ...prev, timeDriver }));
  }, [setTheme, timeDriver]);

  return (
    <div className="flex flex-col">
      <label className="font-Roboto font-bold">Time</label>
      <div className=" flex flex-col w-[216px] items-center h-[52px] gap-5 rounded-md border-solid border-white-700 border-[1px] bg-slate-50 px-[0.75rem]">
        <input
          className="rounded-md w-[200px] h-[52px] border-black border-1px"
          id="party"
          type="datetime-local"
          name="partydate"
          value={timeDriver}
          onChange={(e) => setTimeDriver(e.target.value)}
        />
      </div>
    </div>
  );
};

export default DateTimeDriver;
