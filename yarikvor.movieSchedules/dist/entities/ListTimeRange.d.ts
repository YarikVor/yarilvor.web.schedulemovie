import TimeRange from "./TimeRange";
declare class ListTimeRange {
    private readonly _timeRanges;
    constructor(timeRange: TimeRange);
    get TimeRanges(): ReadonlyArray<TimeRange>;
    Sub(subTimeRange: TimeRange): void;
}
export default ListTimeRange;
