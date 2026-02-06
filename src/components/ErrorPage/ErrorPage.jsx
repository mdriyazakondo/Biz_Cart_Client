import React from "react";
import { Link } from "react-router";
import {
  HiOutlineExclamationCircle,
  HiOutlineArrowLeft,
  HiOutlineHome,
} from "react-icons/hi";

const ErrorPage = () => {
  return (
    <div className="bg-[#0f172a] min-h-screen flex items-center justify-center p-6 text-white">
      <div className="max-w-md w-full text-center">
        {/* Error Icon & Animation */}
        <div className="relative flex justify-center mb-8">
          <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full"></div>
          <div className="relative bg-slate-800 border border-slate-700 p-6 rounded-3xl shadow-2xl">
            <HiOutlineExclamationCircle className="text-7xl text-red-500 animate-pulse" />
          </div>
        </div>

        {/* Brand Name */}
        <h3 className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-2">
          BizCart System Error
        </h3>

        {/* Error Message */}
        <h1 className="text-6xl font-black mb-4 tracking-tighter">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-slate-200">
          Oops! Page not found.
        </h2>
        <p className="text-slate-400 mb-10 leading-relaxed">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl font-medium transition-all active:scale-95"
          >
            <HiOutlineArrowLeft /> Go Back
          </button>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-lg shadow-blue-900/20 transition-all active:scale-95"
          >
            <HiOutlineHome /> Take Me Home
          </Link>
        </div>

        {/* Support Link */}
        <p className="mt-12 text-slate-500 text-sm">
          Need help?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Contact BizCart Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
