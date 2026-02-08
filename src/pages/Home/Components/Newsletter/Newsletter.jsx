import React from "react";
import { motion } from "framer-motion";
import { FiSend, FiMail, FiShield } from "react-icons/fi";

const Newsletter = () => {
  return (
    <section className="py-24 bg-[#020617] px-4 overflow-hidden">
      <div className="max-w-345 mx-auto">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-[#0f172a] rounded-[3rem] p-8 md:p-20 border border-slate-800/50 shadow-2xl"
        >
          {/* Background Abstract Glows - Adjusted for Dark Mode */}
          <div className="absolute -top-24 -right-24 w-125 h-125 bg-amber-500 opacity-[0.05] blur-[120px] rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-125 h-125 bg-indigo-600 opacity-[0.05] blur-[120px] rounded-full"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 text-amber-500 mb-8">
                <div className="p-2.5 bg-amber-500/10 rounded-xl">
                  <FiMail size={22} />
                </div>
                <span className="font-black tracking-[0.4em] uppercase text-[10px]">
                  Insider Access
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-8">
                Get{" "}
                <span className="text-amber-500 text-outline-sm">
                  Exclusive
                </span>{" "}
                <br />
                Offers First.
              </h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md">
                Join 50,000+ tech enthusiasts and get early access to new
                arrivals, insane flash sales, and expert tech reviews.
              </p>
            </motion.div>

            {/* Right Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="w-full"
            >
              <form
                onSubmit={(e) => e.preventDefault()}
                className="relative group bg-slate-900/40 p-2 sm:p-3 rounded-[2rem] border border-slate-800/50 backdrop-blur-xl"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      placeholder="Email address..."
                      className="w-full h-16 bg-transparent rounded-2xl px-6 py-4 text-white placeholder-slate-600 outline-none focus:ring-0 transition-all duration-300"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-16 px-10 bg-amber-500 text-slate-950 font-black rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-amber-500/10 hover:bg-white transition-all duration-500 text-xs uppercase tracking-widest"
                  >
                    SUBSCRIBE <FiSend size={18} strokeWidth={3} />
                  </motion.button>
                </div>
              </form>

              {/* Trust Signal */}
              <div className="flex items-center gap-3 mt-8 text-slate-500 text-xs font-bold uppercase tracking-widest justify-center lg:justify-start">
                <FiShield className="text-indigo-500" size={16} />
                <span>Encrypted & Private. No Spam Ever.</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Brand Bar - Updated for Dark Theme */}
        <div className="mt-24 flex flex-wrap justify-center gap-10 md:gap-24 opacity-20 hover:opacity-50 transition-opacity duration-700">
          {["FORBES", "TECHCRUNCH", "WIRED", "THE VERGE", "GIZMODO"].map(
            (brand) => (
              <span
                key={brand}
                className="text-xl md:text-2xl font-black text-white tracking-[0.3em]"
              >
                {brand}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
