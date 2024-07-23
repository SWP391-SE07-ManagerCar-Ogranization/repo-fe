import axios from "axios";

const REST_API_BASE_URL = "http://3.25.115.186/public";

export const getInvoiceByCustomer = async (token) => {
  try {
    const response = await axios.get(
      `${REST_API_BASE_URL}/invoice/customer/invoices`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return Array.isArray(response.data) ? response.data : [];
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getAccountById = async (accountId) => {
  try {
    const response = await axios.get(
      `${REST_API_BASE_URL}/get-account/${accountId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching account:", error);
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

export const searchInvoices = async (keyword, token) => {
  try {
    const response = await axios.get(
      `${REST_API_BASE_URL}/invoice/customer/invoices/search`,
      {
        params: { keyword },
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error searching invoices:", error);
    throw error;
  }
};
export const sortInvoicesByDate = async (token) => {
  try {
    const response = await axios.get(
      `${REST_API_BASE_URL}/invoice/customer/invoices/sort`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sorting invoices:", error);
    throw error;
  }
};
