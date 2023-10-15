"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TimeRange_1 = __importDefault(require("./TimeRange"));
class ListTimeRange {
    constructor(timeRange) {
        this._timeRanges = [timeRange];
    }
    get TimeRanges() {
        return this._timeRanges;
    }
    Sub(subTimeRange) {
        for (let index = 0; index < this._timeRanges.length; index++) {
            var timeRange = this._timeRanges[index];
            if (timeRange.end < subTimeRange.start)
                continue;
            if (subTimeRange.isIn(timeRange)) {
                let timeRanges = [
                    new TimeRange_1.default(timeRange.start, subTimeRange.start),
                    new TimeRange_1.default(subTimeRange.end, timeRange.end)
                ];
                this._timeRanges.splice(index, 1);
                console.log("11111111", timeRange, subTimeRange, timeRanges);
                var enumerableTimeRanges = timeRanges.filter(tR => !tR.isEmpty);
                this._timeRanges.splice(index, 0, ...enumerableTimeRanges);
                return;
            }
            if (timeRange.isIn(subTimeRange)) {
                this._timeRanges.splice(index, 1);
                console.log("222222222", timeRange, subTimeRange, newTimeRange);
                index--;
                continue;
            }
            if (timeRange.start <= subTimeRange.start && subTimeRange.start <= timeRange.end) {
                const newTimeRange = new TimeRange_1.default(timeRange.start, subTimeRange.start);
                this._timeRanges[index] = newTimeRange;
                console.log("33333333", timeRange, subTimeRange, newTimeRange);
                continue;
            }
            if (timeRange.start <= subTimeRange.end && subTimeRange.end <= timeRange.end) {
                var newTimeRange = new TimeRange_1.default(subTimeRange.end, timeRange.end);
                this._timeRanges[index] = newTimeRange;
                console.log("4444444", timeRange, subTimeRange, newTimeRange);
                return;
            }
        }
    }
}
exports.default = ListTimeRange;
//# sourceMappingURL=ListTimeRange.js.map