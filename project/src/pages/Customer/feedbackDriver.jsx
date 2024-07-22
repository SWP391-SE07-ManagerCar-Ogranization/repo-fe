import { React, useState, useEffect } from "react";
import {  Modal, Breadcrumb, Layout, Space, Button } from "antd";
import Header from "../../layouts/Header";
import { Content, Footer } from "antd/es/layout/layout";
import FooterWithSocialLinks from "../../layouts/Footer";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Input,
} from "@material-tailwind/react";
import { addFeedback } from "../../service/FeedbackService";
import { notification } from "antd";
import { toast } from "react-toastify";
import { getAccountById } from "../../service/AccountService";
import { useNavigate, useParams } from "react-router-dom";

function FeedbackDriver() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [driver, setDriver] = useState({});
  const [hover, setHover] = useState(0);
  const [api, contextHolder] = notification.useNotification();
  const {driverId} = useParams();
  const feedbacks = [
    "Excellent service",
    "punctual",
    "Very friendly",
    "Very late",
    "Unfriendly driver",
    "Other",
  ];

  const handleAddFeedback = async () => {
    const feedbackObject = {
      driverDetailId: driverId,
      feedbackContent: feedback === "Other" ? "" : feedback,
      rating: rating,
    };
    const data = await addFeedback(feedbackObject);
    if (data) {
      toast.success("Send feedback successful !");
      navigate("/");
    } else {
      toast.error("ERROR");
    }
  };

  const getDriverById_ = async () => {
    try {
      const driver = await getAccountById(driverId);
      setDriver(driver);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getDriverById_();
    console.log(driverId);
  }, []);

  return (
    <div>
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
            <Breadcrumb.Item>Feedback</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 1000,
            }}
          >
            <Space>
              <Modal
                wrapClassName="backdrop-blur-md"
                title={
                  <p className="flex justify-center font-semibold">
                    FEEDBACK DRIVER
                  </p>
                }
                open={true}
                footer={
                  <Button
                    onClick={() => {
                      console.log(1);
                      handleAddFeedback();
                    }}
                    type="primary"
                    className="bg-blue-gray-400 text-black font-semibold hover:bg-blue-gray-600"
                  >
                    Submit
                  </Button>
                }
              >
                <Card>
                  <CardBody>
                    <div className="mb-10 items-center justify-between gap-6">
                      <div className="flex justify-center gap-6">
                        <Avatar
                          src={driver?.image}
                          alt={driver?.name}
                          size="xl"
                          variant="rounded"
                          className="rounded-lg shadow-lg shadow-blue-gray-300"
                        />
                      </div>
                      <div>
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="mb-1 flex justify-center mt-3"
                        >
                          {driver?.name}
                        </Typography>
                        <Typography
                          variant="small"
                          className="flex justify-center font-normal text-blue-gray-600"
                        >
                          {driver?.email}
                        </Typography>
                      </div>
                      <div className="mt-2">
                        <div className="">
                          <div className="">
                            <div className="flex justify-center">
                              <div className="star-rating">
                                {[...Array(5)].map((star, index) => {
                                  index += 1;
                                  return (
                                    <button
                                      type="button"
                                      key={index}
                                      className={
                                        index <= (hover || rating)
                                          ? "on"
                                          : "off"
                                      }
                                      onClick={() => setRating(index)}
                                      onMouseEnter={() => setHover(index)}
                                      onMouseLeave={() => setHover(rating)}
                                    >
                                      <span className="star">&#9733;</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 justify-center mt-3">
                            {feedbacks.map((item) => (
                              <Button
                                className={`w-[10rem] font-sans ${
                                  feedback === item ? "bg-blue-gray-400" : ``
                                }`}
                                onClick={() => {
                                  setFeedback(item);
                                  item === "Other" && setShow(!show);
                                }}
                              >
                                {item}
                              </Button>
                            ))}
                          </div>
                          {show && (
                            <div className="flex justify-center mt-4">
                              <Input
                                type="email"
                                color="blue-gray"
                                label="Feedback"
                                onChange={(e) => {
                                  e.preventDefault();
                                  setFeedback(e.target.value);
                                }}
                              ></Input>
                            </div>
                          )}
                        </div>

                        <div className="border-t-2 border-blue-gray-400 w-[20%] flex m-auto mt-6" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Modal>
            </Space>
          </div>
        </Content>
        <Footer>
          <FooterWithSocialLinks />
        </Footer>
      </Layout>

      {contextHolder}
    </div>
  );
};
export default FeedbackDriver;
