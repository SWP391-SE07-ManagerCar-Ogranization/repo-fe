import axios from "axios";

export const couponView = async () => {
    try {
        const temp = await axios.get("http://localhost:8080/public/coupon/view");
        return temp.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const addCoupon = async (coupon) => {
    try {
        const temp = await axios.post("http://localhost:8080/public/coupon/add", coupon);
        return temp.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const deleteCoupon = async (couponId) => {
    try {
        const temp = await axios.delete(`http://localhost:8080/public/coupon/delete/${couponId}`);
        return temp.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const updateCoupon = async (coupon) => {
    try {
        const temp = await axios.put("http://localhost:8080/public/coupon/edit", coupon);
        return temp.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const getCoupon = async (token,coupon) => {
    try {
        const temp = await axios.post("http://localhost:8080/public/customer/coupon/get", coupon, {
            headers: {Authorization: `Bearer ${token}`}
        });
        console.log(temp);
        return temp.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const myCoupon = async () => {
    try {
        const temp = await axios.get("http://localhost:8080/public/customer/coupon/myCoupon");
        return temp.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}