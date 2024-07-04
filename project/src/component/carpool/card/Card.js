import React from 'react'
import Service from 'D:/fpt/SWP/fcar/front-end/project/src/assets/images/servicemulti.png'
import Save from 'D:/fpt/SWP/fcar/front-end/project/src/assets/images/save.avif'
import Quality from 'D:/fpt/SWP/fcar/front-end/project/src/assets/images/quality.png'
const Card = () => {
  return (
    <div className='w-full py-[1rem] px-4 bg-white mt-0'>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'> 
            <div className='w-full shadow-2xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                <img className='w-40 mx-auto mt-[-3rem] bg-white' src={Service}/>
                <h2 className='text-2xl font-bold text-center py-8'>Đa dạng dịch vụ</h2>
                <p className='text-center text-xl'>Đi lại liên tỉnh hay trong nội thành, chúng tôi đều sẵn có. Tìm, lựa chọn và book một chuyến đi như ý</p>               
            </div>
            <div className='w-full shadow-2xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                <img className='w-40 mx-auto mt-[-2rem] bg-white mb-16 ' src={Save}/>
                <h2 className='text-2xl font-bold text-center py-8 pb-[34px]'>Giá tốt nhất</h2>
                <p className='text-center text-xl'>Hãy lựa chọn các dịch vụ tiết kiệm như đi chung xe, xe tiện chuyến. Đặt trước để có giá tốt hơn.</p>               
            </div>
            <div className='w-full shadow-2xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                <img className='w-20 mx-auto mt-[-2rem] bg-white mb-16 ' src={Quality}/>
                <h2 className='text-2xl font-bold text-center py-8 mt-4'>Đảm bảo Chất lượng</h2>
                <p className='text-center text-xl'>Chúng tôi cam kết chất lượng dịch vụ luôn cao hơn mức trung bình thị trường. Không hài lòng, chúng tôi hoàn tiền.</p>               
            </div>
        </div>
    </div>
  )
}

export default Card