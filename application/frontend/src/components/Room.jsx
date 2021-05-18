import React, { useEffect, useState } from "react";
import { Button, Popover } from "antd";
import Axios from "axios";
import MusicPlayer from "./Roomcomponents/MusicPlayer.jsx";
import Chat from "./Roomcomponents/Chat.jsx";
import Queue from "./Roomcomponents/Queue.jsx";
import SongSearch from "./Roomcomponents/SongSearch.jsx";
import Chatroom from "./Chatroom.jsx";
import "../css/Room.css";
import { Redirect } from "react-router-dom";
import {
  CodeSandboxCircleFilled,
  CopyFilled,
  UserOutlined,
} from "@ant-design/icons";
import { SpotifyAuth, Scopes, SpotifyAuthListener } from "react-spotify-auth";
import Cookies from "js-cookie";

{
  /*import albumCover from "./assets/image0.png";
    import playButton from "../assets/play_button.png";
  */
}

const useForceUpdate = () => {
  const [_, setState] = useState(false);
  return () => setState((val) => !val);
};

const albumList = [
  {
    title: "Pick Up Your Feelings",
    url: "../../../../assets/1.PNG",
    music: "https://www.freesound.org/data/previews/338/338825_1648170-lq.mp3",
  },
  {
    title: "Hunger",
    url: "../../../../assets/2.PNG",
    music:
      "http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg",
  },
  {
    title: "no love",
    url: "../../../../assets/3.PNG",
    music: "../../../../assets/songs/1.mp3",
  },
  {
    title: "Killuminati",
    url: "../../../../assets/4.PNG",
    music:
      "http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/lose.ogg",
  },

  {
    title: "no,no",
    url: "../../../../assets/5.PNG",
    music:
      "http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/race1.ogg",
  },
  {
    title: "Crime Pays",
    url: "../../../../assets/6.jpg",
    music:
      "http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/menu.ogg",
  },
  {
    title: "Ninety",
    url: "../../../../assets/7.jpg",
    music:
      "http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/win.ogg",
  },

  {
    title: "Souldfood",
    url: "../../../../assets/8.jpg",
    music: "../../../../assets/songs/2.mp3",
  },
  {
    title: "Violent Crimes",
    url: "../../../../assets/9.jpg",
    music: "../../../../assets/songs/3.mp3",
  },
  {
    title: "Been Waiting!",
    url: "../../../../assets/10.jpg",
    music: "../../../../assets/songs/4.mp3",
  },

  {
    title: "Leray",
    url: "../../../../assets/11.jpg",
    music: "../../../../assets/songs/5.mp3",
  },
  {
    title: "HONEST",
    url: "../../../../assets/12.jpg",
    music: "../../../../assets/songs/6.mp3",
  },
  {
    title: "WOLF",
    url: "../../../../assets/13.jpg",
    music: "../../../../assets/songs/7.mp3",
  },

  {
    title: "Trying",
    url: "../../../../assets/14.jpg",
    music: "../../../../assets/songs/8.mp3",
  },
  {
    title: "A Calabasas Freestyle",
    url: "../../../../assets/15.jpg",
    music: "../../../../assets/songs/9.mp3",
  },
  {
    title: "Father Stretch My Hands",
    url: "../../../../assets/16.jpg",
    music: "../../../../assets/songs/10.mp3",
  },

  {
    title: "Frank's Track",
    url: "../../../../assets/17.jpg",
    music: "../../../../assets/songs/11.mp3",
  },
  {
    title: "No More Parties In LA",
    url: "../../../../assets/18.jpg",
    music: "../../../../assets/songs/12.mp3",
  },
  {
    title: "Champion",
    url: "../../../../assets/19.png",
    music: "../../../../assets/songs/13.mp3",
  },
  {
    title: "Once Upon A Time(Freestyle)",
    url: "../../../../assets/20.PNG",
    music: "../../../../assets/songs/14.mp3",
  },
];

