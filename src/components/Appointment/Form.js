import React, {useState} from 'react';
import Button from '../Button';
import InterviewerList from '../InterviewerList';


const Form = props => {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  const validate = () => {
    if(error) setError("");

    if(name === "") {
      setError(prev => `${prev}\nStudent name cannot be blank`);
      return;
    };

    if(interviewer === null) {
      setError(prev => `${prev}\nPlease select an interviewer`);
      return;
    };

    props.onSave(name, interviewer);
  };
  
  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        data-testid="student-name-input"
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      />
    <section className="appointment__validation">{error}</section>
    </form>
    <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={cancel} danger>Cancel</Button>
      <Button onClick={validate} confirm>Save</Button>
    </section>
  </section>
</main>
  );
};

export default Form;