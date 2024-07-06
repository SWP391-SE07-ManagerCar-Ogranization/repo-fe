import axios from "axios";


const API_BASE_URL = 'http://localhost:8080/public';

export const outGroup = async (customerId, groupCarId) => {
    try {
        await axios.delete(`${API_BASE_URL}/deleteGroupCarJoin/${customerId}/${groupCarId}`)
    } catch (error) {
        console.error(error);
    }
}