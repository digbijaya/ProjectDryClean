import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { receiveorder, commitToDb } from "../../actions/receiveActions";
import Tux from "../hoc/Tux";
import Modal from "../ui/Modal/Modal";
import Clothlist from "./Receive/ClotheList";
import ClotheOptionsDropdown from "./Receive/Dropdown/Dropdown";

class Receive extends Component {
  constructor() {
    super();

    this.state = {
      user: { username: "", mobilenumber: "" },
      cloth: { clothetype: "", clothequality: "" },
      order: [],
      errors: {},
      clothetype: "Clothetype",
      clothequality: "Clothequality"
    };
    this.onChange = this.onChange.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
    this.onClothChange = this.onClothChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addClothToOrder = this.addClothToOrder.bind(this);
    this.updateValue = this.updateValue.bind(this);
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

  onClothChange(event) {
    let cloth = this.state.cloth;
    cloth[event.target.name] = event.target.value;
    this.setState({ cloth });
  }
  updateValue(event) {
    let cloth = this.state.cloth;
    cloth[event.category] = event.value;
    this.setState({ cloth });
  }

  addClothToOrder(event) {
    event.preventDefault();
    const order = this.state.order.slice(0);

    order.push({
      clothname: this.state.cloth["clothetype"],
      description: this.state.cloth["clothequality"]
    });
    this.setState({ order });
    console.log("ORDER", JSON.stringify(order));
  }

  onSubmit(event) {
    event.preventDefault();
    const newEntry = {
      user: this.state.user,
      order: this.state.order
    };
    this.props.commitToDb();
    console.log("COMMITTING SATTE", this.props.orderReceive.committing);
    this.props.receiveorder(newEntry, this.props.history);
    console.log("COMMITTING SATTE", this.props.orderReceive.committing);
  }
  render() {
    const { errors } = this.state;

    return (
      <Tux>
        <Modal show={this.props.orderReceive.committing} />
        <ClotheOptionsDropdown
          updateValue={this.updateValue}
          type={this.state.clothetype}
        />
        <ClotheOptionsDropdown
          updateValue={this.updateValue}
          type={this.state.clothequality}
        />
        <div className="container">
          <div className="row">
            <h1 style={{ textAlign: "center" }}>Add new order</h1>
            <div style={{ width: "30%", margin: "35px auto" }}>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    className={classnames("form-control", {
                      "is-invalid": errors.clothname
                    })}
                    type="text"
                    name="clothname"
                    value={this.state.cloth["clothname"]}
                    onChange={this.onClothChange}
                    placeholder="CLoth Type"
                  />
                  {errors.clothname && (
                    <div className="invalid-feedback">{errors.clothname} </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    className={classnames("form-control", {
                      "is-invalid": errors.description
                    })}
                    type="text"
                    name="description"
                    value={this.state.cloth["description"]}
                    onChange={this.onClothChange}
                    placeholder="description"
                  />
                  {errors.description && (
                    <div className="invalid-feedback">
                      {errors.description}{" "}
                    </div>
                  )}
                </div>
                <div className="form-group">
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
                </div>
                <div className="form-group">
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
                    <div className="invalid-feedback">
                      {errors.mobilenumber}{" "}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-lg btn-default btn-lock">
                    Submit
                  </button>
                </div>
              </form>
              <button
                className="btn btn-primary btn-lg btn-default btn-lock"
                onClick={this.addClothToOrder}
              >
                Add
              </button>
              <Link to="/initial">Back</Link>
            </div>
          </div>
        </div>
        <Clothlist
          clothes={this.state.order}
          orderid={this.props.orderReceive.order}
        />
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
