import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
const Success = () => {

  return (
    <>
    <Result
    status="success"
    title="Successfully Added Money Into Your Wallet!"
    // fix name of subtitle is order id
    subTitle="Cloud server configuration takes 1-5 minutes, please wait."
    extra={[
      <Button type="primary" key="console">
        <Link to={"/wallet/your-wallet"}>Go Console Wallet</Link>
      </Button>,
      <Button key="buy"><Link to={"/wallet/add-money-to-balance"}>Buy Again</Link></Button>,
    ]}
  />
  </>
  )
}
export default Success;