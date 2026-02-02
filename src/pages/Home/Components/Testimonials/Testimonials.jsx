import React from "react";
import { motion } from "framer-motion";
import { FiStar, FiCheck } from "react-icons/fi";

const reviews = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "CEO, TechFlow",
    text: "BizCartPro transformed our workflow. The hardware quality is industry-leading.",
    image: "https://i.pravatar.cc/150?u=1",
    color: "bg-blue-50",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Creative Director",
    text: "Finding premium gear was never this easy. Simply elite!",
    image: "https://i.pravatar.cc/150?u=2",
    color: "bg-amber-50",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Founder, Studio X",
    text: "Flawless experience. The support team is incredible.",
    image: "https://i.pravatar.cc/150?u=3",
    color: "bg-slate-50",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Product Manager",
    text: "The best marketplace for business electronics. Top-notch!",
    image: "https://i.pravatar.cc/150?u=4",
    color: "bg-gray-50",
  },
  {
    id: 5,
    name: "David Miller",
    role: "Tech Lead",
    text: "Scaling setup was a breeze. Truly a professional partner.",
    image: "https://i.pravatar.cc/150?u=5",
    color: "bg-indigo-50",
  },
];

// Double the list for infinite scroll effect
const infiniteReviews = [...reviews, ...reviews];

const TestimonialSection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-black text-[#0f172a] tracking-tighter mb-6">
            Trusted by the <br />{" "}
            <span className="text-[#d97706]">Best in Business.</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium">
            Join 5,000+ professionals who trust BizCartPro.
          </p>
        </motion.div>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="flex overflow-hidden relative group">
        <motion.div
          className="flex gap-6 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {infiniteReviews.map((review, idx) => (
            <div
              key={idx}
              className={`inline-block w-87.5 md:w-112.5 ${review.color} p-10 rounded-[2.5rem] border border-slate-100 hover:border-[#d97706] transition-all duration-500 group-hover:pause`}
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className="text-[#d97706] fill-[#d97706]"
                    size={14}
                  />
                ))}
              </div>

              <p className="text-[#0f172a] text-xl font-bold leading-tight mb-8 whitespace-normal">
                "{review.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={review.image}
                    className="w-12 h-12 rounded-full object-cover shadow-md"
                    alt=""
                  />
                  <div className="absolute -bottom-1 -right-1 bg-[#0f172a] text-[#d97706] p-0.5 rounded-full border-2 border-white">
                    <FiCheck size={10} strokeWidth={4} />
                  </div>
                </div>
                <div className="text-left">
                  <h4 className="font-black text-slate-900 text-sm leading-none">
                    {review.name}
                  </h4>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Gradient Overlays for smooth fade effect */}
        <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-white to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-white to-transparent z-10"></div>
      </div>
    </section>
  );
};

export default TestimonialSection;
