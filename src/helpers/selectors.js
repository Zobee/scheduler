export function getAppointmentsForDay(state, day){
  const dayOf = state.days.find(scheduleDay => scheduleDay.name === day)
  const apptsForDay = dayOf ? dayOf.appointments : []
  return apptsForDay.map(appt => state.appointments[appt]);
}