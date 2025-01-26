import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../features/products/productsSlice";
import { fetchCollections } from "../features/collections/collectionsSlice";
import { RootState } from "../store";
import { Pagination, ProductGrid, Filter } from "../components";
import HoneyCollection from "../components/HoneyCollection";
import { addProductToTheCart } from "../features/cart/cartSlice";

const NosMiel = () => {
  const { category } = useParams<{ category: string }>();
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const collections = useSelector((state: RootState) => state.collections.items);
  const cart = useSelector((state: RootState) => state.cart);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts());
      await dispatch(fetchCollections());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (category) {
      setSelectedCategory(parseInt(category));
    }
  }, [category]);

  const categories = collections.map((collection) => ({
    id: collection.id,
    name: collection.name,
  }));

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category_id === selectedCategory)
    : products;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleAddToCart = (product: any) => {
    dispatch(addProductToTheCart({ ...product, quantity: 1 }));
    console.log("Cart state:", cart);
  };

  return (
    <div className="max-w-screen-2xl mx-auto pt-10 bg-[#FEF7F1]">
      <HoneyCollection title="Collections Miel" />
      <div className="px-4 md:px-8" style={{ marginTop: '119px' }}>
        <Filter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={(id) => setSelectedCategory(id)}
        />
        <ProductGrid products={currentProducts} onAddToCart={handleAddToCart} />
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

export default NosMiel;
