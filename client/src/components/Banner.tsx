import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import slider1 from "../assets/slider1.jpg";
import slider2 from "../assets/slider2.jpg";
import slider3 from "../assets/slider3.jpg";
import slider4 from "../assets/slider4.jpg";
import slider5 from "../assets/slider5.jpg";

const slides = [
  {
    image: slider1,
    heading: "Pur & Naturel",
    subheading: "Découvrez l'essence du meilleur miel de la nature.",
    link: { to: "/nos-miels", text: "Achetez Maintenant" },
  },
  {
    image: slider2,
    heading: "Récolté avec Amour",
    subheading: "Chaque goutte est un témoignage de qualité et de soin.",
    link: { to: "/nos-miels", text: "En Savoir Plus" },
  },
  {
    image: slider3,
    heading: "Douceur Dorée",
    subheading: "Savourez la magie du miel pur.",
    link: { to: "/nos-miels", text: "Explorer les Produits" },
  },
  {
    image: slider4,
    heading: "Soyez Gentil",
    subheading: "Soutenir nos abeilles pour un avenir durable.",
    link: { to: "/nos-miels", text: "Découvrir Plus" },
  },
  {
    image: slider5,
    heading: "Goûtez la Nature",
    subheading: "Une expérience délicieuse à chaque cuillerée.",
    link: { to: "/nos-miels", text: "Voir les Recettes" },
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatic slide transition every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100">
      {/* Slide Container */}
      <AnimatePresence>
        {slides.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={index}
                className="absolute inset-0 bg-cover bg-center flex flex-col justify-center items-center text-center"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${slide.image})`,
                }}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.h1
                  className="text-white text-6xl font-extrabold mb-4 shadow-lg tracking-wide"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  {slide.heading}
                </motion.h1>
                <motion.p
                  className="text-white text-lg mb-8 shadow-md tracking-wide max-w-2xl"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  {slide.subheading}
                </motion.p>
                <Link
                  to={slide.link.to}
                  className="bg-yellow-500 text-white px-10 py-4 rounded-full shadow-lg text-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-105"
                >
                  {slide.link.text}
                </Link>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-4 shadow-xl hover:scale-110 transition duration-300"
      >
        &#9664;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-4 shadow-xl hover:scale-110 transition duration-300"
      >
        &#9654;
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 flex justify-center w-full gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full ${
              index === currentSlide
                ? "bg-yellow-500 scale-125 shadow-md"
                : "bg-gray-400 hover:bg-yellow-500"
            } transition-transform duration-300`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
