import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/public";

export const listInvoice = () => axios.get(`${REST_API_BASE_URL}`);

export const createInvoice = async (invoice) => {
  try {
    const res = await axios.post(
      `${REST_API_BASE_URL}/addtran/invoice`,
      invoice
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendOptionToDB = async (option) => {
  try {
    const res = await axios.post(`${REST_API_BASE_URL}/listDriverType`, option);
    return res.data;
  } catch (error) {
    console.error("Error sending option to DB:", error.message);
    return null;
  }
};

export const createDriverInvoice = async (invoice) => {
  try {
    const res = await axios.post(
      `${REST_API_BASE_URL}/addtran/invoice`,
      invoice
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
