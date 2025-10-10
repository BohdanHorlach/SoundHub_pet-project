import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { Button, Typography, Input } from "@material-tailwind/react";
import HoveringItem from "./HoveringItem";

const MAX_HINTS_COUNT = 10;

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


const MultiChooseSelector = forwardRef(({ label, items = [], defaultSelected = [], getId, getLabel, onChange }, ref) => {
  const [selected, setSelected] = useState(defaultSelected);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);


  useEffect(() => {
    if (query.trim() === "") {
      setFiltered([]);
    } else {
      const q = query.toLowerCase();
      const res = items
        .filter(
          (item) =>
            getLabel(item).toLowerCase().includes(q) &&
            !selected.includes(getId(item))
        )
        .slice(0, MAX_HINTS_COUNT);
      setFiltered(res);
    }
  }, [query, items, selected]);


  const validate = (list = selected) => {
    if (list.length === 0) {
      setError("Select at least one item");
      return false;
    }
    setError("");
    return true;
  };


  const addItem = (item) => {
    const id = getId(item);
    if (!selected.includes(id)) {
      const newList = [...selected, id];
      setSelected(newList);
      validate(newList);
    }
    setQuery("");
    setFiltered([]);
    inputRef.current?.focus();

    onChange(id);
  };


  const removeItem = (id) => {
    setSelected((prev) => {
      const newList = prev.filter((x) => x !== id);
      validate(newList);
      onChange(id);

      return newList;
    });
  };


  useImperativeHandle(ref, () => ({
    getData: () => {
      const isValid = validate();
      if (!isValid) return null;
      return selected;
    },
    clear: () => {
      setSelected([]);
      setQuery("");
      setError("");
    },
    validate,
  }));


  return (
    <div>
      {label && (
        <Typography variant="h5" className="font-medium mb-2">
          {label}
        </Typography>
      )}

      {/* Search input field */}
      <Input
        inputRef={inputRef}
        label="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        crossOrigin={undefined}
      />

      {/* Hints list */}
      {filtered.length > 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-md max-h-48 overflow-auto">
          {filtered.map((item) => {
            const id = getId(item);
            const name = getLabel(item);
            return (
              <div
                key={id}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => addItem(item)}
              >
                {name}
              </div>
            );
          })}
        </div>
      )}

      {/* Choosed items */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selected.map((id) => {
            const item = items.find((it) => getId(it) === id);
            if (!item) return null;
            const name = getLabel(item);
            const { shadow } = getShadowForCategory(id);
            return (
              <Button
                key={id}
                size="sm"
                variant="outlined"
                className={`px-3 py-1 text-sm border rounded-full transition-all bg-white border-transparent shadow-md ${shadow}`}
                onClick={() => removeItem(id)}
              >
                <HoveringItem
                  origin={name}
                  hoverItem={<span className={"text-red-500"}>{"Remove"}</span>}
                />
              </Button>
            );
          })}
        </div>
      )}

      {error && (
        <Typography color="red" variant="small" className="mt-1">
          {error}
        </Typography>
      )}
    </div>
  );
});

export default MultiChooseSelector;
