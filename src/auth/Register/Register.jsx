import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineGoogle,
  AiFillFacebook,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineCloudUpload,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const navigate = useNavigate();
  const { createUserFunc } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const passwordValue = watch("password");

  const onSubmit = async (data) => {
    const { fullName, email, password, confirmPassword, image } = data;

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
      });
      return;
    }

    try {
      // 1️⃣ Create user with email & password
      const userCredential = await createUserFunc(email, password);
      const user = userCredential.user;

      // 2️⃣ Upload image if exists (optional: here we assume file input)
      let photoURL = "";
      if (image && image[0]) {
        const file = image[0];
        // For simplicity, we can use URL.createObjectURL (only for local preview)
        // In production you should upload to Firebase Storage and get download URL
        photoURL = URL.createObjectURL(file);
      }

      // 3️⃣ Update profile with name & photo
      await updateProfile(user, {
        displayName: fullName,
        photoURL: photoURL || null,
      });

      // 4️⃣ Success alert
      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: `Welcome, ${fullName}`,
        timer: 2000,
        showConfirmButton: false,
      });

      reset();
      navigate("/"); // redirect after registration
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-16 px-4 font-sans relative overflow-hidden">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-100 rounded-full shadow-sm text-slate-600 hover:text-[#1D4ED8] hover:shadow-md transition-all group"
      >
        <AiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest">
          Back
        </span>
      </button>

      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-[#1D4ED8]/5 rounded-full blur-[120px] z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-[#FBBF24]/5 rounded-full blur-[120px] z-0"></div>

      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] p-8 md:p-12 border border-white relative z-10">
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#1D4ED8] text-[10px] font-black uppercase tracking-widest mb-4">
            New Account
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-[#0F172A] mb-2">
            BIZ<span className="text-[#1D4ED8]">CART</span>
            <span className="text-[#FBBF24]">PRO</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Start your premium shopping journey today
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">
              Full Name
            </label>
            <div
              className={`flex items-center bg-white border-2 rounded-2xl px-4 py-0.5 transition-all duration-300 ${errors.fullName ? "border-red-400 shadow-[0_0_0_4px_rgba(248,113,113,0.1)]" : "border-slate-100 focus-within:border-[#1D4ED8] focus-within:shadow-[0_0_0_4px_rgba(29,78,216,0.1)]"}`}
            >
              <AiOutlineUser className="text-slate-400" size={18} />
              <input
                {...register("fullName", { required: "Name is required" })}
                className="w-full bg-transparent py-3.5 px-3 text-sm outline-none text-[#0F172A] font-medium"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">
              Email Address
            </label>
            <div
              className={`flex items-center bg-white border-2 rounded-2xl px-4 py-0.5 transition-all duration-300 ${errors.email ? "border-red-400 shadow-[0_0_0_4px_rgba(248,113,113,0.1)]" : "border-slate-100 focus-within:border-[#1D4ED8] focus-within:shadow-[0_0_0_4px_rgba(29,78,216,0.1)]"}`}
            >
              <AiOutlineMail className="text-slate-400" size={18} />
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
                className="w-full bg-transparent py-3.5 px-3 text-sm outline-none text-[#0F172A] font-medium"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">
              Password
            </label>
            <div
              className={`flex items-center bg-white border-2 rounded-2xl px-4 py-0.5 transition-all duration-300 ${errors.password ? "border-red-400 shadow-[0_0_0_4px_rgba(248,113,113,0.1)]" : "border-slate-100 focus-within:border-[#1D4ED8] focus-within:shadow-[0_0_0_4px_rgba(29,78,216,0.1)]"}`}
            >
              <AiOutlineLock className="text-slate-400" size={18} />
              <input
                type={showPass ? "text" : "password"}
                {...register("password", {
                  required: "Required",
                  minLength: { value: 6, message: "Min 6 chars" },
                })}
                className="w-full bg-transparent py-3.5 px-3 text-sm outline-none text-[#0F172A] font-medium"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="text-slate-400 hover:text-[#1D4ED8] transition-colors p-1"
              >
                {showPass ? (
                  <AiOutlineEyeInvisible size={18} />
                ) : (
                  <AiOutlineEye size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">
              Confirm
            </label>
            <div
              className={`flex items-center bg-white border-2 rounded-2xl px-4 py-0.5 transition-all duration-300 ${errors.confirmPassword ? "border-red-400 shadow-[0_0_0_4px_rgba(248,113,113,0.1)]" : "border-slate-100 focus-within:border-[#1D4ED8] focus-within:shadow-[0_0_0_4px_rgba(29,78,216,0.1)]"}`}
            >
              <AiOutlineLock className="text-slate-400" size={18} />
              <input
                type={showConfirmPass ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Required",
                  validate: (value) => value === passwordValue || "No match",
                })}
                className="w-full bg-transparent py-3.5 px-3 text-sm outline-none text-[#0F172A] font-medium"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="text-slate-400 hover:text-[#1D4ED8] transition-colors p-1"
              >
                {showConfirmPass ? (
                  <AiOutlineEyeInvisible size={18} />
                ) : (
                  <AiOutlineEye size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">
              Profile Picture
            </label>
            <label className="flex items-center justify-center w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-4 hover:border-[#1D4ED8] hover:bg-blue-50/50 transition-all cursor-pointer group">
              <div className="flex flex-col items-center">
                <AiOutlineCloudUpload
                  className="text-slate-400 group-hover:text-[#1D4ED8] transition-colors"
                  size={24}
                />
                <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase group-hover:text-[#1D4ED8]">
                  Upload Your Photo
                </span>
              </div>
              <input {...register("image")} type="file" className="hidden" />
            </label>
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              className="w-full bg-[#0F172A] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-[#1D4ED8] hover:-translate-y-1 transition-all duration-300 active:scale-[0.98]"
            >
              Initialize Registration
            </button>
          </div>
        </form>

        <div className="flex items-center my-8 md:col-span-2">
          <div className="flex-1 h-px bg-slate-100"></div>
          <span className="px-4 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
            Or
          </span>
          <div className="flex-1 h-px bg-slate-100"></div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:col-span-2">
          <button className="flex items-center justify-center gap-3 py-3.5 border-2 border-slate-50 rounded-2xl hover:bg-slate-50 transition-all font-bold text-[10px] text-slate-700 shadow-sm">
            <AiOutlineGoogle size={18} className="text-red-500" /> GOOGLE
          </button>
          <button className="flex items-center justify-center gap-3 py-3.5 border-2 border-slate-50 rounded-2xl hover:bg-slate-50 transition-all font-bold text-[10px] text-slate-700 shadow-sm">
            <AiFillFacebook size={18} className="text-blue-600" /> FACEBOOK
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-10 font-bold">
          Already a member?{" "}
          <Link
            to={"/auth/login"}
            className="text-[#1D4ED8] font-black hover:underline underline-offset-4 ml-1 uppercase text-[10px] tracking-wider"
          >
            Sign In Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
