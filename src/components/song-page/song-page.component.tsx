import { useState } from "react";
import { Song } from "../../models/song.model";
import { fetchSongs } from "../../services/http.service";
import "./song-page.component.css";

export const SongPage = () => {
  const [isSongsLoading, setIsSongsLoading] = useState<boolean>(false);
  const [searchSongText, setSearchSongText] = useState<string>("");
  const [songs, setSongs] = useState<Song[]>([]);

  const handleSearchSongTextInput = (event: any) => {
    setSearchSongText(event.target.value);
    event.preventDefault();
  };

  const handleSearchSongSubmitClickEvent = async (event: any) => {
    try {
      setIsSongsLoading(true);
      let songsFetched: Song[] = await fetchSongs(searchSongText);
      setSongs(songsFetched);
    } catch (error) {
      console.warn("error", error);
    }
    setIsSongsLoading(false);

    event.preventDefault();
  };

  let searchSongTextSubmitButtonClasses: string = "btn btn-primary";
  if (searchSongText.trim() === "") {
    searchSongTextSubmitButtonClasses += " disabled";
  }

  return (
    <div className="row pageRow">
      <div className="col-12">
        <h2 className="searchSongHeading">Search Song</h2>
        <div className="row">
          <div className="col-12">
            <form
              className="form-inline searchSongContainer"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                className="form-control col-11"
                placeholder="Enter song/artist name to search for eg: One"
                value={searchSongText}
                onInput={(e) => {
                  handleSearchSongTextInput(e);
                }}
              />
              <input
                type="submit"
                placeholder="Search"
                disabled={searchSongText.trim() === ""}
                className={searchSongTextSubmitButtonClasses}
                onClick={(e) => handleSearchSongSubmitClickEvent(e)}
              />
            </form>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          {isSongsLoading ? (
            <div>Loading Songs</div>
          ) : (
            <SongsTable songs={songs} searchSongText={searchSongText} />
          )}
        </div>
      </div>
    </div>
  );
};

const SongsTable = ({
  songs,
  searchSongText,
}: {
  songs: Song[];
  searchSongText: string;
}) => {
  function getHighlightedText(text: string, textToHighlight: string) {
    const parts: string[] = text.split(
      new RegExp(`(${textToHighlight})`, "gi")
    );
    return (
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === textToHighlight.toLowerCase()
                ? { backgroundColor: "yellow" }
                : {}
            }
          >
            {part}
          </span>
        ))}
      </span>
    );
  }
  return (
    <>
      {songs?.length > 0 && searchSongText.trim().length > 0 && (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Song Id</th>
                <th>Title</th>
                <th>Chords Present</th>
                <th>Tab Types</th>
                <th>Artist Id</th>
                <th>Artist Type</th>
                <th>Artist Name</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                <tr key={String(song.id)}>
                  <td>{song.id}</td>
                  <td>{getHighlightedText(song.title, searchSongText)}</td>
                  <td>{String(song.chordsPresent)}</td>
                  <td>{song.tabTypes}</td>
                  <td>{song.artist.id}</td>
                  <td>{song.artist.type}</td>
                  <td>
                    {getHighlightedText(song.artist.name, searchSongText)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
