import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { vw } from "../utils/units";

const CalendarItem = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div style={{ width: `${vw(355)}`, height: `${vw(308)}` }}>
      <Calendar
        onChange={setDate}
        value={date}
        locale="ko-KR"
        calendarType="gregory"
      />
    </div>
  );
};

export default CalendarItem;
