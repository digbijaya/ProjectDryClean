import React from "react";
import classes from "./Navbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = props => (
  <header className={classes.Navbar}>
    <DrawerToggle clicked={props.openSideDrawer} />
    {/* <Button clicked={props.openSideDrawer} btnType="Success">
      MENU
    </Button> */}
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
