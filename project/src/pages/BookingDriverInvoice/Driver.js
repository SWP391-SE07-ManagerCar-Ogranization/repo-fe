import React, { useState, useRef, useContext, useEffect } from "react";
// import "antd/dist/antd.css";
import { CartContext } from "../../component/ConText/CartContext";
import DateTimeDriver from "../../component/layouts/components/dropDown/DateTimeDriver";
import CarType from "../../component/layouts/components/carType";
import { createInvoice } from "../../component/service/InvoiceService";
import { IoIosCloseCircle } from "react-icons/io";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import LeafletGeocoder from "../../component/layouts/Map/LeafletGeocoder";
import LeafletRoutingMachine from "../../component/layouts/Map/LeafletRoutingMachine";
import Swal from "sweetalert2";

const UpdateMapCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

function Driver() {
  const [pickUpDriver, setPickupDriver] = useState("");
  const [returnDriver, setReturnDriver] = useState("");
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const currentTime = new Date();
  const formattedTime = currentTime.toISOString().slice(0, 16);
  const [timeDriver, setTimeDriver] = useState(formattedTime);
  const [routeInfo, setRouteInfo] = useState("");
  const [position, setPosition] = useState([16.047079, 108.20623]);
  const mapRef = useRef();
  const routingControlRef = useRef(null);
  const { theme } = useContext(CartContext);
  const { setTheme } = useContext(CartContext);

  useEffect(() => {
    return () => {
      if (routingControlRef.current && mapRef.current) {
        mapRef.current.removeControl(routingControlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (pickUpDriver) {
      geocodeAddress(pickUpDriver, setStartPoint);
    }
  }, [pickUpDriver]);

  useEffect(() => {
    if (returnDriver) {
      geocodeAddress(returnDriver, setEndPoint);
    }
  }, [returnDriver]);

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

  const handleSummit = async (e) => {
    e.preventDefault();
    const newInvoice = {
      endPoint: returnDriver,
      startPoint: pickUpDriver,
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
      timeStart: theme.timeDriver,
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
      {/* Driver start */}
      <div className=" flex flex-row w-full justify-center items-center gap-5 ">
        <div className="flex flex-col">
          <label className="font-Roboto font-bold">Pickup</label>
          <div className="flex flex-row w-[216px] items-center h-[52px] gap-5 rounded-md border-solid border-white-700 border-[1px] bg-slate-50 px-[0.75rem]">
            <input
              className="rounded-md w-[200px] h-[40px] border-vien"
              id="start-input"
              placeholder="Enter your pickup address"
              onChange={(e) => setPickupDriver(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="font-Roboto font-bold">Return</label>
          <div className="flex flex-row w-[216px] items-center h-[52px] gap-5 rounded-md border-solid border-white-700 border-[1px] bg-slate-50 px-[0.75rem]">
            <input
              className="rounded-md w-[200px] h-[40px] border-vien"
              id="start-input"
              placeholder="Enter your return address car"
              onChange={(e) => setReturnDriver(e.target.value)}
            />
          </div>
        </div>
        <div>
          <DateTimeDriver></DateTimeDriver>
        </div>
        <div>
          <CarType></CarType>
        </div>
        <div className="flex  flex-col justify-center">
          <div className="flex mt-8 flex-col justify-center">
            <button
              className="flex flex-row w-[180px] font-Roboto font-bold rounded-md justify-center items-center h-[52px] bg-orange-300 text-white-500"
              onClick={handleBooking}
            >
              Show Map
            </button>
          </div>
        </div>
      </div>
      {/* Driver end */}
      {isEdit && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-black opacity-50 z-40"></div>
          <div className="relative z-50 flex flex-row justify-center w-[1000px] h-[600px] bg-black bg-opacity-75 rounded-lg">
            <div className="flex flex-col bg-white rounded-2xl border-2 border-black p-6 shadow-3d">
              <IoIosCloseCircle
                onClick={() => setIsEdit(!isEdit)}
                className="text-red-500 cursor-pointer text-[30px] transition duration-300 transform hover:rotate-90 hover:scale-110 mr-2"
              />
              <div>
                <div>
                  <h4 className="text-white text-3xl font-bold mb-2">
                    Invoice
                  </h4>
                  <p className="text-gray-300 mb-1">Pickup: {pickUpDriver}</p>
                  <p className="text-gray-300 mb-1">Return: {returnDriver}</p>
                  <p className="text-gray-300 mb-1">
                    Pick-up date: {theme.timeDriver}
                  </p>
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
}

export default Driver;
