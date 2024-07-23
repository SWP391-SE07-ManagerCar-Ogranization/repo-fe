import axios from "axios";

export const fetchRevenueInLast7Days = async () => {
    try {
        const response = await axios.get("http://localhost:8080/public/statistic/getTransactionsInLast7Days");
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const fetchRevenueInLast12Months = async () => {
    try {
        const response = await axios.get("http://localhost:8080/public/statistic/getTransactionsInLast12Months");
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const fetchRevenueInLast3Years = async () => {
    try {
        const response = await axios.get("http://localhost:8080/public/statistic/getTransactionsInLast3Years");
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const fetchTripInLast12Months = async () => {
    try {
        const response = await axios.get("http://localhost:8080/public/statistic/getTripsInLast12Months");
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
