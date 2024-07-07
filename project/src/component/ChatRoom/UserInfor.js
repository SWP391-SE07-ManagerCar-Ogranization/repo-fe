import React, { useContext } from "react";
import {
    Avatar,
    Typography,
    Button
} from 'antd'
import {
    ChatRoomContext
} from '../../context/ChatRoomContext'
import Swal from "sweetalert2";
import {
    outGroup
} from '../../service/GroupCarService'
import {
    useNavigate
} from 'react-router-dom'

export default function UserInfor() {
    const navigate = useNavigate()
    const { theme, setTheme } = useContext(ChatRoomContext)
    const { userDataFull, groupData, setGroupData, groupCars, setGroupCars ,setDisplayChatRoom} = theme

    const handleOutGroup = (customerId, groupCarId) => {
        try {
            outGroup_(customerId, groupCarId)
            setDisplayChatRoom(null)
        } catch (error) {
            
        }
    }

    const outGroup_ = async(customerId, groupCarId) => {
        try {
            await outGroup(customerId, groupCarId);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex justify-between pb-[12px] pt-[12px] pl-[16px] pr-[16px]">
            <div>
                <Avatar
                    className="bg-white text-black"
                    style={{
                        // borderBottom: '1px solid rgba(82, 38, 82)'
                    }}
                >{userDataFull?.name}</Avatar>
                <Typography.Text className="text-white ml-[5px]" >{userDataFull?.name}</Typography.Text>
            </div>
            <Button
                ghost
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
                            
                            handleOutGroup(groupData?.customerId, groupData?.groupCarId)
                        }
                    });
                }
                }
            >
                Out Group

            </Button>
        </div>
    )
}