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
        <button onClick={props.closeOrderDetails}>DONE</button>
        <div><strong>CHANGE ORDER STATUS</strong></div>
        {props.orderid.orderstatus === "OPEN" ? (
          <button
            onClick={() => {
              props.changeOrderidState(props.orderid, "CLOSED");
            }}
            className="btn btn-primary btn-lg btn-default btn-lock"
          >
            CLOSE
          </button>
        ) : (
          <button
            onClick={() => {
              props.changeOrderidState(props.orderid, "OPEN");
            }}
            className="btn btn-primary btn-lg btn-default btn-lock"
          >
            REOPEN
          </button>
        )}
      </div>
    </Tux>
  );
};

export default orderDetails;
