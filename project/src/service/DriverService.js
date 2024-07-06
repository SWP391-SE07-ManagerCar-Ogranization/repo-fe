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