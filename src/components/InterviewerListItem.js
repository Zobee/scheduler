import React from 'react'
import "components/interviewerListItem.scss";
import classnames from "classnames";

const InterviewerListItem = props => {
  const {name, avatar, selected, onChange} = props;
  const liClass = classnames("interviewers__item", {
    "interviewers__item--selected": selected
  })
  return <li className={liClass} onClick={onChange}>
  <img
    className="interviewers__item-image"
    src={avatar}
    alt={name}
  />
  {selected && name}
</li>
}
export default InterviewerListItem;