import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";

const SocialMediaFooter = () => {
  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="bg-black flex justify-center items-center flex-col py-9 gap-3 mt-24 mx-5 max-[400px]:mx-3">
        <p className="text-base text-[#dcb253] font-light">Follow us on:</p>
        <div className="flex gap-4 text-[#dcb253]">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="w-5 hover:text-white transition-colors" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="w-6 hover:text-white transition-colors" />
          </a>
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
            <FaTiktok className="w-6 hover:text-white transition-colors" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className="w-6 hover:text-white transition-colors" />
          </a>
          <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
            <FaPinterestP className="w-6 hover:text-white transition-colors" />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="w-6 hover:text-white transition-colors" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaFooter;