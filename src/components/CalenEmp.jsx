import React, { useState, useEffect } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import dayjs from "dayjs";
import {config} from "./Constants"
var url = config.url.API_URL

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarEmp = () => {
  const navigate = useNavigate()
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState();
  


  const getEvents = async () => {
    await axios
      .get(`${url}/employee/calendar`,{withCredentials: true})
      .then((response) => {
        setAllEvents(response.data);
        // console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/login")
      });
  };

  useEffect(() => {
    getEvents();
  }, []);

  const holidayArr = [];

  let Amavasya = ["2023-01-21", "2023-02-20", "2023-03-21", "2023-04-19","2023-05-19","2023-06-17","2023-07-17","2023-08-16","2023-09-14","2023-10-14","2023-11-13","2023-12-12","2024-01-11", "2024-02-09", "2024-03-10", "2024-04-08","2024-05-08","2024-06-06","2024-07-06","2024-08-04","2024-09-02","2024-10-03","2024-11-01","2024-12-01","2024-12-30",];
  let Poornima = ["2023-01-06", "2023-02-05", "2023-03-07", "2023-04-05","2023-05-05","2023-06-03","2023-07-03","2023-08-30","2023-09-29","2023-10-28","2023-11-27","2023-12-26","2024-01-25", "2024-02-24", "2024-03-25", "2024-04-23","2024-05-23","2024-06-22","2024-07-21","2024-08-19","2024-09-18","2024-10-17","2024-11-15","2024-12-15",];

  for (let i = 0; i < Amavasya.length; i++) {
    holidayArr.push({
      title:"Amavasya",
      start:new Date(Amavasya[i]),
      end:new Date(Amavasya[i])
    })
    
  }
  for (let i = 0; i < Poornima.length; i++) {
    holidayArr.push({
      title:"Poornima",
      start:new Date(Poornima[i]),
      end:new Date(Poornima[i])
    })
    
  }


  const events = [];
  if (allEvents) {
    for (let i = 0; i < allEvents.length; i++) {
      let eStart = new Date(allEvents[i].start);
      let eEnd = new Date(allEvents[i].end);
      events.push({
        title: allEvents[i].title,
        start: eStart,
        end: eEnd,
      });
    }
  }

  const sunday = [];
  let Sunday = new Date("2023-01-01");
  for (let i = 0; i < 12 * 30; i++) {
    sunday.push({
      title: "Sunday",
      start: new Date(Sunday),
      end: new Date(Sunday),
    });
    Sunday = dayjs(Sunday).add(7, "day");
  }

  const eventArr = holidayArr.concat(sunday, events);
  // console.log(eventArr);

  

  return (
    <div className="pt-20 h-screen bg-string bg-[#F9F7F7] flex justify-center items-center flex-col">
      
      <Calendar
        className="shadow-lg bg-[#e6ecf6] rounded-lg bg-opacity-50 shadow-[#8d939e] p-4 mx-10 w-[90%] h-[90%]"
        localizer={localizer}
        events={eventArr}
        startAccessor="start"
        endAccessor="end"
        style={{ }}
      />v
    </div>
  );
};

export default CalendarEmp;
