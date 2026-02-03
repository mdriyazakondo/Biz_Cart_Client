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

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileDeptOpen, setMobileDeptOpen] = useState(false);
  const [desktopDeptOpen, setDesktopDeptOpen] = useState(false);
  const { users, logoutUserFunc } = useAuth();
  const [logoutUser] = useLogoutUserMutation();

  const { data } = useGetRoleByUserQuery(
    { email: users?.email },
    { skip: !users?.email },
  );
  const role = data?.user;

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
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      await logoutUser();
      try {
        await logoutUserFunc();
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: error.message,
        });
      }
    }
  };

  return (
    <div
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur shadow-md" : "bg-white"
      }`}
    >
      <div className="hidden sm:flex justify-between items-center bg-slate-900 text-slate-300 px-4 md:px-10 py-2 text-xs">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 border-r border-slate-700 pr-4">
            <MdLocalShipping className="text-yellow-400" />
            <span>Free Shipping over $150</span>
          </div>
          <div className="flex items-center gap-2">
            <MdPhoneInTalk className="text-yellow-400" />
            <span>+880 1234 567 890</span>
          </div>
        </div>
        <span className="hidden md:block">English / USD</span>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="border-b border-gray-100 px-4 md:px-10 py-3">
        <div className="max-w-360 mx-auto flex items-center justify-between gap-4">
          {/* Logo & Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setNav(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <AiOutlineMenu size={22} />
            </button>

            <Link to="/" className="text-2xl font-black">
              BIZ<span className="text-blue-600">CART</span>
              <span className="text-yellow-400 hidden xs:inline">PRO</span>
            </Link>
          </div>

          {/* Search (Desktop only) */}
          <div className="hidden lg:flex flex-1 max-w-xl relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-full border border-gray-300 bg-gray-50 px-5 py-2 text-sm outline-none focus:bg-white focus:border-blue-600"
            />
            <button className="absolute right-0 top-0 h-full px-5 bg-blue-600 text-white rounded-r-full hover:bg-slate-900">
              <AiOutlineSearch size={20} />
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <div className=" p-2 hover:bg-gray-100 rounded-full relative">
              <AiOutlineHeart size={22} />
              <span className="absolute top-1 right-1 w-4 h-4 text-[10px] bg-red-500 text-white rounded-full flex items-center justify-center">
                2
              </span>
            </div>

            <div className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-slate-900 cursor-pointer">
              <AiOutlineShoppingCart size={20} />
              <span className="hidden sm:block text-sm font-bold">$3,540</span>
            </div>

            {users ? (
              <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-full">
                <Link to={"/dashboard"}>
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-slate-900 cursor-pointer">
                    Dashboard
                  </button>
                </Link>
                <img
                  src={users.photoURL}
                  alt="user"
                  className="w-8 h-8 rounded-full"
                />
                <button
                  onClick={handleLogout}
                  className="hidden md:block text-xs font-bold text-red-500"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <AiOutlineUser size={22} />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* DESKTOP BOTTOM MENU */}
      <div className="hidden lg:block border-b border-gray-200">
        <div className="max-w-380 mx-auto px-10">
          <ul className="flex items-center gap-8 text-sm font-bold text-gray-600">
            <li
              onMouseEnter={() => setDesktopDeptOpen(true)}
              onMouseLeave={() => setDesktopDeptOpen(false)}
              className="relative py-4 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <AiOutlineMenu /> ALL DEPARTMENTS
                <MdOutlineKeyboardArrowDown
                  className={`${desktopDeptOpen ? "rotate-180" : ""}`}
                />
              </div>

              {desktopDeptOpen && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl  rounded-b-md">
                  {["Electronics", "Smartphones", "Laptops"].map((item) => (
                    <div
                      key={item}
                      className="px-6 py-3 hover:bg-blue-50 cursor-pointer"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </li>

            <li className="py-4 hover:text-blue-600 cursor-pointer">
              New Arrivals
            </li>
            <li className="py-4 hover:text-blue-600 cursor-pointer">
              Best Sellers
            </li>
            <li className="ml-auto text-green-600 font-black animate-pulse flex items-center justify-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div> Flash
              Sale
            </li>
          </ul>
        </div>
      </div>

      {/* OVERLAY */}
      <div
        onClick={() => setNav(false)}
        className={`fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity ${
          nav ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      ></div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-screen w-70 sm:w-[320px] bg-white z-50 shadow-2xl transition-transform duration-300 lg:hidden ${
          nav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="bg-slate-900 text-white p-5 flex justify-between">
            <h2 className="font-bold text-lg">BIZCART MENU</h2>
            <AiOutlineClose
              size={24}
              className="cursor-pointer"
              onClick={() => setNav(false)}
            />
          </div>

          <div className="p-5 flex-1 overflow-y-auto">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-100 p-3 rounded-md outline-none "
              />
              <AiOutlineSearch className="absolute right-3 top-3.5 text-gray-400" />
            </div>

            <ul className="space-y-4 font-bold text-gray-700">
              <li>
                <button
                  onClick={() => setMobileDeptOpen(!mobileDeptOpen)}
                  className="w-full flex justify-between items-center"
                >
                  Departments
                  <MdOutlineKeyboardArrowDown
                    className={`${mobileDeptOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {mobileDeptOpen && (
                  <ul className="pl-4 mt-3 space-y-2 text-sm text-gray-500">
                    <li>Electronics</li>
                    <li>Smartphones</li>
                    <li>Laptops</li>
                  </ul>
                )}
              </li>

              <li>New Arrivals</li>
              <li>Best Sellers</li>
              <li className="text-red-600">🔥 Flash Sale</li>
            </ul>
          </div>

          {users && (
            <div className="p-5 border-t bg-gray-50">
              <button
                onClick={handleLogout}
                className="w-full bg-red-100 text-red-600 py-2 rounded-md flex items-center justify-center gap-2 font-bold"
              >
                <MdLogout /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
