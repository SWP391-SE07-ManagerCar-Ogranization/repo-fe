import React from "react";
import Header from "../../layouts/Header";
import FooterWithSocialLinks from "../../layouts/Footer";
import Img1 from "../../assets/images/img-home-1.png";
import Img2 from "../../assets/images/img-home-2.png";
import Img3 from "../../assets/images/img-home-3.png";
import Img4 from "../../assets/images/img-home-4.png";
import Img5 from "../../assets/images/img-home-5.png";
import { Button } from "@material-tailwind/react";
import "./homepagecss.css";
function HomePage() {

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
