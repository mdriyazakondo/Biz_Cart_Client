import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { AiOutlineArrowRight } from "react-icons/ai";
import { motion } from "framer-motion"; // motion ইমপোর্ট করা হয়েছে

// Swiper Styles
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
    // Height fixed: h-screen অথবা min-h-[600px] ব্যবহার করা ভালো
    <div className="w-full min-h-screen md:h-[90vh] bg-[#020617] overflow-hidden pt-20 md:pt-0">
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
            <div className="relative w-full h-full bg-[#020617] flex items-center py-12 md:py-0">
              {/* Background Decorative Glows - Hidden on small screens for performance */}
              <div className="absolute top-1/4 -left-20 w-64 h-64 md:w-96 md:h-96 bg-blue-600/10 rounded-full blur-[80px] md:blur-[120px]"></div>
              <div className="absolute bottom-1/4 -right-20 w-64 h-64 md:w-96 md:h-96 bg-indigo-600/10 rounded-full blur-[80px] md:blur-[120px]"></div>

              <div className="container mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
                {/* Content Side */}
                <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="bg-slate-800/50 text-blue-400 border border-slate-700/50 text-[10px] md:text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest inline-block mb-4">
                      {slide.subtitle}
                    </span>

                    <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white leading-tight tracking-tighter">
                      {slide.title.split(" ").slice(0, -1).join(" ")}{" "}
                      <span className={`${slide.accent}`}>
                        {slide.title.split(" ").pop()}
                      </span>
                    </h1>

                    <p className="text-slate-400 mt-4 text-sm md:text-lg max-w-md mx-auto md:mx-0 leading-relaxed">
                      {slide.desc}
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 md:gap-8">
                      <button
                        className={`${slide.btnBg} text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-xl w-full sm:w-auto justify-center`}
                      >
                        SHOP NOW <AiOutlineArrowRight />
                      </button>

                      <div className="flex flex-col items-center md:items-start sm:border-l border-slate-800 sm:pl-8">
                        <span className="text-2xl md:text-4xl font-black text-white">
                          {slide.offer}
                        </span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                          Limited Period
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Image Side */}
                <div className="w-full md:w-1/2 flex items-center justify-center order-1 md:order-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]"
                  >
                    {/* Rotating Ring */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-full animate-spin-[15s_linear_infinite] border border-blue-500/10"></div>

                    {/* Main Image Container */}
                    <div className="absolute inset-3 md:inset-6 bg-[#0f172a] rounded-full shadow-2xl overflow-hidden border-4 md:border-8 border-[#1e293b]/50">
                      <img
                        src={slide.img}
                        alt={slide.title}
                        className="w-full h-full object-cover transform hover:scale-110 transition-all duration-700"
                      />
                    </div>

                    {/* Badge */}
                    <div className="absolute -top-2 -right-2 md:top-10 md:right-0 bg-white text-slate-950 p-3 md:p-5 rounded-2xl md:rounded-3xl shadow-2xl rotate-12 md:-rotate-6">
                      <p className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase">
                        Verified Tech
                      </p>
                      <p className="text-xs md:text-lg font-black leading-none">
                        2026 Model
                      </p>
                    </div>
                  </motion.div>
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
