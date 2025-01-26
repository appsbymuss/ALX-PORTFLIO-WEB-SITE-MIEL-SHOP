import React, { useState } from "react";
import {
  LoaderFunctionArgs,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import { Pagination, ProductGrid, Filter } from "../components";
import HoneyCollection from "../components/HoneyCollection";
import Prodimgs01 from '../assets/Prodimgs01.avif';
import Prodimgs02 from '../assets/Prodimgs02.avif';
import Prodimgs03 from '../assets/Prodimgs03.avif';
import Prodimgs04 from '../assets/Prodimgs04.avif';
import Prodimgs05 from '../assets/Prodimgs05.avif';
import Prodimgs06 from '../assets/Prodimgs06.avif';
import Prodimgs07 from '../assets/Prodimgs07.avif';
import Prodimgs08 from '../assets/Prodimgs08.avif';
import Prodimgs09 from '../assets/Prodimgs09.avif';
import Prodimgs10 from '../assets/Prodimgs10.avif';
import Prodimgs11 from '../assets/Prodimgs11.avif';
import Prodimgs12 from '../assets/Prodimgs12.avif';
import Prodimgs13 from '../assets/Prodimgs13.avif';
import Prodimgs14 from '../assets/Prodimgs14.avif';
import Prodimgs15 from '../assets/Prodimgs15.avif';
import Prodimgs16 from '../assets/Prodimgs16.avif';

export const shopCategoryLoader = async ({ params }: LoaderFunctionArgs) => {
  const { category } = params;

  return category;
};

const Shop = () => {
  const category = useLoaderData() as string;
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const productsPerPage = 8;

  const products = [
    { id: 1, name: 'MIEL ROYAL D’EUPHORBE', price: 39.99, image: Prodimgs01, rating: 5, availability: 'In Stock', category: 'Miel' },
    { id: 2, name: 'MIEL DE JUJUBIER', price: 44.99, image: Prodimgs02, rating: 5, availability: 'In Stock', category: 'Miel' },
    { id: 3, name: 'MIEL DE THYM', price: 29.99, image: Prodimgs03, rating: 5, availability: 'In Stock', category: 'Miel' },
    { id: 4, name: 'MIEL DE ROMARIN', price: 24.99, image: Prodimgs04, rating: 5, availability: 'In Stock', category: 'Miel' },
    { id: 5, name: 'MIEL DE CITRONNIER', price: 19.99, image: Prodimgs05, rating: 5, availability: 'In Stock', category: 'Miel' },
    { id: 6, name: 'MIEL DE LAVANDE', price: 34.99, image: Prodimgs06, rating: 5, availability: 'In Stock', category: 'Miel' },
    { id: 7, name: 'MIEL DE FLEURS', price: 14.99, image: Prodimgs07, rating: 5, availability: 'In Stock', category: 'Miel' },
    { id: 8, name: 'MIEL DE MONTAGNE', price: 24.99, image: Prodimgs08, rating: 5, availability: 'In Stock', category: 'Miel' },
    { id: 9, name: 'MIEL DE FORET', price: 29.99, image: Prodimgs09, rating: 5, availability: 'In Stock', category: 'Miel' },
    { id: 10, name: 'MIEL DE TILLEUL', price: 19.99, image: Prodimgs10, rating: 5, availability: 'In Stock', category: 'Miel' },
    { id: 11, name: 'MIEL DE CHATAIGNIER', price: 34.99, image: Prodimgs11, rating: 5, availability: 'In Stock', category: 'Miel' },
    { id: 12, name: 'MIEL DE SAPIN', price: 39.99, image: Prodimgs12, rating: 5, availability: 'In Stock', category: 'Miel' },
    { id: 13, name: 'MIEL DE BOURDAINE', price: 24.99, image: Prodimgs13, rating: 5, availability: 'In Stock', category: 'Miel' },
    { id: 14, name: 'MIEL DE BRUYERE', price: 29.99, image: Prodimgs14, rating: 5, availability: 'In Stock', category: 'Miel' },
    { id: 15, name: 'MIEL DE PISSENLIT', price: 19.99, image: Prodimgs15, rating: 5, availability: 'In Stock', category: 'Miel' },
    { id: 16, name: 'MIEL DE TOURNESOL', price: 14.99, image: Prodimgs16, rating: 5, availability: 'In Stock', category: 'Miel' },
  ];

  const categories = ["Miel", "Dattes", "Santé", "Huiles", "Accessoires"];

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-screen-2xl mx-auto pt-10 bg-[#FEF7F1]">
      <HoneyCollection />
      <div className="px-4 md:px-8" style={{ marginTop: '119px' }}>
        <Filter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <ProductGrid products={currentProducts} />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
          onPageChange={paginate}
        />
        <div style={{ height: '100px' }}></div>
      </div>
    </div>
  );
};

export default Shop;
