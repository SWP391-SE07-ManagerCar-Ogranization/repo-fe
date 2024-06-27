import axios from "axios";

export const setWorkingStatus = async (token, workingStatus) =>{
    try {
        const  temp = await axios.post("http://localhost:8080/public/driver/update-status", {workingStatus}, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return temp.data;
    }catch (e) {
        console.log(e);
        throw e;
    }
}