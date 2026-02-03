import React from "react";
import { motion } from "framer-motion";
import { FiSend, FiMail, FiShield } from "react-icons/fi";

const Newsletter = () => {
  return (
    <section className="py-24 bg-white px-4">
      <div className="max-w-360 mx-auto">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-[#0f172a] rounded-2xl p-8 md:p-20 shadow-[0_40px_100px_-20px_rgba(15,23,42,0.3)]"
        >
          {/* Background Abstract Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#d97706] opacity-[0.08] blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500 opacity-[0.05] blur-[100px] rounded-full"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-3 text-[#d97706] mb-6">
                <FiMail size={24} />
                <span className="font-black tracking-[0.3em] uppercase text-xs">
                  Stay in the loop
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6">
                Get <span className="text-[#d97706]">Exclusive</span> <br />
                Offers First.
              </h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md">
                Join our elite community and get early access to new arrivals,
                flash sales, and professional business tips.
              </p>
            </div>

            {/* Right Form */}
            <div className="w-full">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="relative group"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      placeholder="Enter your professional email"
                      className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-slate-500 outline-none focus:border-[#d97706] focus:bg-white/10 transition-all duration-300"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-16 px-10 bg-[#d97706] text-white font-black rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-amber-900/20 hover:bg-[#f59e0b] transition-all duration-300"
                  >
                    SUBSCRIBE <FiSend size={18} strokeWidth={3} />
                  </motion.button>
                </div>

                {/* Trust Signal */}
                <div className="flex items-center gap-2 mt-6 text-slate-500 text-sm">
                  <FiShield className="text-[#d97706]" />
                  <span>No spam, just pure value. Unsubscribe anytime.</span>
                </div>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Brand Bar (Optional) */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale contrast-125">
          <span className="text-xl font-black text-[#0f172a] tracking-widest">
            FORBES
          </span>
          <span className="text-xl font-black text-[#0f172a] tracking-widest">
            TECHCRUNCH
          </span>
          <span className="text-xl font-black text-[#0f172a] tracking-widest">
            WIRED
          </span>
          <span className="text-xl font-black text-[#0f172a] tracking-widest">
            THE VERGE
          </span>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
