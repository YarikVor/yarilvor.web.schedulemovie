"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TimeRange {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        if(start > end)
            console.error("Error");
    }
    isIn(range) {
        return this.start >= range.start && this.end <= range.end;
    }
    get isEmpty() {
        return this.end.getTime() - this.start.getTime() == 0;
    }
    static WithDuration(start, durationMs) {
        return new TimeRange(start, new Date(+start + durationMs));
    }
}
exports.default = TimeRange;
//# sourceMappingURL=TimeRange.js.map