import MovieDto from "yarikvor-mockapi-cinemaschedules/dist/dtos/MovieDto";
import "./styles.css";

export type MovieItemProps = {
  movie: MovieDto;
  onClick?: () => void;
};

const MovieItem = (props: MovieItemProps) => {
  return (
    <button className="movieItem" onClick={props.onClick}>
      {props.movie.name} 
    </button>
  );
};

export default MovieItem;
