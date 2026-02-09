import React from "react";
import {
  useMyProductsOrderQuery,
  useUpdatePayOrderMutation,
} from "../../../../redux/features/order/orderApi";
import useAuth from "../../../../hooks/useAuth";
import {
  Trash2,
  Calendar,
  ChevronDown,
  Package,
  ListOrdered,
  Loader2,
  DollarSign,
  User,
} from "lucide-react";
import Swal from "sweetalert2";

const MyProductsOrder = () => {
  const { users } = useAuth();

  const {
    data: orderResponse,
    isLoading,
    isError,
  } = useMyProductsOrderQuery({ sellerEmail: users?.email });

  const [updateOrder, { isLoading: isUpdating }] = useUpdatePayOrderMutation();
  const orders = orderResponse?.data || [];
  console.log(orders);
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await updateOrder({ id, status: newStatus }).unwrap();
      Swal.fire({
        icon: "success",
        title: "Status Updated",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        background: "#0f172a",
        color: "#fff",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: error?.data?.message || "Something went wrong",
        background: "#0f172a",
        color: "#fff",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="relative">
          <Loader2 className="animate-spin text-indigo-500" size={60} />
          <div className="absolute inset-0 blur-xl bg-indigo-500/20 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-rose-500 font-medium">
        ⚠️ Failed to load orders. Please try again later.
      </div>
    );
  }

  // {
  //     "_id": "698a18958d1b09c49370f432",
  //     "userId": "69888eda23280551d9936c8b",
  //     "userEmail": "mr.user@gmail.com",
  //     "userName": "Mr User",
  //     "products": [
  //         {
  //             "productId": {
  //                 "_id": "698a1755b405639526e45fab",
  //                 "price": 137
  //             },
  //             "quantity": 1,
  //             "price": 137,
  //             "authorEmail": "mr.seller1@gmail.com",
  //             "authorName": "Mr. Seller",
  //             "_id": "698a18958d1b09c49370f433"
  //         },
  //         {
  //             "productId": {
  //                 "_id": "6988b8400341462e4a16a84c",
  //                 "price": 424
  //             },
  //             "quantity": 1,
  //             "price": 424,
  //             "authorEmail": "mr.seller@gmail.com",
  //             "authorName": "Mr. Seller",
  //             "_id": "698a18958d1b09c49370f434"
  //         },
  //         {
  //             "productId": {
  //                 "_id": "6983855faabcfc027bf7a745",
  //                 "price": 124
  //             },
  //             "quantity": 1,
  //             "price": 124,
  //             "authorEmail": "gypapazi@mailinator.com",
  //             "authorName": "Melvin Parsons",
  //             "_id": "698a18958d1b09c49370f435"
  //         }
  //     ],
  //     "totalAmount": 734.25,
  //     "discount": 0,
  //     "paymentMethod": "Cash On Delivery",
  //     "paymentStatus": "Pending",
  //     "status": "Shipped",
  //     "createdAt": "2026-02-09T17:25:41.018Z",
  //     "updatedAt": "2026-02-09T17:36:20.083Z",
  //     "__v": 0
  // }

  return (
    <div className="min-h-screen  text-slate-300 p-4 md:p-10 font-sans tracking-tight">
      <div className="max-w-380 mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <ListOrdered className="text-indigo-500" size={28} />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white">
                Sales Orders
              </h1>
            </div>
            <p className="text-slate-500 uppercase text-[11px] tracking-[3px] font-bold ml-1">
              Storefront Management System
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl backdrop-blur-md min-w-40">
              <span className="text-[10px] block text-slate-500 uppercase font-black tracking-widest mb-1">
                Total Orders
              </span>
              <span className="text-3xl font-black text-white leading-none">
                {orders.length}
              </span>
            </div>
          </div>
        </div>

        {/* Professional Table Container */}
        <div className="bg-slate-900/30 border border-slate-800/60 rounded-xl overflow-hidden backdrop-blur-xl shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/40 text-slate-400 text-[11px] uppercase tracking-[2px] font-black border-b border-slate-800">
                  <th className="px-8 py-6 text-nowrap">Reference & Date</th>
                  <th className="px-8 py-6 text-nowrap">Customer</th>
                  <th className="px-8 py-6 text-nowrap">Payment Status</th>
                  <th className="px-8 py-6 text-nowrap">Inventory</th>
                  <th className="px-8 py-6 text-nowrap">Earnings</th>
                  <th className="px-8 py-6 text-nowrap">Processing</th>
                  <th className="px-8 py-6 text-nowrap text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/40">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr
                      key={order._id}
                      className="group hover:bg-indigo-500/2 transition-all duration-300"
                    >
                      {/* Order Info */}
                      <td className="px-8 py-6 text-nowrap">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-indigo-400 transition-colors">
                            <Calendar size={18} />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                              {new Date(order.createdAt).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono mt-0.5 tracking-tighter">
                              REF: #{order._id.slice(-8).toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Customer Info */}
                      <td className="px-8 py-6 text-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-[10px] font-black text-white shadow-lg">
                            {order.userName?.[0] || <User size={12} />}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-200">
                              {order.userName || "Guest"}
                            </div>
                            <div className="text-[10px] text-slate-500 lowercase">
                              {order.userEmail}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Products */}
                      <td className="px-8 py-6 text-nowrap">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700/50">
                          <Package size={12} className="text-indigo-400" />
                          <span className="text-xs font-bold text-slate-300">
                            {order.paymentStatus}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-nowrap">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700/50">
                          <Package size={12} className="text-indigo-400" />
                          <span className="text-xs font-bold text-slate-300">
                            {order.products?.length || 0} Items
                          </span>
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="px-8 py-6 text-nowrap">
                        <div className="flex flex-col">
                          <span className="text-lg font-black text-white tracking-tighter">
                            ${order.totalAmount?.toFixed(2)}
                          </span>
                          <span className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest">
                            {order.paymentStatus || "Paid"}
                          </span>
                        </div>
                      </td>

                      {/* Custom Status Select */}
                      <td className="px-8 py-6 text-nowrap">
                        <div className="relative group/select w-40">
                          <select
                            value={order.status}
                            disabled={
                              order.status === "Delivered" || isUpdating
                            }
                            onChange={(e) =>
                              handleUpdateStatus(order._id, e.target.value)
                            }
                            className={`w-full appearance-none bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer transition-all focus:ring-2 focus:ring-indigo-500/50 outline-none
                              ${order.status === "Pending" ? "text-amber-500" : ""}
                              ${order.status === "Processing" ? "text-blue-400" : ""}
                              ${order.status === "Shipped" ? "text-indigo-400" : ""}
                              ${order.status === "Delivered" ? "text-emerald-500" : ""}
                              ${order.status === "Cancelled" ? "text-rose-500" : ""}
                            `}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <ChevronDown
                            size={14}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none group-hover/select:text-indigo-400 transition-colors"
                          />
                        </div>
                      </td>

                      {/* Delete Action */}
                      <td className="px-8 py-6 text-nowrap text-right">
                        <button
                          disabled
                          className="p-3 rounded-xl bg-rose-500/5 text-rose-500 transition-all  border border-transparent"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-8 py-24 text-center">
                      <div className="flex flex-col items-center opacity-20">
                        <Package size={60} className="mb-4" />
                        <p className="uppercase tracking-[4px] text-xs font-black text-slate-400">
                          Database is empty
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Branding */}
          <div className="bg-slate-900/50 border-t border-slate-800 px-8 py-4">
            <p className="text-[9px] text-slate-600 uppercase tracking-[4px] font-bold text-center">
              Powered by Gemini Global Distribution System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProductsOrder;
