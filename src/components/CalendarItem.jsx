import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarItem = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div style={{ width: "22.1875rem", height: "19.25rem" }}>
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
