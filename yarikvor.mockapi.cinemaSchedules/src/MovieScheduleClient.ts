import IMovieScheduleClient from "./IMovieScheduleClient";
import MovieDto from "./dtos/MovieDto";
import MovieResponseDto from "./dtos/MovieResponseDto";
import ScheduleDto from "./dtos/ScheduleDto";
import ScheduleResponseDto from "./dtos/ScheduleResponseDto";

class MovieScheduleClient implements IMovieScheduleClient {
  private static readonly BASE_URL =
    "https://6522dd89f43b17938414fbeb.mockapi.io/api/v1/";

  async getMoviesAsync(): Promise<MovieDto[]> {
    const response = await this.getRequest<MovieResponseDto[]>("movies");

    return response.map<MovieDto>((value) => ({
      ...value,
      id: +value.id,
      duration: +value.duration,
    }));
  }

  async getSchedulesAsync(id: number): Promise<ScheduleDto[] | null> {
    const response = await this.getRequest<ScheduleResponseDto[] | null>(
      `movies/${id}/schedules`
    );

    return (
      response?.map<ScheduleDto>((value) => ({
        ...value,
        id: +value.id,
        movieId: +value.movieId,
        startAt: new Date(value.startAt)
      })) ?? null
    );
  }

  private getRequest<T>(endpoint: string): Promise<T> {
    return fetch(MovieScheduleClient.BASE_URL + endpoint).then(
      (res) => res.json() as Promise<T>
    );
  }
}

export default MovieScheduleClient;
