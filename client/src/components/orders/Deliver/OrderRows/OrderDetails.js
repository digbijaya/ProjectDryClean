import React, { Component } from "react";
import Tux from "../../../hoc/Tux";
import Backdrop from "../../../ui/Backdrop/Backdrop";
class OrderDetails extends Component {
  constructor() {
    super();
  }

  render() {
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
          <div>Length- {this.props.orderdetail.clothes.length}</div>
        </div>
      </Tux>
    );
  }
}

export default OrderDetails;
