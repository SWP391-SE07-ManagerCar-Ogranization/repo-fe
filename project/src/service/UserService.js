import axios from "axios";
import { convertHoursToMilliseconds } from "../config/RegexTime";

export const login = async (email, password) => {
  try {
    const temp = await axios.post("http://3.24.136.21:8080/auth/login", {
      email,
      password,
    });
    return temp.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const loginGoogle = async (userData) => {
  try {
    const temp = await axios.post(
      "http://3.24.136.21:8080/oauth2/login",
      userData
    );
    return temp.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const register = async (userData) => {
  try {
    const temp = await axios.post(
      "http://3.24.136.21:8080/auth/register",
      userData
    );
    return temp.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getAllUsers = async (token) => {
  try {
    const temp = await axios.get(
      "http://3.24.136.21:8080/admin/get-all-users",
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

export const getYourProfile = async (token) => {
  try {
    const temp = await axios.get(
      "http://3.24.136.21:8080/adminuser/get-profile",
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

export const getFeedbackProfileDriver = async (id) => {
  try {
    const temp = await axios.get(
      `http://3.24.136.21:8080/public/feedback-driver/find-all/${id}`
    );
    return temp.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const updateUser = async (userId, userData, token) => {
  try {
    const temp = await axios.put(
      `http://3.24.136.21:8080/adminuser/update/${userId}`,
      userData,
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

export const changePass = async (token, password) => {
  try {
    const temp = await axios.post(`http://3.24.136.21:8080/auth/change-pass`, {
      token,
      password,
    });
    return temp.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const logout = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("expire");
};

export const isAuthenticated = async () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const isAdmin = async () => {
  const role = localStorage.getItem("role");
  return role === "ADMIN";
};

export const getRole = async () => {
  const role = localStorage.getItem("role");
  return role;
};

export const isTokenExpire = () => {
  const timeExpire =
    new Date().getTime() +
    convertHoursToMilliseconds(localStorage.getItem("expire"));
  const currentTime = new Date().getTime();
  if (currentTime > timeExpire) {
    return true;
  }
  return false;
};
