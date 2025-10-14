import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import CategoryList from "./CategoryList";
import { SoundWave, SoundWaveProvider } from "./SoundWave";
import MusicCardModal from "./MusicCardModal";
import CardControls from "./CardControls";
import { useMusicCardActions } from "../hooks/useMusicCardActions";


export default function MusicCard({ card, onPlay = () => { } }) {
  const {
    isFavorite,
    openDetails,
    setOpenDetails,
    addToFavorite,
    onReady,
  } = useMusicCardActions(card);

  const VISIBLE_CATEGORIES_COUNT = 3;

  return (
    <>
      <SoundWaveProvider>
        <Card
          color="white"
          variant="gradient"
          onClick={() => setOpenDetails(true)}
          className="cursor-pointer transition-transform hover:scale-[1.02] mt-6 w-full h-auto box-border shadow-lg"
        >
          <CardHeader floated={false} className="h-auto bg-cardWave shadow-md">
            <div onClick={(e) => e.stopPropagation()}>
              <SoundWave audioUrl={card.audioUrl} onReady={onReady} />
            </div>
          </CardHeader>
          <CardBody className="w-full">
            <CategoryList categories={card.categories} visibleCount={VISIBLE_CATEGORIES_COUNT} />
            <Typography variant="h5" color="blue-gray" className="flex justify-center mt-5">
              {card.title}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0 w-[100%]">
            <CardControls
              isFavorite={isFavorite}
              onToggleFavorite={() => addToFavorite(card.id)}
              onPlay={onPlay}
              audioUrl={card.audioUrl}
              title={card.title}
              downloadUrl={`/api/music/${card.id}/download`}
              canDownload
              compact
            />
          </CardFooter>
        </Card>
      </SoundWaveProvider>
      <MusicCardModal
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        card={card}
        isFavorite={isFavorite}
        onToggleFavorite={addToFavorite}
        onPlay={onPlay}
        downloadUrl={`/api/music/${card.id}/download`}
        canDownload
      />
    </>
  );
};