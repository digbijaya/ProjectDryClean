import React, { Component } from "react";
import Tux from "../../../hoc/Tux";
import OrderDetails from "./OrderDetails";
class Orderrows extends Component {
  constructor() {
    super();
    this.state = {
      showOrderDetails: false
    };
    this.toggleStateToShowOrderdetails = this.toggleStateToShowOrderdetails.bind(
      this
    );
  }

  toggleStateToShowOrderdetails() {
    this.setState({ showOrderDetails: true });
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
              onClick={this.toggleStateToShowOrderdetails}
            >
              Details
            </button>
            <OrderDetails
              show={this.state.showOrderDetails}
              fullOrder={fullorder}
              orderid={orderid}
              key={new Date().getTime()}
            />
            <hr />
          </div>
        ))}
      </Tux>
    );
  }
}

export default Orderrows;
