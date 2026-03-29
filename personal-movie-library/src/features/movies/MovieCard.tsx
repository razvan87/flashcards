import type { Movie } from "./types";

type Props = { 
    movie: Movie;
}

function MovieCard({ movie }: Props) {
  return (
    <div>
      <h2>{movie.title}</h2>
      <p>Director: {movie.director}</p>
      <p>Year: {movie.year}</p>
      <p>Watched: {movie.watched ? "Yes" : "No"}</p>
    </div>
  );
}

export default MovieCard;