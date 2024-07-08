import React from "react";
import ProtectedRoute from "./ProtectedRoutes";
import Booking from "../pages/BookingDriverInvoice/Car";

const BookingRoutes = () => {
  return {
    children: [
      {
        path: "/booking",
        element: (
          <ProtectedRoute roles={["CUSTOMER"]}>
            <Booking />
          </ProtectedRoute>
        ),
      },
    ],
  };
};

export default BookingRoutes;
