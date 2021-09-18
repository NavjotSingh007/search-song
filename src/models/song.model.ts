export interface Song {
  id: number;
  type: string;
  title: string;
  artist: Artist;
  chordsPresent: boolean;
  tabTypes: string[];
}

interface Artist {
  id: number;
  type: string;
  nameWithoutThePrefix: string;
  useThePrefix: boolean;
  name: string;
}
