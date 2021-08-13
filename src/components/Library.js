import LibraySong from "./LibraySong";
const Library = ({ songs }) => {
  return (
    <div className="library">
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibraySong song={song} />
        ))}
      </div>
    </div>
  );
};
export default Library;
