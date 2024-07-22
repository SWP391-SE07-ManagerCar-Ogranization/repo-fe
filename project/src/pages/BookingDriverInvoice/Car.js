import React, { useState, useContext, useEffect, useRef } from "react";
import CarType from "../../component/layouts/components/carType";
import tradition2 from "../../assets/images/bg_tradition2.png";
import DriverType from "../../component/layouts/components/driverType";
import { CartContext } from "../../component/ConText/CartContext";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import Driver from "../BookingDriverInvoice/Driver";
import { useNavigate } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import LeafletGeocoder from "../../component/layouts/Map/LeafletGeocoder";
import LeafletRoutingMachine from "../../component/layouts/Map/LeafletRoutingMachine";
import {
  addInvoiceAndTransaction,
  paymentTransaction,
} from "../../service/TransactionService";
import Header from "../../layouts/Header";
import { Popover, Button, Spin } from "antd";
import { toast } from "react-toastify";

const UpdateMapCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

const BookingTraditional = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [currentInput, setCurrentInput] = useState("");

  const [activePage, setActivePage] = useState("carsPage");
  const [pickup, setPickup] = useState("");
  const [end, setEnd] = useState("");
  const currentTime = new Date();
  const formattedTime = currentTime.toISOString().slice(0, 16);
  const [timeCar, setTimeCar] = useState(formattedTime);
  const [isEdit, setIsEdit] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [routeInfo, setRouteInfo] = useState("");
  const [position, setPosition] = useState([16.047079, 108.20623]);
  const mapRef = useRef();
  const routingControlRef = useRef(null);
  const navigate = useNavigate();
  const { theme } = useContext(CartContext);

  const [query, setQuery] = useState("");
  const [location, setLocation] = useState(null);
  const [images, setImages] = useState([]);

  const [popup, setPopup] = useState(false);

  const selectSuggestion = (result) => {
    setPickup((prevState) => ({
      ...prevState,
      [currentInput]: result.label,
    }));
    setSuggestions([]);
  };

  const searchLocation = async () => {
    if (!query) return;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}`;

    try {
      console.log("Fetching location data from URL:", url);
      let response = await fetch(url);
      if (!response.ok) {
        toast.error("Can't Fetching location data");
      }
      let data = await response.json();
      console.log("Received data:", data);

      if (data.length > 0) {
        var firstResult = data[0];
        var lat = firstResult.lat;
        var lon = firstResult.lon;
        setLocation({
          display_name: firstResult.display_name,
          lat: lat,
          lon: lon,
        });

        fetchUnsplashImages(firstResult.display_name.split(",")[0]);
      } else {
        console.log("Location not found");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const fetchUnsplashImages = async (query) => {
    const accessKey = "ZwUHbJbDkzu35eG50ygf_IE8q5x9_va0sSG2jyZh79w";
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      query
    )}&client_id=${accessKey}`;
    console.log("Fetching images from:", url);
    try {
      let response = await fetch(url);
      if (!response.ok) {
        toast.error("cant not fetching image");
      }
      let data = await response.json();
      console.log("Received image data:", data);
      setImages(data.results.map((result) => result.urls.small));
    } catch (error) {
      console.error("Error fetching images:", error);
      setImages([]);
    }
  };

  useEffect(() => {
    return () => {
      if (routingControlRef.current && mapRef.current) {
        mapRef.current.removeControl(routingControlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (pickup) {
      geocodeAddress(pickup, setStartPoint);
    }
  }, [pickup]);

  useEffect(() => {
    if (end) {
      geocodeAddress(end, setEndPoint);
    }
  }, [end]);

  useEffect(() => {
    if (startPoint && endPoint && mapRef.current) {
      if (routingControlRef.current) {
        mapRef.current.removeControl(routingControlRef.current);
      }

      routingControlRef.current = L.Routing.control({
        waypoints: [L.latLng(startPoint), L.latLng(endPoint)],
        lineOptions: {
          styles: [{ color: "red", weight: 4, opacity: 0.7 }],
        },
        routeWhileDragging: false,
        geocoder: L.Control.Geocoder.nominatim(),
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: true,
      })
        .on("routesfound", function (e) {
          const route = e.routes[0];
          handleRouteFound(route.summary);
        })
        .addTo(mapRef.current);
    }
  }, [startPoint, endPoint]);

  const handleRouteFound = (summary) => {
    const distance = (summary.totalDistance / 1000).toFixed(2) + " km";
    const time = (summary.totalTime / 60).toFixed(2) + " minutes";
    setRouteInfo({ Distance: distance, Time: time });
    setRouteInfo({ Distance: distance, Time: time });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setIsEdit(!isEdit);
    searchLocation();
  };

  const geocodeAddress = (address, callback) => {
    const geocoder = L.Control.Geocoder.nominatim();
    geocoder.geocode(address, (results) => {
      if (results.length > 0) {
        const { center } = results[0];
        setPosition([center.lat, center.lng]);
        callback([center.lat, center.lng]);
      } else {
        console.log("Address not found");
      }
    });
  };

  const showPage = (pageId) => {
    setActivePage(pageId);
  };

  const [infoBooking, setInfoBooking] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPopup(!popup);
    const newInvoice = {
      startPoint: pickup,
      endPoint: end,
      timeStart: timeCar,
    };
    try {
      const response = await addInvoiceAndTransaction(
        newInvoice,
        localStorage.getItem("token")
      );
      setInfoBooking(response);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEnd = (e) => {
    setEnd(e.target.value);
    setQuery(e.target.value);
  };
  const handlePayment = async () => {
    try {
      const response = await paymentTransaction(
        infoBooking.userTransaction,
        localStorage.getItem("token")
      );
      toast.success(response);
      console.log(infoBooking);
      navigate(`/feedback-driver/${infoBooking?.accountDriver.accountId}`);
    } catch (error) {
      toast.error("Not enough balance to payment");
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const content = (
    <Spin spinning={isLoading} tip="Loading...">
      <div className="flex flex-col items-center justify-center w-[400px] h-[200px]">
        {infoBooking ? (
          <table className="w-full h-full flex flex-row justify-center items-center">
            <thead>
              <tr className="flex flex-col">
                <th className="py-4 px-5 bg-gray-200 text-left">
                  Name Customer
                </th>
                <th className="py-4 px-5 bg-gray-200 text-left">Name Driver</th>
                <th className="py-4 px-5 bg-gray-200 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="flex flex-col">
                <td className="py-4 px-5 border-b">
                  {infoBooking.nameCustomer}
                </td>
                <td className="py-4 px-5 border-b">{infoBooking.accountDriver.name}</td>
                <td className="py-4 px-5 border-b">
                  {infoBooking.userTransaction.amount}đ
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className="text-center">Loading ...</div>
        )}
        <Button
          className="text-[#FFFFFF] bg-[#FF5F00] mt-2"
          onClick={() => handlePayment()}
        >
          Payment
        </Button>
      </div>
    </Spin>
  );

  return (
    <>
      <Header />
      <div
        className="flex items-center flex-col relative justify-center min-h-screen"
        style={{
          backgroundImage: `url(${tradition2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <div className="flex mt-5 justify-center w-[1150px]">
            <div className="flex flex-col items-center  rounded-[20px] w-[1120px] h-[200px] bg-[#FFFFFF] justify-center">
              <div className="flex flex-row justify-start w-full gap-5 mb-10 ml-[22px]">
                <div
                  className="driverType"
                  onClick={() => showPage("carsPage")}
                >
                  <DriverType
                    text={"Cars"}
                    isSelected={activePage === "carsPage"}
                  />
                </div>
                <div
                  className="driverType"
                  onClick={() => showPage("driverPage")}
                >
                  <DriverType
                    typeDriver="BsFilePerson"
                    text={"Driver"}
                    isSelected={activePage === "driverPage"}
                  />
                </div>
              </div>
              {/* Car start */}
              <div
                id="carsPage"
                className={`page ${
                  activePage === "carsPage" ? "block" : "hidden"
                } flex flex-row gap-3`}
              >
                <div className="flex flex-col ">
                  <label className="font-Roboto font-bold">Pickup</label>
                  <div className="flex flex-row w-[216px] items-center h-[52px] gap-5 rounded-md border-solid border-[#D9D9D9] border-[1px] bg-slate-50 px-[0.75rem]">
                    <input
                      value={pickup}
                      className="rounded-md w-[200px] h-[40px]"
                      id="start-input"
                      placeholder="Enter your pickup address"
                      onChange={(e) => setPickup(e.target.value)}
                      onBlur={(e) => {
                        const address = e.target.value;
                        geocodeAddress(address, setStartPoint);
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="font-Roboto font-bold">Return</label>
                  <div className="flex flex-row w-[216px] items-center h-[52px] gap-5 rounded-md border-solid border-[#D9D9D9] border-[1px] bg-slate-50 px-[0.75rem]">
                    <input
                      className="rounded-md w-[200px] h-[40px] border-[#D9D9D9]"
                      id="end-input"
                      value={query}
                      placeholder="Enter your return address"
                      onChange={handleEnd}
                      onBlur={(e) => {
                        const address = e.target.value;
                        geocodeAddress(address, setEndPoint);
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-10">
                  <div className="flex flex-col">
                    <label className="font-Roboto font-bold">Time</label>
                    <div className="flex flex-col w-[216px] items-center h-[52px] gap-5 rounded-md border-solid border-[#D9D9D9] border-[1px] bg-slate-50 px-[0.75rem]">
                      <input
                        className="rounded-md w-[200px] h-[52px] border-black border-1px"
                        id="party"
                        type="datetime-local"
                        name="partydate"
                        value={timeCar}
                        onChange={(e) => setTimeCar(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <CarType />
                </div>
                <div className="flex mt-[20px] flex-col justify-center">
                  <button
                    className="flex flex-row w-[180px] font-Roboto font-bold rounded-md justify-center items-center h-[52px] bg-[#FF5F00] text-[#FFFFFF]"
                    onClick={handleBooking}
                  >
                    Show Map
                  </button>
                </div>
              </div>
              {/* Car end */}
              <div
                id="driverPage"
                className={` page ${
                  activePage === "driverPage" ? "block" : "hidden"
                }`}
              >
                <Driver />
              </div>
            </div>
          </div>
        </div>

        <div className="h-[207px] mt-[400px] w-full flex flex-col bg-[#FF5F00] text-center tightest">
          <span className="text-[60px] font-Roboto font-black pt-[0.5rem] pb-[1.5rem] leading-[72px] tightest">
            Don't rent a car.
          </span>
          <br />
          <h1 className="font-Roboto font-bold text-3xl ">
            Premium car rental at affordable rates. Worldwide.
          </h1>
        </div>
      </div>
      {isEdit && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-black opacity-50 z-40"></div>
          <div className="relative z-50 flex flex-row justify-center w-[1300px] h-[650px] bg-black bg-opacity-75 rounded-lg">
            <div className="flex flex-col bg-white border-2 border-black p-4 shadow-3d">
              <div className="max-w-70">
                <IoIosCloseCircle
                  onClick={() => setIsEdit(!isEdit)}
                  className="text-red-500 cursor-pointer text-[30px] transition duration-300 transform hover:rotate-90 hover:scale-110 mr-2"
                />
                <div>
                  <p className="text-[#999999] mb-1">
                    Pickup Location: {pickup}
                  </p>
                  <p className="text-[#999999] mb-1">Return Location: {end}</p>
                  <p className="text-[#999999] mb-1">Pick-up date: {timeCar}</p>
                  <p className="text-[#999999] mb-1">
                    Vehicle Type: {theme.selectedOption.label}
                  </p>
                </div>
                <div>
                  {location && (
                    <>
                      <div className="grid grid-cols-3 justify-center">
                        {images.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Image of ${location.display_name}`}
                            className="m-2 w-[100px] h-[80px] object-cover"
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div>
                  <Popover
                    content={content}
                    title="Payment Information"
                    trigger="click"
                  >
                    <button
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs md:text-sm lg:text-base font-medium bg-[#FF5F00] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 transition-all relative text-white border-2 z-10 border-white h-10 px-4 py-2 w-full shadow-3d"
                      type="submit"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Confirm
                    </button>
                  </Popover>
                </div>
              </div>
            </div>
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={false}
              whenCreated={(mapInstance) => {
                mapRef.current = mapInstance;
              }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {startPoint && (
                <>
                  <Marker position={startPoint}>
                    <Popup>Start Point</Popup>
                  </Marker>
                  <UpdateMapCenter position={startPoint} />
                </>
              )}
              {endPoint && (
                <>
                  <Marker position={endPoint}>
                    <Popup>End Point</Popup>
                  </Marker>
                  <UpdateMapCenter position={endPoint} />
                </>
              )}
              <LeafletGeocoder
                setStartPoint={setStartPoint}
                setEndPoint={setEndPoint}
              />
              {startPoint && endPoint && (
                <LeafletRoutingMachine
                  startPoint={startPoint}
                  endPoint={endPoint}
                  onRouteFound={handleRouteFound}
                />
              )}
            </MapContainer>
          </div>
        </div>
      )}
    </>
  );
};

let DefaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default BookingTraditional;

