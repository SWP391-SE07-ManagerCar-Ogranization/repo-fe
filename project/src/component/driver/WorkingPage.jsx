import { Breadcrumb, Layout, Space, Switch, theme } from "antd";
import React, { useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Header from "../../layouts/Header";
import { Content, Footer } from "antd/es/layout/layout";
import FooterWithSocialLinks from "../../layouts/Footer";
import * as UserService from "../../service/UserService";
import * as DriverService from "../../service/DriverService";
import { toast } from "react-toastify";

const WorkingPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [status, setStatus] = useState(false);
  useEffect(() => {
    const fetchStatusDriver = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await UserService.getYourProfile(token);
        setStatus(response.account.driverDetail.workingStatus);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchStatusDriver();
  }, []);

  const handleStatusChange = async (checked) => {
    setStatus(checked);
    try {
      await DriverService.setWorkingStatus(
        localStorage.getItem("token"),
        checked
      );
    toast.success("Update your working status !!");
    } catch (error) {
      toast.error("Error updating working status");
      setStatus(!checked);
    }
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
