import axios from "axios";

export const addGroupCar = async(token, groupCar) => {
    try {
        const temp = await axios.post("http://localhost:8080/public/group-car/add", groupCar, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return temp.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}