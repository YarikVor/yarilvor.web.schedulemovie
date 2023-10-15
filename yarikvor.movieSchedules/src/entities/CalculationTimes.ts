import TimeRange from "./TimeRange";

class CalculationTimes
{
    public static *GetFreeTime(freeTime: Iterable<TimeRange>, stopTime: Iterable<TimeRange>): Iterable<TimeRange>
    {
        let array = [...stopTime];

        for (const ft of freeTime)
        {
            if (array.length == 0)
                return { done: true };

            for (var index = 0; index < array.length; index++)
            {
                var sTimeRange = array[index];
                if (!sTimeRange.isIn(ft))
                    continue;

                array.splice(index, 1);
                index--;
                yield sTimeRange;
            }
        }
    }
}

export default CalculationTimes;