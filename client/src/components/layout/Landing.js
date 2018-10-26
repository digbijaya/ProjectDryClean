import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";
import SideDrawer from "./SideDrawer/SideDrawer";
import NavigationItems from "./Navigation/NavigationItems";
import Logo from "./Logo/Logo";
import DrawerToggle from "./SideDrawer/DrawerToggle/DrawerToggle";
import Tux from "../hoc/Tux";

class Landing extends Component {
  render() {
    return (
      <Tux>
        <div>HOME</div>
      </Tux>
    );
  }
}

export default Landing;
