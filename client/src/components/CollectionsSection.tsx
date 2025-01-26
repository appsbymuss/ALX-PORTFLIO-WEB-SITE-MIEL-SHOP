import React, { useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollections } from '../features/collections/collectionsSlice';
import { createSelector } from 'reselect';
import { Link } from 'react-router-dom';

const selectCollections = createSelector(
  (state: any) => state.collections?.items,
  (items) => items.map(item => ({ ...item })) // Ensure transformation logic
);

const Collections: React.FC = () => {
  const dispatch = useDispatch();
  const collections = useSelector(selectCollections);

  useEffect(() => {
    const storedCollections = sessionStorage.getItem('collections');
    if (storedCollections) {
      dispatch({ type: 'collections/fetchCollections/fulfilled', payload: JSON.parse(storedCollections) });
    } else {
      dispatch(fetchCollections());
    }
  }, [dispatch]);

  return (
    <div className="w-full bg-[#FFB606] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl font-bold text-white text-center mb-8">NOS COLLECTIONS</h2>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {collections.length > 0 ? (
            collections.map((collection: any) => (
              <Link
                key={collection.id}
                to={`/collections/${collection.id}`}
                className="relative group overflow-hidden rounded-lg shadow-lg bg-white"
              >
                <img
                  src={collection.image_url || 'default-image-url.jpg'}
                  alt={collection.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white text-xl font-semibold">{collection.name}</h3>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-white text-center">No collections available.</p>
          )}
        </div>

        {/* Shop Button */}
        <div className="text-center mt-10">
          <button className="px-8 py-3 bg-black text-white font-semibold text-lg rounded-md shadow-md hover:bg-gray-800 transition">
            SHOP AUTRES PRODUITS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Collections;
