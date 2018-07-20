import React from "react";
import Tux from "../../hoc/Tux";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.css";
const modal = props => (
  <Tux>
    <Backdrop show={props.show} />
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0"
      }}
    >
      <div>COMMITTING</div>
    </div>
  </Tux>
);

export default modal;
