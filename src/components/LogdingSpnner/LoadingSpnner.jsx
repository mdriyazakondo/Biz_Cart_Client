import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#020617]">
      <div className="relative flex items-center justify-center">
        <div className="w-20 h-20 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin"></div>

        <div className="absolute w-14 h-14 rounded-full border-4 border-slate-700/50 border-b-indigo-500 animate-spin-reverse"></div>

        <div className="absolute bg-blue-500 h-2 w-2 rounded-full animate-ping"></div>
      </div>

      <div className="mt-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter text-white italic">
          Biz<span className="text-blue-500">Cart</span>
        </h2>

        <div className="flex items-center justify-center gap-1.5 mt-3">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
        </div>

        <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] mt-4 font-medium">
          Loading Excellence
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
