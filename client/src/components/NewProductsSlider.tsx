import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import ProductSlider from './ProductSlider';

const NewProductsSlider = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.items);

  useEffect(() => {
    const storedProducts = sessionStorage.getItem('products');
    if (storedProducts) {
      dispatch({ type: 'products/fetchProducts/fulfilled', payload: JSON.parse(storedProducts) });
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  return (
    <ProductSlider title="Nouveautés" products={products} />
  );
};

export default NewProductsSlider;
