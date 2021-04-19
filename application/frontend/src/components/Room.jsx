import React, { Component, useState, useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import Axios from "axios";
import MusicPlayer from "./Roomcomponents/MusicPlayer.jsx";
import Chat from "./Roomcomponents/Chat.jsx";
import "../css/Room.css";
import { Redirect } from "react-router-dom";

{
  /*import albumCover from "./assets/image0.png";
    import playButton from "../assets/play_button.png";
  */
}

const albumList = [
  {
    title: "Pick Up Your Feelings",
    url: "./assets/1.PNG",
  },
  {
    title: "Hunger",
    url: "./assets/2.PNG",
  },
  {
    title: "no love",
    url: "./assets/3.PNG",
  },
  {
    title: "Killuminati",
    url: "./assets/4.PNG",
  },

  {
    title: "no,no",
    url: "./assets/5.PNG",
  },
  {
    title: "Crime Pays",
    url: "./assets/6.jpg",
  },
  {
    title: "Ninety",
    url: "./assets/7.jpg",
  },

  {
    title: "Souldfood",
    url: "./assets/8.jpg",
  },
  {
    title: "Violent Crimes",
    url: "./assets/9.jpg",
  },
  {
    title: "Been Waiting!",
    url: "./assets/10.jpg",
  },

  {
    title: "Leray",
    url: "./assets/11.jpg",
  },
  {
    title: "HONEST",
    url: "./assets/12.jpg",
  },
  {
    title: "WOLF",
    url: "./assets/13.jpg",
  },

  {
    title: "Trying",
    url: "./assets/14.jpg",
  },
  {
    title: "A Calabasas Freestyle",
    url: "./assets/15.jpg",
  },
  {
    title: "Father Stretch My Hands",
    url: "./assets/16.jpg",
  },

  {
    title: "Frank's Track",
    url: "./assets/17.jpg",
  },
  {
    title: "No More Parties In LA",
    url: "./assets/18.jpg",
  },
  {
    title: "Champion",
    url: "./assets/19.png",
  },
  {
    title: "Once Upon A Time(Freestyle)",
    url: "./assets/20.PNG",
  },
];
let song1 = albumList[Math.floor(Math.random() * 19)];
let song2 = albumList[Math.floor(Math.random() * 19)];
let song3 = albumList[Math.floor(Math.random() * 19)];
let song4 = albumList[Math.floor(Math.random() * 19)];

const Room = (props) => {
  const [songs, setSongs] = useState({
    song_id: "1",
    songName: song1.title,
    artist: "unknown",
    songUrl:
      "https://www.freesound.org/data/previews/338/338825_1648170-lq.mp3",
    songImageUrl: song1.url,
  });

  const [currentSong, setCurrentSong] = useState(0);

  console.log(props);

  if (!props.location.state) {
    return <Redirect to="/Home" />;
  }

  return (
    <div>
      <div class="main room-main">
        <strong style={{ fontSize: "xxx-large" }}>
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
              Song 1: {song1.title}
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
              Song 2: {song2.title}
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
              Song 3: {song3.title}
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
              Song 4: {song4.title}
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
            <Chat roomName={props.location.state.roomName} />
            {/* The {props.location.state.roomName} Chat Room
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
