import axios from "axios";

export const getName = async (userTransaction) => {
    try {
        const  temp = await axios.get("http://localhost:8080/public/customer/get",userTransaction);
        return temp.data;
    }catch (e) {
        console.log(e);
        throw e;
    }
}