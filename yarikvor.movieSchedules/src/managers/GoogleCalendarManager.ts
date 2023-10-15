import { calendar_v3 } from 'googleapis';
import { IGoogleCalendarManager } from './IGoogleCalendarManager';

export default class GoogleCalendarManager implements IGoogleCalendarManager {
  public constructor(private readonly _calendar: calendar_v3.Calendar) { }

  public async getFromNowTimeRanges(params: calendar_v3.Params$Resource$Events$List) {
    return await this._calendar.events.list(params);
  }

  public async writeEventAsync(params: calendar_v3.Params$Resource$Events$Insert) {
    return await this._calendar.events.insert(params);
  }
}
