import { useEffect, useState } from "react";
import "./home.css";
import MovieList from "../MovieList/MovieList";
import Movie from "../Movie/Movie";

function Home({ selectedMovie, setSelectedMovie }) {
  const [headerMovie, setHeaderMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/search/movie?query=John%20Wick%3A%20Chapter%203%20%E2%80%93%20Parabellum&include_adult=false&language=en-US&page=1";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmRlMDg2N2U3NTBkNTkxOTY2OGJjNGQ4MWU3NDkyZCIsInN1YiI6IjY0ZmY0ZGQ5ZmZjOWRlMGVlMjA4YWM2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.76fpNoMxPK3_KAKAGbhL2B9NMMx3hUP8vadQydGHD0A",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((movie) => {
        setHeaderMovie(movie.results[0]);
        setIsLoading(false);
      })
      .catch((err) => console.error("error:" + err));
  }, []);
  const headerImage = headerMovie.backdrop_path;

  // console.log(selectedMovie);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      {selectedMovie ? (
        <Movie selectedMovie={selectedMovie} />
      ) : (
        <div className="container">
          <header
            className="hero"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${headerImage})`,
              backgroundSize: "cover",
              // backgroundPosition: "center",
            }}
          >
            <nav className="header-nav">
              <a href="#Movie">MovieBox</a>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="What do you want to watch? "
                className="search-input"
              />

              <a href="#signin">Sign in</a>
            </nav>
          </header>
          <section className="movie-list">
            <div className="featured-list">
              <h1>Featured Movie</h1>
              <p>See more {`  >`}</p>
            </div>
            <MovieList setSelectedMovie={setSelectedMovie} />
          </section>
        </div>
      )}
    </div>
  );
}

export default Home;
