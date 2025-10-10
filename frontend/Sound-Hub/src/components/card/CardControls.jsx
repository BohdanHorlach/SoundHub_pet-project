import { Button } from "@material-tailwind/react";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import FavoriteIcon from "./FavoriteIcon";
import { PlayButton } from "./SoundWave";


export default function CardControls({
  cardId,
  isFavorite,
  onToggleFavorite,
  onPlay,
  audioUrl,
  title,
  compact = false,
}) {


  return (
    <div onClick={(e) => e.stopPropagation()} className={`flex ${compact ? "gap-1" : "gap-4 mt-auto"} justify-between`}>
      <Button onClick={onToggleFavorite} className="flex flex-grow-0">
        <FavoriteIcon
          isFavorite={isFavorite}
          className={(isFavorite ? "text-red-700" : "text-white")}
        />
      </Button>

      <div onClick={(e) => e.stopPropagation()} className="flex flex-grow">
        <PlayButton onPlay={onPlay} />
      </div>

      <a href={`/api/music/${cardId}/download`} download={`${title}.mp3`}>
        <Button className="flex flex-grow-0">
          <ArrowDownCircleIcon className="size-6 text-white" />
        </Button>
      </a>
    </div>
  );
}
