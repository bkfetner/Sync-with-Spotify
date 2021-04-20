import React, { Component, useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Comment, List } from "antd";
import Axios from "axios";
import "../../css/Queue.css";

const Queue = (props) => {
  console.log("Queue start");
  console.log(props.queueSongs);
  console.log("Queue end");

  const renderQueue = () => {
    if (props.queueSongs) {
      return props.queueSongs.map((song) => {
        return (
          <div class="songdiv">
            <div className="songdiv-song-title">
              <img className="songdiv-img" src={song.url} />
              {song.title}
            </div>
            <input class="song-checkbox" type="checkbox" />
          </div>
        );
      });
    }
  };

  return (
    <div className="queue-main">
      <div class="queue-header">
        <strong>Queue</strong>
        <strong>Vote</strong>
      </div>
      <div className="queue-render">{renderQueue()}</div>
    </div>
  );
};

export default Queue;
