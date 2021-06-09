export function getAppointmentsForDay(state, day){
  //console.log(state.days.filter(scheduleDay => scheduleDay.name === day))
  const dayOf = state.days.find(scheduleDay => scheduleDay.name === day)
  const apptsForDay = dayOf ? dayOf.appointments : []
  return apptsForDay.map(appt => state.appointments[appt]);
}