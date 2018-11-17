import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../Navigation/NavigationItems";
import Backdrop from "../../ui/Backdrop/Backdrop";
import Tux from "../../hoc/Tux";
import classes from "./SideDrawer.css";
const sideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.status) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Tux>
      <Backdrop show={props.status} clicked={props.close} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>

        <nav>
          <NavigationItems closebackdrop={props.close} />
        </nav>
      </div>
    </Tux>
  );
};

export default sideDrawer;
