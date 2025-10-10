import MusicCard from "./MusicCard";
import { useState } from "react";
import SkeletonCard from "./SkeletonCard";


export default function CardList({ cards = [], loading = false }) {
  const [activeWS, setActiveWS] = useState(null);
  const skeletonCount = 6;

  const handlePlay = (ws) => {
    if (activeWS && activeWS !== ws) {
      activeWS.pause();
    }
    setActiveWS(ws);
  };


  return (
    <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-4">
      {loading
        ? Array.from({ length: skeletonCount }).map((_, i) => <SkeletonCard key={i} />)
        : cards.map((card, i) => (
          <MusicCard key={i} card={card} onPlay={handlePlay} />
        ))}
    </div>
  );
}