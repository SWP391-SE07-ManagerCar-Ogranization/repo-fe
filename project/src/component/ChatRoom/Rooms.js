import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ChatRoomContext } from "../../context/ChatRoomContext"


const Rooms = () => {
    const navigate = useNavigate();  // Sử dụng hook useNavigate để chuyển hướng


    //getAllGroupCarByCustomerId
    const [groupCars, setGroupCars] = useState([
        {
            groupCarId: 1,
            customerId: 7,
            customerName: "Jack Moore",
            groupName: `GroupCar-1`,
            startPoint: 'City Center',
            endPoint: 'Airport',
        },
        {
            groupCarId: 2,
            customerId: 7,
            customerName: "Jack Moore",
            groupName: `GroupCar-2`,
            startPoint: 'Da Nang',
            endPoint: 'Ha Noi',

        },

    ])

    const {theme, setTheme} = useContext(ChatRoomContext)

    useEffect(()=> {
        setTheme((prev)=> ({
            ...prev,
            groupCars,
            setGroupCars
        })
        )
    }, [setTheme, groupCars, setGroupCars])

    const [value, setValue] = useState(7)

    const handleOnClick = (group) => {
        console.log(group);
        navigate(`/room/chatroom`, { state: { group: group } })
    }

    const handleOnClickEdit = () => {
        setGroupCars(
            [
            {
                groupCarId: 1,
                customerId: value,
                customerName: "Jack Moore",
                groupName: `GroupCar-1`,
                startPoint: 'City Center',
                endPoint: 'Airport',
            },
            {
                groupCarId: 2,
                customerId: value,
                customerName: "Jack Moore",
                groupName: `GroupCar-2`,
                startPoint: 'Da Nang',
                endPoint: 'Ha Noi',
    
            },
        ]
        )
    }



    return (
        <>
            <div className="">
                <div className="font-bold">GroupCar</div>


                {groupCars.map((group, index) => (
                    <>
                        <ul key={index} className="float-left ">
                            <li>Group Car ID: {group.groupCarId}</li>
                            <li>Group Name: {group.groupName}</li>
                            <li>Start Point: {group.startPoint}</li>
                            <li>End Point: {group.endPoint}</li>
                            <li>Customer Id: {group.customerId}</li>
                            <li>Customer: {group.customerName}</li>

                            <li className="m-4">
                                <button
                                    onClick={() => {
                                        handleOnClick(group)
                                    }}
                                    className="border-black bg-slate-400 p-2">
                                    Join
                                </button>
                            </li>
                        </ul>
                    </>
                ))}


            </div>
            <div>
                Edit id<input
                value={value}
                type="number"
                onChange={(e)=>{
                    setValue(e.target.value)
                }}
                />
                <button onClick={handleOnClickEdit}>Enter</button>
            </div>
        </>
    )
}

export default Rooms