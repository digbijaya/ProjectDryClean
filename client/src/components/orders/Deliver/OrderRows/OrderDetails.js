import React, { Component } from "react";
import Tux from "../../../hoc/Tux";
import Backdrop from "../../../ui/Backdrop/Backdrop";
import classes from "./OrderDetails.css";
class OrderDetails extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Tux>
        <Backdrop show={this.props.show} />
        <div
          className={classes.OrderDetails}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          <div>Length- {this.props.orderid.clothes.length}</div>
        </div>
      </Tux>
    );
  }
}

export default OrderDetails;
