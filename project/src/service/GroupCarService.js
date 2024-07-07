import axios from "axios";
const API_BASE_URL = 'http://localhost:8080/public';

export const addGroupCar = async (token, groupCar) => {
    try {
        const temp = await axios.post("http://localhost:8080/public/group-car/add", groupCar, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return temp.data;
    } catch (error) {
        console.log(error);
        throw error;
    }

 
}

export const outGroup = async (customerId, groupCarId) => {
    try {
        await axios.delete(`${API_BASE_URL}/deleteGroupCarJoin/${customerId}/${groupCarId}`)
    } catch (error) {
        console.error(error);
    }
}

export const getGroupsByDriverId = async (driverDetailId) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/groupCarsByDriverDetailId/${driverDetailId}`)
        return res.data
    } catch (error) {
        console.error(error);
    }
}