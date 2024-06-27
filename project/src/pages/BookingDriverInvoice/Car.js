import React, { useState, useContext, useEffect, useRef } from "react";
import images from "../../assets/icons/logo.svg";
import { BsPersonCircle } from "react-icons/bs";
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
import Swal from "sweetalert2";
import { createInvoice } from "../../component/service/InvoiceService";

const UpdateMapCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

const BookingTraditionnel = () => {
  const [activePage, setActivePage] = useState("carsPage");
  const [pickup, setPickup] = useState("");
  const [end, setEnd] = useState("");
  const currentTime = new Date();
  const formattedTime = currentTime.toISOString().slice(0, 16);
  const [timeCar, setTimeCar] = useState(formattedTime);
  const [selectedCarType, setSelectedCarType] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [routeInfo, setRouteInfo] = useState("");
  const [position, setPosition] = useState([16.047079, 108.20623]);
  const mapRef = useRef();
  const routingControlRef = useRef(null);
  const navigate = useNavigate();
  const { theme } = useContext(CartContext);

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
    setRouteInfo(`Distance: ${distance}, Time: ${time}`);
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setIsEdit(!isEdit);
  };

  const geocodeAddress = (address, callback) => {
    const geocoder = L.Control.Geocoder.nominatim();
    geocoder.geocode(address, (results) => {
      if (results.length > 0) {
        const { center } = results[0];
        setPosition([center.lat, center.lng]);
        callback([center.lat, center.lng]);
      } else {
        alert("Address not found");
      }
    });
  };

  const showPage = (pageId) => {
    setActivePage(pageId);
  };

  const handleSummit = async (e) => {
    e.preventDefault();
    const newInvoice = {
      endPoint: end,
      startPoint: pickup,
      driverType: {
        driverTypeId: 1,
        driverTypeName: "motobile",
      },
      account: {
        accountId: 7,
      },
      driverDetail: {
        id: 4,
        driverLicence: "LIC12345",
        vehicleNumber: "MOTOR123",
        rating: 4.5,
        workingStatus: false,
      },
      amount: 20000,
      paymentMethod: {
        paymentMethodId: 1,
        methodName: "Cash",
      },
      timeStart: timeCar,
    };
    try {
      const data = await createInvoice(newInvoice);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        className="flex items-center flex-col relative justify-center min-h-screen"
        style={{
          backgroundImage: `url(${tradition2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full flex justify-center bg-orange-300">
          <p className="font-Roboto font-bold text-xl">
            111 years of SIXT. 111 years of tradition.
          </p>
        </div>
        <div>
          <div className="ml-5">
            <div className="flex flex-row w-[1120px] justify-between  items-center">
              <div className="">
                <img src={images} width={"102px"} alt="logo" className=""></img>
              </div>
              <div className="flex flex-row justify-end gap-4 items-center  w-[200px]">
                <h2 className="font-Roboto font-bold">Đào Bá Anh Quân</h2>
                <BsPersonCircle className="text-3xl " />
              </div>
            </div>
          </div>
          <div className="flex justify-center w-[1150px]">
            <div className="flex flex-col items-center  rounded-[20px] w-[1120px] h-[200px] bg-white-500 justify-center">
              <div className="flex flex-row justify-start w-full gap-5 mb-8 ml-[22px]">
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
                } flex flex-row gap-5`}
              >
                <div className="flex flex-col">
                  <label className="font-Roboto font-bold">Pickup</label>
                  <div className="flex flex-row w-[216px] items-center h-[52px] gap-5 rounded-md border-solid border-white-700 border-[1px] bg-slate-50 px-[0.75rem]">
                    <input
                      className="rounded-md w-[200px] h-[40px] border-vien"
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
                  <div className="flex flex-row w-[216px] items-center h-[52px] gap-5 rounded-md border-solid border-white-700 border-[1px] bg-slate-50 px-[0.75rem]">
                    <input
                      className="rounded-md w-[200px] h-[40px] border-vien"
                      id="end-input"
                      placeholder="Enter your return address"
                      onChange={(e) => setEnd(e.target.value)}
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
                    <div className="flex flex-col w-[216px] items-center h-[52px] gap-5 rounded-md border-solid border-white-700 border-[1px] bg-slate-50 px-[0.75rem]">
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
                <div className="flex mt-8 flex-col justify-center">
                  <button
                    className="flex flex-row w-[180px] font-Roboto font-bold rounded-md justify-center items-center h-[52px] bg-orange-300 text-white-500"
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

        <div className="h-[307px] mt-[400px] w-full flex flex-col bg-orange-300 text-center tightest">
          <span className="text-[72px] font-Roboto font-black pt-[1.5rem] pb-[1.5rem] leading-[72px] tightest">
            Don't rent a car.
          </span>
          <br />
          <span className="text-[72px] font-Roboto font-black leading-[72px] tightest">
            Rent THE Car.
          </span>
          <h1 className="font-Roboto font-bold text-3xl">
            Premium car rental at affordable rates. Worldwide.
          </h1>
        </div>
      </div>
      {isEdit && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-black opacity-50 z-40"></div>
          <div className="relative z-50 flex flex-row justify-center w-[1000px] h-[600px] bg-black bg-opacity-75 rounded-lg">
            <div className="flex flex-col bg-white rounded-2xl border-2 border-black p-6 shadow-3d sm:gap-10 sm:p-8 md:gap-12 md:p-10 lg:gap-16 lg:p-14">
              <IoIosCloseCircle
                onClick={() => setIsEdit(!isEdit)}
                className="text-red-500 cursor-pointer text-[30px] transition duration-300 transform hover:rotate-90 hover:scale-110 mr-2"
              />
              <div>
                <div>
                  <h4 className="text-white text-3xl font-bold mb-2">
                    Invoice
                  </h4>
                  <p className="text-gray-300 mb-1">Pickup: {pickup}</p>
                  <p className="text-gray-300 mb-1">Return: {end}</p>
                  <p className="text-gray-300 mb-1">Pick-up date: {timeCar}</p>
                  <p className="text-gray-300 mb-1">
                    Select type car: {theme.selectedOption.label}
                  </p>
                </div>
                <div>
                  <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs md:text-sm lg:text-base font-medium bg-orange-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 transition-all relative text-black border-2 z-10 border-black h-10 px-4 py-2 w-full shadow-3d"
                    type="submit"
                    onClick={(e) => handleSummit(e)}
                  >
                    Xác nhận
                  </button>
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

export default BookingTraditionnel;
