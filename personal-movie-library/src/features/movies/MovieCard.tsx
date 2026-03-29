import type { Movie } from "./types";

type Props = { 
    movie: Movie;
    onToggleWatched: (updatedMovie: Movie) => void;
}

function MovieCard({ movie, onToggleWatched }: Props) {

  const handleToggleWatched = () => {
    fetch(`/api/movies/${movie.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        watched: !movie.watched,
      })
    })
    .then((res) => res.json())
    .then((updatedMovie) => {
      console.log("Updated Movie:", updatedMovie);
      onToggleWatched(updatedMovie);
    })
    .catch(console.error);
  };

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>Director: {movie.director}</p>
      <p>Year: {movie.year}</p>
      <p>Watched: {movie.watched ? "Yes" : "No"}</p>
      <button onClick={handleToggleWatched}> Mark as {movie.watched ? "Unwatched" : "Watched"}</button>
    </div>    
  );
}

export default MovieCard;