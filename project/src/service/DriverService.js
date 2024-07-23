import axios from "axios";

export const setWorkingStatus = async (token, workingStatus,latitude,longitude) =>{
    try {
        const  temp = await axios.post("http://3.24.136.21/public/driver/update-status", {workingStatus,latitude,longitude}, {
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
        const temp = await axios.post("http://3.24.136.21/public/driver/confirm-invoice", {invoiceId}, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return temp.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const ignoreTrip = async(token, invoiceId) => {
    try {
        const temp = await axios.post("http://3.24.136.21/public/driver/ignore-invoice", {invoiceId}, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return temp.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const updateGroupCarFinished = async(token, groupId) => {
    try {
        const temp = await axios.post("http://3.24.136.21/public/driver/confirm-group", {groupId}, {
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
        const temp = await axios.get("http://3.24.136.21/public/driver/list/driver-type/car");
        return temp.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const joinGroupCar = async(token, groupId) => {
    try {
        console.log("token >>> ", token);
        const temp = await axios.post("http://3.24.136.21/public/driver/join-group", {groupId}, {
            headers: {Authorization: `Bearer ${token}`}
        });
        console.log("temp >>> ", temp.data);
        return temp.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getAccountDriverByGroupCarJoin = async(id) => {
    try {
        const temp = await axios.get(`http://3.24.136.21/public/driver/list/group-had-join/${id}`);
        return temp.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}