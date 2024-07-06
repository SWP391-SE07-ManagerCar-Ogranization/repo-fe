import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Card } from 'antd';

const ViewTrips = () => {
    const [groupCars, setGroupCars] = useState([]);
    const [filteredGroupCars, setFilteredGroupCars] = useState([]);
    const [searchParams, setSearchParams] = useState({
        startPoint: '',
        endPoint: '',
        timeStart: ''
    });

    const loadGroupCar = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/public/groupCars`);
            setGroupCars(result.data);
            setFilteredGroupCars(result.data); // initially no filter
        } catch (error) {
            console.error('Failed to fetch group cars:', error);
        }
    };

    useEffect(() => {
        loadGroupCar();
    }, []);

    const handleSearch = () => {
        // Implement the filter logic
        const filtered = groupCars.filter(car => 
            car.startPoint.toLowerCase().includes(searchParams.startPoint.toLowerCase()) &&
            car.endPoint.toLowerCase().includes(searchParams.endPoint.toLowerCase()) &&
            formatDate(car.timeStart).includes(searchParams.timeStart)
        );
        setFilteredGroupCars(filtered);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleString();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full sm:w-[90%] md:w-[80%] lg:w-[90%] mx-auto">
                <div className="p-4">
                    <input
                        type="text"
                        name="startPoint"
                        value={searchParams.startPoint}
                        onChange={handleChange}
                        placeholder="Search by Start Point"
                        className="mr-2 mb-4 p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="endPoint"
                        value={searchParams.endPoint}
                        onChange={handleChange}
                        placeholder="Search by End Point"
                        className="mr-2 mb-4 p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="timeStart"
                        value={searchParams.timeStart}
                        onChange={handleChange}
                        placeholder="Search by Time Start"
                        className="mr-2 mb-4 p-2 border rounded"
                    />
                    <button onClick={handleSearch} className="p-2 bg-blue-500 text-white rounded">Search</button>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
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
                        {filteredGroupCars.map((groupCar) => (
                            <tr key={groupCar.groupId} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">{groupCar.groupId}</td>
                                <td className="px-6 py-4">{groupCar.startPoint}</td>
                                <td className="px-6 py-4">{groupCar.endPoint}</td>
                                <td className="px-6 py-4">{formatDate(groupCar.timeStart)}</td>
                                {/* Other cells remain the same */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewTrips;
