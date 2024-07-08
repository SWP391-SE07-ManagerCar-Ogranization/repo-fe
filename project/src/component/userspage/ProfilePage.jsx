import React, { useState, useEffect } from "react";
import * as UserService from "../../service/UserService";
import { Link } from "react-router-dom";
import { Button, Card, Col, Empty, Image, Modal } from "antd";
function ProfilePage() {
  const [profileInfo, setProfileInfo] = useState({});
  const [feedback, setFeedback] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response.account);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  const fetchProfileFeedback = async () => {
    try {
      const response = await UserService.getFeedbackProfileDriver(
        profileInfo.accountId
      );
      setFeedback(response);
    console.log(profileInfo);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  const showLoading = () => {
    setOpen(true);
    setLoading(true);
    fetchProfileFeedback();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <section className="bg-gradient-to-r from-red-50 via-red-200 to-red-400 h-screen">
      <Modal bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(90vh - 200px)' }}
        title={<p>Loading Modal</p>}
        footer={
          <Button type="primary" onClick={showLoading}>
            Reload
          </Button>
        }
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        {(feedback && feedback.length > 0) ? feedback?.map((feed, index) => (
          <Col key={index}>
            <Card title={feed?.customer?.account?.name} bordered={false}>
              {feed.feedbackContent}
            </Card>
          </Col>
        )) : <Empty/>}
      </Modal>
      <div className="px-0 py-10 mx-auto max-w-7xl sm:px-4">
        <div className="w-full px-4 pt-5 pb-6 mx-auto mt-8 mb-6 rounded-none shadow-xl sm:rounded-lg sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 sm:px-6">
          <h1 className="mb-4 text-lg font-semibold text-center text-gray-600">
            Profile Information
          </h1>
          <div className="mb-8 space-y-4">
            <div style={{ textAlign: "center" }}>
              {" "}
              <Image width={200} height={200} src={profileInfo?.image} />
            </div>
            <div>Name: {profileInfo?.name}</div>
            <div>Email: {profileInfo?.email}</div>
            <div>Balance: {profileInfo?.accountBalance?.toLocaleString("en-US")}đ</div>
            <div>Address: {profileInfo?.address}</div>
            <div>Date of birth: {profileInfo?.dob}</div>
            <div className="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 sm:px-6 text-gray-400 flex justify-normal">
              <Button>
                <Link to={`/update-user/${profileInfo?.accountId}`}>
                  Update This Profile
                </Link>
              </Button>
              <Button onClick={showLoading}>View Feedback</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
