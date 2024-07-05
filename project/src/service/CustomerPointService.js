import axios from "axios";

export const loadPoint = async () => {
    try {
        const temp = await axios.get("http://localhost:8080/public/customer/point/load-point");
        return temp.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const tradeCouponMinusPoint = async (coupon) => {
    try {
        const temp = await axios.post("http://localhost:8080/public/customer/point/trade-minus", coupon);
        return temp.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}