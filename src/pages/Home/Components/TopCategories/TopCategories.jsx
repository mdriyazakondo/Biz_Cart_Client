import React from "react";
import FeaturedProductsCart from "../../../../components/FeaturedProducts/FeaturedProducts";
import { useTrendingProductsQuery } from "../../../../redux/features/product/productApi";

const TopCategories = () => {
  const { data: products, isLoading, isError } = useTrendingProductsQuery();

  if (isLoading)
    return (
      <div className="py-20 text-center font-bold">
        Loading Trending Products...
      </div>
    );
  if (isError)
    return (
      <div className="py-20 text-center text-red-500 font-bold">
        Failed to load products.
      </div>
    );

  return (
    <section className="py-20 bg-[#f8fafc]">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-[#0f172a]">
              Trending <span className="text-[#d97706]">Products</span>
            </h2>
            <p className="text-slate-500 font-medium mt-2">
              Selected premium items for your professional needs.
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {products?.map((product) => (
            <FeaturedProductsCart key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
