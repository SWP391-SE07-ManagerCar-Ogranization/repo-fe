import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./component/layouts/Header";
import Footer from "./component/layouts/Footer";
import MapBox from "./component/layouts/Map/MapBox";
import BookingDriverInvoice from "./pages/BookingDriverInvoice/Car";

import { Route, Routes } from "react-router";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<BookingDriverInvoice></BookingDriverInvoice>}
        />
      </Routes>
    </div>
  );
}

export default App;
