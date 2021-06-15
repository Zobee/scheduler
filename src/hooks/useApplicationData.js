import {useEffect, useReducer} from 'react';
import axios from 'axios'

const ACTIONS = {
  SET_DAY: "SET_DAY",
  SET_APPLICATION_DATA: "SET_APPLICATION_DATA",
  SET_INTERVIEW: "SET_INTERVIEW"
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_DAY:
      return {...state, day: action.day}
    case ACTIONS.SET_APPLICATION_DATA:
      return {...state, days : action.all[0].data, appointments : action.all[1].data, interviewers : action.all[2].data}
    case ACTIONS.SET_INTERVIEW: {
      return {...state, appointments: action.appointments, days: action.days}
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}


const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {day: "Monday", days: [], appointments: {}, interviewers: {}})

  useEffect(() => {
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
    //Get current day from state
    const currDay = {...state.days.find(scheduleDay => scheduleDay.name === state.day)}
    //update spots based on how many appointments for that day are 'null'
    currDay.spots = getSpots(currDay, appointments)
    //Create the new state.days object
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