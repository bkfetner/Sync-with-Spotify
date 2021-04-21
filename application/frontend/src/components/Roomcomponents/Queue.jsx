import React, { Component, useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Comment, List } from "antd";
import Axios from "axios";
import "../../css/Queue.css";

const Queue = (props) => {
  console.log("Queue start");
  console.log(props);
  console.log("Queue end");

  const handleCheck = (e) => {
    console.log(e.target.id);
    props.updateQueueVote(e.target.id);
  };

  const renderQueue = () => {
    if (props.queueSongs) {
      return props.queueSongs.map((song) => {
        return (
          <div class="songdiv">
            <div className="songdiv-song-title">
              <img className="songdiv-img" src={song.url} />
              {song.title}
            </div>

            <div className="song-vote-checkbox">
              <div className="song-vote">{song.vote}</div>
              <Checkbox
                className="song-checkbox"
                type="checkbox"
                id={song.queueSongId}
                onChange={handleCheck}
              />
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div className="queue-main">
      <div class="queue-header">
        <strong>Queue</strong>
        <strong>Votes</strong>
      </div>
      <div className="queue-render">{renderQueue()}</div>
    </div>
  );
};

export default Queue;
