import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "../styles/Search.module.css";

export default function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=2cce486e7f54a137ac4e291d967e29aa&query=${query}`
      );
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching search results:", error.message);
    }
  };

  const handleTrailerClick = async (movieId) => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=2cce486e7f54a137ac4e291d967e29aa`
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
      <h1 className={styles.h1}>Search Movies</h1>
      <div className={styles.search}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie name"
          className={styles.input}
        />
        <button onClick={handleSearch} className={styles.button}>
          Search
        </button>
      </div>
      <div className={styles.movieGrid}>
        {movies.map((movie) => (
          <Link href={`/movie/${movie.id}`} key={movie.id} passHref>
            <div className={styles.movieCard}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
              <button
                className={styles.trailerButton}
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation on trailer click
                  handleTrailerClick(movie.id);
                }}
              >
                Watch Trailer
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

