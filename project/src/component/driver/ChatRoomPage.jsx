import { Breadcrumb, Layout, Space, Switch, theme } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Header from "../../layouts/Header";
import { Content, Footer } from "antd/es/layout/layout";
import FooterWithSocialLinks from "../../layouts/Footer";
import * as UserService from "../../service/UserService";
import * as DriverService from "../../service/DriverService";
import { toast } from "react-toastify";
import { getCurrentLocation } from "../../service/PositionService";
import ChatRoom from "../ChatRoom";
import {
  getGroupsByDriverId
} from '../../service/GroupCarService'
import {
  ChatRoomContext
} from '../../context/ChatRoomContext'

const ChatRoomPage = () => {
  const {theme, setTheme} = useContext(ChatRoomContext)
  const {userData, setRole, role} = theme
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();
const [groupCars, setGroupCars] = useState([])

const newGroup = {
    groupCarId: 2,
    customerId: 3,
    groupName: `GroupCar-1`,
    startPoint: 'startPoint',
    endPoint: 'endPoint',
  }

  // const privateChat = [
  //   {
      
  //   }
  // ]

  const getGroupsByDriverId_ = async () => {
    try {
      const data = await getGroupsByDriverId(3)
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
            //   background: colorBgContainer,
            //   borderRadius: borderRadiusLG,
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
