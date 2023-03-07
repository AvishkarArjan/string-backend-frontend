import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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
import moment from "moment";
import { config } from "./Constants";
var url = config.url.API_URL;

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

const Calen = () => {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

  const [allEvents, setAllEvents] = useState();

  const handleAddEvent = () => {
    setAllEvents([...allEvents, newEvent]);
  };

  const [delEvent, setDelEvent] = useState("");
  const delData = async (event) => {
    event.preventDefault();
    await axios
      .post(
        `${url}/admin/calendar`,
        {
          title: "",
          start: "",
          end: "",
          delEvent: delEvent,
        },
        { withCredentials: true }
      )
      .then((response) => {
        // console.log(response);
        if (response.status == 200) {
          window.location.reload(false);
        } else {
          console.log("something happened");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const postData = async (event) => {
    event.preventDefault();
    const { title, start, end } = newEvent;
    await axios
      .post(
        `${url}/admin/calendar`,
        {
          title: title,
          start: start,
          end: end,
          delEvent: "",
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status == 200) {
          window.location.reload(false);
        }
        // console.log(response);
      })
      .catch((err) => {
        console.log("calendar post error");
        window.alert(err.response.data);
        // console.log(err.response.data);
      });
  };

  const getEvents = async () => {
    await axios
      .get(`${url}/admin/calendar`, { withCredentials: true })
      .then((response) => {
        setAllEvents(response.data);
        // console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getEvents();
  }, []);
  //https://lingabhairavi.org/visitor-information-2/lunar-calendar/
  // let Poornima = new Date("2023-01-06");
  // let Amavasya = new Date("2023-01-21");
  const holidayArr = [];

  let Amavasya = [
    "2023-01-21",
    "2023-02-20",
    "2023-03-21",
    "2023-04-19",
    "2023-05-19",
    "2023-06-17",
    "2023-07-17",
    "2023-08-16",
    "2023-09-14",
    "2023-10-14",
    "2023-11-13",
    "2023-12-12",
    "2024-01-11",
    "2024-02-09",
    "2024-03-10",
    "2024-04-08",
    "2024-05-08",
    "2024-06-06",
    "2024-07-06",
    "2024-08-04",
    "2024-09-02",
    "2024-10-03",
    "2024-11-01",
    "2024-12-01",
    "2024-12-30",
  ];
  let Poornima = [
    "2023-01-06",
    "2023-02-05",
    "2023-03-07",
    "2023-04-05",
    "2023-05-05",
    "2023-06-03",
    "2023-07-03",
    "2023-08-30",
    "2023-09-29",
    "2023-10-28",
    "2023-11-27",
    "2023-12-26",
    "2024-01-25",
    "2024-02-24",
    "2024-03-25",
    "2024-04-23",
    "2024-05-23",
    "2024-06-22",
    "2024-07-21",
    "2024-08-19",
    "2024-09-18",
    "2024-10-17",
    "2024-11-15",
    "2024-12-15",
  ];

  for (let i = 0; i < Amavasya.length; i++) {
    holidayArr.push({
      title: "Amavasya",
      start: new Date(Amavasya[i]),
      end: new Date(Amavasya[i]),
    });
  }
  for (let i = 0; i < Poornima.length; i++) {
    holidayArr.push({
      title: "Poornima",
      start: new Date(Poornima[i]),
      end: new Date(Poornima[i]),
    });
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
    <div className="pt-20 flex ">
      <div className="w-[500px]">
        <div className="flex flex-col justify-start items-start mx-2 ml-4">
          <p className="text-2xl italic">Add a new Event</p>

          <div className="flex flex-col justify-start items-start w-full ">
            <div className="flex w-full justify-between my-1 gap-10">
              <p className="w-fit">Title:</p>
              <input
                type="text"
                placeholder="add title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                className="bg-[#DBE2EF] rounded-md px-2 w-full outline-none "
              />
            </div>
            <div className="flex w-full justify-between gap-5 my-1">
              <p>Start:</p>
              <DatePicker
                placeholderText="StartDate"
                selected={newEvent.start}
                onChange={(start) =>
                  setNewEvent({ ...newEvent, start: moment(start).toDate() })
                }
                className="bg-[#DBE2EF] rounded-md mx-2 px-2 w-full outline-none"
              />
            </div>

            <div className="flex justify-between w-full gap-5 my-1">
              <p>End:</p>
              <DatePicker
                placeholderText="EndDate"
                selected={newEvent.end}
                onChange={(end) =>
                  setNewEvent({ ...newEvent, end: moment(end).toDate() })
                }
                className="bg-[#DBE2EF] rounded-md mx-2 w-full px-2 outline-none"
              />
            </div>
            <div className="w-full flex justify-end">
              <button
                onClick={(e) => {
                  postData(e);
                }}
                className="bg-[#3F72AF] text-white hover:bg-[#285893] rounded-md px-2 my-2"
              >
                Add Event
              </button>
            </div>
          </div>
          <div></div>
        </div>
        <div className="flex justify-start items-start flex-col w-full mx-4">
          <p className="text-2xl italic">Delete Event</p>
          <div className="flex w-full">
            <div className="flex w-32">Select Event</div>

            <select
              className="bg-[#DBE2EF] rounded-md mx-2 w-full px-2 py-1 outline-none"
              value={delEvent}
              name=""
              id=""
              onChange={(e) => {
                setDelEvent(e.target.value);
              }}
            >
              <option value=""></option>
              {allEvents
                ? allEvents.map((event) => <option>{event.title}</option>)
                : null}
            </select>
          </div>
          <div className="w-full flex justify-end px-4">
            {delEvent ? (
              <button
                onClick={(e) => delData(e)}
                className="outline-none bg-[#3F72AF] text-white hover:bg-[#285893] rounded-md px-2 my-2"
              >
                {" "}
                Delete event
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <Calendar
        className="shadow-lg bg-[#e6ecf6] rounded-lg bg-opacity-50 shadow-[#8d939e] p-4 mx-10 w-[90%]"
        localizer={localizer}
        events={eventArr}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default Calen;
