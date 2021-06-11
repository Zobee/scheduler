export function getAppointmentsForDay(state, day){
  const dayOf = state.days.find(scheduleDay => scheduleDay.name === day)
  const apptsForDay = dayOf ? dayOf.appointments : []
  return apptsForDay.map(appt => state.appointments[appt]);
}

export function getInterview(state, interview){
  if(!interview) return null;
  const interviewerId = interview.interviewer
  const interviewer = state.interviewers[interviewerId]
  return {...interview, interviewer}
}

export function getInterviewersForDay(state, day){
  const dayOf = state.days.find(scheduleDay => scheduleDay.name === day)
  const interviewersForDay = dayOf ? dayOf.interviewers : []
  return interviewersForDay.map(interviewer => state.interviewers[interviewer]);
}