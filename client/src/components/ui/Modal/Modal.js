import React from "react";
import Tux from "../../hoc/Tux";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.css";
import Spinner from "../../common/spinner";
const modal = props => (
  <Tux>
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0"
      }}
    >
      <Spinner />
    </div>
  </Tux>
);

export default modal;
