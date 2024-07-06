import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/public";

export const getAllInvoices = async () => {
  try {
    const res = await axios.get(`${REST_API_BASE_URL}/getAllInvoices`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const findCustomerById = async (customerId) => {
  try {
    const res = await axios.get(
      `${REST_API_BASE_URL}/getcustomerby/${customerId}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
