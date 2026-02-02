import React from "react";
import HeroSection from "../Components/HeroSection/HeroSection";
import TopCategories from "../Components/TopCategories/TopCategories";
import FeaturedProducts from "../Components/FeaturedProducts/FeaturedProducts";
import DealsSection from "../Components/DealsSection/DealsSection";
import NewArrivals from "../Components/NewArrivals/NewArrivals";
import BestSellers from "../Components/BestSellers/BestSellers";
import Testimonials from "../Components/Testimonials/Testimonials";
import Newsletter from "../Components/Newsletter/Newsletter";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <TopCategories />
      <FeaturedProducts />
      <DealsSection />
      <NewArrivals />
      <BestSellers />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;
