import IMovieScheduleClient from "./IMovieScheduleClient";
import MovieDto from "./dtos/MovieDto";
import ScheduleDto from "./dtos/ScheduleDto";
declare class MovieScheduleClient implements IMovieScheduleClient {
    private static readonly BASE_URL;
    getMoviesAsync(): Promise<MovieDto[]>;
    getSchedulesAsync(id: number): Promise<ScheduleDto[] | null>;
    private getRequest;
}
export default MovieScheduleClient;
