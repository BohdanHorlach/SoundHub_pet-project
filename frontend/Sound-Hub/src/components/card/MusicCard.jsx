import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import CategoryList from "./CategoryList";
import { useState } from "react";
import { PlayButton, SoundWave, SoundWaveProvider } from "./SoundWave";
import axiosInstance from "../../utils/axios/axios-instance";


const FavoriteIcon = ({ isFavorite }) =>
  isFavorite ? <HeartSolid className="size-6" /> : <HeartOutline className="size-6" />;


export default function MusicCard({
  cardId,
  sampleName = "",
  sourceUrl = "",
  categories = [],
  isOnFavorite = false,
  onPlay = () => { }
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const VISIBLE_CATEGORIES_COUNT = 3;


  function onReady() {
    setIsFavorite(isOnFavorite);
  }


  async function addToFavorite(cardId) {
    await axiosInstance.post(`/favorite/${cardId}`);
    setIsFavorite(!isFavorite);
  }


  return (
    <SoundWaveProvider>
      <Card color="white" variant="gradient" className="mt-6 w-full h-auto box-border shadow-lg">
        <CardHeader floated={false} className="h-auto bg-cardWave shadow-md">
          <SoundWave audioUrl={sourceUrl} onReady={onReady} />
        </CardHeader>
        <CardBody className="w-full">
          <CategoryList categories={categories} visibleCount={VISIBLE_CATEGORIES_COUNT} />
          <Typography variant="h5" color="blue-gray" className="flex justify-center mt-5">
            {sampleName}
          </Typography>
        </CardBody>
        <CardFooter className="flex justify-between pt-0 gap-1 w-[100%]">
          <Button onClick={() => addToFavorite(cardId)} className="flex-grow-0">
            <span
              className={`
              transition-all duration-600 ease-in-out
              ${isFavorite ? "text-red-700" : "text-white"}`}
            >
              <FavoriteIcon isFavorite={isFavorite} />
            </span>
          </Button>
          <PlayButton onPlay={onPlay} />
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
    </SoundWaveProvider>
  );
};