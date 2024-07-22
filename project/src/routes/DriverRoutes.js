import React from "react";
import ProtectedRoute from "./ProtectedRoutes";
import WorkingPage from "../component/driver/WorkingPage";
import TrackRevenuePage from "../component/driver/TrackRevenuePage";
import GroupWorkingPage from "../component/driver/GroupWorkingPage";
import DriverProfilePage from "../component/driver/DriverProfilePage";

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
        path: "/group-working-page",
        element: (
          <ProtectedRoute roles={["DRIVER"]}>
            <GroupWorkingPage />
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
      {
        path: "/driver-profile",
        element: (
          <ProtectedRoute roles={["DRIVER"]}>
            <DriverProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  };
};

export default DriverRoutes;
