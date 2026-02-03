import React from "react";
import { motion } from "framer-motion";
import { FiShoppingCart, FiHeart, FiEye, FiStar } from "react-icons/fi";
import FeaturedProductsCart from "../../../../components/FeaturedProducts/FeaturedProducts";
import { useFeaturedProductsQuery } from "../../../../redux/features/product/productApi";

const FeaturedProducts = () => {
  const { data: products } = useFeaturedProductsQuery();
  // console.log(data);
  // const products = [
  //   {
  //     id: 1,
  //     name: "BizTab Pro 12.9",
  //     image:
  //       "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80",
  //     description:
  //       "Powerful performance for professional creators and business owners.",
  //     price: 899.0,
  //     oldPrice: 1099.0,
  //     discount: 18,
  //     rating: 5,
  //   },

  //   {
  //     id: 3,
  //     name: "UltraVision 4K Monitor",
  //     image:
  //       "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80",
  //     description:
  //       "Bezel-less 4K display for maximum productivity and visuals.",
  //     price: 549.0,
  //     oldPrice: 650.0,
  //     discount: 10,
  //     rating: 5,
  //   },
  //   {
  //     id: 4,
  //     name: "Mechanical Work Pro",
  //     image:
  //       "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80",
  //     description:
  //       "Tactile mechanical keys designed for long-form typing efficiency.",
  //     price: 159.0,
  //     oldPrice: 199.0,
  //     discount: 20,
  //     rating: 4,
  //   },
  //   {
  //     id: 5,
  //     name: "Professional DSLR Kit",
  //     image:
  //       "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
  //     description:
  //       "High-resolution sensor with 4K video recording for creators.",
  //     price: 1299.0,
  //     oldPrice: 1450.0,
  //     discount: 12,
  //     rating: 5,
  //   },
  //   {
  //     id: 6,
  //     name: "Smart Hub Controller",
  //     image:
  //       "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&q=80",
  //     description:
  //       "Manage your entire office environment with one smart touch.",
  //     price: 199.0,
  //     oldPrice: 249.0,
  //     discount: 20,
  //     rating: 4,
  //   },
  // ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-380 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-[#0f172a] tracking-tight">
              Featured <span className="text-[#d97706]">Products</span>
            </h2>
            <p className="text-slate-500 font-medium mt-2">
              The best-selling tools to grow your business.
            </p>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 border-2 border-[#0f172a] text-[#0f172a] font-bold rounded-xl hover:bg-[#0f172a] hover:text-white transition-all"
          >
            Explore All Trends
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-5 gap-8">
          {products?.map((product) => (
            <FeaturedProductsCart product={product} key={product._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
