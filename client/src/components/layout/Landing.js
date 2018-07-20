import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <p>Welcome to the dryclean</p>
        <Link to="/initial">List Transactions Options</Link>
      </div>
    );
  }
}

export default Landing;
