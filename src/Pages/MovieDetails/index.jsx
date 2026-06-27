import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {fetchMovieDetails,fetchMovieTrailer,fetchMovieCast,} from "../../Services/Index";
import { useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import "./index.scss";



const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const [cast, setCast] = useState([]);

  const formatDate = (date) => {
    if (!date) return "N/A";
    return date.split("-").reverse().join("-");
  };

  useEffect(() => {
    fetchMovieDetails(id)
      .then((res) => {
        setMovie(res);
        document.title = `${res.title} | TMDB Movies`;
      })
      .catch((err) => console.log(err));

    fetchMovieTrailer(id)
      .then((videos) => {
        const trailer = videos.find(
          (video) =>
            video.type === "Trailer" &&
            video.site === "YouTube"
        );

        if (trailer) {
          setVideoKey(trailer.key);
        }
      })
      .catch((err) => console.log(err));

    fetchMovieCast(id)
      .then((res) => setCast(res.slice(0, 5)))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (showTrailer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showTrailer]);

  if (!movie) {
    return (
      <div className="loading">
        Loading Movie...
      </div>
    );
  }

  return (
    <div className="movie-details">

      {/* Movie Poster */}

      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
            : "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt={movie.title}
      />

      {/* Movie Information */}

      <div className="movie-info">

        <h1>{movie.title}</h1>

        <p>
          <strong>Release Date:</strong>{" "}
          {formatDate(movie.release_date)}
        </p>

        <p>
          <strong>Rating:</strong>{" "}
          {movie.vote_average}
        </p>

        <p>
          <strong>Overview:</strong>
        </p>

        <p>{movie.overview}</p>

        {/* Trailer Button */}

        {videoKey && (
          <button
            className="trailer-btn"
            onClick={() => setShowTrailer(true)}
          >
            ▶ Watch Trailer
          </button>
        )}

        {/* Trailer Popup */}

        {showTrailer && (
          <div className="trailer-modal">

            <div
              className="modal-overlay"
              onClick={() => setShowTrailer(false)}
            ></div>

            <div className="modal-content">

              <button
                className="close-btn"
                onClick={() => setShowTrailer(false)}
              >
                ✖
              </button>

              <YouTube
                videoId={videoKey}
                opts={{
                  width: "100%",
                  height: "550",
                  playerVars: {
                    autoplay: 1,
                  },
                }}
              />

            </div>

          </div>
        )}

        {/* Cast Section */}

        <h2 className="cast-heading">Top Cast</h2>

        <div className="cast-container">

          {cast.map((actor) => (
        <div
            key={actor.id}
            className="cast-card"
            onClick={() => navigate(`/person/${actor.id}`)}>

              <img
                loading="lazy"
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : "https://via.placeholder.com/185x278?text=No+Image"
                }
                alt={actor.name}
              />

              <h4>{actor.name}</h4>

              <p>{actor.character}</p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default MovieDetails;