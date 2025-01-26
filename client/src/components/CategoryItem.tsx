import React from "react";
import { motion } from "framer-motion";

interface CategoryItemProps {
  image: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ image }) => {
  return (
    <motion.div
      className="relative w-[360px] h-[230px] rounded-[16px_124px_16px_124px] m-4 shadow-xl overflow-hidden"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* Image */}
      <img
        src={image}
        alt="Honey Category"
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/50 opacity-0 hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default CategoryItem;
