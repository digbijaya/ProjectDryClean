import React from "react";
import Tux from "../../../hoc/Tux";
import Backdrop from "../../../ui/Backdrop/Backdrop";
import classes from "./OrderDetails.css";
import Clothelist from "./Clothelist";
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
        <Clothelist fullUser={props.fullUser} orderid={props.orderid} />
      </div>
    </Tux>
  );
};

export default orderDetails;
