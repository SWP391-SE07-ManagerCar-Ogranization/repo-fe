import React from 'react'
import {
    Row, Col
} from 'antd'
import LeftSidebar from './LeftSidebar'
import Chatbox from './Chatbox'
import RightSidebar from './RightSidebar'
import {
    useLocation
} from 'react-router-dom'
import { CloseCircleFilled } from '@ant-design/icons'
import './Chatbox.module.css'
import { ThemeProvider } from '../../context/ChatRoomContext'


export default function ChatRoom() {
    const location = useLocation();
    const data = location.state?.group;
    const group = JSON.parse(JSON.stringify(data));
    console.log(group);


    return (
        <>
            <ThemeProvider>
                {/* <CloseCircleFilled
                    className='absolute top-0 right-0 text-[1.5rem] cursor-pointer rotate-hover hover:text-gray-500 hover:transform-cpu'
                    onClick={() => {
                        window.history.back()
                    }}

                /> */}
                <div className='mt-[3rem] ml-[3rem] mr-[3rem] max-h-full border border-black rounded-2xl overflow-hidden'>
                    <Row className='h-[50px]'>
                        <Col span={24} className=' border border-black'>
                            <Row>
                                <Col className='border border-black h-[50px]' span={22}></Col>
                                <Col span={2} className='flex justify-end h-[50px] pr-2 pt-2 items-start'>
                                    <CloseCircleFilled
                                        className='text-[1.5rem] cursor-pointer rotate-hover hover:text-gray-500 hover:transform-cpu'
                                        onClick={() => {
                                            window.history.back()
                                        }}

                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    {/* bg-[#3f0e40] */}
                    <Row className='h-[calc(100vh-100px-3rem)]'>
                        <Col span={5} className='h-full bg-[#3f0e40]'><LeftSidebar /></Col>
                        <Col span={14} className='h-full'><Chatbox group={group} /></Col>
                        <Col span={5} className='h-full'><RightSidebar group={group} /></Col>
                    </Row>
                </div>
            </ThemeProvider>


        </>
    )
}