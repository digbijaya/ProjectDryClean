import React from "react";
import Tux from "../../../hoc/Tux";
import classes from "./Confirmation.css";
import Backdrop from "../../../ui/Backdrop/Backdrop";

const confirmation = props => {
  return (
    <Tux>
      <Backdrop show={props.show} />
      <div
        className={classes.Confirmation}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0"
        }}
      >
        <h1>GOING TO DISPLAY DETAILS HERE</h1>
      </div>
    </Tux>
  );
};
export default confirmation;
