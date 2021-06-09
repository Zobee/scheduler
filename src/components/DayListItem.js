import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";

const formatSpots = (spots) => {
  let msg = `spot${spots !== 1 ? 's' : ""} remaining`;
  return spots > 0 ? `${spots} ${msg}` : `no ${msg}`
}

export default function DayListItem(props) {
  const {name, spots, setDay, selected} = props;
  const dayListItemClass = classnames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  })
  return (
    <li className={dayListItemClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}