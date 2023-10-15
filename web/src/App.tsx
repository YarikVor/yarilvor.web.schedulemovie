import { useEffect, useState } from "react";
import "./App.css";
import MovieScheduleClient from "yarikvor-mockapi-cinemaschedules/dist/MovieScheduleClient";
import MovieDto from "yarikvor-mockapi-cinemaschedules/dist/dtos/MovieDto";
import MovieList from "./Components/MovieList/MovieList";
import ScheduleList from "./Components/ScheduleList/ScheduleList";
import ScheduleDto from "yarikvor-mockapi-cinemaschedules/dist/dtos/ScheduleDto";
import {
  InputGroup,
  Button,
  Input,
  Drawer,
  useToaster,
  Notification,
  Loader,
} from "rsuite";
import Main from "./Components/Main/Main";
import ApiCalendar from "react-google-calendar-api";
import CalculationTimes from "yarikvor.movieSchedules/dist/entities/CalculationTimes";
import ListTimeRange from "yarikvor.movieSchedules/dist/entities/ListTimeRange";
import TimeRange from "yarikvor.movieSchedules/dist/entities/TimeRange";
import { MessageType } from "rsuite/esm/Notification/Notification";
import { RequestStatus } from "./Entities/RequestStatus";
import Switcher from "./Components/Switcher/Switcher";
import CalendarConfig from "./Entities/CalendarConfig";

const movieClient = new MovieScheduleClient();
const apiCalendar = new ApiCalendar(CalendarConfig);

const createNotification = (
  type: MessageType,
  header: React.ReactNode,
  children?: React.ReactNode
) => (
  <Notification type={type} header={header} closable>
    {children}
  </Notification>
);

function App() {
  const [movies, setMovies] = useState<MovieDto[]>([]);
  const [findText, setFindText] = useState("");
  const [filteredMovies, setFilteredMovies] = useState<MovieDto[]>([]);
  const [schedules, setSchedules] = useState<ScheduleDto[]>([]);
  const [schedulesStatus, setSchedulesStatus] = useState<RequestStatus>(
    RequestStatus.LOADING
  );
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const toaster = useToaster();
  const [selectedMovie, setSelectedMovie] = useState<MovieDto>();

  const [isSignIn, setIsSignIn] = useState(false);

  useEffect(() => {
    movieClient.getMoviesAsync().then((data) => setMovies(data));
  }, []);
  useEffect(() => setFilteredMovies(movies), [movies]);

  const pushNotification = (
    type: MessageType,
    header: React.ReactNode,
    children?: React.ReactNode
  ) => toaster.push(createNotification(type, header, children));

  const signInGoogle = () => {
    apiCalendar
      .handleAuthClick()
      .then(() => setIsSignIn(true))
      .catch(() => {
        pushNotification("error", "Error sign in");
        setIsSignIn(false);
      });
  };

  const getListEvents = () =>
    (
      apiCalendar.listEvents(
        { orderBy: "startTime", singleEvents: true },
        "primary"
      ) as Promise<any>
    )
      .then((value) => {
        const items: Array<any> = value.result.items;

        const result = items.map(
          (item) =>
            new TimeRange(
              new Date(item.start.dateTime),
              new Date(item.end.dateTime)
            )
        );

        return result;
      })
      .catch(() => {
        pushNotification("error", "Event didn't load from Google Calendar");
        return undefined;
      });

  return (
    <>
      <Main>
        <h1>Cinema Schedule</h1>
        <label>Input film's name:</label>
        <InputGroup>
          <Input onInput={(e) => setFindText(e.currentTarget.value)} />
          <InputGroup.Button
            children="🔍︎"
            onClick={() =>
              setFilteredMovies(movies.filter((m) => m.name.includes(findText)))
            }
          />
        </InputGroup>

        <div>
          <MovieList
            movies={filteredMovies}
            onClickItem={(value) => {
              if (!isSignIn) {
                pushNotification(
                  "info",
                  "Sign in...",
                  <>
                    Please sign in to Google Calendar <br />
                    <Button onClick={signInGoogle}>Login...</Button>
                  </>
                );
                return;
              }

              setSchedulesStatus(RequestStatus.LOADING);
              setIsOpenDrawer(true);
              setSelectedMovie(value);
              movieClient
                .getSchedulesAsync(value.id)
                .then((sortedSchedules) => {
                  if (!sortedSchedules) 
                    return;

                  sortedSchedules.sort((a, b) => +a.startAt - +b.startAt);

                  getListEvents().then((eventTimeRanges) => {
                    if (!eventTimeRanges) return;

                    const scheduleTimeRanges = sortedSchedules.map((el) =>
                      TimeRange.WithDuration(
                        el.startAt,
                        selectedMovie?.duration ?? 0
                      )
                    );

                    const maxScheduleDate = new Date(
                      Math.max(...scheduleTimeRanges.map((e) => +e.end))
                    );

                    const listTimeRange = new ListTimeRange(
                      new TimeRange(new Date(), maxScheduleDate)
                    );

                    for (const eventElement of eventTimeRanges) {
                      listTimeRange.Sub(eventElement);
                    }
                    const freeTimesWithoutEvents = listTimeRange.TimeRanges;
                    console.log(freeTimesWithoutEvents);

                    const avaibleSchedules = Array.from(
                      CalculationTimes.GetFreeTime(
                        freeTimesWithoutEvents,
                        scheduleTimeRanges
                      )
                    );

                    const reallySchedules = sortedSchedules.filter((s) =>
                      avaibleSchedules.some((tr) => tr.start === s.startAt)
                    );

                    setSchedules(reallySchedules);
                    setSchedulesStatus(RequestStatus.OK);
                  });
                })
                .catch(() => {
                  pushNotification("error", "Error get schedules");
                  setIsOpenDrawer(false);
                });
            }}
          />
        </div>
      </Main>

      <Drawer
        size="xs"
        open={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
      >
        <Drawer.Header>
          <Drawer.Title>Add a schedule to Google Calendar</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          {selectedMovie && (
            <>
              <h2>{selectedMovie.name}</h2>
              <p>{selectedMovie.description}</p>
            </>
          )}
          {schedulesStatus === RequestStatus.OK ? (
            <ScheduleList
              onClickItem={(item) => {
                const eventSend = {
                  summary: selectedMovie?.name,
                  description: selectedMovie?.description,
                  start: { dateTime: item.startAt.toISOString(), timeZone: "" },
                  end: {
                    dateTime: new Date(
                      +item.startAt + (selectedMovie?.duration ?? 0) * 1000
                    ).toISOString(),
                    timeZone: "",
                  },
                };

                console.log(item, eventSend);

                const promise: Promise<any> = apiCalendar.createEvent(
                  eventSend as any,
                  "primary"
                );

                promise
                  .then(() => {
                    pushNotification("success", "The event added");
                  })
                  .catch(() => {
                    pushNotification("error", "The event didn't add");
                  })
                  .then(() => setIsOpenDrawer(false));
              }}
              duration={selectedMovie?.duration ?? 0}
              list={schedules}
            />
          ) : (
            <>
              <Loader /> Loading{" "}
            </>
          )}
        </Drawer.Body>
      </Drawer>
    </>
  );
}

export default App;
