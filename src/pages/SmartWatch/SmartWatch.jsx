import React from "react";
import { useCategoryProductsQuery } from "../../redux/features/product/productApi";
import { motion } from "framer-motion";
import { FaClock, FaHeartbeat, FaRunning, FaBluetooth } from "react-icons/fa";
import FeaturedProductsCart from "../../components/FeaturedProducts/FeaturedProducts";
import LoadingSpinner from "../../components/LogdingSpnner/LoadingSpnner";

const SmartWatch = () => {
  const { data, isLoading, error } = useCategoryProductsQuery("smartWatch");

  if (isLoading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <p className="text-red-400 font-bold bg-red-400/10 px-6 py-3 rounded-xl border border-red-400/20">
          Something went wrong! Could not fetch Smart Watches.
        </p>
      </div>
    );

  const products = data?.products || [];

  return (
    <section className="min-h-screen bg-[#020617] pb-24">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            {
              icon: <FaHeartbeat />,
              title: "Health Tracking",
              color: "text-red-500",
            },
            {
              icon: <FaRunning />,
              title: "Sports Modes",
              color: "text-green-500",
            },
            {
              icon: <FaBluetooth />,
              title: "Call Support",
              color: "text-blue-500",
            },
            {
              icon: <FaClock />,
              title: "Long Battery",
              color: "text-amber-500",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-[#0f172a]/50 p-6 rounded-3xl border border-slate-800 flex flex-col items-center gap-3 text-center"
            >
              <span className={`${feature.color} text-2xl`}>
                {feature.icon}
              </span>
              <span className="text-white font-bold text-xs uppercase tracking-widest">
                {feature.title}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="w-full md:w-auto">
            <h1 className="text-3xl md:text-4xl font-black text-white flex items-center gap-3 uppercase">
              Available <span className="text-blue-500">Models</span>
              <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full align-middle">
                {products.length} Items
              </span>
            </h1>
            <p className="text-slate-500 mt-2">
              Browse our collection of high-end portable computers.
            </p>
          </div>
          <div className="h-px flex-1 bg-slate-800/50 mx-8 hidden lg:block mb-4"></div>
        </div>

        {/* --- PRODUCTS GRID --- */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <FeaturedProductsCart product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-[#0f172a]/20 rounded-[50px] border border-dashed border-slate-800">
            <FaClock className="mx-auto text-6xl text-slate-700 mb-4 opacity-20" />
            <p className="text-slate-500 text-lg italic">
              Our smart watch inventory is currently empty.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SmartWatch;
