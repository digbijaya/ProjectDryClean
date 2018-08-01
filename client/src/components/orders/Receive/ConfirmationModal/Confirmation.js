import React from "react";
import Tux from "../../../hoc/Tux";
import classes from "./Confirmation.css";
import Backdrop from "../../../ui/Backdrop/Backdrop";
import Clothelist from "./Clothelist";

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
        <Clothelist clothes={props.orders} user={props.user} />
        <button onClick={props.submit}>Submit</button>
      </div>
    </Tux>
  );
};
export default confirmation;
