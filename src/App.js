import { useState } from "react";
// Importing styles
import "./styles/app.scss";

// Importing Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";

// Importing data
import data from "./data";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <Library songs={songs} />
      <Song currentSong={currentSong} isPlaying={isPlaying} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
}

export default App;
