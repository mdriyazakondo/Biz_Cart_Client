import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGrid,
  FiActivity,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiBell,
  FiSearch,
  FiChevronDown,
  FiUser,
  FiZap,
} from "react-icons/fi";
import { Link } from "react-router";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0a0f1a] text-slate-200 font-sans overflow-hidden">
      {/* --- SIDEBAR (Clean Dark) --- */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0f172a] border-r border-slate-800/50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="h-20 flex items-center px-8 border-b border-slate-800/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
              <FiZap className="text-yellow-400 font-bold" />
            </div>
            <Link
              to={"/"}
              className="text-xl font-bold tracking-tight text-white italic"
            >
              BIZ<span className="text-blue-500">CART</span>
            </Link>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <NavItem icon={<FiGrid />} label="Overview" active />
          <NavItem icon={<FiActivity />} label="Analytics" />
          <NavItem icon={<FiUsers />} label="Customers" />
          <NavItem icon={<FiSettings />} label="Settings" />
        </nav>

        <div className="p-4 border-t border-slate-800/50">
          <button className="flex items-center gap-3 w-full p-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-400/5 transition-all duration-200 font-medium">
            <FiLogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* --- TOPBAR (Ultra Clean) --- */}
        <header className="h-20 bg-[#0a0f1a]/80 backdrop-blur-md border-b border-slate-800/50 flex items-center justify-between px-6 lg:px-10 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white"
            >
              <FiMenu size={24} />
            </button>
            <div className="hidden md:flex items-center bg-slate-900/50 border border-slate-800 rounded-full px-4 py-2 gap-3 w-64 focus-within:border-blue-500/50 transition-all">
              <FiSearch className="text-slate-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-8">
            <button className="relative p-2 text-slate-400 hover:text-blue-400 transition-colors">
              <FiBell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-yellow-500 rounded-full border-2 border-[#0a0f1a]"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 pl-1 pr-3 py-1 rounded-full border border-slate-800 bg-slate-900/30 hover:bg-slate-800 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold border border-blue-300/20">
                  A
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-white leading-none">
                    Admin
                  </p>
                </div>
                <FiChevronDown
                  className={`text-slate-500 transition-transform ${profileOpen ? "rotate-180" : ""}`}
                  size={14}
                />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-48 bg-[#0f172a] border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 overflow-hidden"
                  >
                    <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-800 flex items-center gap-3 transition text-slate-300">
                      <FiUser className="text-blue-500" /> Profile
                    </button>
                    <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-red-500/10 flex items-center gap-3 transition text-red-400 border-t border-slate-800 mt-1 pt-3">
                      <FiLogOut /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* --- CONTENT --- */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
          {/* Header Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-10"
          >
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-slate-500 mt-1">
              Monitor your business performance in real-time.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
            <StatCard
              label="Net Revenue"
              value="$84,254"
              change="+14.5%"
              isUp={true}
              color="blue"
            />
            <StatCard
              label="Active Sessions"
              value="1,240"
              change="+2.1%"
              isUp={true}
              color="yellow"
            />
            <StatCard
              label="Pending Tasks"
              value="12"
              change="-5.4%"
              isUp={false}
              color="blue"
            />
            <StatCard
              label="Conversions"
              value="3.8%"
              change="+0.4%"
              isUp={true}
              color="yellow"
            />
          </div>

          {/* Placeholder for Main Data Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="lg:col-span-2 bg-[#0f172a] border border-slate-800/50 rounded-3xl p-8 min-h-[400px] shadow-sm">
              <h3 className="text-lg font-bold text-white mb-6">
                Growth Analysis
              </h3>
              <div className="h-64 flex items-center justify-center border border-dashed border-slate-800 rounded-2xl text-slate-600 italic">
                [ Chart / Graph will be here ]
              </div>
            </div>

            <div className="bg-[#0f172a] border border-slate-800/50 rounded-3xl p-8 shadow-sm">
              <h3 className="text-lg font-bold text-white mb-6">
                Quick Actions
              </h3>
              <div className="space-y-4">
                <ActionButton label="Generate Report" color="bg-blue-600" />
                <ActionButton
                  label="Add New User"
                  color="bg-slate-800 hover:bg-slate-700"
                />
                <div className="p-4 bg-yellow-400/5 border border-yellow-400/20 rounded-2xl mt-8">
                  <p className="text-xs text-yellow-500 font-bold uppercase mb-1">
                    System Alert
                  </p>
                  <p className="text-sm text-slate-400 leading-snug">
                    Database maintenance scheduled for 12:00 AM.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

// UI Components
const NavItem = ({ icon, label, active = false }) => (
  <button
    className={`
    flex items-center gap-4 w-full px-4 py-3.5 rounded-2xl transition-all duration-200 group
    ${active ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"}
  `}
  >
    <span
      className={`text-xl ${active ? "text-yellow-400" : "group-hover:text-blue-400"}`}
    >
      {icon}
    </span>
    <span className="text-sm font-semibold tracking-tight">{label}</span>
  </button>
);

const StatCard = ({ label, value, change, isUp, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-[#0f172a] p-6 rounded-3xl border border-slate-800/50 shadow-sm relative overflow-hidden group"
  >
    <div
      className={`absolute top-0 right-0 w-24 h-24 bg-${color}-600/5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-blue-600/10 transition-all`}
    ></div>
    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
      {label}
    </p>
    <h3 className="text-2xl font-black text-white mt-2">{value}</h3>
    <div className="flex items-center gap-2 mt-3">
      <span
        className={`text-xs font-bold px-2 py-0.5 rounded-full ${isUp ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}
      >
        {change}
      </span>
      <span className="text-[10px] text-slate-600 font-medium">
        vs last month
      </span>
    </div>
  </motion.div>
);

const ActionButton = ({ label, color }) => (
  <button
    className={`w-full py-3 rounded-xl ${color} text-white text-sm font-bold transition-all active:scale-95`}
  >
    {label}
  </button>
);

export default DashboardLayout;
