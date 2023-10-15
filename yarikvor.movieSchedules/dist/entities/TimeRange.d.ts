declare class TimeRange {
    readonly start: Date;
    readonly end: Date;
    constructor(start: Date, end: Date);
    isIn(range: TimeRange): boolean;
    get isEmpty(): boolean;
    static WithDuration(start: Date, durationMs: number): TimeRange;
}
export default TimeRange;
