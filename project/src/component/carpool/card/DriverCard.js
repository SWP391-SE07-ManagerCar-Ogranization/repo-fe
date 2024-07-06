import React from 'react';
import {useState} from 'react'
import { Button, Modal } from 'antd';
const DriverCard = () => {
  const [modal, contextHolder] = Modal.useModal();
  const [driverDetail, setDriverDetail] = useState({name: "Nguyen Duc Thinh", phone: "0703224025"})
  const countDown = () => {
    
    const instance = modal.success({
      
      title: `Name : ${driverDetail.name}`,
      content: `Phone : ${driverDetail.phone}`,

    });
    
    
  };
  return (
    <>
      <Button onClick={countDown}>Open modal to close in 5s</Button>
      {contextHolder}
    </>
  );
};
export default DriverCard;