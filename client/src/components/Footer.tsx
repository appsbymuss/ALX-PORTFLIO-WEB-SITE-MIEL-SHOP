import React from "react";
import logoFooter from "../assets/logofooter.png";
import tiktokIcon from "../assets/tiktok.svg";
import instagramIcon from "../assets/instagram.svg";
import facebookIcon from "../assets/facebook.svg";
import FeatureSection from "./FeaturesComponent";

const Footer: React.FC = () => {
  return (
    <div>
      <FeatureSection />
      <footer className="bg-[#000000] text-white py-12">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo Section */}
          <div className="flex flex-col items-start">
            <img
              src={logoFooter}
              alt="Lemiel Shop Logo"
              className="w-32 mb-6"
            />
            <div className="flex space-x-6">
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                <img
                  src={tiktokIcon}
                  alt="TikTok"
                  className="w-8 h-8 hover:opacity-80"
                />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img
                  src={instagramIcon}
                  alt="Instagram"
                  className="w-8 h-8 hover:opacity-80"
                />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img
                  src={facebookIcon}
                  alt="Facebook"
                  className="w-8 h-8 hover:opacity-80"
                />
              </a>
            </div>
          </div>

          {/* Menu Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6">MENU</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="hover:underline">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Nos miel
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Collections
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6">CONTACT US</h3>
            <p className="text-sm mb-2">(62) 1829017</p>
            <p className="text-sm mb-2">Hello@studio.co</p>
            <p className="text-sm mb-2">John Bucarest St. 199</p>
            <p className="text-sm mb-2">Monday - Friday</p>
            <p className="text-sm">9:00 am - 6:00 pm</p>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6">JOIN OUR NEWSLETTER</h3>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter e-mail address"
                className="w-full px-4 py-3 rounded-l-md text-black focus:outline-none"
              />
              <button
                type="submit"
                className="bg-yellow-500 text-black px-4 py-3 rounded-r-md hover:bg-yellow-600"
              >
                ➔
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-12 border-t border-gray-700 pt-6 flex justify-between items-center text-sm">
          <p>Copyright © {new Date().getFullYear()} lemielshop. All Rights Reserved</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms & Conditions
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
