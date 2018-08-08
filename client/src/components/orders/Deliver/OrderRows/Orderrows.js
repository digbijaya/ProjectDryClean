import React, { Component } from "react";
import Tux from "../../../hoc/Tux";
import Orderrow from "./Orderrow";
class Orderrows extends Component {
  constructor() {
    super();
    this.state = {
      gen: false
    };
  }

  render() {
    const orderids = this.props.orderids;
    return (
      <Tux>
        {orderids.map(order => (
          <div>
            <div>Status- {order.orderstatus}</div>
            <div>id- {order._id}</div>
            <hr />
          </div>
        ))}
      </Tux>
    );
  }
}

export default Orderrows;
