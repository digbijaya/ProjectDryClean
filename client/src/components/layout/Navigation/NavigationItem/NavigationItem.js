import React, { Component } from "react";
import classes from "./NavigationItem.css";
import { NavLink } from "react-router-dom";

/* class NavigationItem extends Component {
  render() {
    return (
      <li className={classes.NavigationItem}>
        <NavLink
          to={this.props.link}
          exact={this.props.exact}
          activeClassName={classes.active}
        >
          {this.props.children}
        </NavLink>
      </li>
    );
  }
} */
const navigationItem = props => (
  <li className={classes.NavigationItem}>
    <NavLink
      to={props.link}
      exact={props.exact}
      onClick={props.handleclick}
      /* activeClassName={classes.active} */
    >
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
