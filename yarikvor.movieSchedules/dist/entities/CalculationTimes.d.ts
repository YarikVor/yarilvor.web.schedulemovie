import TimeRange from "./TimeRange";
declare class CalculationTimes {
    static GetFreeTime(freeTime: Iterable<TimeRange>, stopTime: Iterable<TimeRange>): Iterable<TimeRange>;
}
export default CalculationTimes;
