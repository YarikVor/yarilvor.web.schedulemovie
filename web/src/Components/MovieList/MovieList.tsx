import MovieDto from "yarikvor-mockapi-cinemaschedules/dist/dtos/MovieDto";
import MovieItem from "../MovieItem/MovieItem";
import "./styles.css";

export type MovieListProps = {
  movies: Array<MovieDto>;
  onClickItem?: (item: MovieDto) => void;
};

const MovieList = (props: MovieListProps) => {
  return (
    <div className="movieList">
      {props.movies.length !== 0 ? (
        props.movies.map((value) => (
          <MovieItem
            movie={value}
            key={value.id}
            onClick={() => {
              props.onClickItem?.(value);
            }}
          />
        ))
      ) : (
        <span>Empty!</span>
      )}
    </div>
  );
};

export default MovieList;
