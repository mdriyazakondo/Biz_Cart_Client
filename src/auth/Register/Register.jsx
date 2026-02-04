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
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { imageUpload } from "../../utils";
import { useCreateUserMutation } from "../../redux/features/users/userApi";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();
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
    const { fullName, email, password, confirmPassword } = data;
    let photoURL = null;

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
        background: "#020617", // Matches theme
        color: "#fff",
      });
      return;
    }

    if (data.image && data.image[0]) {
      photoURL = await imageUpload(data.image[0]);
    }

    try {
      await createUser({
        name: fullName,
        email,
        password,
        image: photoURL,
      }).unwrap();

      const userCredential = await createUserFunc(email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: fullName,
        photoURL: photoURL || null,
      });

      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: `Welcome, ${fullName}`,
        timer: 2000,
        showConfirmButton: false,
        background: "#020617", // Matches theme
        color: "#fff",
      });

      reset();
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error?.data?.message || error.message,
        background: "#020617", // Matches theme
        color: "#fff",
      });
    }
  };

  return (
    // Main Container with the requested #020617 background
    <div className="min-h-screen bg-[#020617] flex items-center justify-center py-12 px-4 font-sans relative overflow-hidden text-slate-200">
      {/* Background Glow Effects - Adjusted for better blend with #020617 */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] z-0 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] z-0 pointer-events-none"></div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 md:top-10 md:left-10 z-20 flex items-center gap-2 px-5 py-2.5 bg-[#0f172a]/50 backdrop-blur-md border border-slate-800 rounded-full text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all group"
      >
        <AiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-bold uppercase tracking-widest">
          Back
        </span>
      </button>

      {/* Main Glass Card */}
      <div className="max-w-2xl w-full bg-[#0f172a]/40 backdrop-blur-2xl rounded-[2rem] border border-white/5 shadow-2xl p-8 md:p-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] mb-4 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            Create Account
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2 drop-shadow-lg">
            BIZ<span className="text-blue-500">CART</span>
            <span className="text-amber-400">PRO</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Join the future of premium digital shopping
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Full Name */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-widest">
              Full Name
            </label>
            <div
              className={`flex items-center bg-[#020617]/60 border rounded-xl px-4 transition-all duration-300 group ${
                errors.fullName
                  ? "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                  : "border-slate-800 focus-within:border-blue-500 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:border-slate-700"
              }`}
            >
              <AiOutlineUser
                className="text-slate-500 group-focus-within:text-blue-500 transition-colors"
                size={20}
              />
              <input
                {...register("fullName", { required: "Name is required" })}
                className="w-full bg-transparent py-4 px-3 text-sm outline-none text-white font-medium placeholder-slate-700"
                placeholder="Ex: John Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-widest">
              Email Address
            </label>
            <div
              className={`flex items-center bg-[#020617]/60 border rounded-xl px-4 transition-all duration-300 group ${
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
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
                className="w-full bg-transparent py-4 px-3 text-sm outline-none text-white font-medium placeholder-slate-700"
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-widest">
              Password
            </label>
            <div
              className={`flex items-center bg-[#020617]/60 border rounded-xl px-4 transition-all duration-300 group ${
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
                type={showPass ? "text" : "password"}
                {...register("password", {
                  required: "Required",
                  minLength: { value: 6, message: "Min 6 chars" },
                })}
                className="w-full bg-transparent py-4 px-3 text-sm outline-none text-white font-medium placeholder-slate-700"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="text-slate-600 hover:text-white transition-colors p-1"
              >
                {showPass ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-widest">
              Confirm
            </label>
            <div
              className={`flex items-center bg-[#020617]/60 border rounded-xl px-4 transition-all duration-300 group ${
                errors.confirmPassword
                  ? "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                  : "border-slate-800 focus-within:border-blue-500 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:border-slate-700"
              }`}
            >
              <AiOutlineLock
                className="text-slate-500 group-focus-within:text-blue-500 transition-colors"
                size={20}
              />
              <input
                type={showConfirmPass ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Required",
                  validate: (value) => value === passwordValue || "No match",
                })}
                className="w-full bg-transparent py-4 px-3 text-sm outline-none text-white font-medium placeholder-slate-700"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="text-slate-600 hover:text-white transition-colors p-1"
              >
                {showConfirmPass ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Profile Picture Upload */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-widest">
              Profile Picture
            </label>
            <label className="flex items-center justify-center w-full bg-[#020617]/30 border-2 border-dashed border-slate-800 rounded-xl p-6 hover:border-blue-500 hover:bg-blue-500/5 transition-all cursor-pointer group relative overflow-hidden">
              <div className="flex flex-col items-center relative z-10">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-500">
                  <AiOutlineCloudUpload
                    className="text-slate-400 group-hover:text-white transition-colors"
                    size={24}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-blue-400 transition-colors">
                  Click to Upload
                </span>
              </div>
              <input {...register("image")} type="file" className="hidden" />
            </label>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 pt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-1 transition-all duration-300 active:scale-[0.98] border border-blue-500/20 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 blur-lg"></div>
              <span className="relative">Initialize Registration</span>
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8 md:col-span-2">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
          <span className="px-4 text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">
            Or continue with
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4 md:col-span-2">
          <button className="flex items-center justify-center gap-3 py-3.5 bg-[#020617]/50 border border-slate-800 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-all font-bold text-[10px] text-slate-300 shadow-sm hover:text-white group">
            <AiOutlineGoogle
              size={18}
              className="text-slate-500 group-hover:text-red-500 transition-colors"
            />{" "}
            GOOGLE
          </button>
          <button className="flex items-center justify-center gap-3 py-3.5 bg-[#020617]/50 border border-slate-800 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-all font-bold text-[10px] text-slate-300 shadow-sm hover:text-white group">
            <AiFillFacebook
              size={18}
              className="text-slate-500 group-hover:text-blue-500 transition-colors"
            />{" "}
            FACEBOOK
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-8 font-bold">
          Already a member?{" "}
          <Link
            to={"/auth/login"}
            className="text-blue-500 font-black hover:text-blue-400 hover:underline underline-offset-4 ml-1 uppercase text-[10px] tracking-wider transition-colors"
          >
            Sign In Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
