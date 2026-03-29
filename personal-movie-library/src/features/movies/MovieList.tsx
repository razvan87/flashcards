import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import type { Movie } from "./types";

export function MovieList() {
  const [movies, setMovies] = useState<Movie[] | null>(null);

  useEffect(() => {
    fetch("/api/movies?_limit=10")
    .then((res) => res.json())
    .then((data: Movie[]) => setMovies(data))
    .catch(console.error);
  }, []);

  const handleToggleWatched = (updatedMovie: Movie) => {
    setMovies((prevMovies) => {
      if (!prevMovies) return prevMovies;
      return prevMovies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      );
    });
  }
  
  
  return (
    <div>
      <h1>Movie List:</h1>
        {!movies && <p>Loading...</p>}
        {movies?.map(movie => <MovieCard key={movie.id} movie={movie} onToggleWatched={handleToggleWatched} />)}
    </div>
  );
}

export default MovieList;