import React, { Component } from "react";
import Select from "react-select";
import Tux from "../hoc/Tux";
import "./react-select.css?external";
const SHOPNAMES = require("../../data/shopnames");

class Reports extends Component {
  constructor() {
    super();
    this.state = {
      clearable: true,
      searchable: true
    };
  }

  setNewValue = event => {
    this.setState({ selectvalue: event.value });
  };

  render() {
    var options = SHOPNAMES["shopnames"];
    return (
      <Tux>
        <div className="section" style={{ width: "30%", margin: "35px auto" }}>
          <Select
            placeholder="Shopname"
            id={"selected-shop"}
            options={options}
            clearable={this.state.clearable}
            disabled={this.state.disabled}
            value={this.state.selectvalue}
            searchable={this.state.searchable}
            onChange={event => {
              this.setNewValue(event);
            }}
          />
        </div>
      </Tux>
    );
  }
}

export default Reports;
