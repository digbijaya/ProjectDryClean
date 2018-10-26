import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { logoutUser } from "../../../actions/authActions";

class NavigationItems extends Component {
  onLogoutClick(event) {
    event.preventDefault();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>
          HOME
        </NavigationItem>
        <NavigationItem link="/orderreceive" exact>
          RECEIVE
        </NavigationItem>
        <NavigationItem link="/orderdeliver" exact>
          DELIVER
        </NavigationItem>
        <NavigationItem link="/reports" exact>
          REPORTS
        </NavigationItem>
        <img
          src=""
          alt={user ? user.name : ""}
          style={{ width: "25px", marginRight: "5px" }}
        />
        <div onClick={this.onLogoutClick.bind(this)}>
          <NavigationItem link="/login" exact>
            LOGOUT
          </NavigationItem>
        </div>
      </ul>
    );
    const guestLinks = (
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/login" exact>
          LOGIN
        </NavigationItem>
      </ul>
    );
    return <div>{isAuthenticated ? authLinks : guestLinks}</div>;
  }
}
const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      HOME
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
