import React from 'react';

const Controls = ({ onPlayPause }) => {
  return (
    <div className="controls ">
      <button onClick={onPlayPause}></button>
    </div>
  );
};

export default Controls;
