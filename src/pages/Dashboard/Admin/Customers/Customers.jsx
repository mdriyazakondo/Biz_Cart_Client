import React from "react";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "../../../../redux/features/users/userApi";
import { FaTrashAlt, FaUserShield, FaUserEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpinner from "../../../../components/LogdingSpnner/LoadingSpnner";

const Customers = () => {
  const { data, isLoading } = useGetAllUsersQuery();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [deleteUser] = useDeleteUserMutation();
  const { logoutUserFunc } = useAuth();

  const handleRoleChange = async (id, newRole) => {
    try {
      await updateUserRole({ userId: id, role: newRole }).unwrap();
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: "#1e293b",
        color: "#fff",
      });
      Toast.fire({ icon: "success", title: "Role Updated Successfully" });
    } catch (err) {
      Swal.fire("Error!", "Update failed", "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
      background: "#0f172a",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await logoutUserFunc();
          await deleteUser(id).unwrap();
          Swal.fire("Deleted!", "User removed.", "success");
        } catch (err) {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  if (isLoading) {
    return <LoadingSpinner/>;
  }

  const users = data?.users || [];

  return (
    <div className="min-h-screen bg-[#0f172a] p-4 md:p-10 text-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Customer Management
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Total {users.length} users registered in your platform
            </p>
          </div>
          <div className="hidden md:block">
            <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-900/20">
              + Add New User
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-[#1e293b]/50 backdrop-blur-md rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#1e293b] text-gray-400 text-[11px] uppercase tracking-[2px] font-bold">
                  <th className="px-8 py-5 text-nowrap">Profile</th>
                  <th className="px-8 py-5 text-nowrap">Email Address</th>
                  <th className="px-8 py-5 text-nowrap">Current Status</th>
                  <th className="px-8 py-5 text-nowrap text-center">
                    Change Role
                  </th>
                  <th className="px-8 py-5 text-nowrap text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-blue-500/5 transition-all group"
                  >
                    {/* Profile */}
                    <td className="px-8 py-5 text-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={user?.image}
                            className="w-12 h-12 rounded-xl object-cover ring-2 ring-gray-700 group-hover:ring-blue-500 transition-all"
                            alt=""
                          />
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-[#0f172a] rounded-full ${user.role === "admin" ? "bg-red-500" : "bg-emerald-500"}`}
                          ></div>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-100 group-hover:text-blue-400 transition-colors">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500 italic">
                            ID: {user._id.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-8 py-5">
                      <span className="text-gray-400 font-medium">
                        {user.email}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="px-8 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                          user.role === "admin"
                            ? "bg-red-500/10 text-red-500 border border-red-500/20"
                            : user.role === "seller"
                              ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                              : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Role Selector */}
                    <td className="px-8 py-5 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <FaUserEdit className="text-gray-500 text-sm" />
                        <select
                          defaultValue={user.role}
                          onChange={(e) =>
                            handleRoleChange(user._id, e.target.value)
                          }
                          className="bg-[#0f172a] text-xs font-semibold border border-gray-700 rounded-lg px-3 py-1.5 focus:border-blue-500 outline-none cursor-pointer hover:bg-[#1e293b]"
                        >
                          <option value="user">User</option>
                          <option value="seller">Seller</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                    </td>

                    {/* Delete Action */}
                    <td className="px-8 py-5 text-center">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-2.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-300 shadow-lg"
                      >
                        <FaTrashAlt size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
