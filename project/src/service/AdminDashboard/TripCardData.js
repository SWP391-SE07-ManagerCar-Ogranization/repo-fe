import axios from "axios";


export const todayTrip = async () => {
    try {
        const  temp = await axios.get("http://localhost:8080/public/statistic/getTodayTrip");
        return temp.data;
    }catch (e) {
        console.log(e);
        throw e;
    }
}

export const thisMonthTrip = async () => {
    try {
        const  temp = await axios.get("http://localhost:8080/public/statistic/getThisMonthTrip");
        return temp.data;
    }catch (e) {
        console.log(e);
        throw e;
    }
}

export const thisYearTrip = async () => {
    try {
        const  temp = await axios.get("http://localhost:8080/public/statistic/getThisYearTrip");
        return temp.data;
    }catch (e) {
        console.log(e);
        throw e;
    }
}
