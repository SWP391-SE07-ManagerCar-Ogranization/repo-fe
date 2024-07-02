import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import LoginPage from "../component/auth/LoginPage";
import Logout from "../component/auth/Logout";
import HomePage from "../component/home/HomePage";
import ForgotPass from "../component/auth/ForgotPass";
import UpdatePass from "../component/auth/UpdatePass";
import Page404 from "../layouts/404";
import RegistrationPage from "../component/auth/RegistrationPage";
import AdminRoutes from "./AdminRoutes";
import DriverRoutes from "./DriverRoutes";
import CustomerRoutes from "./CustomerRoutes";

import BookingTraditionnel from "../pages/BookingDriverInvoice/Car";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPass />,
  },
  {
    path: "/update-password",
    element: <UpdatePass />,
  },
  {
    path: "/registration",
    element: <RegistrationPage />,
  },
  {
    path: "/*",
    element: <Navigate to="/404-not-found" replace />,
  },
  {
    path: "/404-not-found",
    element: <Page404 />,
  },
  AdminRoutes(),
  DriverRoutes(),
  CustomerRoutes(),
]);

export default appRoutes;
