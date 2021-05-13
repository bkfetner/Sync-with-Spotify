import React, { Component, useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Comment, List, Popover } from "antd";
import Axios from "axios";
import "../../css/Queue.css";

const Queue = (props) => {
  const handleCheck = (e) => {
    console.log(e.target.id);
    props.updateQueueVote(e.target.id);
  };

  const renderQueue = () => {
    if (
      props.queueSongs.length == 0 ||
      (props.queueSongs.length == 1 &&
        props.queueSongs[0].songTrackUrl == "")
    ) {
      return (
        <div class="queue-says">
          <em>Click on "Search for a Song" to add a song to the queue!</em>
        </div>
      );
    }
    if (props.queueSongs) {
      return props.queueSongs.map((song) => {
        if (!(song.songTrackUrl === "")) {
          return (
            <div class="songdiv">
              <Popover
                content={song.songName}
                trigger="hover"
                className="songdiv-song-title"
              >
                <img className="songdiv-img" src={song.smallSongImageUrl} />
                {song.songName}
              </Popover>

              <div className="song-vote-checkbox">
                <div className="song-vote">{song.voteCount}</div>
                <Checkbox
                  className="song-checkbox"
                  type="checkbox"
                  id={song.queueSongId}
                  onChange={handleCheck}
                  checked={song.userVote}
                />
              </div>
            </div>
          );
        }
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
