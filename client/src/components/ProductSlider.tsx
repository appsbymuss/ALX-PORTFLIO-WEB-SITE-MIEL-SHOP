import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';

const ProductSlider = ({ title, products, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productsPerView, setProductsPerView] = useState(1);

  useEffect(() => {
    const updateProductsPerView = () => {
      if (window.innerWidth >= 1024) {
        setProductsPerView(4);
      } else {
        setProductsPerView(1);
      }
    };

    updateProductsPerView();
    window.addEventListener('resize', updateProductsPerView);
    return () => window.removeEventListener('resize', updateProductsPerView);
  }, []);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      handleNext();
    }, interval);
    return () => clearInterval(autoSlide);
  }, [currentIndex, productsPerView]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + productsPerView) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - productsPerView : Math.max(prevIndex - productsPerView, 0)
    );
  };

  const visibleProducts = products.slice(currentIndex, currentIndex + productsPerView);
  const remainingProducts = productsPerView - visibleProducts.length;
  const additionalProducts = remainingProducts > 0 ? products.slice(0, remainingProducts) : [];

  return (
    <div className="w-full bg-[#FFF8F2] py-10 px-4">
      <div className="max-w-7xl mx-auto relative">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-left text-gray-800">
            {title}
          </h2>
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

        {/* Product Slider */}
        <div className="flex overflow-hidden w-full px-12">
          <div
            className={`grid grid-cols-${productsPerView} gap-8 transition-transform duration-500 ease-in-out transform`}
          >
            {visibleProducts.concat(additionalProducts).map((product, index) => (
              <Link key={`${product.id}-${index}`} to={`/product/${product.id}`}>
                <div
                  className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center relative"
                  style={{ width: '250px' }} // Fixed width for each product div
                >
                  {/* Product Label */}
                  {product.label && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {product.label}
                    </div>
                  )}

                  {/* Product Image */}
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />

                  {/* Product Name */}
                  <h3
                    className="text-lg font-bold text-center text-gray-800"
                    style={{ height: '50px' }}
                    title={product.name.length > 40 ? product.name : ''}
                  >
                    {product.name.length > 40 ? `${product.name.substring(0, 40)}...` : product.name}
                  </h3>

                  {/* Removed Product Description */}

                  {/* Product Price */}
                  <p className="text-gray-600 text-center font-medium mt-2">
                    {product.price} €
                  </p>

                  {/* Product Rating */}
                  <div className="flex justify-center mt-2">
                    {[...Array(product.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500 text-lg">
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Order Button */}
                  <button className="mt-4 w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors">
                    Commandez maintenant
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
