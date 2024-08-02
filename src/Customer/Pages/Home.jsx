import React from 'react'
import Home_Products from '../Components/Products/Home_Products'
import '../Components/Products/Style.css'
import SectionCarousel from '../Components/Products/Section_Carousel'
import Home_Carousel from '../Components/Carousel/Home_Carousel'
const Home = () => {
  return (
    <div className='home_section'>
        <Home_Carousel />
        <SectionCarousel />
        <Home_Products />
       
    </div>
  )
}

export default Home