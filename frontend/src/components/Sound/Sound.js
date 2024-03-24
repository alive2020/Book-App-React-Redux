import React, { useState } from "react";
import sound from "../../assets/proloque.mp3";
import gifHatImage from "../../assets/harry-potter-hat.gif";

const Sound = () => {
  const [audio] = useState(new Audio(sound));
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    audio
      .play()
      .catch((error) => console.error("Failed to play audio:", error));
    setPlaying(true);
  };

  const handleToggle = () => {
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      handlePlay();
    }
  };

  return (
    <div>
      <p onClick={handleToggle}>
        <img src={gifHatImage} alt="harry potter hat" />
      </p>
    </div>
  );
};

export default Sound;
