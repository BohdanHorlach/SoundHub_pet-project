import { Button } from "@material-tailwind/react";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import FavoriteIcon from "./FavoriteIcon";
import { PlayButton } from "./SoundWave";


export default function CardControls({
  isFavorite,
  onToggleFavorite,
  onPlay,
  title,
  downloadUrl,
  canDownload = false,
  compact = false,
}) {


  return (
    <div onClick={(e) => e.stopPropagation()} className={`flex ${compact ? "gap-1" : "gap-4 mt-auto"} justify-between`}>
      <Button onClick={onToggleFavorite} className="flex w-[30%] justify-center">
        <span>
          <FavoriteIcon
            isFavorite={isFavorite}
            className={(isFavorite ? "text-red-700" : "text-white")}
          />
        </span>
      </Button>

      <div onClick={(e) => e.stopPropagation()} className="flex w-[50%]">
        <PlayButton onPlay={onPlay} />
      </div>

      <a className="flex w-[30%]" href={canDownload ? downloadUrl : undefined} download={`${title}.mp3`}>
        <Button className="w-full flex justify-center">
          <span>
            <ArrowDownCircleIcon className="size-6 text-white" />
          </span>
        </Button>
      </a>
    </div>
  );
}
