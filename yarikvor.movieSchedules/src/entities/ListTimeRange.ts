import TimeRange from "./TimeRange";

class ListTimeRange
{
    private readonly _timeRanges: Array<TimeRange>;

    public constructor(timeRange: TimeRange)
    {
        this._timeRanges = [timeRange];
    }

    public get TimeRanges(): ReadonlyArray<TimeRange>
    {
        return this._timeRanges;
    }

    public Sub(subTimeRange: TimeRange)
    {
        for (let index = 0; index < this._timeRanges.length; index++)
        {
            var timeRange = this._timeRanges[index];

            if (timeRange.end < subTimeRange.start)
                continue;

            if (subTimeRange.isIn(timeRange))
            {
                let timeRanges = [
                    new TimeRange(timeRange.start, subTimeRange.start),
                    new TimeRange(subTimeRange.end, timeRange.end)
                ];

                this._timeRanges.splice(index, 1);
                var enumerableTimeRanges = timeRanges.filter(tR => !tR.isEmpty);
                this._timeRanges.splice(index, 0, ...enumerableTimeRanges);
                return;
            }

            if (timeRange.isIn(subTimeRange))
            {
                this._timeRanges.splice(index, 1);
                index--;
                continue;
            }

            if (timeRange.start <= subTimeRange.start && subTimeRange.start <= timeRange.end)
            {
                const newTimeRange = new TimeRange(timeRange.start, subTimeRange.start);
                this._timeRanges[index] = newTimeRange;
                continue;
            }

            if (timeRange.start <= subTimeRange.end && subTimeRange.end <= timeRange.end)
            {
                var newTimeRange = new TimeRange(subTimeRange.end, timeRange.end);
                this._timeRanges[index] = newTimeRange;
                return;
            }
        }
    }
}

export default ListTimeRange;