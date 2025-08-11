import React, { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import { getCategories } from "../../utils/cashed-category";

//random colors
//TODO: create color palette to categories
const shadowColors = [
  "shadow-red-500/50",
  "shadow-green-500/50",
  "shadow-blue-500/50",
  "shadow-yellow-500/50",
  "shadow-purple-500/50",
  "shadow-pink-500/50",
  "shadow-orange-500/50",
  "shadow-cyan-500/50",
  "shadow-lime-500/50",
];

const getShadowForCategory = (id) => {
  const index = id % shadowColors.length;
  return shadowColors[index];
};

const CardEditor = forwardRef(({ card }, ref) => {
  const [title, setTitle] = useState(card?.title ?? "");
  const [selectedCategories, setSelectedCategories] = useState(card?.categories?.map((cat) => cat.id) ?? []);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      title,
      categories: selectedCategories,
    }),
  }));

  const toggleCategory = (categoryId) => {
    setSelectedCategories((selected) =>
      selected.includes(categoryId)
        ? selected.filter((id) => id !== categoryId)
        : [...selected, categoryId]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Categories:</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategories.includes(cat.id);
            const shadow = isSelected ? getShadowForCategory(cat.id) : "";
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className={`
                  px-4 py-1 text-sm border rounded-full transition-all  bg-white
                  ${isSelected ? `border-transparent shadow-md ${shadow} border-gray-100` : "border-gray-300"}
                `}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default CardEditor;
