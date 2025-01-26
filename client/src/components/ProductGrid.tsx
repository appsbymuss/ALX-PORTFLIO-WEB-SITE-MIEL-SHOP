import React from "react";
import ProductCard from "./ProductCard";

type Product = {
  id: number;
  name: string;
  price: number | string;
  image_url: string;
  rating: number;
  availability: string;
};

type ProductGridProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default ProductGrid;
