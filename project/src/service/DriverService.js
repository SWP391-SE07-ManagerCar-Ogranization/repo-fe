import axios from "axios";

export const setWorkingStatus = async (token, workingStatus,latitude,longitude) =>{
    try {
        const  temp = await axios.post("http://localhost:8080/public/driver/update-status", {workingStatus,latitude,longitude}, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return temp.data;
    }catch (e) {
        console.log(e);
        throw e;
    }
}
export const updateTripFinished = async(token, invoiceId) => {
    try {
        const temp = await axios.post("http://localhost:8080/public/driver/confirm-invoice", {invoiceId}, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return temp.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getAllDriverType = async() => {
    try {
        const temp = await axios.get("http://localhost:8080/public/driver/list/driver-type/car");
        return temp.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}