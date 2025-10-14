import {
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import CategoryList from "./CategoryList";
import { SoundWave, SoundWaveProvider } from "./SoundWave";
import CardControls from "./CardControls";
import { motion } from "framer-motion";
import useUserById from "../../auth/useUserById";


export default function MusicCardModal({
  open,
  onClose,
  card,
  isFavorite,
  onToggleFavorite,
  onPlay,
  downloadUrl,
  canDownload = false,
  actionButton
}) {
  const { user, loading, error } = useUserById(card.authorId, open);

  if (open == false)
    return <></>

  return (

    <Dialog open={open} size="xl" handler={onClose} className="bg-transparent rounded-2xl">
      <div className="h-96 p-10 bg-white/20 bg-gradient-to-br from-white/10 via-white/30 to-white-100/10 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg overflow-hidden">
        <DialogBody className="p-0 rounded-xl h-full">
          <div className="flex flex-row w-full h-full gap-0">
            {/* Soundwave */}
            <motion.div
              className="flex flex-col w-1/2 p-4 bg-white backdrop-blur-md gap-4 z-20 rounded-tl-xl rounded-bl-xl"
              initial={{ x: "48%" }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 70, damping: 30, delay: 0.5 }}
            >
              <SoundWaveProvider>
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
              </SoundWaveProvider>
            </motion.div>

            {/* Details */}
            <motion.div
              className="flex flex-col justify-between h-full bg-gray-400 w-1/2 p-4 gap-4 z-10 rounded-tr-xl rounded-br-xl"
              initial={{ x: "-48%" }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 70, damping: 30, delay: 0.5 }}
            >
              <div>
                <Typography variant="h4" color="blue-gray" className="shrink-0">
                  {card.title}
                </Typography>
                <Typography variant="small" color="gray" className="mt-2">
                  <Avatar size="xs" src={user?.avatar ?? "icons/user_icon.svg"} className="mr-1" />
                  {loading ? "Author loading" : error ? "Failed load user" : user?.name}
                </Typography>
              </div>
              <div className="flex-1 mt-2">
                <Typography variant="h6" className="text-gray-700 mb-2">
                  Categories:
                </Typography>
                <CategoryList categories={card.categories} isWrap />
              </div>
              <div className="text-end">
                {actionButton ?? ("")}
                <Button className="ml-1" variant="text" color="red" onClick={onClose}>
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
  );
}
