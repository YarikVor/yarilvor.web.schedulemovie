const CalendarConfig = {
  clientId:
    "561903381593-bj8fkat3oj1mufcdedliuapic4r4vvpd.apps.googleusercontent.com",
  apiKey: "AIzaSyAS1BE97gk1TmcfG2q2DVchwG5xPsiTR2A",
  scope: [
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
    "https://www.googleapis.com/auth/calendar.events.readonly",
  ].join(" "),
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
};

export default CalendarConfig;
