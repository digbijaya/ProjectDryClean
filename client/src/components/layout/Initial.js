import React, { Component } from "react";
import { Link } from "react-router-dom";

class Initial extends Component {
  render() {
    return (
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
  }
}

export default Initial;
