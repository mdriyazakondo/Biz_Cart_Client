import { motion } from "framer-motion";
import { useCategoryProductsQuery } from "../../redux/features/product/productApi";
import { FaBolt, FaMicrochip, FaShieldAlt, FaHeadphones } from "react-icons/fa";
import FeaturedProductsCart from "../../components/FeaturedProducts/FeaturedProducts";
import LoadingSpinner from "../../components/LogdingSpnner/LoadingSpnner";

const Electronic = () => {
  const { data, isLoading, error } = useCategoryProductsQuery("electronics");

  if (isLoading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="p-10 border border-red-500/20 bg-red-500/5 rounded-4xl text-center">
          <h2 className="text-red-500 font-black text-2xl mb-2">
            System Error
          </h2>
          <p className="text-slate-400">
            Unable to retrieve electronic inventory at this moment.
          </p>
        </div>
      </div>
    );

  const products = data?.products || [];

  return (
    <section className="min-h-screen bg-[#020617] pb-22">
      <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24 -mt-12">
          {[
            { icon: <FaMicrochip />, title: "Precision", sub: "Silicon Built" },
            { icon: <FaShieldAlt />, title: "Warranty", sub: "Certified Gear" },
            { icon: <FaHeadphones />, title: "Audio", sub: "Hi-Res Output" },
            { icon: <FaBolt />, title: "Power", sub: "Efficient Energy" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-[#0f172a]/80 backdrop-blur-md border border-slate-800 p-8 rounded-3xl flex items-center gap-5 group"
            >
              <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                {stat.icon}
              </div>
              <div>
                <h4 className="text-white font-black uppercase text-sm">
                  {stat.title}
                </h4>
                <p className="text-slate-500 text-[10px] font-bold uppercase">
                  {stat.sub}
                </p>
              </div>
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

 
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <FeaturedProductsCart product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-[#0f172a]/20 rounded-[4rem] border border-dashed border-slate-800">
            <FaMicrochip className="mx-auto text-6xl text-slate-700 mb-6 opacity-20" />
            <h3 className="text-white text-xl font-black uppercase tracking-widest">
              No Gadgets Detected
            </h3>
            <p className="text-slate-500 mt-2 italic">
              Scanning for new inventory... Please check back soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Electronic;
