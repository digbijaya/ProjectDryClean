import React, { Component } from "react";
import Tux from "../../../hoc/Tux";
import OrderDetails from "./OrderDetails";
import Modal from "../../../ui/Modal/Modal";
import Backdrop from "../../../ui/Backdrop/Backdrop";
class Orderrows extends Component {
  constructor() {
    super();
    this.state = {
      showOrderDetails: false
    };
  }

  render() {
    const fullorder = this.props.orders;
    const orderids = this.props.orders.orderids;
    return (
      <Tux>
        {orderids.map(orderid => (
          <div>
            <div>Status- {orderid.orderstatus}</div>
            <div>id- {orderid._id}</div>
            <button
              className="btn btn-primary btn-lg btn-default btn-lock"
              onClick={this.setState({ showOrderDetails: true })}
            >
              Details
            </button>
            <OrderDetails
              show={this.state.showOrderDetails}
              fullOrder={fullorder}
              orderid={orderid}
            />
            <hr />
          </div>
        ))}
      </Tux>
    );
  }
}

export default Orderrows;
