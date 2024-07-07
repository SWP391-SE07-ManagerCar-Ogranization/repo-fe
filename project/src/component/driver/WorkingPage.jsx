import { Breadcrumb, Layout, Space, Switch, theme } from "antd";
import React, { useEffect, useState} from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Header from "../../layouts/Header";
import { Content, Footer } from "antd/es/layout/layout";
import FooterWithSocialLinks from "../../layouts/Footer";
import * as UserService from "../../service/UserService";
import * as DriverService from "../../service/DriverService";
import { toast } from "react-toastify";
import { getCurrentLocation } from "../../service/PositionService";
import { getUserTransactionByDriverInfo, getUserTransactionGroupCarByDriverInfo } from "../../service/TransactionService";
import { Button } from "@material-tailwind/react";
import { Card } from 'antd';
import { getName } from "../../service/CustomerService";

const WorkingPage = () => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [status, setStatus] = useState(false);
  const [location, setLocation] = useState({ lat: "", lon: "" });
  useEffect(() => {
    fetchStatusDriver();
    showCurrentLocation();
    fetchInfoUserTransaction();
    fetchTransactionGroupCar();
    console.log(transactionGroupCar);
  }, []);

  const fetchStatusDriver = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getYourProfile(token);
      setStatus(response.account.driverDetail.workingStatus);
    } catch (error) {
      toast.error("Error fetching user data:", error);
    }
  };
  const showCurrentLocation = async () => {
    try {
      const location = await getCurrentLocation();
      setLocation({ lat: location[0], lon: location[1] });
      return location;
    } catch (error) {
      toast.error("Error getting location:", error);
    }
  };

  const handleStatusChange = async (checked) => {
    setStatus(checked);
    try {
      await DriverService.setWorkingStatus(
        localStorage.getItem("token"),
        checked,
        location.lat,
        location.lon
      );
      toast.success("Update your working status !!");
    } catch (error) {
      toast.error("Error updating working status");
      setStatus(!checked);
    }
  };

  const [infoTransactions, setInfoTransactions] = useState([
    { invoice: {}, userTransaction: {}, nameCustomer: "" },
  ]);
  const [transactionGroupCar, setTransactionGroupCar] = useState([
    { groupCar: {}, userTransactions: []},
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
  const fetchTransactionGroupCar = async () => {
    try {
      const response = await getUserTransactionGroupCarByDriverInfo(localStorage.getItem("token"));
      setTransactionGroupCar(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const tabList = [
    {
      key: "Invoice",
      tab: "Invoice",
    },
    {
      key: "Transaction",
      tab: "Transaction",
    },
  ];
  const tabListGroup = [
    {
      key: "Group",
      tab: "Group",
    },
    {
      key: "Transaction",
      tab: "Transaction",
    },
  ];

  let optionFormatDateTime = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const handleConfirmInvoice = async (id) => {
    try {
        const response = await DriverService.updateTripFinished(localStorage.getItem("token"), id);
        if (response.toLowerCase().includes("Finished".toLowerCase())) {
          fetchInfoUserTransaction();
          toast.success(response);
        }
        else {
          toast.error(response);
        }
    } catch (error) {
      toast.error("Error checkin invoice");
    }
  };

  const handleConfirmGroupCar = async (id) => {
    try {
        const response = await DriverService.updateGroupCarFinished(localStorage.getItem("token"), id);
        if (response.toLowerCase().includes("Finished".toLowerCase())) {
          fetchInfoUserTransaction();
          toast.success(response);
        }
        else {
          toast.error(response);
        }
    } catch (error) {
      toast.error("Error checkin invoice");
    }
  };

  const contentList = (infoTransaction) => {
    console.log(infoTransaction);
    return {
      Invoice: (
        <div className="flex justify-between">
          <div>
            <p>Start Point: {infoTransaction.invoice.startPoint}</p>
            <p>End Point: {infoTransaction.invoice.endPoint}</p>
            <p>
              Time Start:{" "}
              {new Date(
                infoTransaction?.invoice?.timeStart
              )?.toLocaleDateString("en-GB", optionFormatDateTime)}
            </p>
          </div>
          <div>
            <Button className="flex items-center gap-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleConfirmInvoice(infoTransaction.invoice.invoiceId)}>
              <CheckOutlined />
              Confirm
            </Button>
          </div>
        </div>
      ),
      Transaction: (
        <div>
          <p>
            Amount:{" "}
            {`${infoTransaction?.userTransaction?.amount?.toLocaleString(
              "en-US"
            )}₫`}
          </p>
          <p>
            Status:{" "}
            {infoTransaction.userTransaction.transactionStatus ? (
              <span className="text-green-500 font-semibold">Paid</span>
            ) : (
              <span className="text-red-500 font-semibold">Unpaid</span>
            )}
          </p>
          <p>
            Create At:{" "}
            {new Date(
              infoTransaction.userTransaction.createAt
            ).toLocaleDateString("en-GB", optionFormatDateTime)}
          </p>
          <p>Payment Method: {infoTransaction.userTransaction.paymentMethod}</p>
        </div>
      ),
    };
  };
  const contentListGroup = (infoTransaction) => {
    console.log(infoTransaction);
    return {
      Group: (
        <div className="flex justify-between">
          <div>
            <p>Start Point: {infoTransaction.groupCar.startPoint}</p>
            <p>End Point: {infoTransaction.groupCar.endPoint}</p>
            <p>
              Time Start:{" "}
              {new Date(
                infoTransaction?.groupCar?.timeStart
              )?.toLocaleDateString("en-GB", optionFormatDateTime)}
            </p>
          </div>
          <div>
            <Button className="flex items-center gap-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleConfirmGroupCar(infoTransaction.groupCar.groupId)}>
              <CheckOutlined />
              Confirm
            </Button>
          </div>
        </div>
      ),
      Transaction: (
        infoTransaction.userTransactions.map((userTransactionDetail, index) => (
          <div key={index}>
            <p>
            Amount:{" "}
            {`${userTransactionDetail?.amount?.toLocaleString(
              "en-US"
            )}₫`}
          </p>
          <p>
            Status:{" "}
            {userTransactionDetail.transactionStatus ? (
              <span className="text-green-500 font-semibold">Paid</span>
            ) : (
              <span className="text-red-500 font-semibold">Unpaid</span>
            )}
          </p>
          <p>
            Create At:{" "}
            {new Date(
              userTransactionDetail.createAt
            ).toLocaleDateString("en-GB", optionFormatDateTime)}
          </p>
          </div>
        ))
      ),
    };
  };

  const [activeTabKey, setActiveTabKey] = useState("Invoice");
  const [activeTabKeyGroup, setActiveTabKeyGroup] = useState("Group");
  const onTabChange = (key) => {
    setActiveTabKey(key);
  };
  const onTabGroupChange = (key) => {
    setActiveTabKeyGroup(key);
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
            <Space>
              <div>Working Status:</div>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                checked={status}
                onChange={handleStatusChange}
              />
            </Space>
            {infoTransactions?.map((infoTransaction, index) => (
              (!infoTransaction.invoice.finish) && (<div key={index}>
                <Card
                  style={{
                    width: "100%",
                  }}
                  title={`Customer: ` + infoTransaction.nameCustomer}
                  extra={<a href="#">Show Map</a>}
                  tabList={tabList}
                  activeTabKey={activeTabKey}
                  onTabChange={onTabChange}
                >
                  {[contentList(infoTransaction)[activeTabKey]]}
                </Card>
              </div>)
            ))}
            {transactionGroupCar.map((infoTransaction, index) => (
              (!infoTransaction.groupCar.finish) && (<div key={index}>
                <Card
                  style={{
                    width: "100%",
                  }}
                  title="GROUP CAR"
                  extra={<a href="#">Show Map</a>}
                  tabList={tabListGroup}
                  activeTabKey={activeTabKeyGroup}
                  onTabChange={onTabGroupChange}
                >
                  {[contentListGroup(infoTransaction)[activeTabKeyGroup]]}
                </Card>
              </div>)
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

export default WorkingPage;
