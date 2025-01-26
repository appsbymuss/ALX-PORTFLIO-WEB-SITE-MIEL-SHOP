// Import necessary libraries
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../features/products/productsSlice";
import { addProductToTheCart } from "../features/cart/cartSlice";
import { RootState } from "../store";
import FAQ from "../components/FAQ";
import ProductMaybeLikeSlider from "../components/ProductMaybeLikeSlider";

interface Product {
  id: string;
  name: string;
  collection: string;
  rating: number;
  reviews: number | null;
  price: string;
  origin: string;
  weight: number;
  texture: string;
  flavor: string;
  benefits: string;
  usage: string;
  image_url: string;
  description: string;
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.products.product);
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center text-gray-500">Product not found</div>;
  }

  const benefits = product.benefits !== "undefined" ? product.benefits.split(",") : [];
  const usage = product.usage !== "undefined" ? product.usage.split(",") : [];

  const handleAddToCart = () => {
    dispatch(addProductToTheCart({ ...product, quantity: 1 }));
    console.log("Cart state:", cart);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FEF7F1" }}>
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Images */}
          <div className="flex-1">
            {product.image_url && (
              <div className="sticky top-4">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
          {/* Product Details */}
          <div className="flex-1 px-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-sm text-gray-500 mb-4">{product.collection}</p>
            <div className="flex items-center mb-4 space-x-1">
              <span className="text-yellow-500 text-lg">{"★".repeat(Math.floor(product.rating))}</span>
              <span className="text-gray-400 text-sm">{product.rating} ({product.reviews || 0} reviews)</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900 mb-6">€{product.price}</p>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Description</h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Characteristics</h2>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Origin: {product.origin}</li>
                <li>Weight: {product.weight}g</li>
                <li>Texture: {product.texture}</li>
                <li>Flavor: {product.flavor}</li>
              </ul>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Benefits</h2>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                {benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Usage</h2>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                {usage.map((use, index) => (
                  <li key={index}>{use}</li>
                ))}
              </ul>
            </div>
            <button
              className="mt-6 w-full bg-yellow-500 text-white py-3 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="mt-12">
          <FAQ />
        </div>
        <div className="mt-12">
          <ProductMaybeLikeSlider />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
