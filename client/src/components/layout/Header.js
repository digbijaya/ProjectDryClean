import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">
              Dryclean
            </Link>
          </div>
          <div>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Signup</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
