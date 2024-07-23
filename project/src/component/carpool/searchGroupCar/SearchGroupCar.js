import React, { useEffect, useState, useRef } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, Modal } from 'antd';
import { IoIosCloseCircle } from "react-icons/io";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import * as TransactionService from '../../../service/TransactionService'
import * as PaymentService from '../../../service/PaymentService'
import LeafletGeocoder from '../map/LeafletGeocoder';
import LeafletRoutingMachine from '../map/LeafletRoutingMachine';
function SearchGroupCar () {
  const [checkMembers, setCheckMembers] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [checkMap, setCheckMap] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  const [driverDetail, setDriverDetail] = useState({name: "Nguyen Duc Thinh", phone: "0703224025"});
  const [groupCarObject, setGroupCarObject] = useState ({})
  const [check, setCheck] = useState(false);
  const { groupCarAndUserString } = useParams();
  const [groupCars, setGroupCars] = useState([]);
  const [groupCarDetail, setGroupCarDetail] = useState({});
  const [userObject, setUserObject] = useState({});
  let count = 0;

  
  // start show driverdetail
  const countDown =async (id) => {
    let result;
    try {
      result = await axios.get(`http://3.24.136.21/public/getAccountOfDriverDetailByGroupId/${id}`)
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
  // map start //
  const toggleMapVisibility = () => {
    setCheckMap(!checkMap);

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
  const UpdateMapCenter = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      if (position && map) {
        map.setView(position);
      }
    }, [position, map]);
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
  console.log("mapRef >>> ", mapRef.current)
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
  
  useEffect(()=>{
    console.log("routeInfo >>>> ",routeInfo)
  },[routeInfo])
  const handleSearchClick = () => {
    if (startPoint && endPoint) {
      // Get the map instance from the ref
      const map = mapRef.current;

      // Initialize the routing machine to find the route and update the info
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
  // map end //
  useEffect(()=>{
    loadGroupCar();
  }, [])
    
  useEffect(() => {
    let groupCarAndUserObject;
    try {
      if (groupCarAndUserString) {
        groupCarAndUserObject = JSON.parse(decodeURIComponent(groupCarAndUserString));
        const { groupCar, user  } = groupCarAndUserObject;
        // addOwnerTrip(user, groupCarData
        // axios.post(`http://3.24.136.21/public/addCustomer/${user.id}/${groupCarData.groupId}`);
        console.log("groupCardata >>> ", groupCar)
        console.log("userId >>>> ", user.accountId)
        setGroupCarObject(groupCar)
        setUserObject(user)

      }
    } catch (error) {
      console.error('Failed to parse combinedDataString:', error);
    }
  }, [groupCarAndUserString]);
  const loadGroupCar = async ()=>{
      const result = await axios.get(`http://3.24.136.21/public/groupCars`);
      setGroupCars(result.data);
  }
  const handleJoin = async (groupId) => {
    try {
      await axios.post(`http://3.24.136.21/public/addCustomer/${userObject.id}/${groupId}`);
      // Alert join successful
      alert('Join successfully');
      // Update quantity of the joined groupCar
      const updatedGroupCars = groupCars.map((car) => {
        if (car.groupId === groupId) {
          return {
            ...car,
            quantity: (car.quantity || 0) + 1, // Increase quantity by 1
          };
        }
        return car;
      });
      // Set updated groupCars state
      setGroupCars(updatedGroupCars);
    } catch (error) {
      // Alert join fail
      alert('Join fail');
    }
  };
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
  const filteredGroupCars = groupCars.filter((groupCar) => {
    
    return groupCar.startPoint.trim() === groupCarObject.startPoint.trim() || groupCar.endPoint.trim() === groupCarObject.endPoint.trim(); 
});
  console.log("searchgroup >>>> ", filteredGroupCars)
  console.log("groupCars >>>> ", groupCars)

  return (
    <div className='flex'>
      

<div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full sm:w-[90%] md:w-[80%] lg:w-[90%] mx-auto">
    <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
        <div>
           
            
            <div id="dropdownAction" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate account</a>
                    </li>
                </ul>
                <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete User</a>
                </div>
            </div>
        </div>
        <label for="table-search" className="sr-only">Search</label>
        
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
              <th scope="col" className="px-6 py-3">Join</th>
              <th scope="col" className="px-6 py-3">Show Map</th>
            </tr>
        </thead>
        <tbody>
            {filteredGroupCars.map((groupCar)=>{
     
                return(
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
                        className="flex flex-row w-[180px] font-Roboto font-bold rounded-md justify-center items-center h-[52px] bg-blue-700 text-white"
                      >
                        Driver
                      </Link>
                    </td>
                    <td className="px-6 py-4">{groupCar.capacity}</td>
                    <td className="px-6 py-4">{groupCar.customers?.length ?? 0}</td>
                    
                    <td className="px-6 py-4">
                    <button
                        className="flex flex-row w-[180px] font-Roboto font-bold rounded-md justify-center items-center h-[52px] bg-red-700 text-white"
                        onClick={()=>handleJoin(groupCar.groupId)}
                      >
                        Join
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="flex flex-row w-[180px] font-Roboto font-bold rounded-md justify-center items-center h-[52px] bg-pink-500 text-white"
                        onClick={()=>handleShowMap(groupCar)}
                      >
                        Show Map
                      </button>
                    </td>
                  </tr>
                
                )
                
            })}
            
        </tbody>
    </table>
    {/* start map */}

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




{checkMembers && <div className="fixed inset-0 flex items-center justify-center z-50 text-center ">
        <Card
          title="Members"
          extra={<IoIosCloseCircle onClick={()=>setCheckMembers(!checkMembers)}  style={{width: 20, height: 20}}/>}
          style={{ width: 500, maxWidth: '80%', height: 400 }}
        >
          <div className="overflow-auto h-full">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 w-1/3 text-center">Customer Id</th>
                <th scope="col" className="px-6 py-3 w-1/3 text-center">Customer Name</th>
                <th scope="col" className="px-6 py-3 w-1/3 text-center">Phone</th>
              </tr>
            </thead>
            <tbody>
            {accounts.map((account)=>
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
{/* list Search
<div class="w-[30%] max-w-screen-xl mx-auto px-6">
        <div class="flex justify-center p-4 px-3 py-10">
            <div class="w-full max-w-md">
                <div class="bg-white shadow-md rounded-lg px-3 py-2 mb-4">
                    <div class="block text-gray-700 text-lg font-semibold py-2 px-2">
                        Search following by
                    </div>
                    
                    <div class="py-3 text-sm">
                        
                        <div class="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                            <span  class="bg-green-400 h-2 w-2 m-2 rounded-full"></span>
                            <div class="flex-grow font-medium px-2">Start Point</div>
                            <div class="text-sm font-normal text-gray-500 tracking-wide">Start Point</div>
                        </div>

                        <div class="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                            <span  class="bg-green-400 h-2 w-2 m-2 rounded-full"></span>
                            <div class="flex-grow font-medium px-2">End Point</div>
                            <div class="text-sm font-normal text-gray-500 tracking-wide">End Point</div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>     */}
           
    </div>
  )
}

export default SearchGroupCar;