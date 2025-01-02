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
          </div>
        ))}
      </div>
    </div>
  );
}
