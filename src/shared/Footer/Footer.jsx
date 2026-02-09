import React from "react";
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineEnvironment,
  AiOutlineSend,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-slate-400 font-sans border-t border-slate-800/50 relative overflow-hidden">
      {/* Decorative Glow Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-125 h-50 bg-indigo-600/10 blur-[120px] rounded-full"></div>

      {/* Newsletter Section - Real World Requirement */}
      <div className="max-w-380 mx-auto px-6 lg:px-16 pt-20">
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-[2.5rem] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 backdrop-blur-xl">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-2">
              Join the{" "}
              <span className="text-indigo-400 uppercase">BizCart</span> Inner
              Circle
            </h2>
            <p className="text-slate-400 font-medium">
              Get early access to drops and secret discount codes.
            </p>
          </div>
          <div className="w-full lg:w-auto">
            <div className="relative group">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full lg:w-96 bg-slate-900 border border-slate-700 rounded-full py-5 px-8 focus:outline-none focus:border-indigo-500 transition-all text-white font-medium"
              />
              <button className="absolute right-2 top-2 bottom-2  cursor-pointer px-6 rounded-full font-black text-xs uppercase tracking-widest bg-indigo-500 text-white transition-all flex items-center gap-2">
                Subscribe <AiOutlineSend size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-380 mx-auto px-6 lg:px-16 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
        {/* Brand Section */}
        <div className="space-y-8 text-center md:text-left">
          <h1 className="text-3xl font-black tracking-tighter text-white">
            BIZ<span className="text-indigo-500">CART</span>
            <span className="text-amber-400">PRO</span>
          </h1>
          <p className="text-sm leading-relaxed text-slate-500 font-medium">
            Setting the gold standard in premium electronics and lifestyle
            fashion since 2024. Quality isn't just a promise; it's our identity.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            {[
              AiFillFacebook,
              AiFillTwitterCircle,
              AiFillInstagram,
              AiFillYoutube,
            ].map((Icon, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-800/50 border border-slate-700 text-slate-400 rounded-2xl hover:bg-indigo-600 hover:text-white hover:-translate-y-1 cursor-pointer transition-all duration-300 shadow-xl"
              >
                <Icon size={20} />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8">
            The Collection
          </h3>
          <ul className="space-y-4 text-sm font-bold">
            {[
              "About Us",
              "Shop Collection",
              "Best Sellers",
              "Special Offers",
              "Blog News",
            ].map((link) => (
              <li
                key={link}
                className="hover:text-indigo-400 hover:translate-x-2 transition-all cursor-pointer flex items-center justify-center md:justify-start gap-2 group"
              >
                <div className="w-0 h-0.5 bg-indigo-500 group-hover:w-4 transition-all duration-300"></div>
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className="text-center md:text-left">
          <h3 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8">
            Assistance
          </h3>
          <ul className="space-y-4 text-sm font-bold">
            {[
              "My Account",
              "Order Tracking",
              "Returns & Exchanges",
              "Shipping Guide",
              "Privacy Policy",
            ].map((link) => (
              <li
                key={link}
                className="hover:text-indigo-400 hover:translate-x-2 transition-all cursor-pointer flex items-center justify-center md:justify-start gap-2 group"
              >
                <div className="w-0 h-0.5 bg-indigo-500 group-hover:w-4 transition-all duration-300"></div>
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div className="text-center md:text-left">
          <h3 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8">
            Get In Touch
          </h3>
          <div className="space-y-6 bg-slate-800/30 border border-slate-700/50 p-6 rounded-3xl">
            <div className="flex items-start justify-center md:justify-start gap-4">
              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                <AiOutlineEnvironment size={20} />
              </div>
              <span className="text-xs text-slate-400 font-medium">
                123 Tech Avenue, Dhaka, Bangladesh
              </span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                <AiOutlinePhone size={18} />
              </div>
              <span className="text-sm font-black text-slate-200">
                +880 1234 567 890
              </span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                <AiOutlineMail size={18} />
              </div>
              <span className="text-sm font-black text-slate-200 uppercase tracking-tighter">
                support@bizcartpro.com
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/50 py-10 bg-slate-950/30 backdrop-blur-md">
        <div className="max-w-380 mx-auto px-6 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
            © {new Date().getFullYear()}{" "}
            <span className="text-white underline decoration-indigo-500 underline-offset-4 font-black">
              BIZCARTPRO
            </span>
            . Crafted for Excellence.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            {["VISA", "PAYPAL", "STRIPE", "BKASH"].map((pay) => (
              <span
                key={pay}
                className="text-[9px] font-black tracking-widest border border-slate-800 px-4 py-1.5 rounded-full text-slate-500 hover:border-indigo-500 hover:text-indigo-400 transition-all cursor-default"
              >
                {pay}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
