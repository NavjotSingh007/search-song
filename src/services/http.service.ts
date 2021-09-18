import axios from "axios";
import { Song } from "../models/song.model";

export function fetchSongs(songNameToSearch: string): Promise<Song[]> {
  return new Promise<Song[]>(async (resolve, reject) => {
    try {
      let response = await axios.get(
        `https://www.songsterr.com/a/ra/songs.json?pattern=${songNameToSearch}`
      );

      resolve(response.data);
    } catch (error) {
      console.error("error", error);
      reject(error);
    }
  });
}
