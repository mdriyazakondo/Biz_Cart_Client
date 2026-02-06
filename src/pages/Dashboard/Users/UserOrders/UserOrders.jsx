import React from "react";
import {
  useOrderDeleteMutation,
  useUserUserGetQuery,
} from "../../../../redux/features/order/orderApi";
import useAuth from "../../../../hooks/useAuth";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { MdCheckCircleOutline } from "react-icons/md";

const UserOrders = () => {
  const { users } = useAuth();
  const {
    data: orderResponse,
    isLoading,
    error,
  } = useUserUserGetQuery(users?.email);
  const [deleteOrder] = useOrderDeleteMutation();

  const orders = orderResponse?.data || orderResponse || [];

  const handleDelete = async (orderId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#334155",
      confirmButtonText: "Yes, delete it!",
      background: "#1e293b",
      color: "#f8fafc",
      iconColor: "#f59e0b",
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteOrder(orderId).unwrap();

        if (res.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Your order has been deleted.",
            icon: "success",
            background: "#1e293b",
            color: "#f8fafc",
            confirmButtonColor: "#3b82f6",
          });
        }
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: err?.data?.message || "Something went wrong.",
          icon: "error",
          background: "#1e293b",
          color: "#f8fafc",
        });
      }
    }
  };

  if (isLoading)
    return (
      <div className="text-white text-center p-10 bg-[#0f172a] min-h-screen">
        Loading orders...
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center p-10 bg-[#0f172a] min-h-screen">
        Error loading orders.
      </div>
    );

  return (
    <div className="bg-[#0f172a] min-h-screen p-4 md:p-8 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-blue-500 pl-4">
          My Order History
        </h2>

        <div className="overflow-x-auto rounded-xl border border-slate-700 shadow-2xl">
          <table className="w-full text-left border-separate border-spacing-0">
            {/* Table Header */}
            <thead>
              <tr className="bg-slate-800/50 text-slate-300 uppercase text-xs tracking-wider">
                <th className="py-4 px-6 font-semibold text-nowrap">
                  Order Info
                </th>
                <th className="py-4 px-6 font-semibold">Payment</th>
                <th className="py-4 px-6 font-semibold">Total</th>
                <th className="py-4 px-6 font-semibold text-center">Status</th>
                <th className="py-4 px-6 font-semibold text-center">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-slate-300 text-sm">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-slate-700 hover:bg-slate-800/30 transition-all duration-300"
                  >
                    {/* Order ID & Date */}
                    <td className="py-5 px-6 text-nowrap">
                      <p className="font-mono text-blue-400 text-xs mb-1">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-slate-500 text-xs">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </td>

                    {/* Payment Method */}
                    <td className="py-5 px-6 text-nowrap">
                      <p className="text-xs font-medium">
                        {order.paymentMethod}
                      </p>
                      <p
                        className={`text-[10px] uppercase ${order.paymentStatus === "Pending" ? "text-orange-400" : "text-green-400"}`}
                      >
                        {order.paymentStatus}
                      </p>
                    </td>

                    {/* Total Amount */}
                    <td className="py-5 px-6 text-nowrap">
                      <span className="text-base font-bold text-white">
                        ${order.totalAmount.toLocaleString()}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-5 px-6 text-nowrap text-center">
                      <span
                        className={`inline-block py-1 px-3 rounded-md text-[10px] font-bold uppercase tracking-tighter ${
                          order.status === "Pending"
                            ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                            : "bg-green-500/10 text-green-500 border border-green-500/20"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    {/* Delete order */}

                    <td className="py-5 px-6 text-nowrap text-center">
                      {order.paymentStatus === "paid" ? (
                        <div className="flex cursor-pointer items-center justify-center gap-2 mx-auto bg-green-500/10 text-green-500 border border-green-500/20 py-2 px-4 rounded-lg w-fit">
                          <MdCheckCircleOutline className="text-lg" />
                          <span className="text-xs font-bold uppercase tracking-wider">
                            Paid
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDelete(order._id)}
                          className="flex cursor-pointer items-center justify-center gap-2 mx-auto bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 hover:border-red-600 py-2 px-4 rounded-lg transition-all duration-300 active:scale-95 group"
                        >
                          <MdOutlineDeleteOutline className="text-lg group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-semibold uppercase tracking-wider">
                            Delete
                          </span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-20 text-slate-500 italic"
                  >
                    You haven't placed any orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
