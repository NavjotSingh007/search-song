import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { SongPage } from "./components/song-page/song-page.component";

const App = () => {
  return (
    <div className="container">
      <SongPage />
    </div>
  );
};

export default App;
