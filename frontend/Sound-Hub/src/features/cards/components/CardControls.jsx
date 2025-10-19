import { Button } from "@material-tailwind/react";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import FavoriteIcon from "./FavoriteIcon";
import { PlayButton } from "./SoundWave";


export default function CardControls({
  isFavorite,
  onToggleFavorite,
  onPlay,
  title,
  onDownload,
  canDownload = false,
  compact = false,
}) {


  const handleDownload = () => {
    if (canDownload)
      onDownload();
  };


  return (
    <div onClick={(e) => e.stopPropagation()} className={`flex ${compact ? "gap-1" : "gap-4 mt-auto"} justify-between`}>
      <Button onClick={onToggleFavorite} className="flex flex-shrink-0 justify-center w-[30%]">
        <span>
          <FavoriteIcon
            isFavorite={isFavorite}
            className={(isFavorite ? "text-red-700" : "text-white")}
          />
        </span>
      </Button>

      <div onClick={(e) => e.stopPropagation()} className="flex flex-shrink w-[40%]">
        <PlayButton onPlay={onPlay} />
      </div>

      <a className="flex flex-shrink-0 w-[30%]" onClick={handleDownload}>
        <Button className="w-full flex justify-center">
          <span>
            <ArrowDownCircleIcon className="size-6 text-white" />
          </span>
        </Button>
      </a>
    </div>
  );
}
