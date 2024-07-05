import axios from "axios";

export const loadPoint = async (token) => {
    try {
        const temp = await axios.get("http://localhost:8080/public/customer/point/load-point", {
            headers: {Authorization: `Bearer ${token}`}
        });
        return temp.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const tradeCouponMinusPoint = async (coupon,token) => {
    try {
        const temp = await axios.post("http://localhost:8080/public/customer/point/trade-minus", coupon, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return temp.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}