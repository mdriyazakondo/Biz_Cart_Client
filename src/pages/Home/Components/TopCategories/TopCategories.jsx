import React from "react";
import ProductCart from "../../../../components/ProductCart/ProcudtCart";
import FeaturedProductsCart from "../../../../components/FeaturedProducts/FeaturedProducts";

const TopCategories = () => {
  const products = [
    {
      id: 1,
      name: "Ultra-Premium Headphones",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
      description: "Experience studio-quality sound with noise-canceling tech.",
      price: 249.99,
      oldPrice: 320.0,
      rating: 5,
      discount: 22,
    },
    {
      id: 2,
      name: "Pro Business Smartwatch",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
      description:
        "Elegant design with 24/7 health tracking and AMOLED display.",
      price: 180.0,
      oldPrice: 210.0,
      rating: 5,
      discount: 15,
    },
    {
      id: 3,
      name: "Mechanical Backlit Keyboard",
      image:
        "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80",
      description: "Tactile typing experience with customizable RGB lighting.",
      price: 89.99,
      oldPrice: 120.0,
      rating: 5,
      discount: 25,
    },
    {
      id: 4,
      name: "4K Content Creator Camera",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
      description: "Perfect for vlogging and high-resolution photography.",
      price: 850.0,
      oldPrice: 999.0,
      rating: 5,
      discount: 15,
    },
    {
      id: 5,
      name: "Noise Isolating Earbuds",
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80",
      description: "Crystal clear calls and long-lasting battery life.",
      price: 125.0,
      oldPrice: 160.0,
      rating: 5,
      discount: 10,
    },
  ];

  return (
    <section className="py-20 bg-[#f8fafc]">
      <div className="max-w-380 mx-auto px-4 sm:px-6 lg:px-8">
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
          {products.map((product) => (
            // <ProductCart key={product.id} product={product} />
            <FeaturedProductsCart key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
