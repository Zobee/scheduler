import React from 'react'
import DayListItem from './DayListItem'

const DayList = props => {

  return (
  <ul>
    {Array.isArray(props.days) && props.days.map(day => <DayListItem 
      key={day.id}
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={props.setDay}  />
    )}
  </ul>
  );
}

export default DayList