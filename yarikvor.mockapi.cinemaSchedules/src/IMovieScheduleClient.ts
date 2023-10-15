import MovieDto from "./dtos/MovieDto";
import ScheduleDto from "./dtos/ScheduleDto";

interface IMovieScheduleClient {
  getMoviesAsync(): Promise<MovieDto[]>;
  getSchedulesAsync(id: number): Promise<ScheduleDto[] | null>;
}

export default IMovieScheduleClient;