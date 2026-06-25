import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieTrailer,fetchMovieCast } from '../../Services/Index';
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import './index.scss';

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [videoKey,setVideoKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const [cast,setCast] = useState([]);
    const formatDate = (date) => {
    return date.split("-").reverse().join("-");
  };

  useEffect(() => {
    fetchMovieDetails(id)
      .then((res) => setMovie(res))
      .catch((err) => console.log(err));

    fetchMovieTrailer(id)
    .then((videos)=>{
    console.log(videos); 
      const trailer = videos.find(
      (video)=>
        video.type === "Trailer" &&
        video.site === "YouTube"
    );
    console.log(trailer);
      if (trailer) {
        console.log("Trailer Key:", trailer.key);
        setVideoKey(trailer.key);}
      else {
        console.log("No trailer found");}
  })
  .catch((err) => console.log(err))
  fetchMovieCast(id)
    .then((res)=> setCast(res.slice(0,5)))
    .catch((err) => console.log(err));
  }, [id]);

        if (!movie) {
  return <h2>Loading...</h2>;
}
  return (
    <div className="movie-details">
      <img src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}/>
      <div className="movie-info">
        <h1>{movie.title}</h1>
        <p>
          Release Date: {formatDate(movie.release_date)}
        </p>
        <p>
          <strong>Rating:</strong>
          {' '}
          {movie.vote_average}
        </p>
        <p>
          <strong>Overview:</strong>
        </p>
        <p>{movie.overview}</p>

       <button className="trailer-btn" onClick={() => setShowTrailer(!showTrailer)}>
            {showTrailer ? " Close Trailer" : "▶ Watch Trailer"} </button>

      {showTrailer && videoKey && (
        <div className="youtube-player">
    <h2>Official Trailer</h2>

    <YouTube videoId={videoKey} opts={{
        width: "100%",
        height: "450",
        playerVars: { autoplay: 1,},
      }}/> </div> 
      )}
      <h2 className="cast-heading">Top Cast</h2>
      {!showTrailer && (
    <div className="cast-container">
      {cast.map((actor) => (
      <div key={actor.id} className="cast-card">
        <img src={ actor.profile_path
              ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
              : "https://via.placeholder.com/185x278?text=No+Image"} alt={actor.name} />
        <h4>{actor.name}</h4>
        <p>{actor.character}</p>
      </div>
    ))}
  </div>
)}
    </div>
    
    </div>
  );
}

export default MovieDetails;
