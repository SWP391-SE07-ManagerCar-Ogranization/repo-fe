import React from "react";
import Dashboard from "../layouts/dashboard";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";


const AdminRoutes = () => {
  return {
    children: [
     
      {
        path: "/dashboard/*",
        element: (
          <ProtectedRoute roles={["ADMIN"]}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/",
        element: (
          <ProtectedRoute roles={["ADMIN"]}>
            <Navigate to="/dashboard/home" replace />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: (
          <ProtectedRoute roles={["ADMIN"]}>
            <Navigate to="/dashboard/home" replace />
          </ProtectedRoute>
        ),
      },
    ],
  };
};

export default AdminRoutes;
