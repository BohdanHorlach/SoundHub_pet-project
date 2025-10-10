import React, { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import { useCategories } from "../../hooks/api/useCategories";
import {
  Input,
  Typography,
  Button,
} from "@material-tailwind/react";

//random colors
//TODO: create color palette to categories
const shadowColorsMap = {
  0: { shadow: "shadow-red-500/50", focus: "focus:ring-red-500" },
  1: { shadow: "shadow-green-500/50", focus: "focus:ring-green-500" },
  2: { shadow: "shadow-blue-500/50", focus: "focus:ring-blue-500" },
  3: { shadow: "shadow-yellow-500/50", focus: "focus:ring-yellow-500" },
  4: { shadow: "shadow-purple-500/50", focus: "focus:ring-purple-500" },
  5: { shadow: "shadow-pink-500/50", focus: "focus:ring-pink-500" },
  6: { shadow: "shadow-orange-500/50", focus: "focus:ring-orange-500" },
  7: { shadow: "shadow-cyan-500/50", focus: "focus:ring-cyan-500" },
  8: { shadow: "shadow-lime-500/50", focus: "focus:ring-lime-500" },
};

const getShadowForCategory = (id) => {
  const index = id % Object.keys(shadowColorsMap).length;
  return shadowColorsMap[index];
};

const CardEditor = forwardRef(({ card, setMessage }, ref) => {
  const [title, setTitle] = useState(card?.title ?? "");
  const [selectedCategories, setSelectedCategories] = useState(card?.categories?.map((cat) => cat.id) ?? []);
  const { categories, loading, error } = useCategories();

  const [localError, setLocalError] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    categories: "",
  });


  useEffect(() => {
    if (setMessage) {
      setMessage(localError);
    }
  }, [localError, setMessage]);


  const validateTitle = (input = "") => {
    const forbiddenChars = /['"`#]/;
    const value = typeof input === "string" && input !== "" ? input.trim() : title.trim();

    if (!value) {
      setErrors((prev) => ({ ...prev, title: "Title cannot be empty" }));
      return false;
    }

    if (forbiddenChars.test(value)) {
      setErrors((prev) => ({
        ...prev,
        title: "Title cannot contain quotes or backticks (' \" ` #)",
      }));
      return false;
    }

    setErrors((prev) => ({ ...prev, title: "" }));
    return true;
  };


  const validateCategories = (newSelected) => {
    const categories = newSelected ?? selectedCategories;

    if (categories.length === 0) {
      setErrors((prev) => ({
        ...prev,
        categories: "Select at least one category",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, categories: "" }));
    return true;
  };


  useImperativeHandle(ref, () => ({
    getData: () => {
      const isTitleValid = validateTitle();
      const isCategoriesValid = validateCategories();

      if (!isTitleValid || !isCategoriesValid)
        return null;

      return {
        title: title.trim().replace(/[<>]/g, ""),
        categories: selectedCategories,
      };
    },
    clear: () => {
      setTitle("");
      setLocalError("");
      setSelectedCategories([]);
      setErrors({ title: "", categories: "" });
    }
  }));


  const handleInputTitle = (title) => {
    setTitle(() => {
      if (validateTitle(title))
        setLocalError("");
      else
        setLocalError("Resolve a bad title");

      return title;
    });
  }


  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) => {
      const newSelected = prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId];

      if (validateCategories(newSelected))
        setLocalError("");
      else
        setLocalError("Choose categories");
      return newSelected;
    });
  };


  if (loading) {
    return <p className="text-gray-500">Loading categories...</p>;
  }

  if (error) {
    return <p className="text-red-500">Failed to load categories</p>;
  }

  return (
    <div className="space-y-6">

      {/* Title input */}
      <div>
        <Typography variant="h5" className="font-medium mb-2">
          Input title:
        </Typography>
        <Input
          label="Title"
          value={title}
          onChange={(e) => handleInputTitle(e.target.value)}
          onBlur={validateTitle}
          error={!!errors.title}
          color={errors.title ? "red" : "blue"}
        />
        {errors.title && (
          <Typography color="red" variant="small" className="mt-1">
            {errors.title}
          </Typography>
        )}
      </div>

      {/* Categories */}
      <div>
        <Typography variant="h5" className="font-medium mb-2">
          Choose categories:
        </Typography>
        <div className="flex flex-wrap gap-2 justify-center">
          {categories?.map((cat) => {
            const isSelected = selectedCategories.includes(cat.id);
            const { shadow, focus } = isSelected ? getShadowForCategory(cat.id) : "";
            return (
              <Button
                key={cat.id}
                size="sm"
                variant="outlined"
                className={`
                  px-4 py-1 text-sm border rounded-full transition-all bg-white ${focus}
                  ${isSelected ?
                    `border-transparent shadow-md ${shadow} border-gray-100`
                    : `border-gray-300`}`}
                onClick={() => toggleCategory(cat.id)}
              >
                {cat.name}
              </Button>
            );
          })}
        </div>
        {errors.categories && (
          <Typography color="red" variant="small" className="mt-1">
            {errors.categories}
          </Typography>
        )}
      </div>
    </div>
  );
});

export default CardEditor;
