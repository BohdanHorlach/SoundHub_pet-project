import MusicCard from "./MusicCard";
import { useState } from "react";


export default function CardList({ tracks }) {
  const [activeWS, setActiveWS] = useState(null);

  const handlePlay = (ws) => {
    if (activeWS && activeWS !== ws) {
      activeWS.pause();
    }
    setActiveWS(ws);
  };


  return (
    <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-4">
      {tracks.map((track, i) => (
        <MusicCard
          key={i}
          sampleName={track.name}
          sourceUrl={track.url}
          categories={track.categories}
          isOnFavorite={track.isFavorite}
          onPlay={handlePlay}
        />
      ))}
    </div>
  );
}