import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { CartContext } from "../../ConText/CartContext";
import PayMentMethod from "../../layouts/components/payMentMethod";
import { createInvoice } from "../../service/InvoiceService";
import { IoIosCloseCircle } from "react-icons/io";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import LeafletGeocoder from "./LeafletGeocoder";
import LeafletRoutingMachine from "./LeafletRoutingMachine";
import Swal from "sweetalert2";
import Logo from "../../../assets/icons/logo.svg";

const UpdateMapCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};
function MapBoxMap(props) {
  const {
    setIsEdit,
    isEdit,
    startPoint,
    setStartPoint,
    endPoint,
    setEndPoint,
  } = props;
  const { theme } = useContext(CartContext);
  const [selectedPayType, setSelectedPayType] = useState(null);

  const [routeInfo, setRouteInfo] = useState("");
  const [position, setPosition] = useState([16.047079, 108.20623]);
  const mapRef = useRef();

  const handleRouteFound = (summary) => {
    const distance = (summary.totalDistance / 1000).toFixed(2) + " km";
    const time = (summary.totalTime / 60).toFixed(2) + " minutes";
    setRouteInfo(`Distance: ${distance}, Time: ${time}`);
  };

  const geocodeAddress = (address, callback) => {
    const geocoder = L.Control.Geocoder.nominatim();
    geocoder.geocode(address, (results) => {
      if (results.length > 0) {
        const { center } = results[0];
        setPosition([center.lat, center.lng]); // Update map center
        callback(center);
      } else {
        alert("Address not found");
      }
    });
  };
  const handleSearchClick = () => {
    if (startPoint && endPoint) {
      const map = mapRef.current;

      const routingControl = L.Routing.control({
        waypoints: [L.latLng(startPoint), L.latLng(endPoint)],
        lineOptions: {
          styles: [
            {
              color: "red",
              weight: 4,
              opacity: 0.7,
            },
          ],
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
        .addTo(map);
    } else {
      alert("Please enter both start and end addresses.");
    }
  };

  const handlePayTypeChange = (value) => {
    setSelectedPayType(value);
  };

  const handleSummit = async (e) => {
    e.preventDefault();
    const newInvoice = {
      endPoint: theme.end,
      startPoint: theme.pickup,
      driverType: {
        driverTypeId: theme.selectedCarType.value,
        driverTypeName: theme.selectedCarType.label,
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
    };
    console.log("newInvoice:", newInvoice);

    try {
      const data = await createInvoice(newInvoice);
      console.log("data:", data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-black opacity-50 z-40"></div>
      <div className="relative z-50 flex flex-row justify-center w-[1000px] h-[600px] bg-black bg-opacity-75 rounded-lg">
        <div className="flex flex-col items-center justify-center w-[400px] h-full bg-gray-500 bg-opacity-75 rounded-lg">
          <div className="flex mb-[20px] w-[300px]  h-[30px] items-center justify-between p-2">
            <IoIosCloseCircle
              onClick={() => setIsEdit(!isEdit)}
              className="text-green-400 cursor-pointer text-[30px]"
            />
            <img src={Logo} alt="Company Logo" />
          </div>
          <h2 className="text-white">{routeInfo}</h2>
          <div className="text-white text-2xl">Pickup: {theme.pickup}</div>
          <div className="text-white text-2xl">End: {theme.end}</div>
          <div className="text-white text-2xl mb-4">
            Pick-up date: {theme.selectedDate}
          </div>
          <div className="text-white text-2xl mb-4">
            Select item: {theme.selectedTime}
          </div>
          <div className="text-white text-2xl mb-4">
            Selected Car Type: {theme.selectedCarType.label}
          </div>
          <div>
            <PayMentMethod onChange={handlePayTypeChange} />
          </div>
          <button
            onClick={() =>
              Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`,
              }).then((result) => {
                if (result.isConfirmed) {
                  handleSummit();
                  Swal.fire("Saved!", "", "success");
                } else if (result.isDenied) {
                  Swal.fire("Changes are not saved", "", "info");
                }
              })
            }
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
          >
            Submit
          </button>
        </div>

        <div className="flex flex-col w-[800px] h-[300px] ">
          <div className="App">
            <MapContainer
              center={position}
              zoom={12}
              scrollWheelZoom={false}
              ref={mapRef}
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

              <LeafletRoutingMachine
                startPoint={startPoint}
                endPoint={endPoint}
                onRouteFound={handleRouteFound}
              />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapBoxMap;
