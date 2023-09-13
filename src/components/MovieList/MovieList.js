import Movie from "../MovieCard/MovieCard";
import React, { useEffect, useState } from "react";
import "./movieList.css";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  function handleGetMovie(id) {
    console.log(id);

    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

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
      .then((movie) => setSelectedMovie(movie))
      .catch((err) => console.error("error:" + err));
  }

  console.log(selectedMovie);

  async function fetchMovies() {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmRlMDg2N2U3NTBkNTkxOTY2OGJjNGQ4MWU3NDkyZCIsInN1YiI6IjY0ZmY0ZGQ5ZmZjOWRlMGVlMjA4YWM2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.76fpNoMxPK3_KAKAGbhL2B9NMMx3hUP8vadQydGHD0A",
        },
      };

      const url =
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
      // setIsLoading(true);

      // Fetch data from the API
      const response = await fetch(url, options);

      // Check if the response status code is OK (200)
      if (response.ok) {
        const movies = await response.json();
        setMovies(movies.results);
        // setIsLoading(false);
      } else {
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  // Call the fetchMovies function to initiate the request

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <div className="grid-4-cols">
      {movies.map((movie) => (
        <Movie onMovie={movie} key={movie.id} onGetMovie={handleGetMovie} />
      ))}
    </div>
  );
}

export default MovieList;
