import MusicCard from "./MusicCard";
import { useState } from "react";


export default function CardList({ cards = [] }) {
  const [activeWS, setActiveWS] = useState(null);

  const handlePlay = (ws) => {
    if (activeWS && activeWS !== ws) {
      activeWS.pause();
    }
    setActiveWS(ws);
  };


  return (
    <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-4">
      {cards.map((card, i) => (
        <MusicCard
          key={i}
          cardId={card.id}
          sampleName={card.title}
          sourceUrl={card.audioUrl}
          categories={card.categories}
          isOnFavorite={card.isOnFavorite}
          onPlay={handlePlay}
        />
      ))}
    </div>
  );
}