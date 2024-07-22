import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/public';

export const getAllCustomersByGroupCarId = async (id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/getAccountsByGroupId/${id}`)
        return res.data;
    } catch (error) {
        console.error(error)
    }

} 
