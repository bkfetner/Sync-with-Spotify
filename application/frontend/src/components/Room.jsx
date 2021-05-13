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
import { CopyFilled, UserOutlined } from "@ant-design/icons";
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

const prepSongsForQueue = (song) => {
  let queueSongId = Math.floor(Math.random() * 1000000);
  let numOfVotes = Math.floor(Math.random() * 20);
  let title = song.title;
  let url = song.url;
  let music = song.music;
  return {
    title: title,
    url: url,
    music: music,
    vote: numOfVotes,
    queueSongId: queueSongId,
    userVote: false,
  };
};

const Room = (props) => {
  const roomId = props.match.params.roomId;
  const [roomType, setRoomType] = useState();
  const [viewData, setViewData] = useState([]);
  const [songList, setSongList] = useState([
    {
      largeSongImageUrl: "",
      smallSongImageUrl: "",
      songArtist: "",
      songDuration: 0,
      songId: "",
      songName: "",
      songTrackUrl: "",
    },
  ]);
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
    Axios.get("http://localhost:8000/api/adds/" + roomId + "/")
      .then((res) => {
        setViewData(res.data);
        if (viewData.roomType == 0) {
          setRoomType("Public Room");
        } else {
          setRoomType("Private Room");
        }
      })
      .catch((er) => console.log(er));
  }, []);

  useEffect(() => {
    setAccessToken(Cookies.get("spotifyAuthToken"));
    if (typeof accessToken === "undefined") {
      /* localStorage.removeItem("currentUser");
      Cookies.remove("spotifyAuthToken");
      history.push("/"); */
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      updateQueueView();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  /* const noOfUsers = props.match.params.noOfUsers; */
  const noOfUsers = Math.floor(Math.random() * 10 + 20);
  const roomUrl = window.location.href;
  const forceUpdate = useForceUpdate();

  const [songsForQueue, setSongsForQueue] = useState([
    {
      largeSongImageUrl: "",
      smallSongImageUrl: "",
      songArtist: "",
      songDuration: "",
      songId: "",
      songName: "",
      songTrackUrl: "",
      songQueueItemId: 0,
      voteCount: 0,
    },
  ]);

  const [currentSong, setCurrentSong] = useState(
    albumList[Math.floor(Math.random() * albumList.length)]
  );

  const [songs, setSongs] = useState({
    song_id: "1",
    songName: currentSong.title,
    artist: "unknown",
    songUrl: currentSong.music,
    songImageUrl: currentSong.url,
  });

  const [showQueue, setShowQueue] = useState(true);
  const [displayTypeSwitchButton, setDisplayTypeSwitchButton] =
    useState("Search for a Song");

  const switchQueueSearchsong = () => {
    setShowQueue(!showQueue);
    if (showQueue) {
      setDisplayTypeSwitchButton("Return to Queue");
    } else {
      setDisplayTypeSwitchButton("Search for a Song");
    }
  };

  const updateQueueVote = (incomingQueueSongId) => {
    const modifyingQueue = songsForQueue;
    var findQueueSong = modifyingQueue.filter((obj) => {
      return obj.queueSongId === incomingQueueSongId;
    });
    if (findQueueSong[0]) {
      if (!findQueueSong[0].userVote) {
        findQueueSong[0].vote = findQueueSong[0].vote + 1;
        findQueueSong[0].userVote = true;
      } else {
        findQueueSong[0].vote = findQueueSong[0].vote - 1;
        findQueueSong[0].userVote = false;
      }
    }
    setSongsForQueue(modifyingQueue);
    forceUpdate();
  };

  const addSongToQueue = (song) => {
    console.log("addSongToQueue: song");
    console.log(song);
    if (typeof songList === "undefined") {
      setSongList([song]);
    } else {
      var songInList = false;
      songList.forEach((oldSong) => {
        if (oldSong.songId === song.songId) {
          songInList = true;
        }
      });
      if (!songInList) {
        const modifyingSongList = songList;
        modifyingSongList.push(song);
      }
    }

    var data = {
      queue_item_id: Math.floor(Math.random() * 2000000000),
      room_id: roomId,
      song_id: song.songId,
    };
    Axios.post("http://localhost:8000/api/queues/", data)
      .then((res) => {
        console.log("res for queues post");
        console.log(res);
      })
      .catch((er) => console.log(er));

    updateQueueView();
    switchQueueSearchsong();
  };

  const updateQueueView = () => {
    var resFromQueue;
    const newSongsForQueue = [];
    var newSongsForSongList = [];

    Axios.get("http://localhost:8000/api/queues/")
      .then((res) => {
        resFromQueue = res.data;
        for (var j = 0; j < resFromQueue.length; j++) {
          if (roomId === resFromQueue[j].room_id) {
            var found = false;
            var songForQueue;
            for (var i = 0; i < songList.length; i++) {
              if (resFromQueue[j].song_id === songList[i].songId) {
                found = true;
                songForQueue = {
                  largeSongImageUrl: songList[i].largeSongImageUrl,
                  smallSongImageUrl: songList[i].smallSongImageUrl,
                  songArtist: songList[i].songArtist,
                  songDuration: songList[i].songDuration,
                  songId: songList[i].songId,
                  songName: songList[i].songName,
                  songTrackUrl: songList[i].songTrackUrl,
                  songQueueItemId: resFromQueue[j].queue_item_id,
                  voteCount: 0,
                };
                newSongsForQueue.push(songForQueue);
                break;
              }
            }
            if (!found) {
              var songInfoFromSpotify;
              Axios.get(
                "https://api.spotify.com/v1/tracks/" + resFromQueue[j].song_id,
                {
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.spotifyToken,
                  },
                }
              )
                .then((res) => {
                  songInfoFromSpotify = res.data;
                  var doOnce = 0;
                  if (doOnce == 0) {
                    doOnce++;
                    const smallestAlbumImage =
                      songInfoFromSpotify.album.images.reduce(
                        (smallest, image) => {
                          if (image.height < smallest.height) return image;
                          return smallest;
                        },
                        songInfoFromSpotify.album.images[0]
                      );
                    const largestAlbumImage =
                      songInfoFromSpotify.album.images.reduce(
                        (largest, image) => {
                          if (image.height > largest.height) return image;
                          return largest;
                        },
                        songInfoFromSpotify.album.images[0]
                      );

                    var songForSongList = {
                      songId: songInfoFromSpotify.id,
                      songName: songInfoFromSpotify.name,
                      songArtist: songInfoFromSpotify.artists[0].name,
                      songTrackUrl: songInfoFromSpotify.uri,
                      smallSongImageUrl: smallestAlbumImage.url,
                      largeSongImageUrl: largestAlbumImage.url,
                      songDuration: songInfoFromSpotify.duration_ms,
                    };

                    songList.push(songForSongList);

                    songForQueue = {
                      largeSongImageUrl: songForSongList.largeSongImageUrl,
                      smallSongImageUrl: songForSongList.smallSongImageUrl,
                      songArtist: songForSongList.songArtist,
                      songDuration: songForSongList.songDuration,
                      songId: songForSongList.songId,
                      songName: songForSongList.songName,
                      songTrackUrl: songForSongList.songTrackUrl,
                      songQueueItemId: resFromQueue[j].queue_item_id,
                      voteCount: 0,
                    };
                    newSongsForQueue.push(songForQueue);
                  }
                })
                .catch((er) => {
                  console.log(er);
                });
            }
          }
        }
      })
      .catch((er) => {
        console.log(er);
      });

    setTimeout(() => setSongsForQueue(newSongsForQueue), 1000);
  };

  const removeSongFromQueue = (queueSong) => {
    const queueArray = songsForQueue;
    var index = -1;
    for (var i = 0; i < queueArray.length; i++) {
      if (queueArray[i].queueSongId == queueSong.queueSongId) {
        index = i;
      }
    }
    if (index !== -1) {
      queueArray.splice(index, 1);
      setSongsForQueue(queueArray);
    }
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
    var nextSong;

    if (songsForQueue.length > 0) {
      for (var i = 0; i < songsForQueue.length; i++) {
        const currentSong = songsForQueue[i];
        if (
          !(
            currentSong.title == "0" &&
            currentSong.url == "0" &&
            currentSong.music == "0"
          )
        ) {
          if (!nextSong) {
            nextSong = currentSong;
          } else {
            if (currentSong.vote > nextSong.vote) {
              nextSong = currentSong;
            }
          }
        }
      }
    }

    if (!nextSong) {
      nextSong = albumList[Math.floor(Math.random() * 19)];
    }
    setSongs({
      song_id: "1",
      songName: nextSong.title,
      artist: "unknown",
      songUrl: nextSong.music,
      songImageUrl: nextSong.url,
    });
    removeSongFromQueue(nextSong);
  };

  return (
    <div>
      <div class="main room-main">
        <div class="grid1">
          <div class="queue1">
            {showQueue && (
              <Queue
                queueSongs={songsForQueue}
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
              <em>{roomType}</em>

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
            {/* <MusicPlayer
              currentSong={songs}
              handleEndOfSong={handleEndOfSong}
            /> */}
          </div>
          <div class="chatflex">
            {
              <Chatroom
                roomName={viewData.room_name}
                roomId={viewData.room_id}
                displayName={userInfo.displayName}
                profilePictureUrl={userInfo.profilePictureUrl}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
