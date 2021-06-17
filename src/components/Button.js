import React from "react";
import "components/Button.scss";
import classnames from "classnames";

export default function Button(props) {
   let btnClass = classnames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   })

   return <button 
      onClick={props.onClick} 
      disabled={props.disabled} 
      className={btnClass}>
         {props.children}
   </button>;
};