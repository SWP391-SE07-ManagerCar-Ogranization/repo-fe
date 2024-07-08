import axios from "axios";

export const charge = async (account, amount, message) => {
    try {
        const  temp = await axios.post("http://localhost:8080/public/payment/charge" ,{account,amount,message});
        return temp.data;
    }catch (e) {
        console.log(e);
        throw e;
    }
}