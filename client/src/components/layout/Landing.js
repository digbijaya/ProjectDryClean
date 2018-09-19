import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";

class Landing extends Component {
  onLogoutClick(event) {
    event.preventDefault();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <div className="container">
        <header className="jumbotron">
          <div className="container">
            <h1>Collect/Deliver Units</h1>
            <p>
              <Link className="btn btn-primary btn-large" to="/orderreceive">
                Collect
              </Link>
            </p>
            <p>
              <Link className="btn btn-primary btn-large" to="/orderdeliver">
                Deliver
              </Link>
            </p>
            <p>
              <Link className="btn btn-primary btn-large" to="/reports">
                Reports
              </Link>
            </p>
            <p>
              <a
                href=""
                onClick={this.onLogoutClick.bind(this)}
                className="btn btn-primary btn-large"
              >
                Logout
              </a>
            </p>
            <button
              id="collect"
              className="btn btn-primary btn-lg btn-default btn-lock"
            >
              Baner
            </button>
          </div>
        </header>
      </div>
    );
    const guestLinks = (
      <div className="container">
        <header className="jumbotron">
          <div className="container">
            <h1>Login</h1>
            <p>
              <Link className="btn btn-primary btn-large" to="/login">
                Login
              </Link>
            </p>
          </div>
        </header>
      </div>
    );

    return <div>{isAuthenticated ? authLinks : guestLinks}</div>;
  }
}

Landing.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Landing);
