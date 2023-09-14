import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import { useState } from "react";
import Movie from "./components/Movie/Movie";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  console.log(selectedMovie?.title);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              selectedMovie={selectedMovie}
              setSelectedMovie={setSelectedMovie}
            />
          }
        />

        <Route
          // path={`/movie/${selectedMovie?.title}`} // Use the movie title as a route parameter
          path="/:title" // Use the movie title as a route parameter
          element={<Movie />}
        />
      </Routes>
    </div>
  );
}

export default App;
