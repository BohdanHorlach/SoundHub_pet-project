import { Checkbox, Typography } from "@material-tailwind/react";
import React from "react";

export default function CategoryGrid({ categories, selected = [], onToggle }) {
  const grouped = categories
    .sort((a, b) => a.name.localeCompare(b.name))
    .reduce((acc, cat) => {
      const letter = cat.name[0].toUpperCase();
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(cat);
      return acc;
    }, {});

  const letters = Object.keys(grouped).sort();

  return (
    <div className="w-full max-w-6xl mx-auto px-2">
      <div
        className="
          grid gap-6 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-5
        "
      >
        {letters.map((letter) => (
          <div key={letter}>
            <Typography variant="h3" className="text-lg font-semibold mb-2 border-b border-gray-300">
              {letter}
            </Typography>
            <div className="space-y-1">
              {grouped[letter].map((cat) => {
                const isSelected = selected.includes(cat.id);
                return (
                  <Checkbox
                    key={cat.id}
                    checked={isSelected}
                    onChange={() => onToggle(cat.id)}
                    label={cat.name}
                    ripple={false}
                    className="hover:bg-gray-800 rounded-lg px-2 py-1 transition"
                    containerProps={{
                      className: "flex items-center gap-2",
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
