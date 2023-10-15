type ScheduleResponseDto = {
    readonly id: string;
    readonly movieId: string;
    readonly startAt: string;
    readonly coordinate: [string, string];
};
export default ScheduleResponseDto;
