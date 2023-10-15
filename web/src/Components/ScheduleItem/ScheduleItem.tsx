import ScheduleDto from "yarikvor-mockapi-cinemaschedules/dist/dtos/ScheduleDto";
import "./styles.css";

export type ScheduleItemProps = {
  onClick?: () => void;
  startTime: Date;
  endTime: Date;
};

const ScheduleItem = (props: ScheduleItemProps) => {
  return (
    <div className="scheduleItem" onClick={props.onClick} >
      <div className="title">
        {props.startTime.toLocaleTimeString()} -{" "}
        {props.endTime.toLocaleTimeString()}
      </div>
      <div className="subtitle">{props.startTime.toLocaleDateString()}</div>
    </div>
  );
};

export default ScheduleItem;
