import {
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import CategoryList from "./CategoryList";
import { SoundWave, SoundWaveProvider } from "./SoundWave";
import CardControls from "./CardControls";


export default function MusicCardModal({
  open,
  onClose,
  card,
  isFavorite,
  onToggleFavorite,
  onPlay,
}) {
  return (
    <SoundWaveProvider>
      <Dialog open={open} size="xl" handler={onClose} className="h-96">
        <DialogBody className="p-0">
          <div className="flex flex-row w-full">
            <div className="flex flex-col w-1/3 p-4 bg-gray-100 gap-4">
              <SoundWave audioUrl={card.audioUrl} />
              <CardControls
                cardId={card.id}
                isFavorite={isFavorite}
                onToggleFavorite={() => onToggleFavorite(card.id)}
                onPlay={onPlay}
                audioUrl={card.audioUrl}
                title={card.title}
                compact
              />
            </div>

            <div className="flex flex-col w-2/3 p-4 gap-4">
              <Typography variant="h4" color="blue-gray">
                {card.title}
              </Typography>
              <CategoryList categories={card.categories} />
            </div>
          </div>
        </DialogBody>

        <DialogFooter>
          <Button variant="text" color="red" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </SoundWaveProvider>
  );
}
