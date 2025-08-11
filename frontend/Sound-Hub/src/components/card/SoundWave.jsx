import { Button } from "@material-tailwind/react";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/outline";
import WavesurferPlayer from "@wavesurfer/react";
import { createContext, useContext, useState } from "react";


const WavesurferContext = createContext();

export const SoundWaveProvider = ({ children }) => {
  const [wavesurfer, setWavesurfer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <WavesurferContext.Provider
      value={{ wavesurfer, setWavesurfer, isPlaying, setIsPlaying }}
    >
      {children}
    </WavesurferContext.Provider>
  );
};


export const SoundWave = ({ audioUrl, onReady = () => { } }) => {
  const { setWavesurfer, setIsPlaying } = useContext(WavesurferContext);

  function onLoadedSource(wavesurf) {
    setWavesurfer(wavesurf);
    setIsPlaying(false);
    onReady(wavesurf);
  }


  return (
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
      url={audioUrl}
      onReady={onLoadedSource}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
    />
  );
}


export const PlayButton = ({ onPlay = () => { } }) => {
  const { wavesurfer, isPlaying, setIsPlaying } = useContext(WavesurferContext);

  function onPlayPause() {
    if (!wavesurfer)
      return;

    if (!isPlaying)
      onPlay(wavesurfer);

    wavesurfer.playPause();
    setIsPlaying(!isPlaying);
  }


  return (
    <Button className="flex flex-grow justify-center" onClick={onPlayPause}>
      {
        isPlaying
          ? <PauseIcon className="size-6 text-white" />
          : <PlayIcon className="size-6 text-white" />
      }
    </Button>
  );
};
