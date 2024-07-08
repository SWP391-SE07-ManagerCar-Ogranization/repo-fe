import React from 'react'
import Hero from '../Hero'
import Bookingcarpool from '../../../pages/bookingcarpool'
import Header from '../../../layouts/Header'
import Card from '../card/Card'
import Marketing from '../marketing/Marketing'
import BannerCar from '../bannerCar/BannerCar'
const HomeCarPool = () => {
  return (
    <div>
        <Header/>
        <Hero/>  
        <Bookingcarpool/>
        <BannerCar/>
        <Card/>
        <Marketing/>
    </div>
  )
}

export default HomeCarPool
