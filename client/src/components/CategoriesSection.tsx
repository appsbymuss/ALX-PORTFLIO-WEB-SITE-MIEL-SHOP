import React from "react";
import { motion } from "framer-motion";
import CategoryItem from "./CategoryItem";

import bigzone1 from "../assets/bigzone1.jpg";
import bigzone2 from "../assets/bigzone2.jpg";
import bigzone3 from "../assets/bigzone3.jpg";
import bigzone4 from "../assets/bigzone4.jpg";
import bigzone5 from "../assets/bigzone5.jpg";

const CategoriesSection: React.FC = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-amber-100 via-white to-amber-50">
      {/* Header */}
      <motion.h2
        className="text-center text-amber-800 font-serif text-6xl font-extrabold mb-12 tracking-wide"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Explore Our Honey
      </motion.h2>

      {/* Grid Container */}
      <motion.div
        className="flex flex-wrap justify-center gap-6 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <CategoryItem image={bigzone1} />
        <CategoryItem image={bigzone2} />
        <CategoryItem image={bigzone3} />
        <CategoryItem image={bigzone4} />
        <CategoryItem image={bigzone5} />
      </motion.div>
    </section>
  );
};

export default CategoriesSection;
