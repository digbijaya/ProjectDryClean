import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { logoutUser } from "../../../actions/authActions";

class NavigationItems extends Component {
  constructor(props) {
    super();
  }
  onLogoutClick(event) {
    event.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/" handleclick={this.props.closebackdrop} exact>
          <strong>HOME</strong>
        </NavigationItem>
        <NavigationItem
          link="/orderreceive"
          handleclick={this.props.closebackdrop}
          exact
        >
          <strong>RECEIVE</strong>
        </NavigationItem>
        <NavigationItem
          link="/orderdeliver"
          handleclick={this.props.closebackdrop}
          exact
        >
          <strong>DELIVER</strong>
        </NavigationItem>
        <NavigationItem
          link="/reports"
          handleclick={this.props.closebackdrop}
          exact
        >
          <strong>REPORTS</strong>
        </NavigationItem>
        <div onClick={this.onLogoutClick.bind(this)}>
          <NavigationItem
            link="/login"
            handleclick={this.props.closebackdrop}
            exact
          >
            <strong>LOGOUT</strong>
          </NavigationItem>
        </div>
      </ul>
    );
    const guestLinks = (
      <ul className={classes.NavigationItems}>
        <NavigationItem
          link="/login"
          handleclick={this.props.closebackdrop}
          exact
        >
          <strong>LOGIN</strong>
        </NavigationItem>
      </ul>
    );
    return <div>{isAuthenticated ? authLinks : guestLinks}</div>;
  }
}
const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      <strong>HOME</strong>
    </NavigationItem>
    <NavigationItem link="/orderreceive">Place Order</NavigationItem>
  </ul>
);

NavigationItems.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(NavigationItems);
