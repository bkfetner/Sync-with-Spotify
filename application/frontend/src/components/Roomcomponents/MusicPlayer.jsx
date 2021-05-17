import React, { useState, useRef, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { Image } from "antd";

import "../../css/MusicPlayer.css";
import { Button } from "antd";

const useForceUpdate = () => {
  const [_, setState] = useState(false);
  return () => setState((val) => !val);
};



function MusicPlayer(props) {

  const [play, setPlay] = useState(true);

  useEffect(() => setPlay(true), [props.viewData.current_song_track_url]);
  if (!props.accessToken) return null;

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
      <Button onClick={props.submitNextSong}>Update next song</Button>


      <Image
            src={props.viewData.roomImageUrl}
            style={{ width: "300px" }}
            preview={false}
          />
      <div className="spotify-music-player-controls">
      <SpotifyPlayer
        styles={{sliderHeight: '0', loaderSize: '110'}}
        initialVolume={0.25}
        token={props.accessToken}
        showSaveIcon
        callback={(state) => {
          console.log("callback state");
          console.log(state);
          if (!state.isPlaying) setPlay(true);
        }}
        uris={props.viewData.current_song_track_url ? [props.viewData.current_song_track_url] : []}
        autoPlay={true}
        play={true}
      />
      </div>

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
