import { calendar_v3 } from 'googleapis';
import { GaxiosPromise } from 'googleapis/build/src/apis/abusiveexperiencereport';

// authorize().then(listEvents).catch(console.error);

export interface IGoogleCalendarManager {
  getFromNowTimeRanges(params: calendar_v3.Params$Resource$Events$List): GaxiosPromise<calendar_v3.Schema$Events>;
  writeEventAsync(params: calendar_v3.Params$Resource$Events$Insert): GaxiosPromise<calendar_v3.Schema$Event>;
}
