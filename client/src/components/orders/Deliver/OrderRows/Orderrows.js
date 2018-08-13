import React, { Component } from "react";
import Tux from "../../../hoc/Tux";
import OrderDetails from "./OrderDetails";
class Orderrows extends Component {
  constructor() {
    super();
    this.toggleStateToShowOrderdetails = this.toggleStateToShowOrderdetails.bind(
      this
    );
  }

  toggleStateToShowOrderdetails(orderid, showOrderDetails) {
    this.props.populateSelectedOrderid(orderid, showOrderDetails);
  }

  render() {
    const fullUser = this.props.userentry;
    const orderids = this.props.userentry.orderids;
    return (
      <Tux>
        {orderids.map(orderid => (
          <div>
            <div>Status- {orderid.orderstatus}</div>
            <div>id- {orderid._id}</div>
            <button
              className="btn btn-primary btn-lg btn-default btn-lock"
              onClick={event => {
                this.toggleStateToShowOrderdetails(orderid, true);
              }}
            >
              Details
            </button>
            <hr />
          </div>
        ))}
      </Tux>
    );
  }
}

export default Orderrows;
