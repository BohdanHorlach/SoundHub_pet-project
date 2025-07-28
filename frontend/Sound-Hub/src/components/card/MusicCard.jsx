import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import { PlayIcon, PauseIcon, ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import WavesurferPlayer from "@wavesurfer/react";
import CategoryList from "./CategoryList";
import { useState } from "react";


const FavoriteIcon = ({ isFavorite }) =>
  isFavorite ? <HeartSolid className="size-6" /> : <HeartOutline className="size-6" />;


export default function MusicCard({
  sampleName = "",
  sourceUrl = "",
  categories = [],
  isOnFavorite = false,
  onPlay = () => { }
}) {
  const [wavesurfer, setWavesurfer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const VISIBLE_COUNT = 3;

  function onReady(ws) {
    setWavesurfer(ws);
    setIsPlaying(false);
    setIsFavorite(isOnFavorite);
  }


  function addToFavorite() {
    setIsFavorite(!isFavorite);
  }


  function onPlayPause() {
    if (!wavesurfer)
      return;

    if (!isPlaying)
      onPlay(wavesurfer);

    wavesurfer.playPause();
    setIsPlaying(!isPlaying);
  }


  return (
    <Card color="white" variant="gradient" className="mt-6 w-full h-auto box-border shadow-lg">
      <CardHeader floated={false} className="h-auto bg-cardWave shadow-md">
        <WavesurferPlayer
          height="auto"
          waveColor="#0284c7"
          progressColor="#94a3b8"
          cursorWidth={5}
          cursorColor="#6b7280"
          barWidth={2.5}
          barGap={2}
          barRadius={15}
          mediaControls={false}
          url={sourceUrl}
          onReady={onReady}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </CardHeader>
      <CardBody className="w-full">
        <CategoryList categories={categories} visibleCount={VISIBLE_COUNT} />
        <Typography variant="h5" color="blue-gray" className="flex justify-center mt-5">
          {sampleName}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-between pt-0 gap-1 w-[100%]">
        <Button onClick={addToFavorite} className="flex-grow-0">
          <span
            className={`
              transition-all duration-600 ease-in-out
              ${isFavorite ? "text-red-700" : "text-white"}`}
          >
            <FavoriteIcon isFavorite={isFavorite} />
          </span>
        </Button>
        <Button className="flex flex-grow justify-center" onClick={onPlayPause}>
          {
            isPlaying
              ? <PauseIcon className="size-6 text-white" />
              : <PlayIcon className="size-6 text-white" />
          }
        </Button>
        <a
          href={sourceUrl}
          download={sampleName}
        >
          <Button className="flex-grow-0">
            <ArrowDownCircleIcon className="size-6 text-white" />
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};