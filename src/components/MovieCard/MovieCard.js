import React from "react";
import "./movieCard.css";
import imdbIcon from "../../assets/imdb.png";

function MovieCard({ onMovie, onGetMovie }) {
  const posterImage = onMovie.poster_path;
  const release_year = new Date(onMovie.release_date).getFullYear();
  // console.log(onMovie);

  return (
    <div
      className="movie-card"
      data-testid="movie-card"
      onClick={() => onGetMovie(onMovie.id)}
    >
      <div className="poster">
        <img
          src={`https://image.tmdb.org/t/p/w300/${posterImage}`}
          alt="movie poster"
          data-testid="movie-poster"
        />
      </div>
      <div className="text-content">
        <p className="date-year" data-testid="movie-release-date">
          USA, {release_year}
        </p>
        <p className="movie-title" data-testid="movie-title">
          {onMovie.title}
        </p>
        <div className="movie-rating">
          <div className="imdb-rating">
            <img src={imdbIcon} alt="" />
            <p>{onMovie.vote_average} /100</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
