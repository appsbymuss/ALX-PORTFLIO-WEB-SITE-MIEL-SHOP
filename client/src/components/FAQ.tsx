import React, { useState } from "react";
import { motion } from "framer-motion";
import HoneyGif from "../assets/Honey-gif.gif";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Quels sont les bienfaits du miel naturel ?",
    answer: "Le miel naturel est une source d’énergie et de bien-être. Riche en antioxydants, enzymes et minéraux, il renforce l’immunité, favorise une bonne digestion, apaise les irritations de la gorge et hydrate la peau. Il est également reconnu pour ses propriétés cicatrisantes et anti-inflammatoires."
  },
  {
    question: "Quelle est la différence entre le miel brut et le miel transformé ?",
    answer: "Le miel brut est récolté dans son état pur, sans être chauffé ni filtré, ce qui permet de préserver tous ses nutriments, vitamines et enzymes naturels. Le miel transformé, en revanche, subit des procédés qui peuvent altérer ses qualités nutritionnelles et son goût."
  },
  {
    question: "Comment conserver le miel correctement ?",
    answer: "Pour conserver le miel dans les meilleures conditions, place-le dans un endroit frais, sec et à l’abri de la lumière directe. Veille également à bien refermer le pot pour éviter qu’il n’absorbe l’humidité ou des odeurs extérieures."
  },
  {
    question: "Pourquoi le miel cristallise-t-il ?",
    answer: "La cristallisation est un phénomène naturel qui n’altère pas la qualité du miel. Elle dépend de sa teneur en glucose et des conditions de stockage. Si tu souhaites le liquéfier, réchauffe-le doucement au bain-marie tout en évitant de dépasser 40 °C pour préserver ses bienfaits."
  },
  {
    question: "Le miel peut-il être consommé par tout le monde ?",
    answer: "Le miel convient à la plupart des gens, sauf aux nourrissons de moins d’un an, car leur système digestif est encore immature pour éliminer certaines bactéries. De plus, les personnes diabétiques doivent consulter leur médecin avant d’en consommer, car il contient des sucres naturels qui peuvent influencer leur glycémie."
  }
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-cream">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* FAQ Section */}
        <div className="flex-1 space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="border rounded-lg shadow-sm overflow-hidden">
              <button
                className="w-full text-left flex justify-between items-center p-4 bg-white hover:bg-gray-100"
                onClick={() => toggleItem(index)}
              >
                <span className="font-medium text-gray-800">{item.question}</span>
                <motion.span
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  className="text-xl font-bold text-orange-500"
                >
                  +
                </motion.span>
              </button>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 py-2 bg-orange-100 text-gray-700"
                >
                  {item.answer}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Image and Title Section */}
        <motion.div
          className="flex-1 flex flex-col justify-center items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">FAQ</h2>
          <img
            src={HoneyGif}
            alt="Honey Jar"
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
