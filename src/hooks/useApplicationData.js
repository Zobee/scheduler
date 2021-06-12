import {useState, useEffect} from 'react';
import axios from 'axios'
import {getAppointmentsForDay} from '../helpers/selectors'
const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then(all => {
      setState(prev => ({...prev, days : all[0].data, appointments : all[1].data, interviewers : all[2].data}))
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

  const setDay = day => setState({ ...state, day });

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
      setState(prev => ({...prev, appointments, days}))
    })
    //.then(() => console.log(state))
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
      setState(prev =>({...prev, appointments, days}))
      //console.log(state)
    })
    //.then(() => console.log(state))
  }
  return {state, setDay, bookInterview, cancelInterview}
}

export default useApplicationData;