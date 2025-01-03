import axios from "axios";
import styles from "../../styles/MovieDetails.module.css";

export default function MovieDetails({ movie }) {

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
      <h1 className={styles.h1}>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title} className={styles.img}
      />
      <p className={styles.p}>{movie.overview}</p>
      <p className={styles.p}>Release Date: {movie.release_date}</p>
      <p className={styles.p}>Rating: {movie.vote_average}</p>
        <button
          className={styles.trailerButton}
          onClick={async () => {
            const trailerUrl = await handleTrailerClick(movie.id);
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
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=2cce486e7f54a137ac4e291d967e29aa`
  );

  return {
    props: {
      movie: data,
    },
  };
}
