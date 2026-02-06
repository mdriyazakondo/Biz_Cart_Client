import React from 'react';
import { HiOutlineShoppingBag, HiOutlineTruck, HiOutlineCurrencyDollar, HiOutlineUsers } from "react-icons/hi";

const DashboardOverview = () => {
    const stats = [
        { id: 1, title: 'Total Revenue', value: '$12,450', icon: <HiOutlineCurrencyDollar />, color: 'text-green-500', bg: 'bg-green-500/10' },
        { id: 2, title: 'Total Orders', value: '145', icon: <HiOutlineShoppingBag />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { id: 3, title: 'Pending Delivery', value: '12', icon: <HiOutlineTruck />, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
        { id: 4, title: 'Total Customers', value: '850', icon: <HiOutlineUsers />, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    ];

    return (
        <div className="bg-[#0f172a] min-h-screen p-6 text-white">
            <div className="max-w-360 mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold">Dashboard Overview</h2>
                    <p className="text-slate-400 mt-1">Welcome back! Here's what's happening today.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {stats.map((stat) => (
                        <div key={stat.id} className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl hover:border-blue-500/50 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} text-2xl`}>
                                    {stat.icon}
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-xs">
                                <span className="text-green-400 font-bold">+12.5%</span>
                                <span className="text-slate-500 ml-2">from last month</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Orders - Large Section */}
                    <div className="lg:col-span-2 bg-slate-800/40 border border-slate-700 rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold">Recent Performance</h3>
                            <button className="text-blue-400 text-sm hover:underline">View All</button>
                        </div>
                        {/* গ্রাফের বদলে এখানে একটি স্টাইলিশ প্লেসহোল্ডার দেওয়া হয়েছে */}
                        <div className="h-64 w-full bg-slate-900/50 rounded-xl border border-dashed border-slate-600 flex items-center justify-center">
                            <p className="text-slate-500 italic">Chart/Graph will be integrated here</p>
                        </div>
                    </div>

                    {/* Quick Notifications/Activity */}
                    <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-6">Quick Actions</h3>
                        <div className="space-y-4">
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-colors">
                                Add New Product
                            </button>
                            <button className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-medium transition-colors">
                                Export Report
                            </button>
                            <div className="pt-4 mt-4 border-t border-slate-700">
                                <h4 className="text-sm font-bold text-slate-400 uppercase mb-4">System Status</h4>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <p>Server is running smoothly</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;