import React from "react";
import Tux from "../../../hoc/Tux";
import Backdrop from "../../../ui/Backdrop/Backdrop";
import classes from "./OrderDetails.css";
const orderDetails = props => {
  return (
    <Tux>
      <Backdrop show={props.show} />
      <div
        className={classes.OrderDetails}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0"
        }}
      >
        <div>Length- {props.orderid.clothes.length}</div>
      </div>
    </Tux>
  );
};

export default orderDetails;
