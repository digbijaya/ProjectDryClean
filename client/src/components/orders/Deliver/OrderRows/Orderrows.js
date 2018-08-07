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
    var orderids = this.props.orderids;
    return (
      <Tux>
        {Object.keys(orderids).map(order => {
          <div>Status- {order.orderstatus}</div>;
        })}
      </Tux>
    );
  }
}

export default Orderrows;
