import React from "react";

type Props = {
  src: string;
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
};

const AudioPlayer = (props: Props) => {
  const audios = props.audioRef.current;

  const handlePlayPause = () => {
    if (props.isPlaying) {
      audios?.pause();
    } else {
      audios?.play();
    }
    props.setIsPlaying(!props.isPlaying);
  };

  return (
    <div className='bg-gray-700 px-3 py-2 rounded-md'>
      <audio ref={props.audioRef} src={props.src} />
      <button onClick={handlePlayPause}>
        {props.isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default AudioPlayer;
