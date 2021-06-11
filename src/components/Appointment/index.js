import React from 'react';
import "components/Appointment/styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Confirm from './Confirm';
import Error from './Error';
import Status from './Status';
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const UPDATE = "UPDATE";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const Appointment = props => {
  const {id, time, interview, interviewers, bookInterview, cancelInterview} = props;
  const {mode, transition, back} = useVisualMode(
    interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition("SAVING")

    bookInterview(id, interview)
    .then(() => transition("SHOW"))
    .catch(transition("ERROR_SAVE", true))
  }

  const update = () => {
    transition("UPDATE")
  }

  const confirmDelete = () => {
    transition("DELETING", true)
    cancelInterview(id)
    .then(() => transition("EMPTY"))
    .catch(transition("ERROR_DELETE", true))
  }

  const deleteAppt = () => {
    transition("CONFIRM")
  }

  return (
    
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
      {mode === SHOW && (
      <Show
      student={interview.student}
      interviewer={interview.interviewer}
      onDelete={deleteAppt}
      onEdit={update} 
      />
      )}
      {mode === CREATE && <Form 
      onSave={save} 
      onCancel={back} 
      interviewers={interviewers}/>}
      {mode === UPDATE && <Form 
      onSave={save} 
      onCancel={back} 
      interviewers={interviewers} 
      interviewer={interview.interviewer}
      name={interview.student} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && <Confirm message={"Are you sure?"} onConfirm={confirmDelete} onCancel={back}/>}
      {mode === ERROR_SAVE && <Error message={"Error while saving interview"} onClose={back}/>}
      {mode === ERROR_DELETE && <Error message={"Error while deleting interview"} onClose={back}/>}
  </article>
 ) 
}

export default Appointment