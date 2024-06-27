import { Breadcrumb, Card, Layout, Modal, theme } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import { Content, Footer } from "antd/es/layout/layout";
import FooterWithSocialLinks from "../../layouts/Footer";
import { Link } from "react-router-dom";
import * as UserService from "../../service/UserService";
import * as TransactionService from "../../service/TransactionService";
import { Button } from "@material-tailwind/react";
import SystemCharge from "../payment/SystemCharge";

const WalletPage = () => {
  const [profileInfo, setProfileInfo] = useState({});
  const [transactions, setTransaction] = useState([]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const optionFormatDate = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  let optionFormatDateTime = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response.account);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };
  const fetchTransactionHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await TransactionService.getAllTransactionByAccount(
        token
      );
      setTransaction(response);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCharge, setShowCharge] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleToCharge = async () => {
    setShowCharge(!showCharge);
  };

  useEffect(() => {
    fetchProfileInfo();
    fetchTransactionHistory();
  }, [showCharge]);

  const breadcrumbItems = [
    {
      title: <Link to={"/"}>Home</Link>,
      key: "/",
    },
    {
      title: <Link to={"/profile"}>Profile</Link>,
      key: "/profile",
    },
    {
      title: "Wallet",
      key: "/wallet/your-wallet",
    },
  ];

  return (
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
          items={breadcrumbItems}
        >
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 1000,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div className="text-lg mb-2">
            Account balance:{" "}
            {`${profileInfo?.accountBalance?.toLocaleString("en-US")}₫`}
          </div>
          <Button
            className="bg-gradient-to-tr from-pink-500 hover:to-yellow-500"
            onClick={handleToCharge}
          >
            {showCharge ? <span>Hide</span> : <span>Deposit</span>}
          </Button>
          {showCharge && (
            <div className="flex justify-center">
              <SystemCharge />
            </div>
          )}
          <div className="text-lg mt-2">
            Transaction History:
            {transactions.map((transaction) => (
              <div key={transaction.systemTransactionId}>
                <Card
                  title="Deposit Cash"
                  bordered={false}
                  extra={
                    <button onClick={showModal} className="font-semibold">
                      Detail
                    </button>
                  }
                >
                  <div className="flex justify-between">
                    <span>
                      {new Date(transaction.createAt).toLocaleDateString(
                        "en-GB",
                        optionFormatDate
                      )}
                    </span>
                    <span className="text-green-600 font-semibold">
                      +{`${transaction?.amount?.toLocaleString("en-US")}₫`}
                    </span>
                  </div>
                </Card>
                <Modal
                  title="Basic Modal"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <p>
                    <span>Transaction ID: </span> {transaction?.systemTransactionId}
                  </p>
                  <p>
                    Status:{" "}
                    {transaction?.status ? (
                      <span className="text-green-500 font-semibold">True</span>
                    ) : (
                      <span className="text-red-500 font-semibold">False</span>
                    )}
                  </p>
                  <p>
                    Date:{" "}
                    {new Date(transaction.createAt).toLocaleDateString(
                      "en-GB",
                      optionFormatDateTime
                    )}
                  </p>
                  <p>
                    Amount: {`${transaction?.amount?.toLocaleString("en-US")}₫`}
                  </p>
                  <p>Content: {transaction?.content}</p>
                </Modal>
              </div>
            ))}
          </div>
        </div>
      </Content>
      <Footer>
        <FooterWithSocialLinks />
      </Footer>
    </Layout>
  );
};

export default WalletPage;
