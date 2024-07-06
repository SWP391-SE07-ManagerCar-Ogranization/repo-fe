// import React, { useState, useRef, useContext, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet-control-geocoder/dist/Control.Geocoder.css";
// import "leaflet-control-geocoder/dist/Control.Geocoder.js";
// import L from "leaflet";
// import { CartContext } from "../../ConText/CartContext";
// import LeafletGeocoder from "./LeafletGeocoder";
// import LeafletRoutingMachine from "./LeafletRoutingMachine";
// import { useLocation } from "react-router-dom";

// const UpdateMapCenter = ({ position }) => {
//   const map = useMap();
//   map.setView(position, map.getZoom());
//   return null;
// };

// function MapBox() {
//   const [startPoint, setStartPoint] = useState(null);
//   const [endPoint, setEndPoint] = useState(null);
//   const [routeInfo, setRouteInfo] = useState("");
//   const [position, setPosition] = useState([16.047079, 108.20623]); // initial map center
//   const mapRef = useRef();
//   const routingControlRef = useRef(null);

//   const { theme } = useContext(CartContext);
//   const location = useLocation();
//   const { pickup, end } = location.state || {};

//   useEffect(() => {
//     const map = mapRef.current;

//     return () => {
//       if (routingControlRef.current) {
//         map.removeControl(routingControlRef.current);
//       }
//     };
//   }, [mapRef]);

//   useEffect(() => {
//     if (pickup) {
//       geocodeAddress(pickup, setStartPoint);
//     }
//   }, [pickup]);

//   useEffect(() => {
//     if (end) {
//       geocodeAddress(end, setEndPoint);
//     }
//   }, [end]);

//   useEffect(() => {
//     if (startPoint && endPoint) {
//       const map = mapRef.current;

//       if (routingControlRef.current) {
//         map.removeControl(routingControlRef.current);
//       }

//       routingControlRef.current = L.Routing.control({
//         waypoints: [L.latLng(startPoint), L.latLng(endPoint)],
//         lineOptions: {
//           styles: [{ color: "red", weight: 4, opacity: 0.7 }],
//         },
//         routeWhileDragging: false,
//         geocoder: L.Control.Geocoder.nominatim(),
//         addWaypoints: false,
//         draggableWaypoints: false,
//         fitSelectedRoutes: true,
//         showAlternatives: true,
//       })
//         .on("routesfound", function (e) {
//           const route = e.routes[0];
//           handleRouteFound(route.summary);
//         })
//         .addTo(map);
//     }
//   }, [startPoint, endPoint]); // Automatically trigger the search when startPoint and endPoint are set

//   const handleRouteFound = (summary) => {
//     const distance = (summary.totalDistance / 1000).toFixed(2) + " km";
//     const time = (summary.totalTime / 60).toFixed(2) + " minutes";
//     setRouteInfo(`Distance: ${distance}, Time: ${time}`);
//   };

//   const geocodeAddress = (address, callback) => {
//     const geocoder = L.Control.Geocoder.nominatim();
//     geocoder.geocode(address, (results) => {
//       if (results.length > 0) {
//         const { center } = results[0];
//         setPosition([center.lat, center.lng]); // Update map center
//         callback([center.lat, center.lng]);
//       } else {
//         alert("Address not found");
//       }
//     });
//   };

//   return (
//     <div className="App">
//       <h1>{routeInfo}</h1>

//       <MapContainer
//         center={position}
//         zoom={13}
//         scrollWheelZoom={false}
//         ref={mapRef}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         {startPoint && (
//           <>
//             <Marker position={startPoint}>
//               <Popup>Start Point</Popup>
//             </Marker>
//             <UpdateMapCenter position={startPoint} />
//           </>
//         )}
//         {endPoint && (
//           <>
//             <Marker position={endPoint}>
//               <Popup>End Point</Popup>
//             </Marker>
//             <UpdateMapCenter position={endPoint} />
//           </>
//         )}
//         <LeafletGeocoder
//           setStartPoint={setStartPoint}
//           setEndPoint={setEndPoint}
//         />
//         <LeafletRoutingMachine
//           startPoint={startPoint}
//           endPoint={endPoint}
//           onRouteFound={handleRouteFound}
//         />
//       </MapContainer>
//     </div>
//   );
// }

// let DefaultIcon = L.icon({
//   iconUrl: "/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [10, 41],
//   popupAnchor: [2, -40],
// });
// L.Marker.prototype.options.icon = DefaultIcon;

// export default MapBox;
