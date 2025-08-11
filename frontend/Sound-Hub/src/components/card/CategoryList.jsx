export default function CategoryList({ categories, visibleCount = 5 }) {
  const visible = categories.slice(0, visibleCount);
  const hasMore = categories.length > visibleCount;

  return (
    <div className="flex items-center justify-start flex-nowrap gap-3 p-0 overflow-x-scroll no-scrollbar">
      {visible.map((cat, i) => (
        <div key={i} className="inline-flex whitespace-nowrap rounded-full py-2 px-4 w-auto bg-cardWave">
          {cat.name}
        </div>
      ))}
      {hasMore && <div className="text-gray-500 inline-flex whitespace-nowrap rounded-full py-2 px-4 w-auto bg-cardWave">…</div>}
    </div>
  );
};