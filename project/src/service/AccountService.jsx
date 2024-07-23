import axios from "axios";
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:8080/public';


const getAllCustomers = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/get-all-customers`);
        return res.data;
    } catch (error) {
        console.log(error)
        throw error
    }
}

const getAccountById = async (accountId) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/get-account/${accountId}`)
        return res.data
    } catch (error) {
        console.error(error);
    }
}
const getDriverByInvoiceId = async (invoiceId) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/driver/invoice/${invoiceId}`)
        return res.data
    } catch (error) {
        console.error(error);
    }
}
const getAllDrivers = async () => {
    try {

        const res = await axios.get(`${API_BASE_URL}/get-all-drivers`)
        return res.data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateStatus = async (id, payload, status) => {
    try {
        const res = await axios.put(`${API_BASE_URL}/${id}/update-status`, payload, {
            params: {
                status: status
            }
        });

        console.log('Respone:', res.data)
    } catch (error) {
        throw error;
    }
}

const deleteDriver = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/admin/delete/${id}`)
        console.log(`DELETE ${id} ok`);
        toast.success("Delete successful!")
    } catch (error) {
        toast.error("Error")
        throw error
    }
}

export {
    deleteDriver,
    getAccountById,
    updateStatus,
    getAllCustomers,
    getAllDrivers,
    getDriverByInvoiceId
};

