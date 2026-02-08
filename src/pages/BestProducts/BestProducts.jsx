import React, { useState } from "react";
import { useBestProductsQuery } from "../../redux/features/product/productApi";
import { motion } from "framer-motion";
import { FaCrown, FaArrowRight } from "react-icons/fa";
import LoadingSpinner from "../../components/LogdingSpnner/LoadingSpnner";
import FeaturedProductsCart from "../../components/FeaturedProducts/FeaturedProducts";

const BestProducts = () => {
  const [page, setPage] = useState(1);
  const limit = 4; 
  const { data, isLoading } = useBestProductsQuery({ page, limit });
  if (isLoading && page === 1) return <LoadingSpinner />;
  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  return (
    <section className="py-24 bg-[#020617] relative overflow-hidden mt-5">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-blue-600/5 blur-[120px] rounded-full -mr-64 -mt-64"></div>

      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2 bg-amber-500/10 rounded-lg">
                <FaCrown className="text-amber-500 text-xl" />
              </span>
              <span className="text-amber-500 font-black text-xs uppercase tracking-[0.3em]">
                Top Rated Selection
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
              BEST{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500">
                SELLERS
              </span>
            </h2>
            <p className="text-slate-500 mt-4 max-w-md font-medium">
              Explore our most-loved products that have defined excellence and
              quality this season.
            </p>
          </motion.div>

          <div className="hidden lg:block h-px flex-1 bg-slate-800/50 mx-10 mb-6"></div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col items-end"
          >
            <span className="text-slate-600 text-[10px] font-bold uppercase mb-2">
              Page {page} of {totalPages}
            </span>
            <div className="w-32 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${(page / totalPages) * 100}%` }}
              ></div>
            </div>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <FeaturedProductsCart product={product} />
            </motion.div>
          ))}
        </div>

        {/* No Products Message */}
        {!isLoading && products.length === 0 && (
          <div className="text-center py-20 bg-slate-900/40 rounded-[40px] border border-slate-800">
            <p className="text-slate-500 font-medium">
              No best-selling products found at the moment.
            </p>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex flex-col items-center mt-20 gap-6">
          <div className="flex items-center gap-4">
            <button
              disabled={page === 1}
              onClick={() => {
                setPage((prev) => Math.max(prev - 1, 1));
                window.scrollTo({ top: 500, behavior: "smooth" });
              }}
              className={`p-4 rounded-2xl border border-slate-800 transition-all ${
                page === 1
                  ? "opacity-20 cursor-not-allowed"
                  : "hover:bg-slate-800 text-white"
              }`}
            >
              <FaArrowRight className="rotate-180" />
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPage(i + 1);
                  }}
                  className={`w-10 h-10 rounded-xl font-bold transition-all ${
                    page === i + 1
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-500 hover:text-white bg-slate-900"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => {
                setPage((prev) => Math.min(prev + 1, totalPages));
              }}
              className={`p-4 rounded-2xl border border-slate-800 transition-all ${
                page === totalPages
                  ? "opacity-20 cursor-not-allowed"
                  : "hover:bg-slate-800 text-white"
              }`}
            >
              <FaArrowRight />
            </button>
          </div>

          <p className="text-slate-600 text-xs font-bold uppercase tracking-[0.2em]">
            Showing {products.length} Products
          </p>
        </div>
      </div>
    </section>
  );
};

export default BestProducts;
