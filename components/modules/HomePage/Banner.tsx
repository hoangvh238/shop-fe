"use client";

import React from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@nextui-org/button";

import "swiper/css";
import "swiper/css/navigation";
import "./style.css";

const images = ["slide1.jpg", "slide2.jpg", "slide3.jpg", "slide4.jpg"];

function Banner() {
  return (
    <div className="relative">
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
        loop={true}
        modules={[Autoplay, Navigation]}
        navigation={true}
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <div className="relative">
              <img
                alt={image}
                className="h-[400px] w-full"
                src={"/images/banner/" + image}
              />
              <div className="absolute left-[200px] top-[130px] z-20 flex flex-col items-start justify-center gap-4 space-y-6 text-start text-white">
                <p className="text-sm font-medium md:text-base">Mùa hè 2024</p>
                <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                  Bộ sưu tập
                  <br />
                  thông điệp ý nghĩa
                </h1>
                <p className="max-w-md text-sm md:text-base">
                  Chọn ngay cho mình một chiếc áo thun và tự thiết kế theo phong
                  cách của bạn
                </p>
                <Button
                  className="rounded-sm bg-green-500 font-medium text-white hover:bg-green-600"
                  size="lg"
                >
                  Mua ngay
                </Button>
              </div>
              <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-r from-black/30 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;
