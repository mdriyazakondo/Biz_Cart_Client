import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetRoleByUserQuery,
  useLogoutUserMutation,
} from "../../redux/features/users/userApi";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router";

const Topbar = ({ setSidebarOpen }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const { users, logoutUserFunc } = useAuth();
  const { data } = useGetRoleByUserQuery(
    { email: users?.email },
    { skip: !users?.email },
  );
  const user = data?.user;

  const [logoutUser] = useLogoutUserMutation();
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
    <header className="h-20 bg-[#0f172a] backdrop-blur-md border-b border-slate-800/50 flex items-center justify-between px-6 lg:px-10">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 text-slate-400 hover:text-white"
        >
          <FiMenu size={24} />
        </button>

        <div className="hidden md:flex items-center bg-slate-900/50 border border-slate-800 rounded-full px-4 py-2 gap-3 w-64">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 lg:gap-8">
        <button className="relative p-2 text-slate-400 hover:text-blue-400">
          <FiBell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-yellow-500 rounded-full" />
        </button>
        {/* PROFILE */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 pl-1 pr-3 py-1 rounded-full border border-slate-800 bg-slate-900/30 hover:bg-slate-800"
          >
            <img
              src={user?.image}
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="hidden sm:block text-xs font-bold">
              {user?.name}
            </span>
            <FiChevronDown
              size={14}
              className={`transition-transform ${profileOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-44 bg-[#0f172a] border border-slate-800 rounded-xl shadow-xl overflow-hidden"
              >
                <Link to={"/dashboard/settings"}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="w-full text-left cursor-pointer px-4 py-2 text-sm hover:bg-slate-800"
                  >
                    Profile
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
