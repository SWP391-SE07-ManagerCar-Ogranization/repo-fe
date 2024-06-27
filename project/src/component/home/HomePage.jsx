import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header";
import "./style.css";
import FooterWithSocialLinks from "../../layouts/Footer";
import { Carousel, Image } from "antd";
import Bg1 from "../../assets/images/bg_tradition2.png";
import Bg2 from "../../assets/images/bg_tradition.png";
import Bg3 from "../../assets/images/xe2.jpg";
import { couponView } from "../../service/CouponService";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
  Alert,
} from "@material-tailwind/react";
import * as UserService from "../../service/UserService";

function HomePage() {

  const [visible, setVisible] = useState(false);
  const [coupons, setCoupons] = useState();
  const [change, setChange] = useState(false);
  const [profile, setProfile] = useState({});
  useEffect(() => {
    fetchProfileInfo();
    fetchCoupons();
    console.log(profile);
  }, [change]);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getYourProfile(token);
      setProfile(response.account);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  const fetchCoupons = async () => {
    try {
      const response = await couponView();
      setCoupons(response);
    } catch (error) {
      console.error('Error fetching profile information:', error);
    }
  };

  const getCoupon = async (couponId) => {
    try {
      // await setCouponCustomer(couponId, profile.accountId);
      setChange(!change);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <Carousel autoplay autoplaySpeed={3000}>
        <div
          className="w-max h-max">
        <Image
          preview={{ visible: false }}
          src={Bg1}
          onClick={() => setVisible(true)}
        />
        </div>
        <div
          className="w-max h-max">
        <Image
          preview={{ visible: false }}
          src={Bg1}
          onClick={() => setVisible(true)}
        />
        </div>
        <div className="w-max h-max">
        <Image
          preview={{ visible: false }}
          
          src={Bg1}
          onClick={() => setVisible(true)}
        />
        </div>
      </Carousel>

      <div style={{ display: "none" }}>
        <Image.PreviewGroup
          preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
        >
          <Image src={Bg1} />
          <Image src={Bg2}/>
          <Image src={Bg3}/>
        </Image.PreviewGroup>
      </div>

      {/* display coupon card */}
      {coupons >= 1 && (
        <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            COUPONS
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["coupon name", "coupon value", "quantity", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {coupons?.map(
                ({ couponId, couponName, couponValue, couponQuantity }, key) => {
                  const className = `py-3 px-5 ${
                    key === coupons.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={couponId}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {couponName}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {couponValue}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {couponQuantity}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      
                      <td className={className}>
                        <Typography
                          as="a"
                          className="text-xs font-semibold text-red-600"
                          onClick={() => getCoupon(couponId)}
                        >
                          Get
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      )}
      {/*  */}

      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-5">Book a Driver Easily</h2>
          <p className="text-lg mb-5">
            Reliable and professional drivers at your service, anytime,
            anywhere.
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-gray-200">
            Get Started
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto py-20">
        <h3 className="text-3xl font-bold text-center mb-10">Our Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-5 shadow-md rounded-lg text-center">
            <h4 className="text-2xl font-bold mb-3">City Rides</h4>
            <p>Comfortable city rides for your daily commute.</p>
          </div>
          <div className="bg-white p-5 shadow-md rounded-lg text-center">
            <h4 className="text-2xl font-bold mb-3">Outstation Trips</h4>
            <p>Book drivers for long distance travel at affordable rates.</p>
          </div>
          <div className="bg-white p-5 shadow-md rounded-lg text-center">
            <h4 className="text-2xl font-bold mb-3">Airport Transfers</h4>
            <p>On-time airport transfers with reliable drivers.</p>
          </div>
        </div>
      </section>

      <FooterWithSocialLinks />
    </>
  );
}

export default HomePage;
