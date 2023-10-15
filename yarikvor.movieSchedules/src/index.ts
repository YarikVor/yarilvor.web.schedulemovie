import {promises} from 'fs';
import path from 'path';
import process from 'process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import InitiatedCalendar from './InitialedCalendar';

async function listEvents() {
  const calendar = await InitiatedCalendar.createCalendarAsync();
  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });
  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log('No upcoming events found.');
    return;
  }
  console.log('Upcoming 10 events:');
  events.map((event, i) => {
    const start = event.start?.dateTime || event.start?.date;
    console.log(`${start} - ${event.summary}`);
  });

  // calendar.events.insert().
}


listEvents();
