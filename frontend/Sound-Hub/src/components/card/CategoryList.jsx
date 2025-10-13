import { useRef, useState, useEffect } from "react";


export default function CategoryList({ categories, visibleCount = 999, isWrap = false }) {
  const visible = categories.slice(0, visibleCount);
  const hasMore = categories.length > visibleCount;

  const checkScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollTop(el.scrollTop > 0);
    setCanScrollBottom(el.scrollTop + el.clientHeight < el.scrollHeight);
  };

  const containerRef = useRef();
  const [canScrollTop, setCanScrollTop] = useState(false);
  const [canScrollBottom, setCanScrollBottom] = useState(false);

  useEffect(() => {
    checkScroll();
    const el = containerRef.current;
    if (!el)
      return;
    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, [categories]);

  return (
    <div className="relative">
      {canScrollTop && (
        <div className="absolute right-0 left-0 top-0 h-5 pointer-events-none bg-gradient-to-b from-gray-400 to-transparent z-30"></div>
      )}
      {canScrollBottom && (
        <div className="absolute right-0 left-0 bottom-0 h-5 pointer-events-none bg-gradient-to-t from-gray-400 to-transparent z-30"></div>
      )}
      <div
        ref={containerRef}
        className={`flex items-center justify-start gap-3 p-0 max-h-24 ${isWrap ? "flex-wrap overflow-y-scroll" : "overflow-x-scroll"} no-scrollbar`}
      >
        {visible.map((cat, i) => (
          <div key={i} className="inline-flex whitespace-nowrap rounded-full py-2 px-4 w-auto bg-cardWave">
            {cat.name}
          </div>
        ))}
        {hasMore && <div className="text-gray-500 inline-flex whitespace-nowrap rounded-full py-2 px-4 w-auto bg-cardWave">…</div>}
      </div>
    </div>
  );
};