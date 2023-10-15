import Coordinate from "./Coordinate";

type ScheduleDto = {
    readonly id: number;
    readonly movieId: number;
    readonly startAt: Date;
    readonly coordinate: Coordinate;
};

export default ScheduleDto;