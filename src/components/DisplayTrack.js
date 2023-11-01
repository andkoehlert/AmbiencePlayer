import React, { useRef, useState, useEffect } from 'react';

const DisplayTrack = ({ currentTrack }) => {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

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
      <audio ref={audioRef}
        src={currentTrack.src}
        controls={false}
        controlsList="nodownload"
      />
      <div className="  flex justify-center items-center flex-wrap">
        <label className="pr-2">Adjust ambience:</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="bg-gray-300 "
        />
      </div>
      <div className="">
      <button
        onClick={togglePlayPause}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded  mt-2"
      >
        Play/Pause ambience
      </button>
      </div>
    </div>
  );
};

export default DisplayTrack;
