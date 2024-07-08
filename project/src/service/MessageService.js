import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/public';

export const getAllMessageByGroupCarId = async (id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/get-all-message/by-groupcar/${id}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
   
}

export const getAllPrivateMessagesByDriverAndCustomer = async (customerId, driverDetailId) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/get-all-private-message/by-driver-and-customer/${customerId}/${driverDetailId}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
}