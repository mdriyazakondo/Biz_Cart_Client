import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { AiOutlineArrowRight } from "react-icons/ai";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HeroSection = () => {
  const slides = [
    {
      id: 1,
      title: "Next Gen Smart Gadgets",
      subtitle: "Limited Edition Collection",
      desc: "Experience the future of technology with our exclusive 2026 collection.",
      offer: "50% OFF",
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000",
      btnColor: "bg-[#1D4ED8]",
    },
    {
      id: 2,
      title: "Premium Wireless Audio",
      subtitle: "Audio Excellence 2026",
      desc: "Crystal clear sound with advanced active noise cancellation technology.",
      offer: "30% OFF",
      img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000",
      btnColor: "bg-[#0F172A]",
    },
  ];

  return (
    <div className="w-full h-125 md:h-150 lg:h-175 bg-white mt-16 sm:mt-20 md:mt-20 lg:mt-35">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full bg-[#F8FAFC] flex items-center">
              <div className="max-w-390 mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between w-full h-full">
                <div className="w-full md:w-1/2 text-center md:text-left z-10 order-2 md:order-1 pb-10 md:pb-0">
                  <span className="bg-blue-100 text-[#1D4ED8] text-[10px] md:text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest inline-block">
                    {slide.subtitle}
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-[#0F172A] mt-4 md:mt-6 leading-tight">
                    {slide.title.split(" ").slice(0, -1).join(" ")}{" "}
                    <span className="text-[#1D4ED8]">
                      {slide.title.split(" ").pop()}
                    </span>
                  </h1>
                  <p className="text-slate-500 mt-4 md:mt-6 text-xs sm:text-sm md:text-lg max-w-md mx-auto md:mx-0 leading-relaxed font-medium">
                    {slide.desc}
                  </p>

                  <div className="mt-6 md:mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 md:gap-8">
                    <button
                      className={`${slide.btnColor} text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-xs md:text-sm flex items-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-blue-100 group w-fit`}
                    >
                      SHOP NOW{" "}
                      <AiOutlineArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </button>
                    <div className="flex flex-col items-center md:items-start sm:border-l-2 border-slate-200 sm:pl-6">
                      <span className="text-xl md:text-2xl font-black text-[#0F172A]">
                        {slide.offer}
                      </span>
                      <span className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        Storewide
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 flex items-center justify-center order-1 md:order-2 pt-6 md:pt-0">
                  <div className="relative w-55 h-55 sm:w-75 sm:h-75 md:w-100 md:h-100 lg:w-125 lg:h-125">
                    <div className="absolute inset-0 bg-linear-to-tr from-[#1D4ED8]/20 to-transparent rounded-full animate-spin-slow"></div>
                    <div className="absolute inset-2 md:inset-4 bg-white rounded-full shadow-2xl overflow-hidden border-4 md:border-12 border-white">
                      <img
                        src={slide.img}
                        alt={slide.title}
                        className="w-full h-full object-cover transform hover:scale-110 transition-all duration-700"
                      />
                    </div>

                    <div className="absolute top-4 md:top-10 -right-2 md:-right-4 bg-white p-2 md:p-4 rounded-xl md:rounded-2xl shadow-xl hidden sm:block">
                      <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase">
                        Authentic
                      </p>
                      <p className="text-sm md:text-lg font-black text-[#1D4ED8]">
                        Guaranteed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
