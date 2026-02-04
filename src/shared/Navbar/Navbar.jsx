import React, { useState, useEffect } from "react";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineHeart,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import {
  MdOutlineKeyboardArrowDown,
  MdLocalShipping,
  MdPhoneInTalk,
  MdLogout,
} from "react-icons/md";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import {
  useGetRoleByUserQuery,
  useLogoutUserMutation,
} from "../../redux/features/users/userApi";
import { useGetAllWishlistQuery } from "../../redux/features/wishList/wishListApi";
import { useGetAllAddToCartQuery } from "../../redux/features/addToCart/addToCartApi";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileDeptOpen, setMobileDeptOpen] = useState(false);
  const [desktopDeptOpen, setDesktopDeptOpen] = useState(false);
  const { users, logoutUserFunc } = useAuth();
  const [logoutUser] = useLogoutUserMutation();
  const { data: wishListResponse } = useGetAllWishlistQuery(users?.email);
  const { data: addToCartResponse } = useGetAllAddToCartQuery(users?.email);
  const { data } = useGetRoleByUserQuery(
    { email: users?.email },
    { skip: !users?.email },
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = nav ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [nav]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      background: "#1e293b",
      color: "#f8fafc",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      await logoutUser();
      try {
        await logoutUserFunc();
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          background: "#1e293b",
          color: "#f8fafc",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          background: "#1e293b",
          color: "#f8fafc",
          text: error.message,
        });
      }
    }
  };

  return (
    <div
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0f172a]/90 backdrop-blur-md shadow-2xl"
          : "bg-[#0f172a]"
      }`}
    >
      {/* TOP BAR */}
      <div className="hidden sm:flex justify-between items-center bg-[#020617] text-slate-400 px-4 md:px-10 py-2 text-[10px] uppercase tracking-widest font-bold">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 border-r border-slate-800 pr-4">
            <MdLocalShipping className="text-blue-500" />
            <span>Free Shipping over $150</span>
          </div>
          <div className="flex items-center gap-2">
            <MdPhoneInTalk className="text-blue-500" />
            <span>+880 1234 567 890</span>
          </div>
        </div>
        <span className="hidden md:block">English / USD</span>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="border-b border-slate-800/50 px-4 md:px-10 py-4">
        <div className="max-w-360 mx-auto flex items-center justify-between gap-8">
          {/* Logo & Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setNav(true)}
              className="lg:hidden p-2 text-white hover:bg-slate-800 rounded-lg transition-all"
            >
              <AiOutlineMenu size={22} />
            </button>

            <Link
              to="/"
              className="text-2xl font-black text-white tracking-tighter"
            >
              BIZ<span className="text-blue-500">CART</span>
              <span className="text-amber-400 hidden xs:inline">PRO</span>
            </Link>
          </div>

          {/* Search (Desktop only) */}
          <div className="hidden lg:flex flex-1 max-w-xl relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-5 py-2.5 text-sm text-white outline-none focus:border-blue-500 transition-all"
            />
            <button className="absolute right-0 top-0 h-full px-5 bg-blue-600 text-white rounded-r-xl hover:bg-blue-700">
              <AiOutlineSearch size={20} />
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Link
              to={"/wish-list"}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full relative transition-all cursor-pointer"
            >
              <AiOutlineHeart size={24} />
              <span className="absolute top-1 right-1 w-4 h-4 text-[9px] bg-red-500 text-white rounded-full flex items-center justify-center font-bold">
                {wishListResponse?.count}
              </span>
            </Link>

            <Link
              to={"/add-to-cart"}
              className="relative flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 cursor-pointer shadow-lg shadow-blue-900/20 transition-all active:scale-95"
            >
              <AiOutlineShoppingCart size={22} />
              <span className="absolute top-1 left-7 w-4 h-4 text-[9px] bg-red-500/90 text-white rounded-full flex items-center justify-center font-bold">
                {addToCartResponse?.count}
              </span>
              <span className="hidden sm:block text-xs font-black">
                ${addToCartResponse?.totalPrice}.00
              </span>
            </Link>

            {users ? (
              <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
                <Link to={"/dashboard"}>
                  <button className="hidden xl:block text-xs font-bold text-slate-300 hover:text-white transition-all uppercase tracking-widest">
                    Dashboard
                  </button>
                </Link>
                <img
                  src={users.photoURL}
                  alt="user"
                  className="w-9 h-9 rounded-full border-2 border-slate-700 p-0.5"
                />
                <button
                  onClick={handleLogout}
                  className="hidden md:block text-[10px] font-black text-red-400 hover:text-red-300 uppercase tracking-widest"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all"
              >
                <AiOutlineUser size={24} />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* DESKTOP BOTTOM MENU */}
      <div className="hidden lg:block border-b border-slate-800/50">
        <div className="max-w-360 mx-auto ">
          <ul className="flex items-center gap-10 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <li
              onMouseEnter={() => setDesktopDeptOpen(true)}
              onMouseLeave={() => setDesktopDeptOpen(false)}
              className="relative py-4 cursor-pointer hover:text-blue-400 transition-colors"
            >
              <div className="flex items-center gap-2">
                <AiOutlineMenu /> ALL DEPARTMENTS
                <MdOutlineKeyboardArrowDown
                  className={`transition-transform duration-300 ${desktopDeptOpen ? "rotate-180" : ""}`}
                />
              </div>

              {desktopDeptOpen && (
                <div className="absolute top-full left-0 w-64 bg-[#1e293b] border border-slate-700 shadow-2xl rounded-b-xl z-[60] overflow-hidden animate-in fade-in slide-in-from-top-2">
                  {["Electronics", "Smartphones", "Laptops"].map((item) => (
                    <div
                      key={item}
                      className="px-6 py-4 hover:bg-slate-800 text-slate-300 hover:text-white transition-all"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </li>

            <li className="py-4 hover:text-blue-400 cursor-pointer transition-colors">
              New Arrivals
            </li>
            <li className="py-4 hover:text-blue-400 cursor-pointer transition-colors">
              Best Sellers
            </li>
            <li className="ml-auto text-emerald-400 font-black flex items-center gap-2 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></div>
              FLASH SALE
            </li>
          </ul>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          nav ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={() => setNav(false)}
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${nav ? "opacity-100" : "opacity-0"}`}
        ></div>
        <div
          className={`absolute top-0 left-0 h-screen w-72 bg-[#0f172a] shadow-2xl transition-transform duration-300 border-r border-slate-800 ${
            nav ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="bg-[#020617] text-white p-6 flex justify-between items-center">
              <h2 className="font-black tracking-tighter text-lg">
                BIZCART MENU
              </h2>
              <AiOutlineClose
                size={22}
                className="cursor-pointer text-slate-400 hover:text-white"
                onClick={() => setNav(false)}
              />
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <div className="relative mb-8">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl outline-none text-white text-sm"
                />
                <AiOutlineSearch className="absolute right-3 top-3.5 text-slate-500" />
              </div>

              <ul className="space-y-6 font-bold text-slate-300 uppercase text-xs tracking-widest">
                <li>
                  <button
                    onClick={() => setMobileDeptOpen(!mobileDeptOpen)}
                    className="w-full flex justify-between items-center hover:text-white"
                  >
                    Departments
                    <MdOutlineKeyboardArrowDown
                      className={`${mobileDeptOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {mobileDeptOpen && (
                    <ul className="pl-4 mt-4 space-y-4 text-[11px] text-slate-500">
                      <li className="hover:text-blue-400 transition-colors">
                        Electronics
                      </li>
                      <li className="hover:text-blue-400 transition-colors">
                        Smartphones
                      </li>
                      <li className="hover:text-blue-400 transition-colors">
                        Laptops
                      </li>
                    </ul>
                  )}
                </li>
                <li className="hover:text-white cursor-pointer">
                  New Arrivals
                </li>
                <li className="hover:text-white cursor-pointer">
                  Best Sellers
                </li>
                <li className="text-red-400">🔥 Flash Sale</li>
              </ul>
            </div>

            {users && (
              <div className="p-6 border-t border-slate-800 bg-[#020617]">
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500/10 text-red-500 py-3 rounded-xl flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest border border-red-500/20"
                >
                  <MdLogout /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
