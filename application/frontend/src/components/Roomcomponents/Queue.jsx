import React, { Component, useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Comment, List, Popover } from "antd";
import Axios from "axios";
import "../../css/Queue.css";
import { ConsoleSqlOutlined } from "@ant-design/icons";

const Queue = (props) => {
  const handleCheck = (e) => {
    props.updateQueueVote(e.target.id);
  };

  const renderQueue = () => {
    if (
      typeof props.queueSongs === "undefined" ||
      props.queueSongs.length === 0 ||
      (props.queueSongs.length === 1 && props.queueSongs[0].queueItemId === -1)
    ) {
      return (
        <div class="queue-says">
          <em>Click on "Search for a Song" to add a song to the queue!</em>
        </div>
      );
    }
    if (props.queueSongs) {
      return props.queueSongs.map((song) => {
        if (!(song.queueItemId === -1)) {
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
                <div className="song-vote">
                  {props.voteMapForQueue.has(song.queueItemId)
                    ? props.voteMapForQueue.get(song.queueItemId).voteCount
                    : 0}
                </div>
                <Checkbox
                  className="song-checkbox"
                  type="checkbox"
                  id={song.queueItemId}
                  onChange={handleCheck}
                  checked={props.voteMapForQueue.has(song.queueItemId)
                    ? props.voteMapForQueue.get(song.queueItemId).userVote
                    : false}
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
