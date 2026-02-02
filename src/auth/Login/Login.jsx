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
      await loginUserFunc(email, password);
      const result = await loginUser({ email, password }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: `Hello ${result.user?.name || "User"}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.data?.message || error.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-20 px-4 font-sans relative overflow-hidden">
      <button
        onClick={() => navigate(-1)}
        className="absolute cursor-pointer top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-100 rounded-full shadow-sm text-slate-600 hover:text-[#1D4ED8] hover:shadow-md transition-all group"
      >
        <AiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest">
          Back
        </span>
      </button>

      <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-[#1D4ED8]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-[#FBBF24]/5 rounded-full blur-3xl"></div>

      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-12 border border-white/20 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#1D4ED8] text-[10px] font-black uppercase tracking-widest mb-4">
            Secure Access
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-[#0F172A] mb-2">
            BIZ<span className="text-[#1D4ED8]">CART</span>
            <span className="text-[#FBBF24]">PRO</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">
              Email Address
            </label>
            <div
              className={`flex items-center bg-white border-2 rounded-2xl px-4 py-0.5 transition-all duration-300 ${
                errors.email
                  ? "border-red-400 shadow-[0_0_0_4px_rgba(248,113,113,0.1)]"
                  : "border-slate-100 focus-within:border-[#1D4ED8] focus-within:shadow-[0_0_0_4px_rgba(29,78,216,0.1)]"
              }`}
            >
              <AiOutlineMail className="text-slate-400" size={20} />
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
                className="w-full bg-transparent py-3.5 px-3 text-sm outline-none text-[#0F172A] font-medium placeholder:text-slate-300"
                placeholder="john@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-[10px] text-red-500 font-bold ml-2 italic">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Password
              </label>
              <button
                type="button"
                className="text-[10px] font-black text-[#1D4ED8] uppercase hover:opacity-70 transition-opacity"
              >
                Forgot?
              </button>
            </div>
            <div
              className={`flex items-center bg-white border-2 rounded-2xl px-4 py-0.5 transition-all duration-300 ${
                errors.password
                  ? "border-red-400 shadow-[0_0_0_4px_rgba(248,113,113,0.1)]"
                  : "border-slate-100 focus-within:border-[#1D4ED8] focus-within:shadow-[0_0_0_4px_rgba(29,78,216,0.1)]"
              }`}
            >
              <AiOutlineLock className="text-slate-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters required" },
                })}
                className="w-full bg-transparent py-3.5 px-3 text-sm outline-none text-[#0F172A] font-medium placeholder:text-slate-300"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-[#1D4ED8] transition-colors p-1"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={18} />
                ) : (
                  <AiOutlineEye size={18} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-[10px] text-red-500 font-bold ml-2 italic">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded-lg border-2 border-slate-200 text-[#1D4ED8] focus:ring-0 transition-all cursor-pointer"
              />
              <span className="text-xs text-slate-500 font-semibold group-hover:text-slate-700 transition-colors">
                Remember me
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0F172A] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-[#1D4ED8] hover:-translate-y-1 transition-all duration-300 active:scale-[0.98]"
          >
            Authorize Login
          </button>
        </form>

        <div className="flex items-center my-9">
          <div className="flex-1 h-px bg-slate-100"></div>
          <span className="px-4 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
            Fast Connect
          </span>
          <div className="flex-1 h-px bg-slate-100"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-3 py-3.5 border-2 border-slate-50 rounded-2xl hover:bg-slate-50 hover:border-slate-100 transition-all duration-300 font-bold text-[10px] text-slate-700 shadow-sm">
            <AiOutlineGoogle size={18} className="text-red-500" /> GOOGLE
          </button>
          <button className="flex items-center justify-center gap-3 py-3.5 border-2 border-slate-50 rounded-2xl hover:bg-slate-50 hover:border-slate-100 transition-all duration-300 font-bold text-[10px] text-slate-700 shadow-sm">
            <AiFillFacebook size={18} className="text-blue-600" /> FACEBOOK
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-10 font-bold">
          Don't have an account?{" "}
          <Link
            to={"/auth/register"}
            className="text-[#1D4ED8] font-black hover:underline underline-offset-4 ml-1 uppercase text-[10px] tracking-wider"
          >
            Create Free Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
