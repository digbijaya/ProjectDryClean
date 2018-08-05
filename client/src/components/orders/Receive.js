import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { receiveorder, commitToDb } from "../../actions/receiveActions";
import Tux from "../hoc/Tux";
import Modal from "../ui/Modal/Modal";
import Confirmation from "./Receive/ConfirmationModal/Confirmation";
import Orderrow from "./Receive/OrderRow/OrderRow";

class Receive extends Component {
  constructor() {
    super();

    this.state = {
      user: { username: "", mobilenumber: "" },
      cloth: { clothetype: "", clothequality: "" },
      order: [],
      orderstatus: "OPEN",
      errors: {},
      orderConfirmation: false
    };
    this.onChange = this.onChange.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
    // this.addOrderRow = this.addOrderRow.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addClothToOrder = this.addClothToOrder.bind(this);
    this.removeClothFromOrder = this.removeClothFromOrder.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.onConfirmationCancel = this.onConfirmationCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onUserChange(event) {
    let user = this.state.user;
    user[event.target.name] = event.target.value;
    this.setState({ user });
  }

  updateValue(event) {
    let cloth = this.state.cloth;
    cloth[event.category] = event.value;
    this.setState({ cloth });
  }

  /* addOrderRow() {
    console.log("CALLED");
    let prevId = this.state.orderrows.length;
    console.log("previd", prevId);
    const orderrows = this.state.orderrows.slice(0);
    orderrows.push({
      id: prevId + 1
    });
    this.setState({ orderrows });
  } */

  addClothToOrder(orderRows) {
    console.log("ORDERROWS", orderRows);
    const order = this.state.order.slice(0);

    orderRows.forEach(orders => {
      order.push({
        clothtype: orders.clothetype,
        quality: orders.clothequality,
        washtype: orders.washtype,
        color: orders.color,
        quantity: orders.quantity,
        price: orders.price
      });
    });
    console.log("ORDER", JSON.stringify(order));
    this.setState({ order, orderConfirmation: true }, () => {
      // this.onSubmit();
    });
  }

  removeClothFromOrder(event) {}

  onSubmit() {
    const newEntry = {
      user: this.state.user,
      order: this.state.order,
      orderstatus: this.state.orderstatus
    };
    console.log("NEW ENTRY", newEntry);
    this.props.commitToDb();
    console.log("COMMITTING SATTE", this.props.orderReceive.committing);
    this.props.receiveorder(newEntry, this.props.history);
    console.log("COMMITTING SATTE", this.props.orderReceive.committing);
  }

  onConfirmationCancel() {
    this.setState({ orderConfirmation: false });
  }
  render() {
    const { errors } = this.state;
    console.log("ORDERRECEIVE ORDER RES", this.props.orderReceive.order);
    return (
      <Tux>
        <Modal show={this.props.orderReceive.committing} />
        <Confirmation
          show={this.state.orderConfirmation}
          orders={this.state.order}
          user={this.state.user}
          submit={this.onSubmit}
          cancelConfirmation={this.onConfirmationCancel}
          orderdetails={this.props.orderReceive.order}
        />
        <div className="container">
          <input
            className={classnames("form-control", {
              "is-invalid": errors.mobilenumber
            })}
            type="text"
            name="mobilenumber"
            value={this.state.user["mobilenumber"]}
            onChange={this.onUserChange}
            placeholder="Customer mbole no."
          />
          {errors.mobilenumber && (
            <div className="invalid-feedback">{errors.mobilenumber} </div>
          )}
          <input
            className={classnames("form-control", {
              "is-invalid": errors.username
            })}
            type="text"
            name="username"
            value={this.state.user["username"]}
            onChange={this.onUserChange}
            placeholder="Customer Name"
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username} </div>
          )}
          <div className="row">
            <h1 style={{ textAlign: "center" }}>Add new order</h1>
            <div style={{ width: "30%", margin: "35px auto" }}>
              <Orderrow
                updateValue={this.updateValue}
                addItem={this.addClothToOrder}
                removeItem={event => {
                  this.removeClothFromOrder(event);
                }}
              />
              <Link to="/initial">Back</Link>
            </div>
          </div>
        </div>
      </Tux>
    );
  }
}

Receive.propTypes = {
  receiveorder: PropTypes.func.isRequired,
  orderReceive: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  orderReceive: state.orderReceive,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { receiveorder, commitToDb }
)(withRouter(Receive));
