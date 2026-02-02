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
    <footer className="bg-white/50 text-slate-600 font-sans  border-t border-gray-100">
      <div className="max-w-390 mx-auto px-6 lg:px-16 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-2xl font-black tracking-tighter text-slate-900">
            BIZ<span className="text-[#1D4ED8]">CART</span>
            <span className="text-[#FBBF24]">PRO</span>
          </h1>
          <p className="text-sm leading-relaxed text-slate-500">
            The ultimate destination for premium electronics, fashion, and
            lifestyle gadgets. We deliver quality at your doorstep.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <div className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-[#1D4ED8] hover:text-white cursor-pointer transition-all">
              <AiFillFacebook size={20} />
            </div>
            <div className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-[#1D4ED8] hover:text-white cursor-pointer transition-all">
              <AiFillTwitterCircle size={20} />
            </div>
            <div className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-[#1D4ED8] hover:text-white cursor-pointer transition-all">
              <AiFillInstagram size={20} />
            </div>
            <div className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-red-600 hover:text-white cursor-pointer transition-all">
              <AiFillYoutube size={20} />
            </div>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-slate-900 font-black text-sm uppercase tracking-widest mb-6">
            Quick Links
          </h3>
          <ul className="space-y-4 text-sm font-medium">
            <li className="hover:text-[#1D4ED8] hover:translate-x-1 transition-all cursor-pointer">
              About Us
            </li>
            <li className="hover:text-[#1D4ED8] hover:translate-x-1 transition-all cursor-pointer">
              Shop Collection
            </li>
            <li className="hover:text-[#1D4ED8] hover:translate-x-1 transition-all cursor-pointer">
              Best Sellers
            </li>
            <li className="hover:text-[#1D4ED8] hover:translate-x-1 transition-all cursor-pointer">
              Special Offers
            </li>
            <li className="hover:text-[#1D4ED8] hover:translate-x-1 transition-all cursor-pointer">
              Blog News
            </li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-slate-900 font-black text-sm uppercase tracking-widest mb-6">
            Customer Support
          </h3>
          <ul className="space-y-4 text-sm font-medium">
            <li className="hover:text-[#1D4ED8] hover:translate-x-1 transition-all cursor-pointer">
              My Account
            </li>
            <li className="hover:text-[#1D4ED8] hover:translate-x-1 transition-all cursor-pointer">
              Order Tracking
            </li>
            <li className="hover:text-[#1D4ED8] hover:translate-x-1 transition-all cursor-pointer">
              Returns & Exchanges
            </li>
            <li className="hover:text-[#1D4ED8] hover:translate-x-1 transition-all cursor-pointer">
              Shipping Guide
            </li>
            <li className="hover:text-[#1D4ED8] hover:translate-x-1 transition-all cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-slate-900 font-black text-sm uppercase tracking-widest mb-6">
            Contact Us
          </h3>
          <ul className="space-y-5 text-sm font-medium">
            <li className="flex items-start justify-center md:justify-start gap-3">
              <AiOutlineEnvironment size={22} className="text-[#1D4ED8] mt-1" />
              <span className="text-slate-500">
                123 Tech Avenue, Dhaka, Bangladesh
              </span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-3 font-bold text-slate-700">
              <AiOutlinePhone size={18} className="text-[#1D4ED8]" />
              <span>+880 1234 567 890</span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-3 font-bold text-slate-700">
              <AiOutlineMail size={18} className="text-[#1D4ED8]" />
              <span>support@bizcartpro.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="py-8 border-t border-gray-100">
        <div className="max-w-390 mx-auto px-6 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-400 font-medium">
            © {new Date().getFullYear()}{" "}
            <span className="text-slate-900 font-bold">BizCartPro</span>. All
            Rights Reserved.
          </p>
          <div className="flex items-center gap-6 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <span className="text-[10px] font-black tracking-widest border border-gray-200 px-3 py-1 rounded text-slate-400">
              VISA
            </span>
            <span className="text-[10px] font-black tracking-widest border border-gray-200 px-3 py-1 rounded text-slate-400">
              PAYPAL
            </span>
            <span className="text-[10px] font-black tracking-widest border border-gray-200 px-3 py-1 rounded text-slate-400">
              STRIPE
            </span>
            <span className="text-[10px] font-black tracking-widest border border-gray-200 px-3 py-1 rounded text-slate-400">
              BKASH
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
