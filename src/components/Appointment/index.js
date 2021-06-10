import React from 'react';
import "components/Appointment/styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
let currMode = "";
const Appointment = props => {
  const {time, interview} = props;
  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    
    <article className="appointment">
      <Header time={time}/>
      {/*interview ? <Show student={interview.student} interviewer={interview.interviewer} /> : <Empty />*/}
    </article>
 ) 
}

export default Appointment