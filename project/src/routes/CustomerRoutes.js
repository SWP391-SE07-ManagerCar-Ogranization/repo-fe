import React from "react";
import ProtectedRoute from "./ProtectedRoutes";
import UpdateProfile from "../component/userspage/UpdateProfile";
import ProfilePage from "../component/userspage/ProfilePage";
import HomeCarPool from "../component/carpool/HomeCarpool/Home";
import WalletPage from "../component/userspage/WalletPage";
import TradePointPage from "../component/userspage/TradePointPage";
import SystemCharge from "../component/payment/SystemCharge";
import SearchGroupCar from "../component/carpool/searchGroupCar/SearchGroupCar";
import Mytrip from "../component/carpool/mytrip/Mytrip";
import ListGroupCar from "../component/carpool/listGroupCar/ListGroupCar";
import Success from "../layouts/payment/Success";
import BookingTraditional from "../pages/BookingDriverInvoice/Car";
import ViewTripBooking from "../pages/BookingDriverInvoice/ViewTripBooking";
import ChatRoom from "../component/ChatRoom";
import Rooms from "../component/ChatRoom/Rooms";
import ChatRoomPage from "../component/driver/ChatRoomPage";
import FeedbackDriver from "../pages/Customer/feedbackDriver";

const CustomerRoutes = () => {
  return {
    children: [
      {
        path: "/feedback-driver/:invoiceId",
        element: (
          <ProtectedRoute roles={["CUSTOMER"]}>
            <FeedbackDriver />
          </ProtectedRoute>
        ),
      },
      {
        path: "/room",
        element: (
          <ProtectedRoute roles={["CUSTOMER"]}>
            <Rooms />
          </ProtectedRoute>
        ),
      },
      {
        path: "/triplist",
        element: (
          <ProtectedRoute roles={["CUSTOMER"]}>
            <Rooms />
          </ProtectedRoute>
        ),
      },
      {
        path: "/driverchat",
        element: (
          <ProtectedRoute roles={["CUSTOMER"]}>
            <ChatRoomPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/room/chatroom/*",
        element: (
          <ProtectedRoute roles={["CUSTOMER"]}>
            <ChatRoom />
          </ProtectedRoute>
        ),
      },
      {
        path: "/update-user/:userId",
        element: (
          <ProtectedRoute roles={["CUSTOMER", "DRIVER"]}>
            <UpdateProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute roles={["CUSTOMER", "DRIVER"]}>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/home-car-pool",
        element: (
          <ProtectedRoute roles={["CUSTOMER"]}>
            <HomeCarPool />
          </ProtectedRoute>
        ),
      },
      {
        path: "/wallet/your-wallet",
        element: (
          <ProtectedRoute roles={["CUSTOMER", "DRIVER"]}>
            <WalletPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/point/trade-point",
        element: (
          <ProtectedRoute roles={["CUSTOMER"]}>
            <TradePointPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/wallet/add-money-to-balance",
        element: (
          <ProtectedRoute roles={["CUSTOMER"]}>
            <SystemCharge />
          </ProtectedRoute>
        ),
      },
      {
        path: "/payment/result/success",
        element: (
          <ProtectedRoute roles={["CUSTOMER"]}>
            <Success />
          </ProtectedRoute>
        ),
      },
      {
        path: "/searchGroupCar/:groupCarAndUserString",
        element: (
          <ProtectedRoute roles={["CUSTOMER"]}>
            <SearchGroupCar />
          </ProtectedRoute>
        ),
      },
      {
        path: "/mytrip/:accountId",
        element: (
          <ProtectedRoute roles={["CUSTOMER"]}>
            <Mytrip />
          </ProtectedRoute>
        ),
      },
      {
        path: "/listGroupCar/:userString",
        element: (
          <ProtectedRoute roles={["CUSTOMER"]}>
            <ListGroupCar />
          </ProtectedRoute>
        ),
      },
      {
        path: "/booking-driver",
        element: (
          <ProtectedRoute roles={["CUSTOMER"]}>
            <BookingTraditional />
          </ProtectedRoute>
        ),
      },
      {
        path: "/view-trip",
        element: (
          <ProtectedRoute roles={["CUSTOMER"]}>
            <ViewTripBooking />
          </ProtectedRoute>
        ),
      },
    ],
  };
};

export default CustomerRoutes;
