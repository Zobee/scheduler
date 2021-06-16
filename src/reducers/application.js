export const ACTIONS = {
  SET_DAY: "SET_DAY",
  SET_APPLICATION_DATA: "SET_APPLICATION_DATA",
  SET_INTERVIEW: "SET_INTERVIEW"
}

export default function reducer(state, action) {
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