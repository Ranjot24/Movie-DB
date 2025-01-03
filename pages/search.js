import { useState } from "react";
import axios from "axios";
import styles from "../styles/Search.module.css";

export default function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=2cce486e7f54a137ac4e291d967e29aa&query=${query}`
    );
    setMovies(data.results);
  };

  const handleTrailerClick = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=2cce486e7f54a137ac4e291d967e29aa`
      );
      const trailer = data.results.find((video) => video.type === "Trailer");
      if (trailer) {
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
      } else {
        alert("No trailer available for this movie.");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 id="h1">Search Movies</h1>
      <div className={styles.search}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter movie name" id="input"
      />
      <button onClick={handleSearch} className={styles.button}>Search</button>
      </div>
      <div className={styles.movieGrid}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.movieCard}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
              <button
          className={styles.trailerButton}
          onClick={async () => {
            const trailerUrl = await fetchMovieTrailer(movie.id);
            if (trailerUrl) {
              window.open(trailerUrl, "_blank");
            } else {
              alert("Trailer not available for this movie.");
            }
          }}
        >
          Watch Trailer
        </button>
          </div>
        ))}
      </div>
    </div>
  );
}
