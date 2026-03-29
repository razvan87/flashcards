import { useState, useEffect } from "react";
import { useParams } from "react-router";
import type { Movie } from "./types";

function MovieCardDetails() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/movies/${id}`)
      .then((res) => res.json())
      .then(setMovie)
      .catch(console.error);
  }, [id]);

  if (!movie) {
    return <strong>Loading Game...</strong>;
  }

  if (!movie.title) {
    return <h1>Game not found</h1>;
  }

  return (
    <div>
      <h3>{movie.title}</h3>
      <p>{movie.director}</p>
      <p>{movie.year}</p>
      <p>{JSON.stringify(movie.watched)}</p>
    </div>
  );
}

export default MovieCardDetails;