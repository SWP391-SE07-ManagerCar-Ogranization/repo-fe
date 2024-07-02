import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/public';

export const getAllCustomersByGroupCarId = async (id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/get-all-customer/group-car-id/${id}`)
        return res.data;
    } catch (error) {
        console.error(error)
    }

} 