import { useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";


export function Pagination({ currentPage = 1, totalPages, onChange }) {
  const MAX_VISIBLE_PAGES = 5;
  const [active, setActive] = useState(parseInt(currentPage));


  const handleChange = (index) => {
    setActive(index);
    onChange(index);
  };


  const getItemProps = (index) =>
  ({
    variant: active == index ? "filled" : "text",
    color: "gray",
    onClick: () => handleChange(index),
  });


  const next = () => {
    if (active < totalPages) handleChange(active + 1);
  };


  const prev = () => {
    if (active > 1) handleChange(active - 1);
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {
          Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            if (page > MAX_VISIBLE_PAGES)
              return null;

            return <IconButton key={page} {...getItemProps(page)}>{page}</IconButton>
          })
        }
        {totalPages > MAX_VISIBLE_PAGES && (
          <>
            <IconButton>{"..."}</IconButton>
            <IconButton {...getItemProps(totalPages)}>
              {totalPages}
            </IconButton>
          </>
        )}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === totalPages}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}