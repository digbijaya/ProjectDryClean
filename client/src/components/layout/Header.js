import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Logo from "./Logo/Logo";
import DrawerToggle from "./SideDrawer/DrawerToggle/DrawerToggle";
import SideDrawer from "./SideDrawer/SideDrawer";
import NavigationItems from "./Navigation/NavigationItems";
import classes from "./Header.css";
import Tux from "../hoc/Tux";

class Header extends Component {
  state = {
    showSideDrawer: false
  };
  sideDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: true });
  };
  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <Tux>
        <header className={classes.Landing}>
          <DrawerToggle clicked={this.sideDrawerOpenHandler} />

          <Logo />

          <nav className={classes.DesktopOnly}>
            <NavigationItems />
          </nav>
        </header>
        <SideDrawer
          close={this.sideDrawerCloseHandler}
          status={this.state.showSideDrawer}
        />
      </Tux>
    );
  }
}
Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
