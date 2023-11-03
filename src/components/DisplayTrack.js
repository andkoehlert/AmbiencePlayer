import React, { useRef, useState, useEffect } from 'react';

// This is for the audio player & it handles the audio and play/pause button

const DisplayTrack = ({ currentTrack }) => {
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const [volume, setVolume] = useState(1);

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

/*   const PlayPause = () => {
    console.log(videoRef.current); // Check if videoRef.current is defined
    if (videoRef.current && videoRef.current.paused) {
      console.log("Play");
      videoRef.current.play();
    } else if (videoRef.current) {
      console.log("Pause");
      videoRef.current.pause();
    }
  }; */

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(Math.max(0, Math.min(1, newVolume)));
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="z-10 text-center">
      <audio ref={audioRef} src={currentTrack.src} controls={false} controlsList="nodownload" />
      <div className="flex justify-center items-center flex-wrap">
        <label className="pr-2">Adjust ambience:</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="bg-gray-300"
        />
      </div>
      <div className="">
        <button
          onClick={togglePlayPause}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded  mt-2"
        >
          Play/Pause ambience
        </button>
       {/*  <button
          onClick={PlayPause}
          className="bg-blue- hover:bg-blue-700 text-white font-bold py-2 px-4  rounded  mt-2"
        >
          Play/Pause video
        </button> */}
      </div>
    </div>
  );
};

export default DisplayTrack;
