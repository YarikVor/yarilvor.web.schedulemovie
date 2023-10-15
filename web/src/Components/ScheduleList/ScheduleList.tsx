import ScheduleDto from "yarikvor-mockapi-cinemaschedules/dist/dtos/ScheduleDto";
import ScheduleItem from "../ScheduleItem/ScheduleItem";
import './styles.css';

export type ScheduleListProps = {
  onClickItem?: (item: ScheduleDto) => void;
  list: ScheduleDto[];
  duration: number;
};

const ScheduleList = (props: ScheduleListProps) => {
  return (
    <div className="scheduleList">
      {props.list.map((value) => (
        <ScheduleItem
          startTime={value.startAt}
          key={value.id}
          endTime={new Date(+value.startAt + (props.duration * 1000))}
          onClick={() => props.onClickItem?.(value)}
        />
      ))}
    </div>
  );
};

export default ScheduleList;
