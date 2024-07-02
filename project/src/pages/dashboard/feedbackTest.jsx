import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
    Button,
} from "@material-tailwind/react";

//   Service
import {
    getAllFeedbackDriver,
    getDriverIdsWithFeedback,
    getAllFeedbacksByDriverId,
    deleteFeedbackById

} from "../../service/FeedbackService";

import {
    getAccountById
} from "../../service/AccountService"
//   
import { motion } from 'framer-motion';


import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import avatarDefault from "../../assets/images/avatarDefault.jpg"

var accountName = ""

export const FeedbackTest = () => {
    const [driverFeedbacks, setDriverFeedbacks] = useState([])
    const [driverIds, setDriverIds] = useState([])
    const [filterFeedback, setFilterFeedback] = useState([])
    const [feedbacksDriverId, setFeedbackDriverId] = useState([])

    const [showListByDriverId, setShowListByDriverId] = useState(-1)
    const [accountInf, setAccountInf] = useState({})

    const [showFeedBack, setShowFeedBack] = useState(false);
    const [deleteChange, setDeleteChange] = useState(false);

    console.log("FeedbackByDriverId: ", feedbacksDriverId);
    //
    const fetchDriverFeedbacks = async () => {

        try {
            const data = await getAllFeedbackDriver();
            const ids = getDriverIdsWithFeedback(data)
            setDriverFeedbacks(data)
            setDriverIds(ids);
        } catch (error) {
            console.error(error)
        }
    }

    const getAccountById_ = async (id) => {
        try {
            const data = await getAccountById(id)
            console.log("DATA:>>>>", data.name);
            return data;

        } catch (error) {
            console.error(error);
        }
    }

    // const getAccountId = async (id) => {

    //     try {
    //         const data = await getAccountId(id)
    //         return data
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const getAllFeedbacksByDriver = async (driverDetailId) => {

        try {
            const data = await getAllFeedbacksByDriverId(driverDetailId)
            setFeedbackDriverId(data)
            console.log('GetAllFeedBacksByDriver= ', data);
        } catch (error) {
            console.error(error);
        }
    }

    const deleteFeeback = async (driverId) => {
        await deleteFeedbackById(driverId)
        console.log('CALL');

    }

    const handleShowFeedbacks = async (id) => {
        await getAllFeedbacksByDriver(id)
        if (id === showListByDriverId) {
            setShowListByDriverId(-1)
        } else {
            setShowListByDriverId(id)
        }

        console.log(feedbacksDriverId, " + ", showListByDriverId);
    }

    const handleDeleteFeeback = async (id, feedback) => {
        await deleteFeeback(id)
        const updatedFeedbacks = feedbacksDriverId.filter((el) => el !== feedback)
        console.log("updated-Feedbacks: ", updatedFeedbacks);
        setFeedbackDriverId(updatedFeedbacks)
        setDeleteChange(!deleteChange)
        console.log('delete')
    }



    const countFeedbackByDriverId = (id, feebacks) => {
        const count = feebacks.filter(feedback => feedback.driverDetail.id === id || feedback.driverDetail === id).length;
        console.log(count);
        return count;
    }

    useEffect(() => {
        fetchDriverFeedbacks()
        console.log(driverFeedbacks)
    }, [deleteChange])

    useEffect(() => {
        driverIds.map((id) => {
            const filter = driverFeedbacks.filter((feedback) => feedback?.driverDetail.id == id)
            setFilterFeedback(prev => [...prev, ...filter])
        })

    }, [])

    useEffect(() => {
        const filteredFeedbacks = driverIds.map(id =>
            driverFeedbacks.filter(feedback => feedback?.driverDetail?.id === id)
        ).flat();
        setFilterFeedback(filteredFeedbacks);
    }, [driverIds, driverFeedbacks]);

    useEffect(() => {
        console.log('Driver Feedbacks:', driverFeedbacks);
        console.log('Driver IDs:', driverIds);
        console.log('Filtered Feedback:', filterFeedback);
    }, [driverFeedbacks, driverIds, filterFeedback, showListByDriverId]);

    const formatDate = (string) => {
        const date = new Date(string)
        console.log(date);
        return date.toLocaleString()
    }

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        FeedBack Driver
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {["Driver", "Rating", "working Status", "Total Feedbacks", ""].map((el) => (
                                    <th
                                        key={el}
                                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                    >
                                        <Typography
                                            variant="small"
                                            className="text-[11px] font-bold uppercase text-blue-gray-400"
                                        >
                                            {el}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filterFeedback?.map( (feedback, key) => {
                                const className = `py-3 px-5 ${key === filterFeedback.length - 1 ? "" : "border-b border-blue-gray-50"
                                    }`;

                                //getAccountIn4ByDriverDetailId
                                const accountId = feedback?.driverDetail?.id
                             
                           
                            
                                return (
                                    <>
                                        <tr className={showListByDriverId === feedback?.driverDetail.id ? `glow` : ``}>
                                            <td className={className}>
                                                <div className="flex items-center gap-4">
                                                    <Avatar src={feedback?.driverDetail?.account?.image ? feedback?.driverDetail?.account?.image : avatarDefault} alt={feedback?.driverDetail?.account?.name} size="sm" variant="rounded" />
                                                    <div>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-semibold"
                                                        >
                                                            {"Example"}

                                                        </Typography>
                                                        <Typography className="text-xs font-normal text-blue-gray-500">
                                                            {feedback?.driverDetail?.account?.email}
                                                            {"example@gmail.com"}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={className}>
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-semibold"
                                                        >
                                                            {feedback?.driverDetail?.rating}
                                                            <span className="star-icon full">☆</span>
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={className}>
                                                <Chip
                                                    variant="gradient"
                                                    color={feedback?.driverDetail?.workingStatus ? "green" : "blue-gray"}

                                                    value={feedback?.driverDetail?.workingStatus ? "online" : "offline"}
                                                    className="py-0.5 px-2 text-[11px] font-medium w-fit cursor-not-allowed"
                                                />
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {countFeedbackByDriverId(feedback?.driverDetail?.id, driverFeedbacks)}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Button className="bg-black" onClick={() => {
                                                    handleShowFeedbacks(feedback.driverDetail.id)
                                                }}>
                                                    <Typography className="text-xs font-semibold text-white" >
                                                        <span>
                                                            <span className="text-[8px]"> Show</span>
                                                        </span>
                                                    </Typography>
                                                </Button>
                                            </td>
                                        </tr>
                                        {/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                                        {showListByDriverId === feedback.driverDetail.id && (
                                            <tr>
                                                <td colSpan="6" className="p-4">

                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        transition={{ duration: 0.25 }}
                                                        className=" w-[97%] bg-black rounded-lg overflow-hidden"
                                                    >
                                                        <table className="w-full table-auto bg-gray-100 rounded-lg">
                                                            <thead>
                                                                <tr>
                                                                    {["id", "Customers", "Content", "Created_Date", ""].map((el) => (
                                                                        <th
                                                                            key={el}
                                                                            className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                                                        >
                                                                            <Typography
                                                                                variant="small"
                                                                                className="text-[9px] font-bold uppercase text-blue-gray-400"
                                                                            >
                                                                                {el}
                                                                            </Typography>
                                                                        </th>
                                                                    ))}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {feedbacksDriverId?.map((el, index) => {
                                                                    const className = `py-3 px-5 ${index === feedbacksDriverId.length - 1 ? "" : "border-b border-blue-gray-50"
                                                                        }`;


                                                                    return (
                                                                        <tr key={index}>
                                                                            <td className={className}>
                                                                                <div className="flex items-center gap-4">
                                                                                    <div>
                                                                                        <Typography
                                                                                            variant="small"
                                                                                            color="blue-gray"
                                                                                            className="font-semibold text-[12px]"
                                                                                        >
                                                                                            {el?.feedbackId}
                                                                                        
                                                                                        </Typography>
                                                                                    </div>
                                                                                </div>
                                                                            </td>

                                                                            <td className={className}>
                                                                                <div className="flex items-center gap-4">
                                                                                    <Avatar
                                                                                        src={el?.customer?.account?.image ? el?.customer?.account?.image : avatarDefault}
                                                                                        alt={el?.customer?.account?.name}
                                                                                        size="sm"
                                                                                        variant="rounded"
                                                                                    />
                                                                                    <div>
                                                                                        <Typography
                                                                                            variant="small"
                                                                                            color="blue-gray"
                                                                                            className="font-semibold"
                                                                                        >
                                                                                            {el.customer.id == undefined ? el.customer : el.customer.id}
                                                                                        </Typography>
                                                                                        <Typography className="text-xs font-normal text-blue-gray-500">
                                                                                            {el?.customer?.email}
                                                                                            {"example@gmail.com"}
                                                                                        </Typography>
                                                                                    </div>
                                                                                </div>
                                                                            </td>

                                                                            <td className={className}>
                                                                                <div className="w-[400px] whitespace-nowrap overflow-hidden text-ellipsis text-black">
                                                                                    <Typography className="text-[14px] font-medium">
                                                                                        {el.feedbackContent}
                                                                                    </Typography>
                                                                                </div>
                                                                            </td>
                                                                            <td className={className}>
                                                                                <div className="flex items-center gap-4">
                                                                                    <div>
                                                                                        <Typography
                                                                                            variant="small"
                                                                                            color="blue-gray"
                                                                                            className="font-semibold text-[12px]"
                                                                                        >
                                                                                            {formatDate(el.createAt)}
                                                                                        </Typography>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className={className}>
                                                                                <Chip
                                                                                    onClick={() => {
                                                                                        Swal.fire({
                                                                                            title: "Are you sure?",
                                                                                            text: "You won't be able to revert this!",
                                                                                            icon: "warning",
                                                                                            showCancelButton: true,
                                                                                            confirmButtonColor: "#3085d6",
                                                                                            cancelButtonColor: "#d33",
                                                                                            confirmButtonText: "Yes, delete it!",
                                                                                        }).then((result) => {
                                                                                            if (result.isConfirmed) {
                                                                                                Swal.fire({
                                                                                                    title: "Deleted!",
                                                                                                    text: "Your file has been deleted.",
                                                                                                    icon: "success",
                                                                                                });
                                                                                                console.log(el?.feedbackId)
                                                                                                handleDeleteFeeback(el?.feedbackId, el)
                                                                                            }
                                                                                        });
                                                                                    }}
                                                                                    variant="gradient"
                                                                                    color={"red"}
                                                                                    value={"delete"}
                                                                                    className="py-0.5 px-2 text-[11px] font-medium w-fit cursor-pointer"
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </motion.div>
                                                </td>
                                            </tr>
                                        )}
                                        {/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                    {/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */}
                </CardBody>
            </Card>
        </div>
    );
};

export default FeedbackTest;
