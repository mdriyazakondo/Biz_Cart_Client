import React, { useState } from "react";
import { useNewProductsQuery } from "../../redux/features/product/productApi";
import { motion } from "framer-motion";
import LoadingSpinner from "../../components/LogdingSpnner/LoadingSpnner";
import FeaturedProductsCart from "../../components/FeaturedProducts/FeaturedProducts";

const NewProducts = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useNewProductsQuery({ page, limit: 4 });
  console.log(data);
  if (isLoading) return <LoadingSpinner />;

  if (isError)
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        Something went wrong while fetching products!
      </div>
    );

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  return (
    <section className="py-20 bg-[#020617] mt-20">
      <div className="max-w-380 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-500/20">
                Fresh Arrivals
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              New <span className="text-blue-500">Collections</span>
            </h2>
          </motion.div>

          <div className="hidden md:block h-px flex-1 bg-linear-to-r from-blue-500/50 to-transparent mx-10"></div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-400 hover:text-white text-sm font-bold uppercase tracking-tighter transition-colors border-b border-gray-800 hover:border-blue-500 pb-1"
          >
            View All Items
          </motion.button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <FeaturedProductsCart product={product} />
            </motion.div>
          ))}
        </div>

        {/* No Products Message */}
        {products.length === 0 && (
          <div className="text-center py-20 bg-[#0f172a] rounded-3xl border border-dashed border-gray-800">
            <p className="text-gray-500 italic">
              No new products arrived yet. Check back later!
            </p>
          </div>
        )}

        {/* Pagination / Load More */}
        {page < totalPages && products.length > 0 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-6 py-2 bg-blue-600 cursor-pointer text-white rounded-lg  transition-colors"
            >
              See More Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewProducts;
