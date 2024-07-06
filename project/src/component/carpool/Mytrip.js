import React, { useEffect, useState, useRef } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import "./listGroupCar/App.css"
import LeafletGeocoder from './map/LeafletGeocoder';
import LeafletRoutingMachine from './map/LeafletRoutingMachine';
import * as TransactionService from './../../service/TransactionService'
import * as PaymentService from './../../service/PaymentService'

import { Modal } from 'antd';

function ListGroupCar() {
  const [groupCars, setGroupCars] = useState([]);
  const { accountId: userId } = useParams();
  const [checkMap, setCheckMap] = useState(false);
  const [groupIdDetail, setGroupIdDetail] = useState(null);
  const [groupCarDetail, setGroupCarDetail] = useState({});
  const [customersDetail, setCustomersDetail] = useState([]);
  const [checkMembers, setCheckMembers] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  const [driverDetail, setDriverDetail] = useState({ name: "Nguyen Duc Thinh", phone: "0703224025" });
  const [accounts, setAccounts] = useState([]);
  const [checkDriverDetail, setCheckDriverDetail] = useState(true);

  // start map
  const UpdateMapCenter = ({ position }) => {
    const map = useMap();
    map.setView(position);
    return null;
  };
  let groupCarData={};
  let DefaultIcon = L.icon({
    iconUrl: "/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
  });
  L.Marker.prototype.options.icon = DefaultIcon;
  
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [routeInfo, setRouteInfo] = useState("");
  const [position, setPosition] = useState([16.047079, 108.20623]); // initial map center
  const mapRef = useRef();
  const [reload, setReload] = useState(false);
  const [distance, setDistance] = useState(0);
  const [resrep, setResrep] = useState({
    startPoint: startPoint,
    endPoint: endPoint,
    timeStart: '',
    accountId: '',
    driverDetailId: '',
    amount: "",
    paymentMethod: '2'
  });
  const handleRouteFound = (summary) => {
    setDistance((summary.totalDistance / 1000).toFixed(2));
    setResrep({ ...resrep, amount: (summary.totalDistance / 1000).toFixed(2)*10000 });
    const time = (summary.totalTime / 60).toFixed(2) + " minutes";
    setRouteInfo(`Distance: ${distance}, time: ${time}`);
  };

  const handleSubmit = async (e) => {
    try {
      await TransactionService.addTrans(resrep);
    } catch (error) {
      console.error( error);
    }
  };
  const handlePayment = async (e) => {
    try {
      await PaymentService.charge(resrep.amount);
    } catch (error) {
      console.error( error);
    }
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
      // Get the map instance from the ref
      const map = mapRef.current;

      // Initialize the routing machine to find the route and update the info
      let routingControl = L.Routing.control({
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
  useEffect(()=>{
    console.log("routeInfo >>>> ",routeInfo)
  },[routeInfo])
  useEffect(() => {
    if (startPoint && endPoint) {
      handleSearchClick();
    }
  }, [startPoint, endPoint]);
  const handleShowMap = (groupCar) => {
    setCheckMap(!checkMap)
    geocodeAddress(groupCar.startPoint, (start) => {
      setStartPoint(start);
      geocodeAddress(groupCar.endPoint, (end) => {
        setEndPoint(end);
      setResrep({ ...resrep, startPoint: start.lat, endPoint: end.lat});

      });
    });
  };
  // end map 
  // start show driverdetail
  const countDown =async (id) => {
    let result;
    try {
      result = await axios.get(`http://localhost:8080/public/getAccountOfDriverDetailByGroupId/${id}`)
      setDriverDetail(result.data);
      const instance = modal.success({  
      
        title: `Name : ${driverDetail.name}`,
        content: `Phone : ${driverDetail.phone}`,
      });  
    } catch (error) {
      alert("The group does not have a driver yet");
    }
    
    
  };
  // end show driverdetail
  useEffect(() => {
    loadGroupCar();
  }, []);

  useEffect(() => {
    if (groupIdDetail !== null) {
      loadGroupCarByGroupId(groupIdDetail);
    }
  }, [groupIdDetail]);

  useEffect(() => {
    if (groupCarDetail.customers) {
      setCustomersDetail(groupCarDetail.customers);
    }
  }, [groupCarDetail.customers]);

  const handleMembers = async (id) => {
    setCheckMembers(!checkMembers);
    const listAccount = await axios.get(`http://localhost:8080/public/getAccountsByGroupId/${id}`)
    setAccounts(listAccount.data);
    // Ensure groupCarDetail is updated
  };

  const loadGroupCar = async () => {
    try {
      // thay 11 bằng userId
      const result = await axios.get(`http://localhost:8080/public/groupCarsByCustomerId/${userId}`);
      setGroupCars(result.data);
    } catch (error) {
      console.error('Error loading group cars:', error);
    }
  };

  const loadGroupCarByGroupId = async (groupId) => {
    try {
      const result = await axios.get(`http://localhost:8080/public/groupCarById/${groupId}`);
      setGroupCarDetail(result.data);
    } catch (error) {
      console.error('Error loading group car by ID:', error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };



  return (
    <div className='flex'>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full sm:w-[90%] md:w-[80%] lg:w-[90%] mx-auto">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
          <div></div>
          <label htmlFor="table-search" className="sr-only">Search</label>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">GroupId</th>
              <th scope="col" className="px-6 py-3">Start Point</th>
              <th scope="col" className="px-6 py-3">End Point</th>
              <th scope="col" className="px-6 py-3">TimeStart</th>
              <th scope="col" className="px-6 py-3">Members</th>
              <th scope="col" className="px-6 py-3">Driver</th>
              <th scope="col" className="px-6 py-3">Capacity</th>
              <th scope="col" className="px-6 py-3">Quantity</th>
              <th scope="col" className="px-6 py-3">Show Map</th>

            </tr>
          </thead>
          <tbody>
            {groupCars.map((groupCar) => (
              <tr key={groupCar.groupId} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{groupCar.groupId}</td>
                <td className="px-6 py-4">{groupCar.startPoint}</td>
                <td className="px-6 py-4">{groupCar.endPoint}</td>
                <td className="px-6 py-4">{formatDate(groupCar.timeStart)}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleMembers(groupCar.groupId)}
                    className="flex flex-row w-[180px] font-Roboto font-bold rounded-md justify-center items-center h-[52px] bg-orange-700 text-white"
                  >
                    Members
                  </button>
                </td>
                <td className="px-6 py-4">
                  <Link
                    onClick={() => countDown(groupCar.groupId)}
                    className="flex flex-row w-[180px] font-Roboto font-bold rounded-md justify-center items-center h-[52px] bg-green-700 text-white"
                  >
                    Driver
                  </Link>
                </td>
                
                <td className="px-6 py-4">{groupCar.capacity}</td>
                <td className="px-6 py-4">{groupCar.customers?.length ?? 0}</td>
                <td className="px-6 py-4">
                      <button
                        className="flex flex-row w-[180px] font-Roboto font-bold rounded-md justify-center items-center h-[52px] bg-pink-500 text-white"
                        onClick={()=>handleShowMap(groupCar)}
                      >
                        Show Map
                      </button>
                    </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* start map */}

      {checkMap && <div className=" flex items-center justify-center z-50 mt-5 mb-5">
      <button onClick={() => setCheckMap(!checkMap)} className="mb-5 p-2 bg-blue-500 text-white rounded"></button>
      
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        ref={mapRef}
        className="w-full h-full md:w-3/4 md:h-3/4 lg:w-1/2 lg:h-1/2 z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div className="absolute top-4 right-4 z-50">
          <IoIosCloseCircle size={30} className="text-red-500 cursor-pointer" />
        </div>
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
    </div>}

      {/* end map */}
      </div>
      
      {checkMembers && <div className="fixed inset-0 flex items-center justify-center z-40 text-center">
        <Card
          title="Members"
          extra={<IoIosCloseCircle onClick={() => setCheckMembers(!checkMembers)} style={{ width: 20, height: 20 }} />}
          style={{ width: 500, maxWidth: '80%', height: 400 }}
        >
          <div className="overflow-auto h-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-600">
              <thead className="bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 w-1/3 text-center">Customer Id</th>
                  <th scope="col" className="px-6 py-3 w-1/3 text-center">Customer Name</th>
                  <th scope="col" className="px-6 py-3 w-1/3 text-center">Phone</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) =>
                (
                  <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4 w-1/3 text-center">{account.accountId}</td>
                    <td className="px-6 py-4 w-1/3 text-center">{account.name}</td>
                    <td className="px-6 py-4 w-1/3 text-center">{account.phone}</td>
                  </tr>
                )


                )}

              </tbody>
            </table>
          </div>
        </Card>
      </div>}
      {/* start card driver */}
      {checkDriverDetail && contextHolder}
    </div>
  );
}

export default ListGroupCar;
