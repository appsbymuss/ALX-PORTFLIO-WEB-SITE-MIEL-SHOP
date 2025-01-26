import React from "react";
import Qualiteicon from "../assets/qualiteicon.svg";
import Ecoicon from "../assets/ecoicon.svg";
import Hearticon from "../assets/hearticon.svg";
import Naturelicon from "../assets/naturelicon.svg";
import FeaturedImage from "../assets/featured-image.png"; // Replace with the actual image

const WhyChooseUs: React.FC = () => {
  return (
    <div className="bg-[#000000] text-white p-8 md:p-16 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center uppercase tracking-wide">
        Pourquoi Choisir Lemiel.shop ?
      </h2>
      <p className="mb-10 text-center text-gray-300 max-w-3xl mx-auto">
        Voici ce qui fait de nous le choix idéal pour le miel et les produits bio.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center text-center">
            <img src={Naturelicon} alt="100% Pur et Naturel" className="w-16 h-16 mb-4" />
            <h3 className="font-semibold text-lg text-yellow-500">
              100% Pur et Naturel
            </h3>
            <p className="text-gray-300">
              Chaque pot de miel est brut, non transformé et sans additifs pour
              garantir une saveur authentique.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img src={Hearticon} alt="Approvisionnement Éthique" className="w-16 h-16 mb-4" />
            <h3 className="font-semibold text-lg text-yellow-500">
              Approvisionnement Éthique
            </h3>
            <p className="text-gray-300">
              Nous travaillons avec des apiculteurs respectueux de l'environnement
              qui préservent la biodiversité des abeilles.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img src={Ecoicon} alt="Emballage Écoresponsable" className="w-16 h-16 mb-4" />
            <h3 className="font-semibold text-lg text-yellow-500">
              Emballage Écoresponsable
            </h3>
            <p className="text-gray-300">
              Nous nous engageons pour la planète avec des emballages recyclables et
              respectueux de l'environnement.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img src={Qualiteicon} alt="Qualité Testée en Laboratoire" className="w-16 h-16 mb-4" />
            <h3 className="font-semibold text-lg text-yellow-500">
              Qualité Testée en Laboratoire
            </h3>
            <p className="text-gray-300">
              Nos produits subissent des tests rigoureux pour garantir leur pureté,
              leur source et leur qualité exceptionnelle.
            </p>
          </div>
        </div>

        {/* Right Side: Featured Image */}
        <div className="flex justify-center">
          <img
            src={FeaturedImage}
            alt="Beekeeper working"
            className="rounded-lg shadow-md w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