const Room = (props) => {
  const roomId = props.match.params.roomId;
  const [viewData, setViewData] = useState({
    room_name: "",
    genre: "",
    roomImageUrl: "",
    population: "",
    roomType: "",
    room_id: "",
    current_song_end_time: "",
    current_song_track_url: "",
    current_track_id: "",
    current_song_artist: "",
    current_song_name: "",
    current_song_start_time: "",
    room_song_number: "",
    current_song_duration: "",
  });
  const [accessToken, setAccessToken] = useState(
    Cookies.get("spotifyAuthToken")
  );

  const retrieveCurrentUser = () => {
    const stringRetrieveUserInfo = localStorage.getItem("currentUser");
    const retrieveUserInfo = JSON.parse(stringRetrieveUserInfo);
    return retrieveUserInfo;
  };

  const [userInfo, setUserInfo] = useState(retrieveCurrentUser());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (viewData.room_name === "") {
      updateViewData();
    }
  });

  /* useEffect(() => {
    setAccessToken(Cookies.get("spotifyAuthToken"));
    if (typeof accessToken === "undefined") {
      localStorage.removeItem("currentUser");
      Cookies.remove("spotifyAuthToken");
      return <Redirect to="/" />;
    }
  }); */

  useEffect(() => {
    updateQueueView();
    const interval = setInterval(() => {
      updateQueueView();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      updateVoteCounts();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    testMakeVote();
    return () => testDeleteVote();
  });

  const testMakeVote = () => {
    var data = {
      vote_id: "test1",
      room_id: "test2",
      user_id: "test3",
      song_id: "test4",
    };
    Axios.post("http://localhost:8000/api/votes/", data)
      .then((res) => {})
      .catch((er) => {});
  };

  const testDeleteVote = () => {
    Axios.delete("http://localhost:8000/api/votes/test1/")
      .then((res) => {})
      .catch((er) => {});
  };

  /* const noOfUsers = props.match.params.noOfUsers; */
  const noOfUsers = Math.floor(Math.random() * 10 + 20);
  const roomUrl = window.location.href;
  const forceUpdate = useForceUpdate();

  var initialSongsForQueue = new Map();
  initialSongsForQueue.set(-1, {
    largeSongImageUrl: "-1",
    queueItemId: -1,
    smallSongImageUrl: "-1",
    songArtist: "-1",
    songDuration: -1,
    songId: "-1",
    songName: "-1",
    songTrackUrl: "-1",
    voteCount: -1,
    userVote: false,
    timeAddedToQueue: -1,
  });
  const [songsForQueue, setSongsForQueue] = useState(initialSongsForQueue);
  const [arrayForQueue, setArrayForQueue] = useState(
    Array.from(songsForQueue.values())
  );

  const [voteMapForQueue, setVoteMapForQueue] = useState(new Map());

  const [nextSong, setNextSong] = useState();
  const [currentSong, setCurrentSong] = useState();

  /* const [songs, setSongs] = useState({
    song_id: "1",
    songName: currentSong.title,
    artist: "unknown",
    songUrl: currentSong.music,
    songImageUrl: currentSong.url,
  }); */

  const [showQueue, setShowQueue] = useState(true);
  const [displayTypeSwitchButton, setDisplayTypeSwitchButton] =
    useState("Search for a Song");

  useEffect(() => {
    const interval = setInterval(() => {
      updateCurrentSong();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    submitNextSong();
    const interval = setInterval(() => {
      submitNextSong();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const switchQueueSearchsong = () => {
    setShowQueue(!showQueue);
    if (showQueue) {
      setDisplayTypeSwitchButton("Return to Queue");
    } else {
      setDisplayTypeSwitchButton("Search for a Song");
    }
  };

  const updateQueueVote = (incomingQueueSongId) => {
    if (
      voteMapForQueue.has(incomingQueueSongId) &&
      voteMapForQueue.get(incomingQueueSongId).userVote === false
    ) {
      var data = {
        vote_id: incomingQueueSongId + userInfo.userId,
        room_id: roomId,
        user_id: userInfo.userId,
        song_id: incomingQueueSongId,
      };
      Axios.post("http://localhost:8000/api/votes/", data)
        .then((res) => {})
        .catch((er) => {});

      voteMapForQueue.get(incomingQueueSongId).userVote = true;
      voteMapForQueue.get(incomingQueueSongId).voteCount += 1;
    } else if (
      voteMapForQueue.has(incomingQueueSongId) &&
      voteMapForQueue.get(incomingQueueSongId).userVote === true
    ) {
      var deleteCode = incomingQueueSongId + userInfo.userId;
      Axios.delete("http://localhost:8000/api/votes/" + deleteCode + "/")
        .then((res) => {})
        .catch((er) => {});

      voteMapForQueue.get(incomingQueueSongId).userVote = false;
      voteMapForQueue.get(incomingQueueSongId).voteCount -= 1;
    } else if (!voteMapForQueue.has(incomingQueueSongId)) {
      var data = {
        vote_id: incomingQueueSongId + userInfo.userId,
        room_id: roomId,
        user_id: userInfo.userId,
        song_id: incomingQueueSongId,
      };
      Axios.post("http://localhost:8000/api/votes/", data)
        .then((res) => {})
        .catch((er) => {});

      voteMapForQueue.set(incomingQueueSongId, {
        queueItemId: incomingQueueSongId,
        voteCount: 1,
        userVote: true,
      });
    }

    setVoteMapForQueue(voteMapForQueue);
    forceUpdate();
  };

  const addSongToQueue = (song) => {
    var data = {
      queue_item_id: Math.floor(Math.random() * 2000000000),
      room_id: roomId,
      song_id: song.songId,
      large_song_image_url: song.largeSongImageUrl,
      small_song_image_url: song.smallSongImageUrl,
      song_artist: song.songArtist,
      song_duration: song.songDuration,
      song_name: song.songName,
      song_track_url: song.songTrackUrl,
      time_added_to_queue: new Date().getTime(),
    };
    Axios.post("http://localhost:8000/api/queues/", data)
      .then((res) => {
        console.log("res for queues post");
        console.log(res);
      })
      .catch((er) => {});

    updateQueueView();
    switchQueueSearchsong();
  };

  const updateQueueView = () => {
    Axios.get("http://localhost:8000/api/queues/")
      .then((res) => {
        res.data.map((queueItem) => {
          if (queueItem.room_id === roomId) {
            if (!songsForQueue.has(queueItem.queue_item_id)) {
              songsForQueue.set(queueItem.queue_item_id, {
                largeSongImageUrl: queueItem.large_song_image_url,
                queueItemId: queueItem.queue_item_id,
                smallSongImageUrl: queueItem.small_song_image_url,
                songArtist: queueItem.song_artist,
                songDuration: queueItem.song_duration,
                songId: queueItem.song_id,
                songName: queueItem.song_name,
                songTrackUrl: queueItem.song_track_url,
                voteCount: 0,
                userVote: false,
                timeAddedToQueue: queueItem.time_added_to_queue,
              });
            }
          }
        });

        var queueItemsToDelete = [];
        var queueArray = Array.from(songsForQueue.values());
        queueArray.map((take) => {
          queueItemsToDelete.push(take.queueItemId);
        });

        res.data.map((queueItem) => {
          if (queueItem.room_id === roomId) {
            for (var i = 0; i < queueItemsToDelete.length; i++) {
              if (queueItem.queue_item_id === queueItemsToDelete[i]) {
                queueItemsToDelete[i] = -1;
              }
            }
          }
        });

        for (var i = 0; i < queueItemsToDelete.length; i++) {
          if (
            queueItemsToDelete[i] !== -1 &&
            songsForQueue.has(queueItemsToDelete[i])
          ) {
            songsForQueue.delete(queueItemsToDelete[i]);
          }
        }

        setSongsForQueue(songsForQueue);
        var arrayToSort = Array.from(songsForQueue.values());
        arrayToSort.sort(function (a, b) {
          return a.timeAddedToQueue - b.timeAddedToQueue;
        });
        setArrayForQueue(arrayToSort);
      })
      .catch((er) => {
        {
        }
      });
  };

  const updateVoteCounts = () => {
    var tempVoteMap = new Map();

    Axios.get("http://localhost:8000/api/votes/")
      .then((res) => {
        res.data.map((vote) => {
          if (vote.room_id === roomId) {
            if (tempVoteMap.has(vote.song_id)) {
              tempVoteMap.get(vote.song_id).voteCount += 1;
            } else {
              tempVoteMap.set(vote.song_id, {
                queueItemId: vote.song_id,
                voteCount: 1,
                userVote: false,
              });
            }
          }
        });

        var tempVoteArray = Array.from(tempVoteMap.values());
        tempVoteArray.map((votes) => {
          if (voteMapForQueue.has(votes.queueItemId)) {
            voteMapForQueue.get(votes.queueItemId).voteCount = votes.voteCount;
          } else {
            voteMapForQueue.set(votes.queueItemId, {
              queueItemId: votes.queueItemId,
              voteCount: 1,
              userVote: false,
            });
          }
        });
      })
      .catch((er) => {
        {
        }
      });
    setVoteMapForQueue(voteMapForQueue);
  };

  const removeSongFromQueue = (queueSong) => {
    /* const queueArray = songsForQueue;
    var index = -1;
    for (var i = 0; i < queueArray.length; i++) {
      if (queueArray[i].queueSongId == queueSong.queueSongId) {
        index = i;
      }
    }
    if (index !== -1) {
      queueArray.splice(index, 1);
      setSongsForQueue(queueArray);
    } */
  };

  const [roomIsSet, setRoomIsSet] = useState(false);
  /*   const startingSongsForRoom = () => {
    if (!roomIsSet) {
      setRoomIsSet(true);
      for (var i = 0; i < roomAge; i++) {
        const newSong = albumList[Math.floor(Math.random() * 19)];

        const title = newSong.title;
        const prepNewSong = prepSongsForQueue(newSong);
        const modifyingQueue = songsForQueue;
        modifyingQueue.push(prepNewSong);

        console.log("For Lopp");
        console.log(newSong.title);
      }
    }
  }; */

  /*   startingSongsForRoom(); */

  const sharePopOver = (
    <div className="share-popover">
      <strong>Copy room link and share with friends:</strong>
      <a href={roomUrl}>{roomUrl}</a>
    </div>
  );

  const handleEndOfSong = () => {
    var queueArray = Array.from(songsForQueue.values());
    queueArray.sort(function (a, b) {
      return a.timeAddedToQueue - b.timeAddedToQueue;
    });

    var topCount = -1;
    var topCountQueueItem = queueArray[1];

    if (queueArray.length > 1) {
      for (var i = 1; i < queueArray.length; i++) {
        if (voteMapForQueue.has(queueArray[i].queueItemId)) {
          if (
            voteMapForQueue.get(queueArray[i].queueItemId).voteCount > topCount
          ) {
            topCount = voteMapForQueue.get(queueArray[i].queueItemId).voteCount;
            topCountQueueItem = queueArray[i];
          }
        } else if (0 > topCount) {
          topCount = 0;
          topCountQueueItem = queueArray[i];
        }
      }

      var data = {
        roomImageUrl: topCountQueueItem.largeSongImageUrl,
        current_song_end_time:
          new Date().getTime() + parseInt(topCountQueueItem.songDuration, 10),
        current_song_start_time: new Date().getTime(),
        current_song_track_url: topCountQueueItem.songTrackUrl,
        current_track_id: topCountQueueItem.songId,
        current_song_name: topCountQueueItem.songName,
        current_song_artist: topCountQueueItem.songArtist,
      };
      Axios.patch("http://localhost:8000/api/adds/" + roomId + "/", data)
        .then((res) => {
          Axios.delete(
            "http://localhost:8000/api/queues/" +
              topCountQueueItem.queueItemId +
              "/"
          )
            .then((res) => {})
            .catch((er) => {});
        })
        .catch((er) => {
          {
          }
        });
    }
  };

  const updateViewData = () => {
    Axios.get("http://localhost:8000/api/adds/" + roomId + "/")
      .then((res) => {
        console.log("get room success");
        var newViewData = {
          room_name: res.data.room_name,
          genre: res.data.genre,
          roomImageUrl: res.data.roomImageUrl,
          population: res.data.population,
          roomType: res.data.roomType,
          room_id: res.data.room_id,
          current_song_end_time: res.data.current_song_end_time,
          current_song_track_url: res.data.current_song_track_url,
          current_track_id: res.data.current_track_id,
          current_song_artist: res.data.current_song_artist,
          current_song_name: res.data.current_song_name,
          current_song_start_time: res.data.current_song_start_time,
          room_song_number: res.data.room_song_number,
          current_song_duration: res.data.current_song_duration,
        };
        setViewData(newViewData);
      })
      .catch((er) => {console.log("get room fail");});
  };

  const submitNextSong = () => {
    console.log("submitNextSong");
    console.log("nextSong");
    console.log(nextSong);

    if (typeof nextSong === "undefined" || nextSong === null) {
      var queueArray = Array.from(songsForQueue.values());
      queueArray.sort(function (a, b) {
        return a.timeAddedToQueue - b.timeAddedToQueue;
      });

      var topCount = -1;
      var topCountQueueItem = queueArray[1];

      if (queueArray.length > 1) {
        for (var i = 1; i < queueArray.length; i++) {
          if (voteMapForQueue.has(queueArray[i].queueItemId)) {
            if (
              voteMapForQueue.get(queueArray[i].queueItemId).voteCount >
              topCount
            ) {
              topCount = voteMapForQueue.get(
                queueArray[i].queueItemId
              ).voteCount;
              topCountQueueItem = queueArray[i];
            }
          } else if (0 > topCount) {
            topCount = 0;
            topCountQueueItem = queueArray[i];
          }
        }

        console.log("topCountQueueItem");
        console.log(topCountQueueItem);
        console.log("topCount");
        console.log(topCount);

        console.log("viewData.room_song_number");
        console.log(viewData.room_song_number);

        var data = {
          room_id: roomId,
          queue_item_id: topCountQueueItem.queueItemId,
          time_submitted: new Date().getTime(),
          room_song_number: parseInt(viewData.room_song_number, 10) + 1,
          song_track_id: topCountQueueItem.songId,
          song_name: topCountQueueItem.songName,
          song_artist: topCountQueueItem.songArtist,
          song_track_url: topCountQueueItem.songTrackUrl,
          small_song_image_url: topCountQueueItem.smallSongImageUrl,
          large_song_image_url: topCountQueueItem.largeSongImageUrl,
          song_duration: topCountQueueItem.songDuration,
        };

        console.log("data");
        console.log(data);

        Axios.post("http://localhost:8000/api/nextsong/", data)
          .then((res) => {
            console.log("Post Nextsong Success");
            getNextSong();
          })
          .catch((er) => {
            console.log("Post Nextsong Fail");
            getNextSong();
          });
      }
    }
  };

  const getNextSong = () => {
    console.log("getNextSong");

    Axios.get("http://localhost:8000/api/nextsong/")
      .then((res) => {
        var highestRoomSongNumber = 0;
        res.data.map((next) => {
          if (next.room_id === roomId) {
            if (next.room_song_number > highestRoomSongNumber) {
              highestRoomSongNumber = next.room_song_number;
            }
          }
        });

        var firstPickTime = 9999999999999;
        var firstPickSong;
        res.data.map((next) => {
          if (
            next.room_id === roomId &&
            next.room_song_number == highestRoomSongNumber
          ) {
            if (next.time_submitted < firstPickTime) {
              firstPickTime = next.time_submitted;
              firstPickSong = next;
            }
          }
        });

        var newNextSong = {
          largeSongImageUrl: firstPickSong.large_song_image_url,
          roomSongNumber: firstPickSong.room_song_number,
          smallSongImageUrl: firstPickSong.small_song_image_url,
          songArtist: firstPickSong.song_artist,
          songDuration: firstPickSong.song_duration,
          songName: firstPickSong.song_name,
          songTrackId: firstPickSong.song_track_id,
          songTrackUrl: firstPickSong.song_track_url,
        };
        setNextSong(newNextSong);

        Axios.delete(
          "http://localhost:8000/api/queues/" +
            firstPickSong.queue_item_id +
            "/"
        )
          .then((res) => {})
          .catch((er) => {});
      })
      .catch((er) => {
        {
        }
      });
  };

  const updateCurrentSong = () => {
    console.log("updateCurrentSong");
    console.log("viewData");
    console.log(viewData);
    var timeEval = new Date().getTime() - 1000;
    var songEndTime = 0;
    if (typeof viewData.current_song_duration === "undefined") {
      songEndTime = parseInt(viewData.current_song_start_time, 10);
    } else {
      songEndTime =
        parseInt(viewData.current_song_start_time, 10) +
        parseInt(viewData.current_song_duration, 10);
    }
    console.log("viewData.current_song_duration");
    console.log(viewData.current_song_duration);
    console.log("viewData.current_song_start_time");
    console.log(viewData.current_song_start_time);
    console.log("songEndTime");
    console.log(songEndTime);
    console.log("timeEval");
    console.log(timeEval);
    console.log("nextSong");
    console.log(nextSong);
    if (
      songEndTime < timeEval &&
      typeof(nextSong) !== "undefined" &&
      nextSong !== null
    ) {
      var newViewData = {
        current_song_artist: nextSong.songArtist,
        current_song_end_time: viewData.current_song_end_time,
        current_song_name: nextSong.songName,
        current_song_start_time: new Date().getTime(),
        current_song_track_url: nextSong.songTrackUrl,
        current_track_id: nextSong.songTrackId,
        current_song_duration: nextSong.songDuration,
        genre: viewData.genre,
        population: viewData.population,
        roomImageUrl: nextSong.largeSongImageUrl,
        roomType: viewData.roomType,
        room_id: viewData.room_id,
        room_name: viewData.room_name,
        room_song_number: nextSong.roomSongNumber,
      };

      console.log("newViewData");
      console.log(newViewData);

      setViewData(newViewData);
      setNextSong(null);

      /* viewData.current_song_artist = nextSong.songArtist;
      viewData.​​current_song_name = nextSong.songName;
      viewData.current_song_start_time = new Date().getTime();
      viewData.current_song_track_url = nextSong.songTrackUrl;
      viewData.current_track_id = nextSong.songTrackId;
      viewData.roomImageUrl = nextSong.largeSongImageUrl;
      viewData.room_song_number = nextSong.roomSongNumber; */

      /* setViewData(viewData); */
    }
  };

  if (userInfo == null || !userInfo) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <div class="main room-main">
        <div class="grid1">
          <div class="queue1">
            {showQueue && (
              <Queue
                queueSongs={arrayForQueue}
                voteMapForQueue={voteMapForQueue}
                updateQueueVote={updateQueueVote}
              />
            )}
            {!showQueue && (
              <SongSearch
                avaliableSongs={albumList}
                addSongToQueue={addSongToQueue}
                roomGenre={viewData.genre}
              />
            )}
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => switchQueueSearchsong()}
              className="sync-button-color queue-songsearch-switch"
            >
              {displayTypeSwitchButton}
            </Button>
          </div>
          <div class="musicplayer">
            <div className="room-info">
              <strong style={{ fontSize: "xxx-large" }}>
                {viewData.room_name}
              </strong>
              <em>Room Genre: {viewData.genre}</em>
              <em>{viewData.roomType ? "Private Room" : "Public Room"}</em>

              <div className="icon-row">
                <div>
                  <UserOutlined
                    style={{ fontSize: "22pt", color: "var(--color3)" }}
                  />{" "}
                  {noOfUsers}
                </div>
                <Popover content={sharePopOver} trigger="click">
                  <button
                    /* onClick={() => {
                      navigator.clipboard.writeText(roomUrl);
                    }} */
                    className="share-button"
                  >
                    <CopyFilled
                      style={{ fontSize: "18pt", color: "var(--color3)" }}
                    />
                    <strong style={{ color: "var(--color3)" }}> Share</strong>
                  </button>
                </Popover>
              </div>
            </div>
            <MusicPlayer
              viewData={viewData}
              nextSong={nextSong}
              submitNextSong={submitNextSong}
              updateCurrentSong={updateCurrentSong}
              accessToken={accessToken}
            />
          </div>
          <div class="chatflex">
            {viewData.room_id !== "" ? (<Chatroom
                roomName={viewData.room_name}
                roomId={viewData.room_id}
                displayName={userInfo.displayName}
                profilePictureUrl={userInfo.profilePictureUrl}
              />) : (<div></div>)
              
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
