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
import { motion } from "framer-motion";


export default function MusicCardModal({
  open,
  onClose,
  card,
  isFavorite,
  onToggleFavorite,
  onPlay,
  downloadUrl,
  canDownload = false
}) {
  return (
    <SoundWaveProvider>
      <Dialog open={open} size="xl" handler={onClose} className="bg-transparent">
        <div className="h-96 p-10 bg-white/20 bg-gradient-to-br from-white/10 via-white/20 to-white-100/10 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg overflow-hidden">
          <DialogBody className="p-0 rounded-xl h-full">
            <div className="flex flex-row w-full h-full gap-0">
              {/* Soundwave */}
              <motion.div
                className="flex flex-col w-1/2 p-4 bg-white backdrop-blur-md gap-4 z-20 rounded-tl-xl rounded-bl-xl"
                initial={{ x: "48%" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 70, damping: 30, delay: 0.5 }}
              >
                <div className="h-[80%] flex flex-col justify-center">
                  <SoundWave audioUrl={card.audioUrl} />
                </div>
                <div className="h-[20%]">
                  <CardControls
                    isFavorite={isFavorite}
                    onToggleFavorite={() => onToggleFavorite(card.id)}
                    onPlay={onPlay}
                    audioUrl={card.audioUrl}
                    title={card.title}
                    downloadUrl={downloadUrl}
                    canDownload={canDownload}
                  />
                </div>
              </motion.div>

              {/* Details */}
              <motion.div
                className="flex flex-col justify-between h-full bg-white/50 w-1/2 p-4 gap-4 z-10 rounded-tr-xl rounded-br-xl"
                initial={{ x: "-48%" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 70, damping: 30, delay: 0.5 }}
              >
                <Typography variant="h4" color="blue-gray" className="shrink-0">
                  {card.title}
                </Typography>
                <div className="flex-1 overflow-auto">
                  <CategoryList categories={card.categories} />
                </div>
                <div className="text-end">
                  <Button variant="text" color="red" onClick={onClose}>
                    Close
                  </Button>
                </div>
              </motion.div>
            </div>
          </DialogBody>
          <DialogFooter>
            {""}
          </DialogFooter>
        </div>
      </Dialog>
    </SoundWaveProvider>
  );
}
