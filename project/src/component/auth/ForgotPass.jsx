import React, { useState, useEffect } from "react";
import * as PhoneService from "../../service/PhoneService";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button, Input } from "@material-tailwind/react";

function ForgotPass() {
  const [otp, setOtp] = useState("");
  const [formSent, setFormSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");

  const sendOTP = async (e) => {
    e.preventDefault();
    try {
      await PhoneService.sendSMS(phoneNumber);
      setFormSent(true);
    } catch (e) {
      setError("Can't find number !");
      console.log(e);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const userData = await PhoneService.verifyOTP(phoneNumber, otp);
      console.log(userData);
      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
        navigate("/update-password");
      } else {
        setError(userData.message);
        console.log(userData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [formSent, error]);
  return (
    <section className="bg-gradient-to-r from-red-50 via-red-200 to-red-400 h-screen">
      <div className="px-0 py-10 mx-auto max-w-7xl sm:px-4">
        <div className=" text-center w-full px-4 pt-5 pb-6 mx-auto mt-8 mb-6 rounded-none shadow-xl sm:rounded-lg sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 sm:px-6">
          <h1 className="mb-4 text-lg font-semibold text-center text-gray-600">
            Forgot Password
          </h1>
          <div className="mb-8 space-y-4">
          {error && <p className="font-semibold mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>}
            {!formSent ? (
              <div>
                <PhoneInput
                  country={"vn"}
                  value={phoneNumber}
                  onChange={(phone) => setPhoneNumber("+" + phone)}
                  
                />
                  <br></br>
                <Button size="sm" type="primary" onClick={sendOTP}>
                  <span>Send code</span>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleVerifyOTP}>
                <div className="relative flex max-w-[24rem] w-full mx-auto">
                  <Input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    label="OTP"
                    className="pr-20"
                    containerProps={{
                      className: "min-w-0",
                    }}
                  />
                  <Button
                    size="sm"
                    color={otp ? "gray" : "blue-gray"}
                    disabled={!otp}
                    type="submit"
                    className="!absolute right-1 top-1 rounded"
                  >
                    Verify
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPass;
