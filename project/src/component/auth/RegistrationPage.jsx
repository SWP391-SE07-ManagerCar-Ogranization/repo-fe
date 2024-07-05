import React, { useEffect, useState } from "react";
import * as UserService from "../../service/UserService";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import firebase from "../../config/firebase.config.js";
import { Button, Input, Select, Option } from "@material-tailwind/react";
import { toast } from "react-toastify";

function RegistrationPage() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    roleName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (event) => {
    setFormData({ ...formData, roleName: event });
  };

  const setupRecapcha = () => {
    window.recapchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        defaultCountry: "VN",
      }
    );
  };

  const sendOtp = async () => {
    const appVerifier = window.recapchaVerifier;
    await firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setFormData({ ...formData, phone: phoneNumber });
        toast.success("Sent OTP successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to send OTP");
      });
  };

  const handleVerifyOTP = async () => {
    try {
      await window.confirmationResult.confirm(otp);
      handleSubmit();
    } catch (error) {
      console.log(error);
      toast.error("Failed to verify");
    }
  };

  const handleSubmit = async (e) => {
    try {
      const token = localStorage.getItem("token");
      console.log(formData);
      await UserService.register(formData, token);
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        roleName: "",
      });
      toast.success("User registered successfully");
      navigate("/");
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("An error occurred while registering user");
    }
  };

  useEffect(() => {
    setupRecapcha();
  }, []);

  return (
    <section className="bg-gradient-to-r from-red-50 via-red-200 to-red-400 h-screen">
      <div className="px-0 py-10 mx-auto max-w-7xl sm:px-4">
        <div className="w-full px-4 pt-5 pb-6 mx-auto mt-8 mb-6 rounded-none shadow-xl sm:rounded-lg sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 sm:px-6 text-center">
          <h1 className="mb-4 text-lg font-semibold text-center text-gray-600">
            Registration
          </h1>
          <div className="auth-container">
            {error && <p className="error-message">{error}</p>}
            <div className="mx-8">
              <PhoneInput
                country={"vn"}
                value={phoneNumber}
                onChange={(phone) => setPhoneNumber("+" + phone)}
              />
            </div>
            <div id="sign-in-button"></div>
            <br></br>
            <Button onClick={sendOtp}>
              <span>Send code</span>
            </Button>
            <br></br>
            <br></br>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              label="name"
              required
            />
            <br></br>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              label="Email"
              required
            />
            <br></br>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              label="password"
              required
            />
            <br></br>
            <Select label="Role" name="roleName" onChange={handleRoleChange}>
              <Option value="CUSTOMER">Customer</Option>
              <Option value="DRIVER">Driver</Option>
            </Select>
            <br></br>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              inputStyle={{ width: "100%", height: "50px" }}
            />
            <br></br>

            <Button fullWidth onClick={handleVerifyOTP}>
              Register
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegistrationPage;
