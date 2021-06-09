import React, {useState, useEffect} from "react";

import "components/Application.scss";

import Button from 'components/Button'
import DayList from 'components/DayList'
import Appointment from 'components/Appointment'
import axios from 'axios'

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "5pm"
  },
  {
    id: 4,
    time: "4:30pm",
    interview: {
      student: "Seymour Butts",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg"
      }
    }
  },
  {
    id: 5,
    time: "2:30pm",
    interview: {
      student: "Amanda Hugnkis",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      }
    }
  }
];

export default function Application(props) {
  const [day, setDay] = useState("Monday")
  const [days, setDays] = useState([]);
  const [interviewer, setInterviewer] = useState(0)

  useEffect(() => {
    axios.get("http://localhost:8001/api/days")
    .then(res => {
      setDays(res.data)
    })
  },[])

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
        days={days}
        day={day}
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
        {appointments.map(appt => <Appointment key={appt.id} {...appt}/>)}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

