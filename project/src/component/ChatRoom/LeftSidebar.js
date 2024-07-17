import React from 'react'
import {
    Row, Col,
    Avatar,
    Typography,
    Button
} from 'antd'
import UserInfor from './UserInfor'
import RoomList from './RoomList'


export default function LeftSidebar() {
    return (
        <>
                <Row>
                    <Col span={24}><UserInfor /></Col>
                    <Col span={24}><RoomList /></Col>
                </Row>
        </>
    )
}