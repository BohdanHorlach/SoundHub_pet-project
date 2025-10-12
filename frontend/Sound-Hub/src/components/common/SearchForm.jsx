import { useState } from "react";
import { useCategories } from "../../hooks/api/useCategories";
import { useSearchParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";


export default function SearchForm({ onSearch }) {
  const { categories, loading: loadingCategories } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialTitle = searchParams.get("title") || "";
  const initialCategories = JSON.parse(searchParams.get("categories") || "[]");

  const [title, setTitle] = useState(initialTitle);
  const [selectedCategories, setSelectedCategories] = useState(initialCategories);


  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {};
    if (title)
      params.title = title;
    if (selectedCategories.length > 0)
      params.categories = JSON.stringify(selectedCategories);

    setSearchParams(params);
    onSearch({ title, categories: selectedCategories });
  };


  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mb-6 bg-card p-4 rounded-2xl shadow-md"
    >
      {/* Search by title */}
      <input
        type="text"
        placeholder="Search by title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {/* Search by categories */}
      <div className="flex flex-wrap gap-3">
        {loadingCategories ? (
          <p className="text-gray-400">Loading categories...</p>
        ) : (
          categories?.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => toggleCategory(cat.id)}
              />
              <span>{cat.name}</span>
            </label>
          ))
        )}
      </div>

      <Button
        color="green"
        variant="gradient"
        type="submit"
        className="bg-primary text-white rounded-xl py-2 hover:bg-primary/80 transition"
      >
        Search
      </Button>
    </form>
  );
}
