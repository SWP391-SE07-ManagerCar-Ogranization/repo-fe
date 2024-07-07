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


import bg from '../../assets/images/bgChatbox2.jpg'

import {
    useState,
    useEffect,
    useContext
} from 'react'

import {
    useNavigate
} from 'react-router-dom'

import { ChatRoomContext } from '../../context/ChatRoomContext'

export default function ChatRoom({group, role}) {
    const navigate = useNavigate()
    const {theme, setTheme} = useContext(ChatRoomContext)
    const {setDisplayChatRoom} = theme


    // const location = useLocation();
    // const data = location?.state?.group;
    
    // const group = data?JSON.parse(JSON.stringify(data)):{}
   
  
    console.log("ROLE>>", role);
    console.log("GROUP_DATA>", group);

    const [groupData, setGroupData] = useState(group)
    

    useEffect(()=> {
        setTheme((prev)=> ({
            ...prev,
           groupData,
           setGroupData,
        
        })
        )
    }, [setTheme, groupData, setGroupData])



    return (
        <>
                {/* <CloseCircleFilled
                    className='absolute top-0 right-0 text-[1.5rem] cursor-pointer rotate-hover hover:text-gray-500 hover:transform-cpu'
                    onClick={() => {
                        window.history.back()
                    }}

                /> */}
                <div className='overflow-hidden absolute'>
                    <img src={bg} className=' relative opacity-100 h-screen w-screen z-0 object-cover' />
                    <div className='absolute top-[3rem] left-[8rem] bottom-[3rem] right-[8rem] bg-white max-h-full border z-10 rounded-2xl overflow-hidden shadow-black shadow-xl'>
                        <Row className='h-[50px]'>
                            <Col span={24} className=' border'>
                                <Row>
                                    <Col className='border h-[50px]' span={22}></Col>
                                    {role!="DRIVER"?   <Col span={2} className='flex justify-end h-[50px] pr-2 pt-2 items-start'>
                                        <CloseCircleFilled
                                            className='text-[1.5rem] cursor-pointer rotate-hover hover:text-gray-500 hover:transform-cpu'
                                            onClick={() => {
                                                setDisplayChatRoom(null)
                                            }}

                                        />
                                    </Col>:''}
                                 
                                </Row>
                            </Col>
                        </Row>

                        {/* bg-[#3f0e40] */}
                        <Row className='h-[calc(100vh-100px-3rem)]'>
                            <Col span={5} className='h-full bg-[hsl(215,43%,63%)]'><LeftSidebar/></Col>
                            <Col span={14} className='h-full shadow-inner'><Chatbox group={groupData} role={role}/></Col>
                            <Col span={5} className='h-full'><RightSidebar group={groupData} /></Col>
                        </Row>
                    </div>
                </div>
             
        </>
    )
}