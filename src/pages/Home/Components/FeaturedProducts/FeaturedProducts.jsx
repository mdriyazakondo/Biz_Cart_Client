import React from "react";
import { motion } from "framer-motion";
import FeaturedProductsCart from "../../../../components/FeaturedProducts/FeaturedProducts";
import { useFeaturedProductsQuery } from "../../../../redux/features/product/productApi";

const FeaturedProducts = () => {
  const { data: products } = useFeaturedProductsQuery();

  return (
    <section className="py-24 bg-[#020617] overflow-hidden">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="flex items-center gap-2 mb-3 text-indigo-500">
              <span className="w-8 h-[2px] bg-indigo-500"></span>
              <span className="font-black text-[10px] uppercase tracking-[0.4em]">
                Handpicked for you
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              Featured <span className="text-indigo-500">Products</span>
            </h2>
            <p className="text-slate-500 font-medium mt-3 max-w-md leading-relaxed">
              Elevate your workspace with the best-selling tools designed for
              professional efficiency.
            </p>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {products?.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <FeaturedProductsCart product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
