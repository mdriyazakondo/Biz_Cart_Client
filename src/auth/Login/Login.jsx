import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineGoogle,
  AiFillFacebook,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLoginUserMutation } from "../../redux/features/users/userApi";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { loginUserFunc } = useAuth();
  const [loginUser] = useLoginUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const result = await loginUser({ email, password }).unwrap();
      await loginUserFunc(email, password);

      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: `Hello ${result.user?.name || "User"}!`,
        timer: 2000,
        showConfirmButton: false,
        background: "#020617",
        color: "#fff",
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.data?.message || error.message || "Something went wrong",
        background: "#020617",
        color: "#fff",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center py-20 px-4 font-sans relative overflow-hidden text-slate-200">
      {/* Background Neon Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] z-0 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] z-0 pointer-events-none"></div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute cursor-pointer top-8 left-8 z-20 flex items-center gap-2 px-5 py-2.5 bg-[#0f172a]/50 backdrop-blur-md border border-slate-800 rounded-full text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all group shadow-lg"
      >
        <AiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest">
          Back
        </span>
      </button>

      {/* Main Glassmorphic Card */}
      <div className="max-w-xl w-full bg-[#0f172a]/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 shadow-2xl p-8 md:p-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] mb-4 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            Secure Access
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white mb-2">
            BIZ<span className="text-blue-500">CART</span>
            <span className="text-amber-400">PRO</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">
              Email Address
            </label>
            <div
              className={`flex items-center bg-[#020617]/60 border rounded-2xl px-4 transition-all duration-300 group ${
                errors.email
                  ? "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                  : "border-slate-800 focus-within:border-blue-500 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:border-slate-700"
              }`}
            >
              <AiOutlineMail
                className="text-slate-500 group-focus-within:text-blue-500 transition-colors"
                size={20}
              />
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
                className="w-full bg-transparent py-4 px-3 text-sm outline-none text-white font-medium placeholder:text-slate-700"
                placeholder="john@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-[10px] text-red-500 font-bold ml-2 italic">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Password
              </label>
              <button
                type="button"
                className="text-[10px] font-black text-blue-500 uppercase hover:text-blue-400 transition-colors"
              >
                Forgot?
              </button>
            </div>
            <div
              className={`flex items-center bg-[#020617]/60 border rounded-2xl px-4 transition-all duration-300 group ${
                errors.password
                  ? "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                  : "border-slate-800 focus-within:border-blue-500 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:border-slate-700"
              }`}
            >
              <AiOutlineLock
                className="text-slate-500 group-focus-within:text-blue-500 transition-colors"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters required" },
                })}
                className="w-full bg-transparent py-4 px-3 text-sm outline-none text-white font-medium placeholder:text-slate-700"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-600 hover:text-white transition-colors p-1"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-[10px] text-red-500 font-bold ml-2 italic">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me checkbox */}
          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-slate-800 bg-[#020617] text-blue-600 focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer"
              />
              <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider group-hover:text-slate-300 transition-colors">
                Remember me
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-900/20 hover:shadow-blue-600/40 hover:-translate-y-1 transition-all duration-300 active:scale-[0.98] border border-blue-500/20"
          >
            Authorize Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-9">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
          <span className="px-4 text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">
            Fast Connect
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-3 py-3.5 bg-[#020617]/50 border border-slate-800 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-all font-bold text-[10px] text-slate-300 group">
            <AiOutlineGoogle
              size={18}
              className="text-slate-500 group-hover:text-red-500 transition-colors"
            />{" "}
            GOOGLE
          </button>
          <button className="flex items-center justify-center gap-3 py-3.5 bg-[#020617]/50 border border-slate-800 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-all font-bold text-[10px] text-slate-300 group">
            <AiFillFacebook
              size={18}
              className="text-slate-500 group-hover:text-blue-500 transition-colors"
            />{" "}
            FACEBOOK
          </button>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-500 mt-10 font-bold">
          Don't have an account?{" "}
          <Link
            to={"/auth/register"}
            className="text-blue-500 font-black hover:text-blue-400 hover:underline underline-offset-4 ml-1 uppercase text-[10px] tracking-wider transition-all"
          >
            Create Free Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
