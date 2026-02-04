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
      accent: "text-blue-500",
      btnBg: "bg-blue-600",
    },
    {
      id: 2,
      title: "Premium Wireless Audio",
      subtitle: "Audio Excellence 2026",
      desc: "Crystal clear sound with advanced active noise cancellation technology.",
      offer: "30% OFF",
      img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000",
      accent: "text-indigo-500",
      btnBg: "bg-indigo-600",
    },
  ];

  return (
    <div className="w-full h-[550px] md:h-[650px] lg:h-[750px] bg-[#020617] mt-16 sm:mt-20 lg:mt-[155px]">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full bg-[#020617] flex items-center overflow-hidden">
              {/* Background Decorative Glows */}
              <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
              <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]"></div>

              <div className="max-w-360 mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between w-full h-full relative z-10">
                {/* Content Side */}
                <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1 pb-10 md:pb-0">
                  <motion-div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <span className="bg-slate-800/50 text-blue-400 border border-slate-700/50 text-[10px] md:text-xs font-black px-5 py-2 rounded-full uppercase tracking-[0.3em] inline-block mb-6">
                      {slide.subtitle}
                    </span>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mt-4 leading-[0.9] tracking-tighter">
                      {slide.title.split(" ").slice(0, -1).join(" ")}{" "}
                      <span className={`${slide.accent}`}>
                        {slide.title.split(" ").pop()}
                      </span>
                    </h1>

                    <p className="text-slate-400 mt-6 text-sm md:text-xl max-w-md mx-auto md:mx-0 leading-relaxed font-medium">
                      {slide.desc}
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-8">
                      <button
                        className={`${slide.btnBg} text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-4 hover:scale-105 transition-all shadow-2xl shadow-blue-900/20 group w-fit`}
                      >
                        SHOP NOW{" "}
                        <AiOutlineArrowRight
                          className="group-hover:translate-x-2 transition-transform"
                          strokeWidth={40}
                        />
                      </button>

                      <div className="flex flex-col items-center md:items-start sm:border-l border-slate-800 sm:pl-8">
                        <span className="text-2xl md:text-4xl font-black text-white tracking-tighter">
                          {slide.offer}
                        </span>
                        <span className="text-[9px] md:text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
                          Limited Period
                        </span>
                      </div>
                    </div>
                  </motion-div>
                </div>

                {/* Image Side */}
                <div className="w-full md:w-1/2 flex items-center justify-center order-1 md:order-2 pt-10 md:pt-0">
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px]">
                    {/* Rotating Ring */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-transparent rounded-full animate-spin-[10s_linear_infinite] border border-blue-500/10"></div>

                    {/* Main Image Container */}
                    <div className="absolute inset-4 md:inset-8 bg-[#0f172a] rounded-full shadow-[0_0_100px_rgba(30,58,138,0.3)] overflow-hidden border-8 border-[#1e293b]/50">
                      <img
                        src={slide.img}
                        alt={slide.title}
                        className="w-full h-full object-cover transform hover:scale-110 transition-all duration-1000 grayscale-[20%] hover:grayscale-0"
                      />
                    </div>

                    {/* Badge */}
                    <div className="absolute top-10 right-0 bg-white text-slate-950 p-4 md:p-6 rounded-3xl shadow-2xl hidden sm:block -rotate-6">
                      <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                        Verified Tech
                      </p>
                      <p className="text-sm md:text-xl font-black leading-none">
                        2026 Model
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
