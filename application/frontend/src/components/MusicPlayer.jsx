import React, { useState, useRef, useEffect } from "react";

function MusicPlayer(props) {
  console.log(props);
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [buttonImage, setButtonImage] = useState("./assets/image0.png");

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  });

  const buttonControl = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setButtonImage("./assets/image0.png");
    } else {
      setIsPlaying(true);
      setButtonImage("./assets/play.png");
    }
  };

  return (
    <div className="music-player">
      <audio src={props.currentSong.songUrl} ref={audioEl}></audio>
      <img
        src={props.currentSong.songImageUrl}
        style={{ width: "300px", height: "300px" }}
      />
      <p>{props.currentSong.songName}</p>
      <p>{props.currentSong.artist}</p>
      <button
        style={{
          padding: "0",
          border: "none",
          background: "none",
        }}
        onClick={buttonControl}
      >
        <img
          src={buttonImage}
          style={{
            width: "50px",
            height: "50px",
            filter: "invert(70%)",
          }}
        />
      </button>
    </div>
  );
}

export default MusicPlayer;
