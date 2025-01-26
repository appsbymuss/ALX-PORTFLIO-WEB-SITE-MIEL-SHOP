import React from "react";
import LivraisonIcon from "../assets/livraisonicon.svg";
import AssistanceIcon from "../assets/assistanceicon.svg";
import SecureIcon from "../assets/secureicon.svg";
import PackageIcon from "../assets/packageicon.svg";

interface FeatureProps {
  iconPath: string;
  title: string;
  description: string;
}

const features = [
  {
    iconPath: LivraisonIcon,
    title: "LIVRAISON INTERNATIONALE",
    description:
      "Vous n'habitez pas en France ? Pas de problème, nous livrons partout en Europe !",
  },
  {
    iconPath: AssistanceIcon,
    title: "ASSISTANCE 24 H/24",
    description:
      "Une équipe de soutien dédiée pour répondre à toutes vos questions.",
  },
  {
    iconPath: SecureIcon,
    title: "PAIEMENT SÉCURISÉ",
    description: "Nous garantissons un paiement 100% sécurisé.",
  },
  {
    iconPath: PackageIcon,
    title: "SATISFAIT OU REMBOURSÉ",
    description:
      "Nous proposons le satisfait ou remboursé pendant 14 jours après réception d'articles.",
  },
];

const Feature: React.FC<FeatureProps> = ({ iconPath, title, description }) => (
  <div className="flex flex-col items-center text-center gap-4 m-2.5 p-4 bg-white rounded-lg shadow-md">
    <img src={iconPath} alt="icon" className="w-12 h-12" />
    <h3 className="font-bold text-lg text-black">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const FeatureSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8 bg-[#8B8B8B] w-full h-full">
      {features.map((feature, index) => (
        <Feature
          key={index}
          iconPath={feature.iconPath}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default FeatureSection;