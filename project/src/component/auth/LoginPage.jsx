import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { SignupValidation } from "../../config/SignupValidation";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import * as UserService from "../../service/UserService";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/icon/logo.svg";
import bgImage from "../../assets/image/img-login-form.png";
import { toast } from "react-toastify";

function LoginPage() {
  const [error, setError] = useState("");
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const initValues = {
    email: "",
    password: "",
  };
  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, [navigate, token]);
  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initValues,
    validationSchema: SignupValidation,
    onSubmit: async (values) => {
      const userData = await UserService.login(values.email, values.password);
      console.log(userData);
      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role.roleName);
        toast.success("Login Sucessfully !");
        if('ADMIN' === (userData.role.roleName)) {
          navigate('/dashboard');
        }
        else {
          navigate("/");
        }
      } else {
        setError(userData.message);
      }
    },
  });

  const handleSubmitGoogle = async (formData) => {
    try {
      const userData = await UserService.loginGoogle(formData);
      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role.roleName);
        toast.success("Login Sucessfully !");
        navigate("/");
      } else {
        setError(userData.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const onSuccessGoogle = async (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    console.log(credentialResponseDecoded);
    const newFormData = {
      name: credentialResponseDecoded.name,
      email: credentialResponseDecoded.email,
      image: credentialResponseDecoded.picture,
    };
    handleSubmitGoogle(newFormData);
  };

  return (
    <section className="relative h-screen w-full">
      <div
        className="absolute inset-0 bg-right bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})`}}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-red-50 via-red-200 to-red-400"/>
      <div className="px-0 py-10 mx-auto max-w-7xl sm:px-4 z-10 relative">
        <div className="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 sm:px-6 text-gray-400">
          <img src={logo} alt="logo" className="mx-auto" />
        </div>
        <div className="w-full px-4 pt-5 pb-6 mx-0 mt-8 mb-6 rounded-none shadow-xl sm:rounded-lg sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 sm:px-6">
          <h1 className="mb-4 text-lg font-semibold text-center text-gray-600">
            Login into your account
          </h1>

          <form className="mb-8 space-y-4" onSubmit={handleSubmit}>
            <label
              htmlFor="email"
              className="mb-1 text-xs font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              autoComplete="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.email && (
              <small className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.email}
              </small>
            )}
            <br></br>
            <label
              htmlFor="password"
              className="mb-1 text-xs font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              autoComplete="current-password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.password && <small>{errors.password}</small>}
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500 text-center font-semibold">
                {error}
              </p>
            )}
            <button
              className="bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full text-white"
              type="submit"
            >
              Login
            </button>
          </form>

          <div className="space-y-8">
            <div
              className="text-center border-b border-gray-400"
              style={{ lineHeight: "0px" }}
            >
              <span
                className="p-2 text-xs font-semibold tracking-wide text-orange-600 uppercase bg-red-100 rounded-lg"
                style={{ lineHeight: "0px" }}
              >
                Or
              </span>
            </div>
            <div className="grid gap-4 justify-items-center">
              <GoogleLogin
                onSuccess={onSuccessGoogle}
                onError={() => {
                  console.log("Login Failed");
                }}
                useOneTap
                shape="pill"
              />
            </div>
          </div>
        </div>
        <p className="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 sm:px-6 text-gray-400 flex justify-between">
          <Link
            to={"/registration"}
            className="text-orange-500 hover:underline dark:text-primary-500 font-semibold "
          >
            Create an account
          </Link>
          -
          <Link
            to={"/forgot-password"}
            className="text-orange-500 hover:underline dark:text-primary-500 font-semibold "
          >
            Forgot password ?
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
