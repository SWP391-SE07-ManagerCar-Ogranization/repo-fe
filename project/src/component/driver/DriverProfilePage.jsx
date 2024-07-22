import { Breadcrumb, Layout, theme } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import FooterWithSocialLinks from "../../layouts/Footer";
import * as UserService from "../../service/UserService";
import { toast } from "react-toastify";
import Header from "../../layouts/Header";
import { Button } from "@material-tailwind/react";

const DriverProfilePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [profileInfo, setProfileInfo] = useState({
    accountId: "",
    name: "",
    image: "",
    phone: "",
    address: "",
    dob: "",
    idCard: "",
    driverDetail: {
      driverLicence: "",
      vehicleNumber: "",
      totalRating: "",
      rating: "",
    },
  });
//   const [feedback, setFeedback] = useState();
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      handleOnSubmitImg(e);
      const res = await UserService.updateUser(
        profileInfo.accountId,
        profileInfo,
        token
      );
      console.log(res);
      toast.success("Update Sucessfully !");
    } catch (error) {
      toast.error("Fail to upload");
      console.error("Error updating user profile:", error);
    }
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

  function handleOnChangeImg(changeEvent) {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setProfileInfo((prev) => ({
        ...prev,
        image: onLoadEvent.target.result,
      }));
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  const handleOnSubmitImg = async (event) => {
    try {
      const form = event.currentTarget;
      const fileInput = Array.from(form.elements).find(
        ({ name }) => name === "file"
      );
      const formData = new FormData();
      for (const file of fileInput.files) {
        formData.append("file", file);
      }
      formData.append("upload_preset", "ml_default");
      const data = await fetch(
        "https://api.cloudinary.com/v1_1/dxge4xlbh/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());
      console.log(data);
      setProfileInfo((prev) => ({
        ...prev,
        image: data.url,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const fieldParts = name.split('.');
    if (fieldParts.length === 2) {
      setProfileInfo((prevUserData) => ({
        ...prevUserData,
        driverDetail: {
          ...prevUserData.driverDetail,
          [fieldParts[1]]: value
        }
      }));
    } else {
      setProfileInfo((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
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
              minHeight: 550,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-row divide-x divide-gray-200 bg-white shadow-lg rounded-lg"
            >
              <div className="flex flex-col items-center p-4 w-1/2">
                <label className="relative group">
                  <img
                    className="w-48 h-48 rounded-full"
                    src={profileInfo.image}
                    alt={profileInfo.name}
                  />
                  <input
                    type="file"
                    id="uploadFile1"
                    className="hidden"
                    onChange={handleOnChangeImg}
                  />
                  <div className="absolute rounded-full w1/2 mx-auto inset-0 flex items-center justify-center bg-gray-800 bg-opacity-0 text-white opacity-0 group-hover:opacity-100 group-hover:bg-opacity-75 transition-opacity duration-300">
                    Upload
                  </div>
                </label>
                <h2 className="text-2xl font-semibold">{profileInfo.name}</h2>
                <p className="text-gray-600">DRIVER</p>
                <div className="text-yellow-400 text-lg">★ ★ ★ ★ ☆</div>
              </div>
              <div className="flex flex-col p-4 w-1/2 space-y-4">
                <div className="flex justify-between">
                  <div className="w-80">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Full Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="name"
                      value={profileInfo.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-80">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Phone
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      name="phone"
                      value={profileInfo.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Address
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="address"
                    value={profileInfo.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Id Card
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="idCard"
                    value={profileInfo.idCard}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-between">
                  <div className="w-80">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Vehicle Number
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="driverDetail.vehicleNumber"
                      value={profileInfo.driverDetail.vehicleNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-80">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                      Driver Licence
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="driverDetail.driverLicence"
                      value={profileInfo.driverDetail.driverLicence}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Date of Birth
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleInputChange}
                    value={profileInfo.dob}
                    name="dob"
                    type="date"
                  />
                </div>
                <Button
                  color="orange"
                  buttonType="filled"
                  size="regular"
                  rounded={false}
                  block={false}
                  iconOnly={false}
                  ripple="light"
                  type="submit"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </Content>
        <Footer>
          <FooterWithSocialLinks />
        </Footer>
      </Layout>
    </>
  );
};

export default DriverProfilePage;
