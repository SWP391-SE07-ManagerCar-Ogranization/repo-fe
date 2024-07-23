import axios from "axios";

const API_BASE_URL = 'http://3.24.136.21/public';

 const getAllFeedbackDriver = async () => {

    try {
        const res = await axios.get(`${API_BASE_URL}/get-all-feedbacks`)
        console.log('getAllFeedbackDriver_res: ',res);
        console.log('getAllFeedbackDriver_resData: ',res.data);
        return res.data
    } catch (error) {
        console.error(error);
    }
}

const getAllFeedbacksByDriverId = async (driverDetailId) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/feedback-driver/find-all/${driverDetailId}`)
        console.log('findAllFeedbacksByDriverId_data: ',res.data);
        return res.data
    } catch (error) {
        console.error(error)
    }
}

 const getDriverIdsWithFeedback = (feedbackData) => {
    const ids = new Set();
    feedbackData.forEach(feedback => {
        if (feedback.driverDetail && feedback.driverDetail.id) {
            ids.add(feedback.driverDetail.id);
        }
    });
    return Array.from(ids);
};

const deleteFeedbackById = async (feedbackId) => {
    try {
        await axios.delete(`${API_BASE_URL}/feedback-driver/delete/${feedbackId}`)
        console.log("DELETE")
    } catch (error) {
        console.error(error);
    }
}

const addFeedback = async (feedback) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/add-new-feedback`, feedback, {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        return res.data
    } catch (error) {
        console.error(error);
    }
}




export {
    addFeedback,
    deleteFeedbackById,
    getAllFeedbacksByDriverId,
    getAllFeedbackDriver,
    getDriverIdsWithFeedback
} 