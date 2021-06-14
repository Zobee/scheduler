import React from 'react';
import InterviewerListItem from './InterviewerListItem'
import PropTypes from 'prop-types'
import "components/InterviewerList.scss";

const InterviewerList = props => {
  const {interviewers, value, onChange} = props;
  const isSelected = id => id === value;
  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      {interviewers.map(interviewer => <InterviewerListItem 
      key={interviewer.id} 
      onChange={(e) => onChange(interviewer.id)} 
      selected={isSelected(interviewer.id)}
      {...interviewer}/>)}
    </ul>
  </section>)
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}

export default InterviewerList;