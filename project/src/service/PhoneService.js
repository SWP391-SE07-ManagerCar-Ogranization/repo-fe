import axios from "axios";

export const sendSMS = async (toMobileNo) => {
    try {
        const  temp = await axios.post(`http://localhost:8080/public/sendSms/${toMobileNo}`);
        return temp.data;
    }catch (e) {
        console.log(e);
        throw e;
    }
}

export const verifyOTP = async (phone, otp) =>{
    try {
        const  temp = await axios.post("http://localhost:8080/public/validateOtp", {phone, otp});
        return temp.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}