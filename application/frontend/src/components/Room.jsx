import React, { Component, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import Axios from "axios";
import albumCover from '../assets/image0.png';
import playButton from '../assets/play_button.png';

const Room = () => {
  return (
    <div>
  <div class="main">
    <h2 style={{padding: "35px"}}>user_name's Room </h2>
      <div class="grid1">
        <div class="queue1">
          <div class="queue-header">
            <div>Queue</div>
            <div>Vote</div>
          </div>
          <div class="songdiv">
            <img src={albumCover} />
            Song 1
            <input
              type="checkbox"
              style={{float: "right", marginRight: "20px",  marginTop: "15px"}}
            />
          </div>
          <div class="songdiv">
            <img src={albumCover} />
            Song 2
            <input
              type="checkbox"
              style={{float: "right", marginRight: "20px",  marginTop: "15px"}}
            />
          </div>
          <div class="songdiv">
            <img src={albumCover} />
            Song 3
            <input
              type="checkbox"
              style={{float: "right", marginRight: "20px",  marginTop: "15px"}}
            />
          </div>
          <div class="songdiv">
            <img src={albumCover} />
            Song 4
            <input
              type="checkbox"
              style={{float: "right", marginRight: "20px",  marginTop: "15px"}}
            />
          </div>
        </div>
        <div
          class="musicplayer"
          style={{alignSelf: "center", justifySelf: "center"}}
        >
          
          <div class="room_album_image">
            <img src={albumCover} />
          </div>
          <div class="container1">
            <div class="progress1" id="progress"></div>
            <audio
              id="audio"
              src="https://www.freesound.org/data/previews/338/338825_1648170-lq.mp3"
            ></audio>
          </div>
          <div class="room_play_button">
            <img
              style={{filter: "invert(70%)"}}
              src={playButton}
              class="togglePlay"
              onClick="togglePlay()"
            />
          </div>
        </div>
        <div class="chatflex">
        user_name's Chat Room
          <div class="chatdiv">
            <div style={{marginTop: "15px", marginLeft: "15px"}}>
            </div>
            <div style={{margin: "15px"}}>
              <div>Frank: What is this song?</div>
              <div>Ashley: I don't know, but I like it!</div>
            </div>
          </div>
          <div style={{marginTop: "15px"}}>
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
