import axios from "axios";
import styles from "../../styles/MovieDetails.module.css";

export default function MovieDetails({ movie }) {
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
