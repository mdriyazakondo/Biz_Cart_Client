import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiZap } from "react-icons/fi";

const DealsSection = () => {
  return (
    <section className="py-24 bg-[#020617]">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* MAIN BIG DEAL CARD */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative overflow-hidden rounded-[2.5rem] bg-[#0f172a] p-8 md:p-16 flex flex-col justify-center min-h-[500px] border border-slate-800/50 group"
          >
            {/* Background Glows */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-500 opacity-[0.05] rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500 opacity-[0.05] rounded-full blur-[100px]"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 text-amber-500 mb-8">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <FiZap className="fill-current animate-pulse" size={20} />
                </div>
                <span className="font-black tracking-[0.4em] uppercase text-[10px]">
                  Limited Flash Deal
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9] tracking-tighter">
                Premium Sound <br />
                <span className="text-amber-500">40% OFF</span>
              </h2>

              <p className="text-slate-400 text-lg mb-12 max-w-sm font-medium leading-relaxed">
                Experience the next generation of audio with our flagship
                wireless series.
              </p>

              {/* Countdown Timer */}
              <div className="flex gap-4 mb-12">
                {[
                  ["08", "Hrs"],
                  ["45", "Min"],
                  ["22", "Sec"],
                ].map(([val, unit]) => (
                  <div key={unit} className="flex flex-col items-center">
                    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-white text-3xl font-black mb-2 shadow-2xl">
                      {val}
                    </div>
                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                      {unit}
                    </span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-amber-500 text-slate-950 px-10 py-5 rounded-2xl font-black flex items-center gap-4 shadow-2xl shadow-amber-500/20 text-xs uppercase tracking-widest hover:bg-white transition-all"
              >
                GRAB THE DEAL <FiArrowRight strokeWidth={3} size={18} />
              </motion.button>
            </div>

            {/* Floating Image */}
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80"
              alt="Headphones"
              className="absolute hidden xl:block -right-12 top-1/2 -translate-y-1/2 w-[55%] h-auto object-contain drop-shadow-[0_50px_50px_rgba(0,0,0,0.8)] rotate-6 group-hover:rotate-0 transition-transform duration-1000"
            />
          </motion.div>

          {/* SIDE CARDS */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 bg-[#0f172a] rounded-[2.5rem] p-10 relative overflow-hidden group border border-slate-800/50"
            >
              <div className="relative z-10">
                <span className="text-indigo-400 font-black text-[9px] uppercase tracking-[0.2em] bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20">
                  New Collection
                </span>
                <h3 className="text-3xl font-black text-white mt-6 mb-3 leading-tight tracking-tighter">
                  Smart Work <br /> Collection
                </h3>
                <p className="text-amber-500 font-black text-xl mb-8">
                  Up to 25% Off
                </p>
                <button className="flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-widest hover:text-amber-500 transition-all group/btn">
                  Shop Now
                  <div className="p-2 bg-slate-800 rounded-lg group-hover/btn:bg-amber-500 group-hover/btn:text-slate-950 transition-all">
                    <FiArrowRight />
                  </div>
                </button>
              </div>
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80"
                className="absolute -right-6 -bottom-6 w-48 h-48 object-cover rounded-full opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                alt="Watch"
              />
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex-1 bg-gradient-to-br from-indigo-900/20 to-slate-900 rounded-[2.5rem] p-10 relative overflow-hidden group border border-indigo-500/10"
            >
              <div className="relative z-10">
                <span className="text-amber-500 font-black text-[9px] uppercase tracking-[0.2em] bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
                  Limited Offer
                </span>
                <h3 className="text-3xl font-black text-white mt-6 mb-3 leading-tight tracking-tighter">
                  Home Office <br /> Essentials
                </h3>
                <p className="text-white font-black text-2xl flex items-center gap-3">
                  $49.00
                  <span className="text-sm text-slate-600 font-bold line-through">
                    $89.00
                  </span>
                </p>
                <button className="mt-8 flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-widest hover:text-indigo-400 transition-all group/btn">
                  Get Offer
                  <div className="p-2 bg-slate-800 rounded-lg group-hover/btn:bg-indigo-500 transition-all">
                    <FiArrowRight />
                  </div>
                </button>
              </div>
              <img
                src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&q=80"
                className="absolute -right-6 -bottom-6 w-48 h-48 object-cover rounded-full opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
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
