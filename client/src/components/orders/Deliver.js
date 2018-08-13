import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { deliverorder, clearOrders } from "../../actions/deliverActions";
import Orderrows from "./Deliver/OrderRows/Orderrows";
import OrderDetails from "./Deliver/OrderRows/OrderDetails";
import Modal from "../ui/Modal/Modal";
import Backdrop from "../ui/Backdrop/Backdrop";
import Tux from "../hoc/Tux";

class Deliver extends Component {
  constructor() {
    super();
    this.state = {
      user: { mobilenumber: "" },
      errors: {},
      orderid: {},
      clothesinorderid: [],
      showOrderDetails: false
    };
    this.onUserChange = this.onUserChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.populateSelectedOrderid = this.populateSelectedOrderid.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onUserChange(event) {
    let user = this.state.user;
    user[event.target.name] = event.target.value;
    this.setState({ user });
  }

  clearOrdersStore = event => {
    event.preventDefault();
    this.props.clearOrders();
    this.props.history.push("/initial");
  };

  populateSelectedOrderid(orderid, showOrderDetails) {
    console.log("I AM HERE");
    this.setState({ showOrderDetails, orderid });
  }

  onSubmit(event) {
    console.log("I AM THERE");
    event.preventDefault();
    const searchUser = {
      mobilenumber: this.state.user["mobilenumber"]
    };
    const newSearch = {
      user: searchUser
    };
    this.props.deliverorder(newSearch);
  }

  render() {
    const { errors } = this.state;
    return (
      <Tux>
        <OrderDetails
          show={this.state.showOrderDetails}
          fullUser={this.props.userentry}
          orderid={this.state.orderid}
          key={new Date().getTime()}
        />
        <div className="container">
          <h1 style={{ textAlign: "center" }}>Deliver order</h1>
          <div style={{ width: "30%", margin: "35px auto" }}>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  className={classnames("form-control", {
                    "is-invalid": errors.mobilenumber
                  })}
                  type="text"
                  name="mobilenumber"
                  value={this.state.user["mobilenumber"]}
                  onChange={this.onUserChange}
                  placeholder="Customer cell no."
                />
                {errors.mobilenumber && (
                  <div className="invalid-feedback">{errors.mobilenumber} </div>
                )}
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-lg btn-default btn-lock">
                  Submit
                </button>
              </div>
            </form>
            <a onClick={this.clearOrdersStore.bind(this)}>Back</a>
            {/* <Link to="/initial" onClick={this.handleClick.bind(this)}>
            Back
          </Link> */}
            {/*<Userdetails username={this.props.order.username}
            mobilenumber={this.props.order.mobilenumber}/>*/}
            <Backdrop show={this.props.fetchstatus} />
            <Modal show={this.props.fetchstatus} />
            <div>
              {this.props.userentry ? (
                <Orderrows
                  userentry={this.props.userentry}
                  populateSelectedOrderid={this.populateSelectedOrderid}
                />
              ) : null}
            </div>
          </div>
        </div>
      </Tux>
    );
  }
}

Deliver.propTypes = {
  deliverorder: PropTypes.func.isRequired,
  userentry: PropTypes.object,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userentry: state.orderDeliver.userentry,
  fetchstatus: state.orderDeliver.loading,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { deliverorder, clearOrders }
)(withRouter(Deliver));
