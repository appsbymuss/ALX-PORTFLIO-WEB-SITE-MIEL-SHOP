import React from "react";

interface Category {
  id: number;
  name: string;
}

interface FilterProps {
  categories: Category[];
  selectedCategory: number | null;
  onCategoryChange: (id: number | null) => void;
}

const Filter: React.FC<FilterProps> = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter by Category</h2>
      <div className="flex flex-wrap gap-2">
        <select
          className="px-4 py-2 rounded-md bg-white text-gray-800"
          value={selectedCategory ?? ""}
          onChange={(e) => onCategoryChange(e.target.value ? parseInt(e.target.value) : null)}
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
