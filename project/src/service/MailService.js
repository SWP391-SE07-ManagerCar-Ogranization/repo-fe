import axios from "axios";

class MailService{
    static async forgotMail(email,mailStructure){
        try{
            const response = await axios.post(`http://3.25.115.186/public/send/${email}`,mailStructure);
            return response.data;

        }catch(err){
            throw err;
        }
    }
    static async verifyOtpMail(otp,email){
        try{
            const response = await axios.post(`http://3.25.115.186/public/verify/${otp}`,{email});
            return response.data;

        }catch(err){
            throw err;
        }
    }
}
export default MailService;