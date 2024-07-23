import axios from "axios";


export const todayTransactionRevenue = async () => {
    try {
        const  temp = await axios.get("http://localhost:8080/public/statistic/getTodayTransactionRevenue");
        return temp.data;
    }catch (e) {
        console.log(e);
        throw e;
    }
}

export const thisMonthTransactionRevenue = async () => {
    try {
        const  temp = await axios.get("http://localhost:8080/public/statistic/getThisMonthTransactionRevenue");
        return temp.data;
    }catch (e) {
        console.log(e);
        throw e;
    }
}

export const thisYearTransactionRevenue = async () => {
    try {
        const  temp = await axios.get("http://localhost:8080/public/statistic/getThisYearTransactionRevenue");
        return temp.data;
    }catch (e) {
        console.log(e);
        throw e;
    }
}
