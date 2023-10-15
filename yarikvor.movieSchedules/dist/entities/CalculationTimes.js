"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CalculationTimes {
    static *GetFreeTime(freeTime, stopTime) {
        let array = [...stopTime];
        for (const ft of freeTime) {
            if (array.length == 0)
                return { done: true };
            for (var index = 0; index < array.length; index++) {
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
exports.default = CalculationTimes;
//# sourceMappingURL=CalculationTimes.js.map