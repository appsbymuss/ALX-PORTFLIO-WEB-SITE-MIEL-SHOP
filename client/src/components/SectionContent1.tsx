import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Sectioncontent1 from "../assets/sectioncontent1.gif";
import Natural from "../assets/naturels.svg";

const SectionContent1: React.FC = () => {
  return (
    <motion.div
      className="bg-[#353535] text-white px-6 py-12 md:px-16 lg:px-28"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Left Section */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center lg:text-left leading-tight">
            Découvrez la Passion <br /> Derrière Lemiel.Shop
          </h1>
          <p className="text-gray-300 text-base md:text-lg mb-6 text-center lg:text-left leading-relaxed">
            Chez Lemiel.shop, nous avons une mission simple : vous offrir le
            meilleur de la nature, dans toute sa pureté. Notre aventure a
            commencé avec une profonde admiration pour le travail des abeilles
            et leur rôle essentiel dans notre écosystème.
          </p>
          <p className="text-gray-300 text-base md:text-lg mb-6 text-center lg:text-left leading-relaxed">
            Chaque pot de miel que nous proposons est une promesse de qualité,
            de durabilité et de bien-être. Nous collaborons avec des apiculteurs
            respectueux de l’environnement et des agriculteurs biologiques pour
            garantir des produits aussi frais que naturels.
          </p>
          <div className="flex justify-center lg:justify-start">
            <Link to="/collection">
              <motion.button
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-8 py-3 rounded-lg shadow-md transform hover:-translate-y-1 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Collection
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="flex-1 flex justify-center items-center relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <img
              src={Sectioncontent1}
              alt="Miel products in a basket"
              className="rounded-lg shadow-2xl w-[461px] h-[567px] flex-shrink-0 object-cover"
            />
            <motion.div
              className="absolute top-[20px] left-0 transform transition-all duration-300 lg:top-[20px] lg:left-[-70px]"
              style={{
                width: "194px",
                height: "194px",
                flexShrink: 0,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <img
                src={Natural}
                alt="Badge Natural"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SectionContent1;
