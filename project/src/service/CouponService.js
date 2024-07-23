import axios from "axios";

export const couponView = async () => {
  try {
    const temp = await axios.get("http://3.24.136.21:8080/public/coupon/view");
    return temp.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const freeCouponView = async () => {
  try {
    const temp = await axios.get(
      "http://3.24.136.21:8080/public/customer/coupon/free-coupon-view"
    );
    return temp.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const tradeCouponView = async () => {
  try {
    const temp = await axios.get(
      "http://3.24.136.21:8080/public/customer/coupon/trade-coupon-view"
    );
    return temp.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const addCoupon = async (coupon) => {
  try {
    const temp = await axios.post(
      "http://3.24.136.21:8080/public/coupon/add",
      coupon
    );
    return temp.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const deleteCoupon = async (couponId) => {
  try {
    const temp = await axios.delete(
      `http://3.24.136.21:8080/public/coupon/delete/${couponId}`
    );
    return temp.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const updateCoupon = async (coupon) => {
  try {
    const temp = await axios.put(
      "http://3.24.136.21:8080/public/coupon/edit",
      coupon
    );
    return temp.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getCoupon = async (coupon, token) => {
  try {
    const temp = await axios.post(
      "http://3.24.136.21:8080/public/customer/coupon/get",
      coupon,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(temp);
    return temp.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const myCoupon = async (token) => {
  try {
    const temp = await axios.get(
      "http://3.24.136.21:8080/public/customer/coupon/myCoupon",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return temp.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getTakenCoupon = async (token) => {
  try {
    const temp = await axios.get(
      "http://3.24.136.21:8080/public/customer/coupon/takenCoupon",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return temp.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getMyTradeCoupon = async (token) => {
  try {
    const temp = await axios.get(
      "http://3.24.136.21:8080/public/customer/coupon/trade-history",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return temp.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
