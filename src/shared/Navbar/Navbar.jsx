import React, { useState, useEffect } from "react";
import {
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
  MdFlashOn,
} from "react-icons/md";
import { Link, NavLink } from "react-router"; // NavLink active state er jonno bhalo
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
  const { data: roleData } = useGetRoleByUserQuery(
    { email: users?.email },
    { skip: !users?.email },
  );
  const role = roleData?.user?.role;

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

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "New Arrivals", path: "/newProducts" },
    { name: "Best Sellers", path: "/best-products" },
    ...(users ? [{ name: "Dashboard", path: "/dashboard" }] : []),
  ];

  return (
    <div
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0f172a]/95 backdrop-blur-md shadow-2xl"
          : "bg-[#0f172a]"
      }`}
    >
      {/* TOP BAR */}
      <div className="hidden sm:flex justify-between items-center bg-[#020617] text-slate-400 px-4 md:px-10 py-2 text-[10px] uppercase tracking-widest font-bold border-b border-slate-800/30">
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
      <nav className="px-4 md:px-10 py-4">
        <div className="max-w-365 mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
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
              <span className="text-amber-400 hidden xs:inline ml-1">PRO</span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <div
              className="relative group py-2"
              onMouseEnter={() => setDesktopDeptOpen(true)}
              onMouseLeave={() => setDesktopDeptOpen(false)}
            >
              <button className="flex items-center gap-2 text-[11px] font-bold text-slate-300 hover:text-blue-400 uppercase tracking-widest transition-all">
                Categories{" "}
                <MdOutlineKeyboardArrowDown
                  size={16}
                  className={`${desktopDeptOpen ? "rotate-180" : ""} transition-transform`}
                />
              </button>

              {desktopDeptOpen && (
                <div className="absolute top-full left-0 w-56 bg-[#1e293b] border border-slate-700 shadow-2xl rounded-xl mt-1 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {["Electronics", "Smartphones", "Laptops", "SmartWatch"].map(
                    (item) => (
                      <Link
                        key={item}
                        to={`/${item.toLowerCase()}`}
                        className="block px-6 py-3 text-xs font-bold text-slate-300 hover:bg-blue-600 hover:text-white transition-all uppercase"
                      >
                        {item}
                      </Link>
                    ),
                  )}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-[11px] font-bold uppercase tracking-widest transition-all ${
                    isActive
                      ? "text-blue-500"
                      : "text-slate-300 hover:text-blue-400"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {role === "admin" && (
              <Link
                to="/flash-sale"
                className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 hover:bg-emerald-500/20 transition-all uppercase tracking-widest"
              >
                <MdFlashOn className="animate-pulse" /> Flash Sale
              </Link>
            )}
          </div>

          {/* Right: Action Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              to={"/wish-list"}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full relative transition-all"
            >
              <AiOutlineHeart size={22} />
              <span className="absolute top-0 right-0 w-4 h-4 text-[9px] bg-red-500 text-white rounded-full flex items-center justify-center font-bold">
                {wishListResponse?.count || 0}
              </span>
            </Link>

            <Link
              to={"/add-to-cart"}
              className="relative flex items-center gap-2 bg-blue-600 text-white px-3 md:px-4 py-2 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20 active:scale-95"
            >
              <AiOutlineShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 md:top-1 md:left-7 w-4 h-4 text-[9px] bg-red-500 text-white rounded-full flex items-center justify-center font-bold border border-[#0f172a]">
                {addToCartResponse?.count || 0}
              </span>
              <span className="hidden sm:block text-[11px] font-black">
                ${addToCartResponse?.totalPrice || 0}.00
              </span>
            </Link>

            {users ? (
              <div className="flex items-center gap-3 border-l border-slate-800 ml-2 pl-4">
                <Link to={"/dashboard"}>
                  <img
                    src={users.photoURL}
                    alt="user"
                    className="w-8 h-8 rounded-full border-2 border-blue-500/50 p-0.5 hover:border-blue-500 transition-all"
                  />
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center justify-center cursor-pointer gap-1  text-[10px] font-black text-red-400 hover:text-red-300 uppercase tracking-widest"
                >
                  <MdLogout size={18} /> Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all"
              >
                <AiOutlineUser size={22} />
              </Link>
            )}
          </div>
        </div>
      </nav>

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
              <ul className="space-y-6 font-bold text-slate-300 uppercase text-xs tracking-widest">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      onClick={() => setNav(false)}
                      className="hover:text-white block w-full"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}

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
                    <ul className="pl-4 mt-4 space-y-4 text-[10px] text-slate-500 border-l border-slate-800">
                      {["Electronics", "Smartphones", "Laptops"].map((item) => (
                        <li key={item}>
                          <Link
                            to={`/${item.toLowerCase()}`}
                            onClick={() => setNav(false)}
                            className="hover:text-blue-400 block w-full"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                <li className="text-emerald-400">🔥 Flash Sale</li>
                {users && (
                  <li className="pt-4 border-t border-slate-800">
                    <Link
                      to="/dashboard"
                      onClick={() => setNav(false)}
                      className="text-blue-400"
                    >
                      User Dashboard
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            {users && (
              <div className="p-6 border-t border-slate-800 bg-[#020617]">
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500/10 text-red-500 py-3 rounded-xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest border border-red-500/20"
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
