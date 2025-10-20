import { useState } from "react";
import { useCategories } from "../cards/hooks/useCategories";
import { useSearchParams } from "react-router-dom";
import { Button, Collapse, Input, Typography } from "@material-tailwind/react";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import CategoryGrid from "./CategoryGrid";


export default function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTitle = searchParams.get("title") || "";
  const initialCategories = JSON.parse(searchParams.get("categories") || "[]");

  const { categories, loading: loadingCategories, error: errorCategories } = useCategories();
  const [title, setTitle] = useState(initialTitle);
  const [openCategories, setOpenCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(initialCategories);


  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {};
    if (title)
      params.title = title;
    if (selectedCategories.length > 0)
      params.categories = JSON.stringify(selectedCategories);

    setOpenCategories(false);
    setSearchParams(params);
  };


  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };


  const toggleOpen = () => {
    setOpenCategories(!openCategories);
  }


  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full gap-4 mb-6 bg-card p-4 rounded-2xl shadow-md"
    >
      <div className="flex justify-between gap-3 w-full">
        {/* Search by title */}
        <Input
          label="Title input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          color="blue"
          size="lg"
          className="w-[60%]"
        />
        <div>
          <Button loading={loadingCategories} onClick={toggleOpen} className="px-4">
            <FunnelIcon className="size-5" color="white" />
          </Button>
        </div>
        <Button
          color="green"
          variant="gradient"
          type="submit"
          className="flex items-center pl-5 md:pr-10"
        >
          <span className="">
            <MagnifyingGlassIcon className="size-5" color="white" />
          </span>
          <span className="hidden md:inline md:ml-2">
            Search
          </span>
        </Button>
      </div>

      {/* Search by categories */}
      <div className="w-full">
        <Collapse open={openCategories}>
          <div className="flex flex-wrap gap-3">
            {loadingCategories ? (
              <Typography className="text-gray-400">Loading categories...</Typography>
            ) : errorCategories ? (
              <Typography color="red">Error while loading categories. Try reloading the page</Typography>
            )
              : (
                <CategoryGrid
                  categories={categories}
                  selected={selectedCategories}
                  onToggle={toggleCategory}
                />
              )}
          </div>
        </Collapse>
      </div>
    </form>
  );
}
