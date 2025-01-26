import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import ProductSlider from './ProductSlider';
import { addProductToTheCart } from '../features/cart/cartSlice';
import { RootState } from '../store';

const BestSellersSlider = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    const storedProducts = sessionStorage.getItem('products');
    if (storedProducts) {
      dispatch({ type: 'products/fetchProducts/fulfilled', payload: JSON.parse(storedProducts) });
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  const handleAddToCart = (product: any) => {
    dispatch(addProductToTheCart({ ...product, quantity: 1 }));
    console.log("Cart state:", cart);
  };

  return (
    <ProductSlider
      title="Nos Best-Sellers"
      products={products}
      onAddToCart={handleAddToCart}
    />
  );
};

export default BestSellersSlider;
