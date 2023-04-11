import React from "react";

type Props = {
  src: string;
};

const AudioPlayer = (props: Props) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [isMuted, setIsMuted] = React.useState<boolean>(false);

  const audios = audioRef.current;

  const handlePlayPause = () => {
    if (isPlaying) {
      audios?.pause();
    } else {
      audios?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className='bg-gray-700 px-3 py-2 rounded-md'>
      <audio ref={audioRef} src={props.src} />
      <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};

export default AudioPlayer;
