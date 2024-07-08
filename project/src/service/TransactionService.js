import axios from "axios";

export const addTrans = async (resrep) => {
    try {
        const  temp = await axios.post("http://localhost:8080/public/invoice/addtran/invoice",resrep);
        return temp.data;
    }catch (e) {
        console.log(e);
        throw e;
    }
}
export const getAllTransactionByAccount = async (token) =>{
    try {
        const  temp = await axios.get("http://localhost:8080/public/wallet/system-transaction-history",  {
            headers: {Authorization: `Bearer ${token}`}
        });
        return temp.data;
    }catch (e) {
        console.log(e);
        throw e;
    }
}
export const getUserTransactionByDriverInfo = async (token) => {
    try {
        const  temp = await axios.get("http://localhost:8080/public/driver/get-invoice",  {
            headers: {Authorization: `Bearer ${token}`}
        });
        return temp.data;
    }catch (e) {
        console.log(e);
        throw e;
    }
}

export const getUserTransactionGroupCarByDriverInfo = async (token) => {
    try {
        const  temp = await axios.get("http://localhost:8080/public/driver/get-group-car",  {
            headers: {Authorization: `Bearer ${token}`}
        });
        return temp.data;
    }catch (e) {
        console.log(e);
        throw e;
    }
}

export const addInvoiceAndTransaction = async(invoice,token) => {
    // in invoice provide only 3 values: startPoint, endPoint, timeStart
    try {
        const  temp = await axios.post("http://localhost:8080/public/invoice/add/new-trip",invoice,  {
            headers: {Authorization: `Bearer ${token}`}
        });
        return temp.data;
    }catch (e) {
        console.log(e);
        throw e;
    }
}
export const getUserTransactionByCustomerAndGroupCar = async (token,groupId) => {
    try {
        const  temp = await axios.get(`http://localhost:8080/public/transaction/get/group-car/${groupId}` , {
            headers: {Authorization: `Bearer ${token}`}
        });
        return temp.data;
    }catch (e) {
        console.log(e);
        throw e;
    }
}

export const paymentTransaction = async(userTransaction,token) => {
    // in invoice provide only 3 values: startPoint, endPoint, timeStart
    try {
        const  temp = await axios.post("http://localhost:8080/public/transaction/payment", userTransaction,  {
            headers: {Authorization: `Bearer ${token}`}
        });
        return temp.data;
    }catch (e) {
        console.log(e);
        throw e;
    }
}