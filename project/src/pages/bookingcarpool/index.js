import React, { useEffect, useState } from "react";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-dropdown-select";
import { FaCar } from "react-icons/fa";
import * as UserService from "../../service/UserService";
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import InputTradition from "../../component/layouts/components/InputTradition";
import { getAllDriverType } from "../../service/DriverService";
import { toast } from "react-toastify";
import { addGroupCar } from "../../service/GroupCarService";

function Bookingcarpool() {
  let groupCarData = {}
  let navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const provider = new OpenStreetMapProvider();
  const [timeoutId, setTimeoutId] = useState(null);
  const [currentInput, setCurrentInput] = useState('');
  const [user, setUser] = useState({});
  

  // fix get data from be
  const [optionCar, setOptionCar] = useState([]);
  const options = [
    { label: "4 seater Car", value: 4, icon: <FaCar /> },
    { label: "6 Seater Car", value: 6, icon: <FaCar /> },
  ];

  const customItemRenderer = ({ item, methods }) => (
    <div
      onClick={() => methods.addItem(item)}
      className="flex items-center cursor-pointer p-2 gap-5"
    >
      <span className="mr-2">{item.icon}</span>
      {item.label}
    </div>
  );

  // gợi ý search start

  const handleSearch = async (value, inputField) => {
    setCurrentInput(inputField);

    if (value.length > 3) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const newTimeoutId = setTimeout(async () => {
        try {
          const results = await provider.search({ query: value });
          console.log("Results:", results);
          setSuggestions(results);
        } catch (error) {
          console.log("error >>> ", error)
        }
      }, 500);
      setTimeoutId(newTimeoutId);
    } else {
      setSuggestions([]);
    }
  };



  const selectSuggestion = (result) => {
    setGroupCar(prevState => ({
      ...prevState,
      [currentInput]: result.label // Sử dụng currentInput để biết trường nào cần được cập nhật
    }));
    setSuggestions([]); // Xóa danh sách gợi ý sau khi chọn
  };
  // gợi ý search end
  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getYourProfile(token);
      setUser(response.account);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };
  const fetchDriverTypeCar = async () => {
    try {
      const response = await getAllDriverType();
      const formattedData = response.map(item => ({
        label: item.driverTypeName, 
        value: item.capacity,
        icon: <FaCar />
      }));
      setOptionCar(formattedData);
    } catch (error) {
      console.error("Error fetching driver type", error);
    }
  };
  useEffect(() => {
    fetchProfileInfo();
    fetchDriverTypeCar();
    console.log(optionCar);
  }, []);


  const [groupCar, setGroupCar] = useState({
    startPoint: "",
    endPoint: "",
    timeStart: "",
    capacity: 0
  });

  const handleChangeCapacity = (values) => {
    setGroupCar({ ...groupCar, capacity: values[0].value });
  }

  const onInputChange = async (e) => {
    const { name, value } = e.target;
    await setGroupCar(prevState => ({ ...prevState, [name]: value }));
    handleSearch(value, name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { startPoint, endPoint, timeStart, capacity } = groupCar;

    if (!startPoint || !endPoint || capacity === 0) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      const response = await addGroupCar(localStorage.getItem('token'),groupCar);
      console.log(response);
      toast.success("Create Group Success");
    } catch (error) {
      toast.error(error);
    }
    
    // let request = await axios.post("http://localhost:8080/public/group-car/add", groupCar);
    // groupCarData = request.data
    // // kiet update path apis
    // await axios.post(`http://localhost:8080/public/group-car/add-customer/${user.accountId}/${groupCarData.groupId}`)
    // console.log("groupCarDataId >>> ", groupCarData.groupId)
    // setGroupCar(groupCarData)

    // navigate(`/mytrip/${user.accountId}`);
  };
  return (
    <div
      className="flex items-center h-[600px] flex-col"
    >
      <div>
        <div className="flex flex-col items-center rounded-[20px] w-[1750px] h-[350px] bg-orange-300 justify-center pl-4 pr-4 mt-8">
          <div className="flex flex-row gap-5 relative">
            <div className="w-full relative pt-11">
              <InputTradition
                label={"Start Point"}
                placeholder={"Nhập nơi đi"}
                setPickup={(value) => setGroupCar({ ...groupCar, startPoint: value })}
                name="startPoint"
                value={groupCar.startPoint}
                onChange={onInputChange}
              />
              {suggestions.length > 0 && currentInput === 'startPoint' && (
                <ul className="absolute top-full left-0 mt-1 w-[600px] bg-white shadow-lg max-h-60 overflow-auto z-30 rounded-md">
                  {suggestions.map(result => (
                    <li
                      key={result.x + result.y}
                      onClick={() => selectSuggestion(result)}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {result.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="w-full relative pt-11">
              <InputTradition
                label={"End Point"}
                placeholder={"Nhập nơi đến"}
                setEnd={(value) => setGroupCar({ ...groupCar, endPoint: value })}
                name="endPoint"
                value={groupCar.endPoint}
                onChange={onInputChange}
              />
              {suggestions.length > 0 && currentInput === 'endPoint' && (
                <ul className="absolute top-full left-0 mt-1 w-[600px] bg-white shadow-lg max-h-60 overflow-auto z-30 rounded-md">
                  {suggestions.map(result => (
                    <li
                      key={result.x + result.y}
                      onClick={() => selectSuggestion(result)}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {result.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-row gap-10 pt-11">
              <InputTradition
                label={"Time Start"}
                name="timeStart"
                value={groupCar.timeStart}
                onChange={onInputChange}
                type="datetime-local"
              />
            </div>
            <div className="flex items-center">
              <div className="w-[199px] border-white-700 border-solid pb-1">
                <label className="font-Roboto font-bold">Select an Item</label>
                <Select
                  options={optionCar}
                  labelField="label"
                  valueField="value"
                  name="capacity"
                  value={groupCar.capacity}
                  onChange={handleChangeCapacity}
                  required
                  className="w-[199px] h-[52px] rounded-md text-bold flex text-center font-Roboto font-semibold bg-white"
                  itemRenderer={customItemRenderer}
                />
              </div>
            </div>


            <div className="block">
              <div className="flex">
                <div className="flex mt-8 flex-col justify-center mx-2">
                  <Link to={`/SearchGroupCar/${encodeURIComponent(JSON.stringify({ groupCar, user }))}`} className="flex flex-row w-[180px] font-Roboto font-bold rounded-md justify-center items-center h-[52px] bg-purple-300 text-white-500">
                    Search
                  </Link>
                </div>
                <div className="flex mt-8 flex-col justify-center mx-2">
                  <Link to={`/mytrip/${user.accountId}`} onClick={onSubmit} className="flex flex-row w-[180px] font-Roboto font-bold rounded-md justify-center items-center h-[52px] bg-blue-300 text-white-500">
                    Create
                  </Link>
                </div>
              </div>
              <div className="flex">
                <div className="flex mt-8 flex-col justify-center mx-2">
                  <Link to={`/mytrip/${user.accountId}`} className="flex flex-row w-[180px] font-Roboto font-bold rounded-md justify-center items-center h-[52px] bg-red-300 text-white-500">
                    My trip
                  </Link>
                </div>
                <div className="flex mt-8 flex-col justify-center mx-2">
                  <Link to={`/listGroupCar/${encodeURIComponent(JSON.stringify(user))}`} className="flex flex-row w-[180px] font-Roboto font-bold rounded-md justify-center items-center h-[52px] bg-green-300 text-white-500">
                    View trips
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookingcarpool;