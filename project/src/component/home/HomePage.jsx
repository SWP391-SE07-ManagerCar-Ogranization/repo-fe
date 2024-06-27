<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React from "react";
>>>>>>> origin/dev
import Header from "../../layouts/Header";
import FooterWithSocialLinks from "../../layouts/Footer";
<<<<<<< HEAD
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

=======
import Img1 from "../../assets/images/img-home-1.png";
import Img2 from "../../assets/images/img-home-2.png";
import Img3 from "../../assets/images/img-home-3.png";
import Img4 from "../../assets/images/img-home-4.png";
import Img5 from "../../assets/images/img-home-5.png";
import { Button } from "@material-tailwind/react";
import "./homepagecss.css";
function HomePage() {

>>>>>>> origin/dev
  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 p-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 font-volkhov">
              Get started your{" "}
              <span class="text-orange-500">exciting journey</span> with us.
            </h1>
            <p className="text-lg mb-6">
              A team of experienced tourism professionals will provide you with
              the best advice and tips for your desired place.
            </p>
            <Button className="px-6 py-3 border border-orange-500 text-orange-500 bg-white rounded hover:bg-orange-500 hover:text-white transition font-semibold">
              Discover Now
            </Button>
          </div>
          <div className="lg:w-1/2 p-4">
            <img src={Img1} className="w-full" alt="Journey" />
          </div>
        </div>
      </div>

<<<<<<< HEAD
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
=======
      <div class="container mx-auto flex flex-col lg:flex-row items-center">
        <div class="lg:w-1/2 p-16 relative">
          <div className="absolute -top-3">
            <p class="text-xl text-gray-600 uppercase mb-2 font-casanova">
              WE OFFER YOU AN EXCLUSIVE, EXECUTIVE EXPERIENCE
            </p>
            <h2 class="text-3xl lg:text-4xl font-bold mb-4 font-casanova">
              WITH THE MOST SUITABLE RATES AND EXCEPTIONAL SERVICE
            </h2>
          </div>
          <img src={Img3} alt="Car" class="w-full mt-4" />
        </div>
        <div class="lg:w-1/2 p-4 px-10">
          <img src={Img2} alt="Luxury Car" class="w-full mb-6 -mt-40" />
          <p class="text-lg font-semibold mb-2 font-casanova">
            TRUSTED, PREMIUM SERVICE with PREMIUM NEW CARS.
>>>>>>> origin/dev
          </p>
          <p class="text-md mb-6 text-justify">
            When it comes to choosing an exotic car we provide you with first
            class service. FLORIDA PREMIUM LIMO provides exceptional customer
            service and cost-effective on the finest quality, and elite brand
            fleet. We offer appropriate prices on all Premium cars.
          </p>
          <div className="flex flex-col">
            <button className="py-3 relative transition duration-30 custom-underline font-bold w-fit font-casanova">
              GET A QOUTE
            </button>
            <br></br>
            <button class=" py-3 relative transition duration-30 custom-underline font-bold w-fit font-casanova">
              BOOK NOW
            </button>
          </div>
        </div>
      </div>

      {/* Section 3 */}

      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-start">
          <div className="lg:w-1/2 p-20 ml-10">
            <h2 className="text-4xl font-bold mb-4 text-[#778892] font-casanova">
              PROFESSIONAL CHAUFFEUR
            </h2>
            <p className="mb-4 text-justify md:text-left text-sm md:text-base">
              Renting a chauffeur driven car can give your journey an ultimate
              upgrade, whether you're traveling for business or pleasure.
            </p>
            <div className="flex flex-col">
              <button className="py-3 relative transition duration-30 custom-underline font-bold w-fit font-casanova">
                GET A QOUTE
              </button>
              <br></br>
              <button class=" py-3 relative transition duration-30 custom-underline font-bold w-fit font-casanova">
                BOOK NOW
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 p-4">
            <img src={Img4} className="w-full" alt="Journey" />
          </div>
        </div>
      </div>
      {/* Section 4 */}
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 p-4">
            <img src={Img5} className="w-full" alt="Journey" />
          </div>
          <div className="lg:w-1/2 p-16">
            <h2 className="text-2xl font-bold mb-4 text-[#778892] font-casanova">
              PREMIUM COMFORT
            </h2>
            <p className="mb-4 text-center md:text-left">
              There is no expectation left unfulfilled. With unmatched interior,
              prestige and extraordinary amenities our premium black cars are
              equipped with a variety of available options. FLORIDA PREMIUM LIMO
              has luxurious leather interiors. Additional features include a CD
              Sound System, Flat Screen TV & DVD and tinted windows for privacy.
            </p>
            <div className="flex flex-col">
              <button className="py-3 relative transition duration-30 custom-underline font-bold w-fit font-casanova">
                GET A QOUTE
              </button>
              <br></br>
              <button class=" py-3 relative transition duration-30 custom-underline font-bold w-fit font-casanova">
                BOOK NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* section 5 */}
      <div className="flex flex-col items-center justify-center py-28 px-4 md:px-12 bg-white text-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#778892] font-casanova">
          PASSENGER SAFETY<br></br>IS OUR PRIORITY
        </h2>
        <p className="text-center text-sm md:text-base max-w-2xl py-28">
          We always have clean vehicles and we are taking extra steps to make
          sure that all interior surfaces are being thoroughly cleaned with
          proper sanitization. All our drivers wear masks and each car has hand
          sanitizer.
        </p>
      </div>
      <FooterWithSocialLinks />
    </>
  );
}

export default HomePage;
