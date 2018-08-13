import React, { Component } from "react";
import Tux from "../../../hoc/Tux";
import OrderDetails from "./OrderDetails";
class Orderrows extends Component {
  constructor() {
    super();
    this.state = {
      showOrderDetails: false,
      orderid: {}
    };
    this.toggleStateToShowOrderdetails = this.toggleStateToShowOrderdetails.bind(
      this
    );
  }

  toggleStateToShowOrderdetails(orderid) {
    this.setState({ showOrderDetails: true, orderid });
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
              onClick={() => {
                this.toggleStateToShowOrderdetails(orderid);
              }}
            >
              Details
            </button>
            <hr />
          </div>
        ))}
        <OrderDetails
          show={this.state.showOrderDetails}
          fullOrder={fullorder}
          orderid={this.state.orderid}
          key={new Date().getTime()}
        />
      </Tux>
    );
  }
}

export default Orderrows;
