import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./movie.css";

function Movie({ selectedMovie, setSelectedMovie }) {
  console.log(selectedMovie);
  const [trailer, setTrailer] = useState("");
  const movieId = selectedMovie.id;

  //   fetch trailer

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
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
      .then((trailer) => {
        // setTrailer(trailer.results[0].key)
        const youTubeTrailer = trailer.results;
        const firstYouTubeTrailer = youTubeTrailer.find(
          (trailer) => trailer.type === "Trailer" && trailer.site === "YouTube"
        );

        if (firstYouTubeTrailer) {
          setTrailer(firstYouTubeTrailer.key);
        }
        // console.log(trailer.results);
      })
      .catch((err) => console.error("error:" + err));
  }, [movieId]);

  console.log(trailer);
  return (
    <div className="selected-movie-box">
      {/* <div className="movie-left-col"> */}
      <h1 className="movie-logo">MovieBox</h1>

      <Link to="/" onClick={() => setSelectedMovie(null)}>
        Home
      </Link>
      <a href="#movies" className="movie-tab">
        Movies
      </a>
      <a href="#tvseries">TV Series</a>
      <a href="#upcoming" className="upcoming-movies">
        Upcoming
      </a>
      <a href="#logout" className="logout-movie-card">
        logout
      </a>
      {/* </div> */}
      {/* <div className="movie-right-col"> */}
      {trailer && (
        <div className="youtubeTrailer">
          <iframe
            title="YouTube Trailer"
            width="1100"
            height="450"
            src={`https://www.youtube.com/embed/${trailer}`}
            frameBorder="0"
            allowFullScreen
            style={{ borderRadius: "10px", marginTop: "20px" }}
          ></iframe>
        </div>
      )}
      <div className="movie-details">
        <div className="name-date-details">
          <p className="movie-title" data-testid="movie-title">
            {selectedMovie.title}
          </p>
          <p data-testid="movie-release-date">{selectedMovie.release_date}</p>
          <p data-testid="movie-runtime">{selectedMovie.runtime}</p>
        </div>
        <p data-testid="movie-overview">{selectedMovie.overview}</p>
      </div>
    </div>
    // </div>
  );
}

export default Movie;
