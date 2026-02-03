import React from "react";
import { motion } from "framer-motion";
import { FiClock, FiArrowRight, FiZap } from "react-icons/fi";

const DealsSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-380 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative overflow-hidden rounded-2xl bg-[#0f172a] p-8 md:p-16 flex flex-col justify-center min-h-125"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#d97706] opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 text-[#d97706] mb-6">
                <FiZap className="fill-current animate-pulse" size={24} />
                <span className="font-black tracking-[0.3em] uppercase text-sm">
                  Deal of the Day
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                Premium Sound <br />
                <span className="text-[#d97706]">40% Off</span>
              </h2>

              <p className="text-slate-400 text-lg mb-10 max-w-md font-medium">
                Experience the next generation of audio with our flagship
                wireless series. Limited time offer.
              </p>

              <div className="flex gap-4 mb-12">
                {[
                  ["08", "Hrs"],
                  ["45", "Min"],
                  ["22", "Sec"],
                ].map(([val, unit]) => (
                  <div key={unit} className="flex flex-col items-center">
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black mb-1">
                      {val}
                    </div>
                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                      {unit}
                    </span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#d97706] text-white px-10 py-4 rounded-xl font-black flex items-center gap-3 shadow-xl shadow-amber-900/20"
              >
                GRAB THE DEAL <FiArrowRight strokeWidth={3} />
              </motion.button>
            </div>

            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80"
              alt="Headphones"
              className="absolute hidden md:block -right-10 top-1/2 -translate-y-1/2 w-1/2 h-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] rotate-12 group-hover:rotate-0 transition-transform duration-700"
            />
          </motion.div>

          <div className="lg:col-span-5 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 bg-slate-50 rounded-2xl p-8 relative overflow-hidden group border border-slate-100"
            >
              <div className="relative z-10">
                <span className="text-[#0f172a] font-black text-xs uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-slate-200">
                  Flash Sale
                </span>
                <h3 className="text-2xl font-black text-[#0f172a] mt-4 mb-2">
                  Smart Work <br /> Collection
                </h3>
                <p className="text-[#d97706] font-extrabold text-xl">
                  Up to 25% Off
                </p>
                <button className="mt-6 flex items-center gap-2 text-sm font-black text-[#0f172a] border-b-2 border-[#0f172a] pb-1 group-hover:text-[#d97706] group-hover:border-[#d97706] transition-all">
                  Shop Now <FiArrowRight />
                </button>
              </div>
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80"
                className="absolute -right-4 -bottom-4 w-40 h-40 object-cover rounded-full rotate-12 group-hover:scale-110 transition-transform"
                alt="Watch"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex-1 bg-[#fffbeb] rounded-2xl p-8 relative overflow-hidden group border border-[#fef3c7]"
            >
              <div className="relative z-10">
                <span className="text-[#d97706] font-black text-xs uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-amber-100">
                  Limited
                </span>
                <h3 className="text-2xl font-black text-[#0f172a] mt-4 mb-2">
                  Home Office <br /> Essentials
                </h3>
                <p className="text-[#0f172a] font-extrabold text-xl">
                  $49.00{" "}
                  <span className="text-sm text-slate-400 font-bold line-through ml-2">
                    $89.00
                  </span>
                </p>
                <button className="mt-6 flex items-center gap-2 text-sm font-black text-[#0f172a] border-b-2 border-[#0f172a] pb-1 group-hover:text-[#d97706] group-hover:border-[#d97706] transition-all">
                  Get Offer <FiArrowRight />
                </button>
              </div>
              <img
                src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&q=80"
                className="absolute -right-4 -bottom-4 w-40 h-40 object-cover rounded-full -rotate-12 group-hover:scale-110 transition-transform"
                alt="Monitor"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
