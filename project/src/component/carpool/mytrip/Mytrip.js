import React, { useEffect, useState, useRef, useContext } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import "../listGroupCar/App.css";
import LeafletGeocoder from "../map/LeafletGeocoder";
import LeafletRoutingMachine from "../map/LeafletRoutingMachine";

import { Modal } from "antd";
import { toast } from "react-toastify";
import { getAccountDriverByGroupCarJoin } from "../../../service/DriverService";
import { getUserTransactionByCustomerAndGroupCar, paymentTransaction } from "../../../service/TransactionService";
import { ChatRoomContext } from "../../../context/ChatRoomContext"
import ChatRoom from '../../ChatRoom';
import  Header  from 'antd/es/layout/layout';
function ListGroupCar() {
  const [groupCars, setGroupCars] = useState([]);
  const { accountId: userId } = useParams();
  const [checkMap, setCheckMap] = useState(false);
  const [groupIdDetail, setGroupIdDetail] = useState(null);
  const [groupCarDetail, setGroupCarDetail] = useState({});
  const [customersDetail, setCustomersDetail] = useState([]);
  const [checkMembers, setCheckMembers] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  const [driverDetail, setDriverDetail] = useState({ name: "", phone: "" });
  const [accounts, setAccounts] = useState([]);
  const [checkDriverDetail, setCheckDriverDetail] = useState(true);
  const [transaction, setTransaction] = useState({
    transactionId: "",
    amount: "",
    nameDriver: "",
  });
  const {theme, setTheme} = useContext(ChatRoomContext)
  const [displayChatRoom, setDisplayChatRoom] = useState(null)
  const [hideMapButtonVisible, setHideMapButtonVisible] = useState(false)
  useEffect(()=> {
      setTheme((prev)=> ({
          ...prev,
          groupCars,
          setGroupCars,
          displayChatRoom,
          setDisplayChatRoom
      })
      )
  }, [setTheme, groupCars, setGroupCars, displayChatRoom, setDisplayChatRoom])

  // start map
  const toggleMapVisibility = () => {
    setCheckMap(!checkMap);
    setHideMapButtonVisible(false);
    if (checkMap) {
      // Xóa các marker và reset route khi đóng bản đồ
      resetMap();
    }
  };
  const resetMap = () => {
    // Reset các thông tin đường đi và điểm
    setStartPoint(null);
    setEndPoint(null);
    setPosition([16.047079, 108.20623]); // Reset vị trí ban đầu của bản đồ
    setRouteInfo("");

    // Xóa routing control nếu nó tồn tại
    const map = mapRef.current?.leafletElement;
    if (map && map.routingControl) {
      map.removeControl(map.routingControl);
      map.routingControl = null;
    }
  };
  const UpdateMapCenter = ({ position }) => {
    const map = useMap();
    map.setView(position);
    return null;
  };
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
  const [distance, setDistance] = useState(0);
  const [resrep, setResrep] = useState({
    startPoint: startPoint,
    endPoint: endPoint,
    timeStart: "",
    accountId: "",
    driverDetailId: "",
    amount: "",
    paymentMethod: "2",
  });
  const handleRouteFound = (summary) => {
    setDistance((summary.totalDistance / 1000).toFixed(2));
    setResrep({
      ...resrep,
      amount: (summary.totalDistance / 1000).toFixed(2) * 10000,
    });
    const time = (summary.totalTime / 60).toFixed(2) + " minutes";
    setRouteInfo(`Distance: ${distance}, time: ${time}`);
  };



  const geocodeAddress = (address, callback) => {
    const geocoder = L.Control.Geocoder.nominatim();
    geocoder.geocode(address, (results) => {
      if (results.length > 0) {
        const { center } = results[0];
        setPosition([center.lat, center.lng]); // Update map center
        callback(center);
      } else {
        toast.error("Address not found");
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
      toast.error("Please enter both start and end addresses.");
    }
  };
  useEffect(() => {
    console.log("routeInfo >>>> ", routeInfo)
  }, [routeInfo])
  useEffect(() => {
    if (startPoint && endPoint) {
      handleSearchClick();
    }
  }, [startPoint, endPoint]);
  const handleShowMap = (groupCar) => {
    setCheckMap(!checkMap);
    setHideMapButtonVisible(false);
    geocodeAddress(groupCar.startPoint, (start) => {
      setStartPoint(start);
      geocodeAddress(groupCar.endPoint, (end) => {
        setEndPoint(end);
        setResrep({ ...resrep, startPoint: start.lat, endPoint: end.lat });
      });
    });
    setTimeout(()=>{
      setHideMapButtonVisible(true)
    }, 5000)
  };


  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async() => {
    try {
      const response = await paymentTransaction(transaction, localStorage.getItem('token'));
      toast.success(response);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePayment = (groupCar) => {
    try {
      showModal();
      loadTransactionByCustomerAndGroupCar(groupCar);
      // toast.success("Pay success");
    } catch (error) {
      toast.error("Payment Error");
    }
  };
  const countDown = async (id) => {
    try {
      const result = await axios.get(`http://3.24.136.21/public/getAccountOfDriverDetailByGroupId/${id}`);
      setDriverDetail(result.data);
      modal.success({
        title: `Name : ${result.data.name}`,
        content: `Phone : ${result.data.phone}`,
      });
    } catch (error) {
      toast.error("The group does not have a driver yet");
    }
  };
  // end show driverdetail
  useEffect(() => {
    loadGroupCar();
  }, [displayChatRoom, setDisplayChatRoom]);

  useEffect(() => {
    console.log(groupIdDetail);
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
    const listAccount = await axios.get(
      `http://3.24.136.21/public/getAccountsByGroupId/${id}`
    );
    setAccounts(listAccount.data);
    // Ensure groupCarDetail is updated
  };

  const loadGroupCar = async () => {
    try {
      const result = await axios.get(
        `http://3.24.136.21/public/groupCarsByCustomerId/${userId}`
      );
      
      const groupCarsWithDriverDetail = await Promise.all(result.data.map(async (groupCar) => {
        try {
          const driverDetail = await getAccountDriverByGroupCarJoin(groupCar.groupId);
          return { ...groupCar, hasDriver: !!driverDetail };
        } catch (error) {
          return { ...groupCar, hasDriver: false };
        }
      }));
  
      setGroupCars(groupCarsWithDriverDetail);
    } catch (error) {
      console.error("Error loading group cars:", error);
    }
  };

  const loadGroupCarByGroupId = async (groupId) => {
    try {
      const result = await axios.get(
        `http://3.24.136.21/public/groupCarById/${groupId}`
      );
      setGroupCarDetail(result.data);
    } catch (error) {
      console.error("Error loading group car by ID:", error);
    }
  };

  const loadTransactionByCustomerAndGroupCar = async (groupCar) => {
    try {
      console.log("Geroup Car: " + groupCar);
      const response = await getUserTransactionByCustomerAndGroupCar(
        localStorage.getItem("token"),
        groupCar.groupId
      );
      setTransaction({
        transactionId: response.userTransaction.transactionId,
        amount: response.userTransaction.amount,
        nameDriver: response.nameDriver,
      });
      console.log(response);
    } catch (error) {
      toast.error("Can't load transaction");
    }
  };

  //CHATROOM HANDLE
  const handleShowChatRoom = (group) => {
    console.log("add chat room"+group);
    const {
      groupId,
      startPoint,
      endPoint,
    } = group

    const newGroup = {
      groupCarId: groupId,
      customerId: userId,
      driverDetailId: 3,
      groupName: `GroupCar-${groupId}`,
      startPoint: startPoint,
      endPoint: endPoint,

    }
    console.log("HHHHH",newGroup);
    setCheckMap(false)
    setDisplayChatRoom(newGroup)
  }

  //CHATROOM END

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
      <div className="flex">             
        <div className="overflow-x-auto shadow-md sm:rounded-lg w-full sm:w-[90%] md:w-[80%] lg:w-[95%] mx-auto">
          <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
            <div></div>
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  GroupId
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Point
                </th>
                <th scope="col" className="px-6 py-3">
                  End Point
                </th>
                <th scope="col" className="px-6 py-3">
                  TimeStart
                </th>
                <th scope="col" className="px-6 py-3">
                  Members
                </th>
                <th scope="col" className="px-6 py-3">
                  Driver
                </th>
                <th scope="col" className="px-6 py-3">
                  Capacity
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Show Map
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment
                </th>
                <th scope="col" className="px-6 py-3">ChatBox</th>
              </tr>
            </thead>
            <tbody>
              {groupCars.map((groupCar) => (
                <tr
                  key={groupCar.groupId}
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
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
                      <td className="px-6 py-4">
                    {checkDriverDetail ? (
                      <button
                      className={`flex flex-row w-[180px] font-Roboto font-bold rounded-md justify-center items-center h-[52px] ${groupCar.hasDriver ? 'bg-pink-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'}`}
                        onClick={() => handlePayment(groupCar)}
                        disabled={!groupCar.hasDriver}
                      >
                        Pay
                      </button>
                    ) : (
                      <button
                        className="flex flex-row w-[180px] font-Roboto font-bold rounded-md justify-center items-center h-[52px] bg-pink-500 text-white"
                        onClick={() => handlePayment(groupCar)}
                        disabled
                      >
                        Pay
                      </button>
                    )}
                    <Modal
                      title="Payment"
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                    >
                      <p>Amount: {transaction.amount}</p>
                      <p>Name Driver: {transaction.nameDriver}</p>
                    </Modal>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="flex flex-row w-[180px] font-Roboto font-bold rounded-md justify-center items-center h-[52px] bg-blue-gray-500 text-white"
                      onClick={() => handleShowChatRoom(groupCar)}
                    >
                      ChatBox
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* start map */}
  
          {checkMap && (
            <div className=" fixed flex flex-col inset-0 items-center justify-center z-50 mt-5 mb-5 bg-black bg-opacity-50 backdrop-blur">
              
                <button
                  onClick={toggleMapVisibility}
                  className={`absolute top-4 right-4 p-2 ${hideMapButtonVisible ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 '} rounded z-50`}
                  disabled={!hideMapButtonVisible}
                >
                  {checkMap ? "Hide Map" : "Show Map"}
                </button>
              
  
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
                  <IoIosCloseCircle
                    size={30}
                    className="text-red-500 cursor-pointer"
                  />
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
            </div>
          )}
  
          {/* end map */}
        </div>
  
  {displayChatRoom != null && <ChatRoom group={displayChatRoom} role="CUTOMER"/> }
        
  
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
