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
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Creative Director",
    text: "Finding premium gear was never this easy. Simply elite!",
    image: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Founder, Studio X",
    text: "Flawless experience. The support team is incredible.",
    image: "https://i.pravatar.cc/150?u=3",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Product Manager",
    text: "The best marketplace for business electronics. Top-notch!",
    image: "https://i.pravatar.cc/150?u=4",
  },
  {
    id: 5,
    name: "David Miller",
    role: "Tech Lead",
    text: "Scaling setup was a breeze. Truly a professional partner.",
    image: "https://i.pravatar.cc/150?u=5",
  },
];

const infiniteReviews = [...reviews, ...reviews];

const TestimonialSection = () => {
  return (
    <section className="py-24 bg-[#020617] overflow-hidden">
      <div className="max-w-360 mx-auto px-4 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="h-px w-8 bg-amber-500"></span>
            <span className="text-amber-500 font-black text-[10px] uppercase tracking-[0.4em]">
              Wall of Love
            </span>
            <span className="h-px w-8 bg-amber-500"></span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
            Trusted by the <br />{" "}
            <span className="text-amber-500">Best in Business.</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
            Join 5,000+ industry leaders who have upgraded their professional
            setup with us.
          </p>
        </motion.div>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="flex overflow-hidden relative group">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40, // Slower speed for better readability
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {infiniteReviews.map((review, idx) => (
            <div
              key={idx}
              className="inline-block w-[350px] md:w-[450px] bg-[#0f172a] p-10 rounded-[2.5rem] border border-slate-800/50 hover:border-amber-500/50 transition-all duration-500 group-hover:pause"
            >
              <div className="flex gap-1.5 mb-8">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className="text-amber-500 fill-amber-500"
                    size={16}
                  />
                ))}
              </div>

              <p className="text-white text-xl md:text-2xl font-bold leading-snug mb-10 whitespace-normal tracking-tight">
                "{review.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={review.image}
                    className="w-14 h-14 rounded-2xl object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    alt={review.name}
                  />
                  <div className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 p-1 rounded-lg border-4 border-[#0f172a]">
                    <FiCheck size={12} strokeWidth={4} />
                  </div>
                </div>
                <div className="text-left">
                  <h4 className="font-black text-white text-base leading-none">
                    {review.name}
                  </h4>
                  <p className="text-amber-500/60 font-black text-[9px] uppercase tracking-widest mt-2">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Improved Dark Gradient Overlays */}
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default TestimonialSection;
