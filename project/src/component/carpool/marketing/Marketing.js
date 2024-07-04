import React from 'react'
import { FaCarSide } from "react-icons/fa";
import AirportCar from 'D:/fpt/SWP/fcar/front-end/project/src/assets/images/airportCar.jpg'
import Marketing2 from 'D:/fpt/SWP/fcar/front-end/project/src/assets/images/marketing2.jpg'
import Marketing3 from 'D:/fpt/SWP/fcar/front-end/project/src/assets/images/marketing3.jpg'
const Marketing = () => {
  return (
    <div className="w-full py-8 px-4 bg-white mt-0">
        
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
                <div className="flex items-center mb-4">
                    <FaCarSide className="text-2xl text-orange-500 mr-2" />
                    <h1 className="text-3xl font-bold text-gray-800">XE SÂN BAY</h1>
                </div>
                <p className="text-gray-600 text-lg">
                  Đón tiễn sân bay là sản phẩm có thế mạnh của Đi chung. Chúng tôi có mặt trên tất cả các sân bay trên cả nước và cả các sân bay ở nước ngoài. Bạn càng đặt sớm thì giá càng tiết kiệm. Đón tiễn tận nơi nhưng giá chỉ bằng đi xe buýt.
                </p>
            </div>
            <div className="flex justify-center items-center hover:scale-105 duration-300 shadow-xl">
                <img src={AirportCar} alt="Xe sân bay" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
        </div>
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8 py-12">
            <div className="flex justify-center items-center hover:scale-105 duration-300 shadow-xl">
                <img src={Marketing2} alt="Xe sân bay" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
            <div className="flex flex-col justify-center">
                <div className="flex items-center mb-4">
                    <FaCarSide className="text-2xl text-orange-500 mr-2" />
                    <h1 className="text-3xl font-bold text-gray-800">XE ĐƯỜNG DÀI</h1>
                </div>
                <p className="text-gray-600 text-lg">
                Chúng tôi tập hợp các dịch vụ đi lại đường dài cho các tuyến đường chính trên cả nước. Với bất cứ lựa chọn nào, bạn cũng có giải pháp tiết kiệm hơn so với giá thông thường, từ đi ghép tiết kiệm đến đi riêng một xe.
                </p>
            </div>
           
        </div>
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8 py-12">           
            <div className="flex flex-col justify-center">
                <div className="flex items-center mb-4">
                    <FaCarSide className="text-2xl text-orange-500 mr-2" />
                    <h1 className="text-3xl font-bold text-gray-800">XE NỘI THÀNH</h1>
                </div>
                <p className="text-gray-600 text-lg">
                Chúng tôi tập trung vào các tuyến đường đủ xa trong nội thành, đáp ứng nhu cầu đi lại hàng ngày. Dịch vụ của chúng tôi bổ xung thêm lựa chọn ngoài xe riêng và xe buýt công cộng, vừa tiết kiệm lại vừa thoải mái.
                </p>
            </div>
            <div className="flex justify-center items-center hover:scale-105 duration-300 shadow-xl">
                <img src={Marketing3} alt="Xe sân bay" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
        </div>
    </div>
  )
}

export default Marketing
