import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { deliverorder, clearOrders } from "../../actions/deliverActions";
import Spinner from "../common/spinner";

class Deliver extends Component {
  constructor() {
    super();
    this.state = {
      user: { mobilenumber: "" },
      errors: {}
    };
    this.onUserChange = this.onUserChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onSubmit(event) {
    event.preventDefault();
    const searchUser = {
      mobilenumber: this.state.user["mobilenumber"]
    };
    const newSearch = {
      user: searchUser
    };
    this.props.deliverorder(newSearch);
  }

  renderList = orders => (
    <div className="container">
      <hr />
      <div style={{ width: "30%", margin: "35px auto" }}>
        <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Cloth Type</th>
                <th>Cloth Description</th>
              </tr>
            </thead>
            <tbody>
              {orders.orders.clothes.map(cloth => (
                <tr>
                  <td>{cloth.name}</td>
                  <td>{cloth.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  /*  renderList = orders => {
    if (orders.orders) {
      return orders.orders.clothes.map(cloth => {
        return (
          <div className="container">
            <hr />
            <div style={{ width: "30%", margin: "35px auto" }}>
              <div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Cloth Type</th>
                      <th>Cloth Descripton</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{cloth.name}</td>
                      <td>{cloth.description} </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      });
    }
  }; */
  render() {
    const { errors } = this.state;
    return (
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
          <div>
            {this.props.orders.orders
              ? this.renderList(this.props.orders)
              : null}
          </div>
        </div>
      </div>
    );
  }
}

Deliver.propTypes = {
  deliverorder: PropTypes.func.isRequired,
  orders: PropTypes.object,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  orders: state.orderDeliver,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { deliverorder, clearOrders }
)(withRouter(Deliver));
