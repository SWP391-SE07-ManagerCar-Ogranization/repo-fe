import React, { useContext } from 'react'
import {
    Row, Col, Image,
    Button
} from 'antd'
import {
    ChatRoomContext
} from '../../context/ChatRoomContext'
import DriverProfile from "../../component/AdminManager/DriverProfile";
import imageChat from "../../assets/images/avtchat.jpg"


export default function TripInfor({ group }) {
    const { theme, setTheme } = useContext(ChatRoomContext)
    console.table({ theme, group });
    const { startPoint, endPoint } = group
    const { driverDetail, userData } = theme

    return (
        <>
            <Row>
                <Col span={24} className='h-[3em] mt-2'><h1 className='font-sans font-bold'>{`GroupCar-${userData?.groupCarId}`}</h1></Col>

                <Col span={24} className='w-full'>
                    <Image
                        width={150}
                        height={150}
                        src={imageChat}
                    /></Col>
                <Col span={24}><span className='font-semibold'>Start Point:</span> {startPoint}</Col>
                <Col span={24}><span className='font-semibold'>End Point:</span> {endPoint}</Col>
                <Col span={24}><span className='font-semibold'>Driver:</span> {driverDetail != null ? driverDetail.name : 'No exist'} <Button><DriverProfile driver={driverDetail} /></Button> </Col>


            </Row>
        </>
    )
}