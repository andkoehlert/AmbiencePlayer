import React, { useState, useRef, useEffect } from 'react';
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';

const AudioPlayer = ({ audioURL }) => {
  const [currentTrack, setCurrentTrack] = useState({ src: audioURL });
  const audioRef = useRef(null);

  useEffect(() => {
    setCurrentTrack({ src: audioURL });
  }, [audioURL]);

  const playPauseHandler = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <div className="audio-player">
      <div className="inner">
        <DisplayTrack currentTrack={currentTrack} />
        <div className="info">
          <div className="break"></div>
          <Controls onPlayPause={playPauseHandler} />
          <ProgressBar />
        </div>
      </div>
      <audio ref={audioRef} src={audioURL} />
    </div>
  );
};

export default AudioPlayer;
