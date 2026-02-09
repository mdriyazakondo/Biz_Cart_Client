import {
  FiLogOut,
  FiGrid,
  FiActivity,
  FiUsers,
  FiSettings,
} from "react-icons/fi";
import { Link } from "react-router";
import SidebarItem from "./SidebarItem";
import useAuth from "../../hooks/useAuth";
import {
  useGetRoleByUserQuery,
  useLogoutUserMutation,
} from "../../redux/features/users/userApi";
import Swal from "sweetalert2";
import { IoMdAddCircleOutline } from "react-icons/io";
import { VscListOrdered } from "react-icons/vsc";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

const Sidebar = ({ setSidebarOpen, sidebarOpen }) => {
  const { logoutUserFunc, users } = useAuth();
  const [logoutUser] = useLogoutUserMutation();
  const { data, isLoading } = useGetRoleByUserQuery(
    { email: users?.email },
    { skip: !users?.email },
  );

  const role = data?.user?.role;

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
    <aside
      className={`fixed lg:relative z-50 w-64 bg-[#0f172a] h-full border-r border-slate-800 transition-transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      {/* LOGO */}
      <div className="h-20 flex items-center px-8 border-b border-slate-800">
        <Link to="/" className="text-xl font-bold text-white">
          BIZ<span className="text-blue-500">CART</span>
        </Link>
      </div>

      {/* NAV */}
      <nav className="px-4 py-6 space-y-1 min-h-[84vh]">
        <SidebarItem
          onClick={() => setSidebarOpen(false)}
          to=""
          icon={FiGrid}
          label="Overview"
        />

        {/* User  */}
        {role === "user" && (
          <>
            <SidebarItem
              onClick={() => setSidebarOpen(false)}
              to="user-order"
              icon={VscListOrdered}
              label="My Order"
            />
          </>
        )}

        {/*  seller */}
        {role === "seller" && (
          <>
            <SidebarItem
              onClick={() => setSidebarOpen(false)}
              to="/dashboard/add-products"
              icon={IoMdAddCircleOutline}
              label="Add Product"
            />
            <SidebarItem
              onClick={() => setSidebarOpen(false)}
              to="my-products"
              icon={FiUsers}
              label="MY Products"
            />
            <SidebarItem
              onClick={() => setSidebarOpen(false)}
              to="my-products-order"
              icon={FiUsers}
              label="MY Products Order"
            />
          </>
        )}
        {/*  admin */}
        {role === "admin" && (
          <>
            <SidebarItem
              onClick={() => setSidebarOpen(false)}
              to="all-products"
              icon={MdOutlineProductionQuantityLimits}
              label="All Products"
            />
            <SidebarItem
              onClick={() => setSidebarOpen(false)}
              to="customers"
              icon={FiUsers}
              label="Customers"
            />
          </>
        )}
        <SidebarItem
          onClick={() => setSidebarOpen(false)}
          to="settings"
          icon={FiSettings}
          label="Settings"
        />
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-400 hover:text-red-500 transition"
        >
          <FiLogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
