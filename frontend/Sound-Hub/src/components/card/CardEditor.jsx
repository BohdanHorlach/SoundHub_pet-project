import React, { useImperativeHandle, forwardRef, useEffect, useRef, useState } from "react";
import { useCategories } from "../../hooks/api/useCategories";
import SingleLineInput from "../common/SingleLineInput";
import MultiChooseSelector from "../common/MultiChooseSelector";


const CardEditor = forwardRef(({ card, setMessage }, ref) => {
  const titleRef = useRef();
  const categoriesRef = useRef();
  const [localError, setLocalError] = useState("");
  const { categories, loading, error } = useCategories();


  useEffect(() => {
    if (setMessage) {
      setMessage(localError);
    }
  }, [localError, setMessage]);


  useImperativeHandle(ref, () => ({
    getData: () => {
      const title = titleRef.current?.getData();
      const selectedCategories = categoriesRef.current?.getData();
      let errors = [];

      if (title == null) errors.push("Title is invalid or empty");
      if (selectedCategories == null) errors.push("Categories are invalid");

      if (errors.length > 0) {
        setLocalError(errors.join(". "));
        return null;
      }

      return {
        title: title,
        categories: selectedCategories,
      };
    },
    clear: () => {
      titleRef.current?.clear();
      categoriesRef.current?.clear();
    }
  }));


  if (loading) {
    return <p className="text-gray-500">Loading categories...</p>;
  }

  if (error) {
    return <p className="text-red-500">Failed to load categories</p>;
  }

  return (
    <div className="space-y-6">
      <SingleLineInput
        ref={titleRef}
        label="Input title:"
        value={card?.title ?? ""}
        rules={{
          required: true,
          forbidden: /['"`#/]/,
          maxLength: 25,
        }}
        onChange={(id) => setMessage("")}
      />

      <MultiChooseSelector
        ref={categoriesRef}
        label="Choose categories:"
        items={categories}
        defaultSelected={card?.categories?.map((cat) => cat.id) ?? []}
        getId={(cat) => cat.id}
        getLabel={(cat) => cat.name}
        onChange={(id) => setMessage("")}
      />
    </div>
  );
});

export default CardEditor;
