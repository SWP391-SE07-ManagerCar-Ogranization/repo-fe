import React from "react";
import ProtectedRoute from "./ProtectedRoutes";
import WorkingPage from "../component/driver/WorkingPage";
import TrackRevenuePage from "../component/driver/TrackRevenuePage";

const DriverRoutes = () => {
  return {
    children: [
      {
        path: "/working-page",
        element: (
          <ProtectedRoute roles={["DRIVER"]}>
            <WorkingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/track-revenue",
        element: (
          <ProtectedRoute roles={["DRIVER"]}>
            <TrackRevenuePage />
          </ProtectedRoute>
        ),
      },
    ],
  };
};

export default DriverRoutes;
