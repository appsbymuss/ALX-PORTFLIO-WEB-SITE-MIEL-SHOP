import React from "react";
import sampleImage from "../assets/calltoaction.png";

interface HoneyCollectionProps {
  title: string;
}

const HoneyCollection: React.FC<HoneyCollectionProps> = ({ title }) => {
  return (
    <div
      className="relative flex items-center justify-center bg-cover bg-center rounded-md mx-auto shadow-lg"
      style={{ 
        backgroundImage: `url(${sampleImage})`, 
        width: "100%", 
        height: "382px", 
        backgroundColor: "#FEF7F1",
        marginBottom: "10px"
      }}
    >
      <div className="absolute inset-0 bg-black/50 rounded-md flex items-center justify-center">
        <h2 className="relative text-white text-4xl font-bold text-center px-4 z-10">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default HoneyCollection;
