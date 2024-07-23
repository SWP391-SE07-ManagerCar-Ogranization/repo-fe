import axios from "axios";

export const loadPoint = async (token) => {
    try {
        const temp = await axios.get("http://3.25.115.186/public/customer/point/load-point", {
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
        const temp = await axios.post("http://3.25.115.186/public/customer/point/trade-minus", coupon, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return temp.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}