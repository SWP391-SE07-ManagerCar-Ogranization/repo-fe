import React, { useContext } from 'react'
import {
    Row, Col
} from 'antd'
import TripInfor from './TripInfor'
import {
    ChatRoomContext
} from '../../context/ChatRoomContext'
import {
    Button,
    Avatar,
    Tooltip,
    Input,
    Typography,
    message
} from 'antd'
import {
    TeamOutlined,
    PlusOutlined
} from '@ant-design/icons'


export default function RightSidebar({ group }) {
    const { theme, setTheme } = useContext(ChatRoomContext)

    return (
        <>
            <div className=' h-full border overflow-hidden'>
                <Row>
                    <Col span={24} className=' h-[50vh] p-[10px]'><TripInfor group={group} /></Col>
                    <Col span={24} className='border p-[10px]'>
                        <div className='flex flex-col justify-center mb-[12px]'>
                            <div className='m-0 font-bold '>
                                <TeamOutlined className='text-[20px] mr-1'/>
                                <span>People</span>
                            </div>
                        </div>
                        <div className='flex items-end mb-[8px]'>
                           
                            <Avatar.Group size='small' maxCount={8}>
                                {theme?.customers?.map((customer, index) => (
                                    <Tooltip key={index} title={customer.name} >
                                        <Avatar
                                            style={{ backgroundColor: 'gray' }}
                                            className='mr-0.5 size-8'
                                        >{customer.name} </Avatar>
                                    </Tooltip>

                                ))}

                            </Avatar.Group>
                        </div>
                        <Button type='text'><PlusOutlined /> Add people</Button>
                    </Col>
                    <Col span={24}></Col>
                </Row>
            </div >
        </>
    )
}