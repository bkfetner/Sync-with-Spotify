import React, { Component, useState, useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import Axios from "axios";

import MusicPlayer from "./MusicPlayer.jsx";
{
  /*import albumCover from "./assets/image0.png";
    import playButton from "../assets/play_button.png";
  */
}

const Room = (props) => {
  const [songs, setSongs] = useState({
    song_id: "1",
    songName: "Song 1",
    artist: "unknown",
    songUrl:
      "https://www.freesound.org/data/previews/338/338825_1648170-lq.mp3",
    songImageUrl: "./assets/image0.png",
  });

  const [currentSong, setCurrentSong] = useState(0);

  return (
    <div>
      <div class="main">
        <strong style={{ marginTop: "20px", fontSize: "xxx-large" }}>
          {props.location.state.roomName}
        </strong>
        <em>Room Genre: {props.location.state.roomGenre}</em>
        <div class="grid1">
          <div class="queue1">
            <div class="queue-header">
              <div>Queue</div>
              <div>Vote</div>
            </div>
            <div class="songdiv">
              {/* <img src={albumCover} /> */}
              Song 1
              <input
                type="checkbox"
                style={{
                  float: "right",
                  marginRight: "20px",
                  marginTop: "15px",
                }}
              />
            </div>
            <div class="songdiv">
              {/* <img src={albumCover} /> */}
              Song 2
              <input
                type="checkbox"
                style={{
                  float: "right",
                  marginRight: "20px",
                  marginTop: "15px",
                }}
              />
            </div>
            <div class="songdiv">
              {/* <img src={albumCover} /> */}
              Song 3
              <input
                type="checkbox"
                style={{
                  float: "right",
                  marginRight: "20px",
                  marginTop: "15px",
                }}
              />
            </div>
            <div class="songdiv">
              {/* <img src={albumCover} /> */}
              Song 4
              <input
                type="checkbox"
                style={{
                  float: "right",
                  marginRight: "20px",
                  marginTop: "15px",
                }}
              />
            </div>
          </div>
          <div
            class="musicplayer"
            style={{ alignSelf: "center", justifySelf: "center" }}
          >
            <MusicPlayer currentSong={songs} />
          </div>
          <div class="chatflex">
            The {props.location.state.roomName} Chat Room
            <div class="chatdiv">
              <div style={{ marginTop: "15px", marginLeft: "15px" }}></div>
              <div style={{ margin: "15px" }}>
                <div>Frank: What is this song?</div>
                <div>Ashley: I don't know, but I like it!</div>
              </div>
            </div>
            <div style={{ marginTop: "15px" }}>
              <input type="text" />
              <button>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
