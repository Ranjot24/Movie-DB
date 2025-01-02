import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [activeSection, setActiveSection] = useState("popular");
  const [menuActive, setMenuActive] = useState(false);

  const fetchMoviesByCategory = async (category, setter) => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${category}?api_key=2cce486e7f54a137ac4e291d967e29aa`
      );
      setter(data.results);
    } catch (error) {
      console.error(`Error fetching ${category} movies:`, error.message);
    }
  };

  useEffect(() => {
    fetchMoviesByCategory("popular", setPopularMovies);
    fetchMoviesByCategory("now_playing", setNowPlayingMovies);
    fetchMoviesByCategory("upcoming", setUpcomingMovies);
    fetchMoviesByCategory("top_rated", setTopRatedMovies);
  }, []);

  const renderMovies = (movies) =>
    movies.map((movie) => (
      <Link href={`/movie/${movie.id}`} key={movie.id} passHref>
        <div className={styles.movieCard}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
          <h3>{movie.title}</h3>
        </div>
      </Link>
    ));

  const renderActiveSection = () => {
    switch (activeSection) {
      case "popular":
        return renderMovies(popularMovies);
      case "now_playing":
        return renderMovies(nowPlayingMovies);
      case "upcoming":
        return renderMovies(upcomingMovies);
      case "top_rated":
        return renderMovies(topRatedMovies);
      default:
        return null;
    }
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Movie Database</h1>

      {/* Navigation Bar */}
      <nav className={`${styles.navbar} ${menuActive ? styles.active : ""}`}>
        <div className={styles.burger} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${styles.menu} ${menuActive ? styles.show : ""}`}>
          <button onClick={() => { setActiveSection("popular"); toggleMenu(); }}>
            Popular
          </button>
          <button onClick={() => { setActiveSection("now_playing"); toggleMenu(); }}>
            Now Playing
          </button>
          <button onClick={() => { setActiveSection("upcoming"); toggleMenu(); }}>
            Upcoming
          </button>
          <button onClick={() => { setActiveSection("top_rated"); toggleMenu(); }}>
            Top Rated
          </button>
          <Link href="/search" passHref>
            <button className={styles.navButton} onClick={toggleMenu}>
              Go to Search
            </button>
          </Link>
        </div>
      </nav>

      {/* Movie Section */}
      <div className={styles.movieGrid}>{renderActiveSection()}</div>
    </div>
  );
}
