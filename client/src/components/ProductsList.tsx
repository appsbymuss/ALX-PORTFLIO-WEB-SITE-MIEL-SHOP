import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import { RootState, AppDispatch } from '../store';

const ProductsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.items);
  const productStatus = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts({ max_items: 8, page: 1 }));
    }
  }, [productStatus, dispatch]);

  let content;

  if (productStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (productStatus === 'succeeded') {
    content = (
      <ul>
        {products.map((product: any) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    );
  } else if (productStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <section>
      <h2>Products</h2>
      {content}
    </section>
  );
};

export default ProductsList;
