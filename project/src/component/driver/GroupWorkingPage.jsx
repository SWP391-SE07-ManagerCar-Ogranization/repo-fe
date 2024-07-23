import { Breadcrumb, Layout, Space, Switch, theme } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Header from "../../layouts/Header";
import { Content, Footer } from "antd/es/layout/layout";
import FooterWithSocialLinks from "../../layouts/Footer";
import * as UserService from "../../service/UserService";
import { Link } from 'react-router-dom';
import axios from "axios";
import { Modal } from 'antd';
import { Card } from 'antd';
import { IoIosCloseCircle } from "react-icons/io";
import L from "leaflet";
import LeafletGeocoder from "../carpool/map/LeafletGeocoder";
import LeafletRoutingMachine from "../carpool/map/LeafletRoutingMachine";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import * as TransactionService from '../../service/TransactionService'
import * as PaymentService from '../../service/PaymentService'
import { toast } from "react-toastify";
import { joinGroupCar } from "../../service/DriverService";
import {useNavigate} from "react-router-dom"
import {
  getGroupsByDriverId
} from '../../service/GroupCarService'

const GroupWorkingPage = () => {
  const navigate = useNavigate();
  const [groupCarsCheck, setGroupCarsCheck] = useState([]);
  // load groupCar start
  const [user, setUser] = useState({});
  const [modal, contextHolder] = Modal.useModal();
  const [accounts, setAccounts] = useState([]);
  const [groupCars, setGroupCars] = useState([]);
  const [checkMembers, setCheckMembers] = useState(false);
  const [driverDetail, setDriverDetail] = useState({});
  const [checkDriverDetail, setCheckDriverDetail] = useState(true);
  const [checkGroupCar, setCheckGroupCar] = useState(false);
  const [loadingJoin, setLoadingJoin] = useState(false); // set trạng thái join
  // info
  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getYourProfile(token);
      setUser(response.account);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  useEffect(() => {
    fetchProfileInfo();
  }, []);
  // info end
  const loadGroupCar = async () => {
    try {
      const result = await axios.get(`http://3.24.136.21/public/groupCars`);
      setGroupCars(result.data);
    } catch (error) {
      console.error('Failed to fetch group cars:', error);
    }
  };
  
  useEffect(() => {
    loadGroupCar();
  }, []);
  const formatDate = (dateString) => {
    const newDate = new Date(dateString);
    return newDate.toLocaleString();
  };
  const handleMembers = async (id) => {
    setCheckMembers(!checkMembers);
    const listAccount = await axios.get(`http://3.24.136.21/public/getAccountsByGroupId/${id}`)
    setAccounts(listAccount.data);
    // Ensure groupCarDetail is updated

  };
  // join
  const handleJoin = async (groupId) => {
    try {
        setLoadingJoin(true)
        await joinGroupCar(localStorage.getItem("token"),groupId);
        toast.success('Join successfully');
      setReload(!reload);
      setLoadingJoin(false);
    } catch (error) {
      toast.error('Join fail');
      setLoadingJoin(false);
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
  // map start //
  const [checkMap, setCheckMap] = useState(false);
  const toggleMapVisibility = () => {
    setCheckMap(!checkMap);

    if (checkMap) {
      resetMap();
    }
  };
  const resetMap = () => {
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
  const [position, setPosition] = useState([16.047079, 108.20623]); 
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
    setResrep({ ...resrep, amount: (summary.totalDistance / 1000).toFixed(2) * 10000 });
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
        alert("Address not found");
      }
    });
  };

  useEffect(() => {
  }, [routeInfo])
  const handleSearchClick = () => {
    if (startPoint && endPoint) {
      // Đảm bảo rằng ref và bản đồ đã sẵn sàng
      const map = mapRef.current?.leafletElement;

      if (map) {
        // Kiểm tra và xóa routingControl hiện có trước khi tạo mới
        if (map.routingControl) {
          map.removeControl(map.routingControl);
          map.routingControl = null; // Đặt lại routingControl thành null sau khi xóa
        }

        // Khởi tạo routing machine mới
        map.routingControl = L.Routing.control({
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
        }).on("routesfound", function (e) {
          const route = e.routes[0];
          handleRouteFound(route.summary);
        }).addTo(map);
      }
    } else {
      alert("Please enter both start and end addresses.");
    }
  };

  
  // Sử dụng useEffect để dọn dẹp khi component unmount
  useEffect(() => {
    return () => {
      const map = mapRef.current?.leafletElement;
      if (map && map.routingControl) {
        map.removeControl(map.routingControl);
      }
    };
  }, []);
  const handleShowMap = (groupCar) => {
    setCheckMap(true)
    geocodeAddress(groupCar.startPoint, (start) => {
      setStartPoint(start);
      geocodeAddress(groupCar.endPoint, (end) => {
        setEndPoint(end);
        setResrep({ ...resrep, startPoint: start.lat, endPoint: end.lat });

      });
    });
  };
  useEffect(() => {
    if (startPoint && endPoint) {
      handleSearchClick();
    }
  }, [startPoint, endPoint]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const getGroupsByDriverId_ = async () => {
    try {
      const data = await getGroupsByDriverId(user?.accountId)
      setGroupCarsCheck(data)
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    getGroupsByDriverId_();
  },[])
  
  //CHATROOM HANDLE
  const handleShowChatRoom = (group) => {
    const {
      groupId,
      startPoint,
      endPoint,
    } = group
    const newGroup = {
      groupCarId: groupId,
      customerId: user?.accountId,
      groupName: `GroupCar-${groupId}`,
      startPoint: startPoint,
      endPoint: endPoint,

    }


    const check = groupCarsCheck?.some(element => element.id === group?.groupId);
    // if (check) {
    //   toast.error('You are not in the group yet')
    //   return
    // }
    navigate('/driverchat',{state: {newGroup}})
    
  }


  return (
    <>
      <Layout>
        <Header />
        <Content
          style={{
            padding: "0 48px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Driver</Breadcrumb.Item>
            <Breadcrumb.Item>Working</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 1000,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
           <div className="flex flex-col">
              <div className="flex flex-col">
                <Space direction="vertical">
                <div>{checkGroupCar ? "view carpool trips" : "hidden carpool trips"}</div>
                  <Switch 
                    onClick={() => setCheckGroupCar(!checkGroupCar)}
                    checked={checkGroupCar}
                    unCheckedChildren={<CloseOutlined />}
                    checkedChildren={<CheckOutlined />}
                  />
                </Space>
              </div>
           </div>
            
            
            {/* table groupCar */}
            {checkGroupCar && <div className="relative overflow-x-auto sm:rounded-lg w-full sm:w-[90%] md:w-[80%] lg:w-[100%] mx-auto">
              <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                <div></div>
                <label htmlFor="table-search" className="sr-only">Search</label>
              </div>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">GroupId</th>
                    <th scope="col" className="px-6 py-3">Start Point</th>
                    <th scope="col" className="px-6 py-3">End Point</th>
                    <th scope="col" className="px-6 py-3">TimeStart</th>
                    <th scope="col" className="px-6 py-3">Members</th>
                    <th scope="col" className="px-6 py-3">Driver</th>
                    <th scope="col" className="px-6 py-3">Capacity</th>
                    <th scope="col" className="px-6 py-3">Quantity</th>
                    <th scope="col" className="px-6 py-3">Join</th>
                    <th scope="col" className="px-6 py-3">Show Map</th>
                    <th scope="col" className="px-6 py-3">Chat</th>
                  </tr>
                </thead>
                <tbody>
                  {groupCars?.map((groupCar) => (


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
                          className="flex flex-row w-[180px] font-Roboto font-bold rounded-md justify-center items-center h-[52px] bg-blue-700 text-white"
                          onClick={() => handleJoin(groupCar.groupId)}
                          disabled={loadingJoin}
                        >
                          {loadingJoin ? 'Joining' : 'Join'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="flex flex-row w-[180px] font-Roboto font-bold rounded-md justify-center items-center h-[52px] bg-pink-500 text-white"
                          onClick={() => handleShowMap(groupCar)}
                        >
                          Show Map
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="flex flex-row w-[180px] font-Roboto font-bold rounded-md justify-center items-center h-[52px] bg-pink-500 text-white"
                          onClick={() => handleShowChatRoom(groupCar)}
                        >
                          Chat
                        </button>
                      </td>

                    </tr>

                  ))}
                </tbody>
              </table>
            </div>}
            {/* start card members */}
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
                        <tr key={account.accountId} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
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
            {/* end card members */}

            {/* start card driver */}
            {checkDriverDetail && contextHolder}
            {/* end table groupCar */}
            {checkMap && <div className=" fixed flex flex-col inset-0 items-center justify-center z-50 mt-5 mb-5 bg-black bg-opacity-50 backdrop-blur">
              <button onClick={toggleMapVisibility} className="mb-0 p-2 bg-blue-500 text-white rounded">
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
        </Content>
        <Footer>
          <FooterWithSocialLinks />
        </Footer>
      </Layout>
    </>
  );
};

export default GroupWorkingPage;