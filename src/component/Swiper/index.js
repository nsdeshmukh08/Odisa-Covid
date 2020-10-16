import React, { Children } from 'react';
import ReactIdSwiperCustom from 'react-id-swiper/lib/ReactIdSwiper.custom';
// For swiper version 4.x
import { Swiper, Navigation } from 'swiper/swiper.esm';

const CustomBuildSwiper = ({ children, className }) => {
  const params = {
    // Provide Swiper class as props
    Swiper,
    // Add modules you need
    modules: [Navigation],
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    slidesPerView: 1,
    spaceBetween: 30,
    rebuildOnUpdate: true
  }

  return (
    <div className={className}>
      <ReactIdSwiperCustom {...params} >
        {children}
      </ReactIdSwiperCustom>
    </div>

  )
}

export default CustomBuildSwiper;