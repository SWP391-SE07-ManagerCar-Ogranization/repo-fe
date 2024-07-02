import React, { useContext } from "react";
import {
    Avatar,
    Typography,
    Button
} from 'antd'
import {
    ChatRoomContext
} from '../../context/ChatRoomContext'

export default function UserInfor() {
    const {theme, setTheme} = useContext(ChatRoomContext)

    return (
            <div className="flex justify-between pb-[12px] pt-[12px] pl-[16px] pr-[16px]">
                <div>
                    <Avatar 
                        className="bg-white text-black"
                        style={{
                            borderBottom: '1px solid rgba(82, 38, 82)'
                        }}
                    >A</Avatar>
                    <Typography.Text className="text-white ml-[5px]" >ABC</Typography.Text>
                </div>
                <Button ghost>Out Group</Button>
            </div>
    )
}