import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchMovieDetails,
  fetchMovieTrailer,
} from "../../Services/Index";
import YouTube from "react-youtube";
import "./index.scss";

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  const formatDate = (date) => {
    return date.split("-").reverse().join("-");
  };

  useEffect(() => {
    // Fetch Movie Details
    fetchMovieDetails(id)
      .then((res) => setMovie(res))
      .catch((err) => console.log(err));

    // Fetch Trailer
    fetchMovieTrailer(id)
      .then((videos) => {
        // Try Official Trailer first
        let trailer = videos.find(
          (video) =>
            video.type === "Trailer" &&
            video.site === "YouTube"
        );

        // If no Trailer, take any YouTube video
        if (!trailer) {
          trailer = videos.find(
            (video) => video.site === "YouTube"
          );
        }

        if (trailer) {
          setVideoKey(trailer.key);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!movie) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="movie-details">
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
      />

      <div className="movie-info">
        <h1>{movie.title}</h1>

        <p>
          <strong>Release Date:</strong>{" "}
          {formatDate(movie.release_date)}
        </p>

        <p>
          <strong>Rating:</strong> ⭐ {movie.vote_average}
        </p>

        <p>
          <strong>Overview:</strong>
        </p>

        <p>{movie.overview}</p>

        {videoKey ? (
          <>
            <button
              className="trailer-btn"
              onClick={() => setShowTrailer(!showTrailer)}
            >
              {showTrailer
                ? "Hide Trailer"
                : "▶ Watch Trailer"}
            </button>

            {showTrailer && (
              <div className="youtube-player">
                <h2>Official Trailer</h2>

                <YouTube
                  videoId={videoKey}
                  opts={{
                    width: "100%",
                    height: "500",
                    playerVars: {
                      autoplay: 1,
                    },
                  }}
                />
              </div>
            )}
          </>
        ) : (
          <p>No trailer available.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;