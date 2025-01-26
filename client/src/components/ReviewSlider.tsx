import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Review {
  name: string;
  role: string;
  text: string;
  rating: number;
}

const reviews: Review[] = [
  {
    name: "SARAH L",
    role: "Cliente Vérifiée",
    text: "Le miel de Lemiel.shop est le meilleur que j'ai goûté ! La qualité est exceptionnelle, et savoir qu'il est issu d'un approvisionnement éthique le rend encore plus spécial.",
    rating: 5,
  },
  {
    name: "PIERRE M.",
    role: "Client Fidèle",
    text: "Non seulement leur miel est délicieux, mais leurs produits bio comme les huiles et les thés sont incroyables. Je suis fan de leur engagement envers la nature.",
    rating: 5,
  },
  {
    name: "AMÉLIE C.",
    role: "Acheteuse Écoresponsable",
    text: "Une livraison rapide, des emballages écologiques et un miel d'une pureté exceptionnelle. Lemiel.shop, c'est le choix parfait pour moi et ma famille.",
    rating: 5,
  },
  {
    name: "JEAN-PAUL T.",
    role: "Gourmet Passionné",
    text: "J'utilise leur miel dans toutes mes recettes, et mes amis n'arrêtent pas de me demander où je l'achète. Un vrai trésor naturel.",
    rating: 5,
  },
  {
    name: "MARIE D.",
    role: "Amatrice de Miel",
    text: "Le miel de Lemiel.shop est tout simplement délicieux. Je ne peux plus m'en passer !",
    rating: 5,
  },
  {
    name: "THOMAS B.",
    role: "Client Satisfait",
    text: "Le service client est excellent et les produits sont de très haute qualité. Je recommande vivement.",
    rating: 5,
  },
];

const ReviewsSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewsPerView, setReviewsPerView] = useState(1);

  useEffect(() => {
    const updateReviewsPerView = () => {
      if (window.innerWidth >= 1024) {
        setReviewsPerView(4);
      } else {
        setReviewsPerView(1);
      }
    };

    updateReviewsPerView();
    window.addEventListener("resize", updateReviewsPerView);
    return () => window.removeEventListener("resize", updateReviewsPerView);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-yellow-500 py-10 px-5">
      <div className="max-w-7xl mx-auto relative">
        {/* Header and Navigation Buttons */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Vos Avis</h2>
          <div className="flex items-center">
            <button
              onClick={handlePrev}
              className="bg-[#F9C16D] text-white w-10 h-10 rounded-full flex items-center justify-center z-10 hover:bg-gray-700 transition-transform transform hover:scale-110 mr-4"
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              className="bg-[#F9C16D] text-white w-10 h-10 rounded-full flex items-center justify-center z-10 hover:bg-gray-700 transition-transform transform hover:scale-110"
            >
              ›
            </button>
          </div>
        </div>

        {/* Reviews Slider */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / reviewsPerView)}%)`,
            }}
          >
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0"
                style={{
                  width: "347.079px",
                  height: "353.152px",
                  padding: "28px",
                  borderRadius: "27.766px",
                  marginRight: "20px",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="bg-white rounded-lg shadow-lg"
                  style={{
                    width: "100%",
                    height: "100%",
                    padding: "28px",
                    borderRadius: "27.766px",
                  }}
                >
                  <div className="flex items-center mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">{review.text}</p>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSlider;
