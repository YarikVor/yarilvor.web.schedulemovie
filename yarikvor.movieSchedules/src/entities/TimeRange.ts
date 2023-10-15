class TimeRange {
  public constructor(public readonly start: Date, public readonly end: Date) {}

  public isIn(range: TimeRange): boolean {
    return this.start >= range.start && this.end <= range.end;
  }

  public get isEmpty(): boolean {
    return this.end.getTime() - this.start.getTime() == 0;
  }

  public static WithDuration(start: Date, durationMs: number) {
    return new TimeRange(start, new Date(+start + durationMs));
  }
}

export default TimeRange;
