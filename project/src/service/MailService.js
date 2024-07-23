import axios from "axios";

class MailService{
    static async forgotMail(email,mailStructure){
        try{
            const response = await axios.post(`http://localhost:8080/public/send/${email}`,mailStructure);
            return response.data;

        }catch(err){
            throw err;
        }
    }
    static async verifyOtpMail(otp,email){
        try{
            const response = await axios.post(`http://localhost:8080/public/verify/${otp}`,{email});
            return response.data;

        }catch(err){
            throw err;
        }
    }
}
export default MailService;