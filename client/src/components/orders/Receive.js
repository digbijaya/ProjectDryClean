import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import classnames from "classnames";
import validator from "validator";
import { receiveorder, commitToDb } from "../../actions/receiveActions";
import Tux from "../hoc/Tux";
import Modal from "../ui/Modal/Modal";
import Confirmation from "./Receive/ConfirmationModal/Confirmation";
import Orderrow from "./Receive/OrderRow/OrderRow";
import FormInlineMessage from "../common/FormInlineMessage";

class Receive extends Component {
  constructor() {
    super();

    this.state = {
      user: { username: "", mobilenumber: "" },
      cloth: { clothetype: "", clothequality: "" },
      order: [],
      orderstatus: "OPEN",
      totalPrice: 0,
      errors: {},
      orderConfirmation: false,
      expecteddeliverydate: moment()
        .clone()
        .add("day", 7)
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
    // this.checkUserFields();
    this.setState({ user });
  }

  updateValue(event) {
    let cloth = this.state.cloth;
    cloth[event.category] = event.value;
    this.setState({ cloth });
  }

  updateDeliveryDate = date => {
    this.setState({ expecteddeliverydate: date });
  };

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
    let totalprice = 0;
    orderRows.forEach(orders => {
      totalprice = totalprice + Math.trunc(orders.price);
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
    const userfields_validation = this.checkUserFields();
    console.log("**************************** ", userfields_validation);
    userfields_validation
      ? this.setState({ order, totalprice, orderConfirmation: true }, () => {
          // this.onSubmit();
        })
      : null;
  }

  validate(data) {
    const errors = {};
    if (!data.username) errors.username = "Username can't be blank";
    if (!data.mobilenumber)
      errors.mobilenumber = "Mobile number can't be blank";
    return errors;
    // if (price <= 0) errors.price = "too cheap";
  }

  checkUserFields = () => {
    const mobile = this.state.user["mobilenumber"];
    const user = this.state.user["username"];
    const errors = {};
    let flag = true;
    if (!validator.isLength(user, { min: 3, max: 50 })) {
      errors.username =
        "User name should be between 3 and 50 characters. Boundaries inclusive";
      flag = false;
    }
    if (validator.isEmpty(user)) {
      errors.username = "User name is required";
      flag = false;
    }
    if (!validator.isLength(mobile, { min: 3, max: 10 })) {
      errors.mobilenumber = "Mobile number need to be atleast 10 digits";
      flag = false;
    }
    if (validator.isEmpty(mobile)) {
      errors.mobilenumber = "Mobile number is required";
      flag = false;
    }
    flag ? "" : this.setState({ errors });
    return flag;
  };

  removeClothFromOrder(event) {}

  onSubmit() {
    const newEntry = {
      user: this.state.user,
      order: this.state.order,
      orderstatus: this.state.orderstatus,
      totalprice: this.state.totalprice,
      orderplaceddate: new Date(),
      expecteddeliverydate: this.state.expecteddeliverydate,
      loggedinshop: this.props.auth.user.name
    };
    console.log("NEW ENTRY", newEntry);
    this.props.commitToDb();
    console.log("COMMITTING SATTE", this.props.orderReceive.committing);
    this.props.receiveorder(newEntry, this.props.history);
    console.log("COMMITTING SATTE", this.props.orderReceive.committing);

    // const errors = this.validate(this.state.user);
    // this.setState({ errors });
  }

  onConfirmationCancel() {
    this.setState({ orderConfirmation: false });
  }
  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;
    console.log("ORDERRECEIVE ORDER RES", this.props.orderReceive.order);
    return (
      <Tux>
        <Modal show={this.props.orderReceive.committing} />
        <Confirmation
          show={this.state.orderConfirmation}
          orders={this.state.order}
          totalprice={this.state.totalprice}
          user={this.state.user}
          submit={this.onSubmit}
          cancelConfirmation={this.onConfirmationCancel}
          orderdetails={this.props.orderReceive.order}
          errors={errors}
          expecteddeliverydate={this.state.expecteddeliverydate}
          updateDeliveryDate={this.updateDeliveryDate}
        />
        <div className={"container"}>
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
          {/* <FormInlineMessage content={errors.mobilenumber} type="error" /> */}
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
                checkUserFields={this.checkUserFields}
                removeItem={event => {
                  this.removeClothFromOrder(event);
                }}
              />
              <Link to="/">Back</Link>
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
  auth: PropTypes.object,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  orderReceive: state.orderReceive,
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { receiveorder, commitToDb }
)(withRouter(Receive));
