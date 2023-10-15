import { calendar_v3 } from 'googleapis';
import { IGoogleCalendarManager } from './IGoogleCalendarManager';
export default class GoogleCalendarManager implements IGoogleCalendarManager {
    private readonly _calendar;
    constructor(_calendar: calendar_v3.Calendar);
    getFromNowTimeRanges(params: calendar_v3.Params$Resource$Events$List): Promise<import("gaxios").GaxiosResponse<calendar_v3.Schema$Events>>;
    writeEventAsync(params: calendar_v3.Params$Resource$Events$Insert): Promise<import("gaxios").GaxiosResponse<calendar_v3.Schema$Event>>;
}
