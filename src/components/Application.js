import React, {useState, useEffect} from "react";

import "components/Application.scss";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";

import DayList from 'components/DayList'
import Appointment from 'components/Appointment'
import axios from 'axios'

export default function Application(props) {
  // const [day, setDay] = useState("Monday")
  // const [days, setDays] = useState([]);
  // const [interviewer, setInterviewer] = useState(0)
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const schedule = dailyAppointments.map(appt => {
    const interview = getInterview(state, appt.interview);
    return (
      <Appointment
      key={appt.id}
      id={appt.id}
      time={appt.time}
      interview={interview}
      />
    )
  })
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then(all => {
      setState(prev => ({...prev, days : all[0].data, appointments : all[1].data, interviewers : all[2].data}))
    })
  },[])
  console.log(state)
  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      < DayList 
        days={state.days}
        day={state.day}
        setDay={setDay}
      />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

