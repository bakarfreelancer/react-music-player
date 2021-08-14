import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
  audioRef,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  //   Handlers
  const activeLibraryHandler = (next) => {
    const newSongs = songs.map((song) => {
      if (song.id === next.id) {
        return { ...song, active: true };
      } else {
        return { ...song, active: false };
      }
    });
    setSongs(newSongs);
  };
  const playSongHandler = () => {
    if (isPlaying) {
      setIsPlaying(!isPlaying);
      audioRef.current.pause();
    } else {
      setIsPlaying(!isPlaying);
      audioRef.current.play();
    }
  };

  const skipDuration = (e) => {
    const currentTime = parseInt(e.target.value);
    audioRef.current.currentTime = currentTime;
    setSongInfo({ ...songInfo, currentTime });
  };

  const skipTrackHandler = async (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === -1 && currentIndex === 0) {
      await setCurrentSong(songs[songs.length - 1]);
      activeLibraryHandler(songs[songs.length - 1]);
    } else
      await setCurrentSong(songs[(currentIndex + direction) % songs.length]);
    activeLibraryHandler(songs[(currentIndex + direction) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };

  // useEffect(() => {
  //   const newSongs = songs.map((song) => {
  //     if (song.id === currentSong.id) {
  //       return { ...song, active: true };
  //     } else {
  //       return { ...song, active: false };
  //     }
  //   });
  //   setSongs(newSongs);
  // }, [currentSong]);

  const animateTrack = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  const trackStyle = {
    background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div className="track" style={trackStyle}>
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={skipDuration}
            type="range"
          />
          <div className="animate-track" style={animateTrack}></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler(-1)}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler(1)}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
