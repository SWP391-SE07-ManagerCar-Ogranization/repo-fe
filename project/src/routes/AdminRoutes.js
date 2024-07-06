import React from "react";
import FeedbackDriver from "../pages/Customer/feedbackDriver";
import Dashboard from "../layouts/dashboard";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import ChatRoom from "../component/ChatRoom"
import Rooms from "../component/ChatRoom/Rooms";

const AdminRoutes = () => {
  return {
    children: [
      {
        path: "/feedback-driver",
        element: (
          <ProtectedRoute roles={["ADMIN"]}>
            <FeedbackDriver />
          </ProtectedRoute>
        ),
      },
      {
        path: "/room",
        element: (
          <ProtectedRoute roles={["ADMIN"]}>
            <Rooms />
          </ProtectedRoute>
        )
      },
      {
        path: "/room/chatroom/*",
        element: (
          <ProtectedRoute roles={["ADMIN"]}>
           <ChatRoom/>
          </ProtectedRoute>
        )
      },
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
