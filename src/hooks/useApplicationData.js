import {useEffect, useReducer} from 'react';
import axios from 'axios'
import reducer, {ACTIONS} from "../reducers/application"

// const setSocket = () => {
//   const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL) 
//   ws.onopen = () => ws.send("ping")
// }

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {day: "Monday", days: [], appointments: {}, interviewers: {}})

  useEffect(() => {
    //setSocket()
    Promise.all([
      axios.get("/api/days"),
      axios.get('/api/appointments'),
      axios.get("/api/interviewers")
    ]).then(all => {
      dispatch({type:ACTIONS.SET_APPLICATION_DATA, all})
    })
  },[])
  
  const getSpots = (currDay, appointments) => {
    return currDay.appointments
    .map(appt => appointments[appt])
    .filter(appt => !appt.interview )
    .length
  }

  const updateSpots = (appointments) => {
    const currDay = {...state.days.find(scheduleDay => scheduleDay.name === state.day)}
    currDay.spots = getSpots(currDay, appointments)
    const newDays = [...state.days]
    const days = newDays.map(day => {
      return day.name === currDay.name ? currDay : day
    })
    return days
  }

  const setDay = day => dispatch({type:ACTIONS.SET_DAY, day})

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(appointments)
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      dispatch({type:ACTIONS.SET_INTERVIEW, appointments, days})
    })
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(appointments)  
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      dispatch({type:ACTIONS.SET_INTERVIEW, appointments, days})
    })
  }
  return {state, setDay, bookInterview, cancelInterview}
}

export default useApplicationData;