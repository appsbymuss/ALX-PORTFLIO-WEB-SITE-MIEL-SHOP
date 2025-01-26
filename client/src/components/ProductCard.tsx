import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProductToTheCart } from "../features/cart/cartSlice";
import { RootState } from "../store";

type Product = {
  id: number;
  name: string;
  price: number | string;
  image_url: string;
  rating: number;
  availability: string;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const price = typeof product.price === "number" ? product.price.toFixed(2) : parseFloat(product.price).toFixed(2);

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = () => {
    dispatch(addProductToTheCart({ ...product, quantity: 1 }));
    console.log("Cart state:", cart);
  };

  return (
    <div
      className="bg-white shadow-md rounded-md p-4 flex flex-col items-center cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={product.image_url}
        alt={product.name}
        className="w-24 h-24 object-contain mb-4"
      />
      <h3 className="text-lg font-semibold text-center">{product.name}</h3>
      <p className="text-yellow-500 text-sm mb-2">{"⭐".repeat(product.rating)}</p>
      <p className="text-xl font-bold text-gray-800 mb-2">{price} €</p>
      <p className="text-green-500 text-sm mb-4">{product.availability}</p>
      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
        onClick={(e) => {
          e.stopPropagation();
          handleAddToCart();
        }}
      >
        Commander maintenant
      </button>
    </div>
  );
};

export default ProductCard;
