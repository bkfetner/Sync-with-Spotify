import React, { useState, useRef, useEffect } from "react";
import "../../css/MusicPlayer.css";
import { Button } from "antd";

const useForceUpdate = () => {
  const [_, setState] = useState(false);
  return () => setState((val) => !val);
};



function MusicPlayer(props) {

  /* const forceUpdate = useForceUpdate();
  console.log(props);
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [buttonImage, setButtonImage] = useState(
    "../../../../assets/pause.png"
  );
  const [volume, setVolume] = useState(0.25);

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
      audioEl.current.volume = volume;
    } else {
      audioEl.current.pause();
    }
  });

  const buttonControl = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setButtonImage("../../../../assets/play.png");
    } else {
      setIsPlaying(true);
      setButtonImage("../../../../assets/pause.png");
    }
  };

  const handleEnd = () => {
    props.handleEndOfSong();
    console.log("props.currentSong.songUrl");
    console.log(props.currentSong.songUrl);
  }; */

  return (
    <div className="music-player">
      Track image: {props.viewData.roomImageUrl}<br />
      Track id: {props.viewData.current_track_id}<br />
      Track url: {props.viewData.current_song_track_url}<br />
      Track start time: {props.viewData.current_song_start_time}<br />
      Track end time: {props.viewData.current_song_end_time}<br />
      Song Name: {props.viewData.current_song_name}<br />
      Song Artist: {props.viewData.current_song_artist}<br />
      <Button onClick={props.handleEndOfSong}>Send next song to db</Button>
      <Button onClick={props.updateViewData}>Get current song from db</Button>


      {/* <img
        src={props.currentSong.songImageUrl}
        style={{ width: "300px", height: "300px" }}
      />
      <p style={{fontSize: "18px", paddingTop: "5px"}}>
      <strong>{props.currentSong.songName}</strong>
      </p> */}
      {/* <p>{props.currentSong.artist}</p> */}
      {/* <audio
        src={props.currentSong.songUrl}
        ref={audioEl}
        controls */}
        {/*  autoPlay */}
        {/* onEnded={handleEnd}
      ></audio> */}
    </div>
  );
}

export default MusicPlayer;
