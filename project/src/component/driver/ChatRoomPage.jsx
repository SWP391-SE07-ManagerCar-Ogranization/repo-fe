import { Breadcrumb, Layout, Space } from "antd";
import React, { useEffect, useState, useContext } from "react";
import Header from "../../layouts/Header";
import { Content, Footer } from "antd/es/layout/layout";
import FooterWithSocialLinks from "../../layouts/Footer";
import ChatRoom from "../ChatRoom";
import {
  getGroupsByDriverId
} from '../../service/GroupCarService'
import {
  ChatRoomContext
} from '../../context/ChatRoomContext'
import { useLocation } from 'react-router-dom';

const ChatRoomPage = () => {
  const location = useLocation();
  const newGroup = location.state?.newGroup;
  const {theme, setTheme} = useContext(ChatRoomContext)
  const {userData} = theme
const [groupCars, setGroupCars] = useState([])


  const getGroupsByDriverId_ = async () => {
    try {
      const data = await getGroupsByDriverId(newGroup?.customerId)
      setGroupCars(data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    getGroupsByDriverId_()
  },[])

  useEffect(()=> {
    setTheme((prev)=> ({
        ...prev,
        groupCars,
        setGroupCars,
    })
    )
}, [setTheme, groupCars, setGroupCars])



  return (
    <>
        <Layout>
        <Header />
        <Content
          style={{
            padding: "0 48px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Driver</Breadcrumb.Item>
            <Breadcrumb.Item>Chat</Breadcrumb.Item>
            <Breadcrumb.Item>{userData?.groupCarId}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 1000,
            }}
          >
            <Space>
              <ChatRoom role={"DRIVER"} group={newGroup}/>
            </Space>
          </div>
        </Content>
        <Footer>
          <FooterWithSocialLinks />
        </Footer>
      </Layout>
    </>
  );
};

export default ChatRoomPage;