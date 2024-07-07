import { Breadcrumb, Card, Layout, theme } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import { Content, Footer } from "antd/es/layout/layout";
import FooterWithSocialLinks from "../../layouts/Footer";
import { getUserTransactionByDriverInfo } from "../../service/TransactionService";

const TrackRevenuePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    fetchInfoUserTransaction();
  }, []);


  const [infoTransactions, setInfoTransactions] = useState([
    { invoice: {}, userTransaction: {}, nameCustomer: "" },
  ]);
  const fetchInfoUserTransaction = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await getUserTransactionByDriverInfo(token);
      setInfoTransactions(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  let optionFormatDateTime = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

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
            <Breadcrumb.Item>Working</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 1000,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {infoTransactions.map((infoTransaction, index) => (
              (infoTransaction.userTransaction.transactionStatus) && <div key={index}>
              <Card
                style={{
                  width: "100%",
                }}
                title={infoTransaction.nameCustomer + ` send to your account: `}
              >
                  <div className="flex justify-between">
                  <p>
                    {new Date(
                      infoTransaction.userTransaction.createAt
                    ).toLocaleDateString("en-GB", optionFormatDateTime)}
                  </p>
                  <p className="text-green-500 font-semibold">
                    {"+"}
                    {`${infoTransaction?.userTransaction?.amount?.toLocaleString(
                      "en-US"
                    )}₫`}
                  </p>
                </div>
              </Card>
            </div>
            ))}
          </div>
        </Content>
        <Footer>
          <FooterWithSocialLinks />
        </Footer>
      </Layout>
    </>
  );
};

export default TrackRevenuePage;
