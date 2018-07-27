import PropTypes from "prop-types";
import React, { Component } from "react";
import Select from "react-select";
import "./react-select.css?external";
const CLOTHECATEGORIES = require("../../../../data/clothecategories");

export default class ClotheOptionsDropdown extends Component {
  constructor() {
    super();
    this.state = {
      // selectValue: "Saree",
      clearable: true,
      searchable: true
    };
    this.setNewValue = this.setNewValue.bind(this);
    this.clearValue = this.clearValue.bind(this);
  }

  // getInitialState() {
  //   return {
  //     disabled: false,
  //     searchable: this.props.searchable,
  //     selectValue: "Saree",
  //     clearable: true
  //   };
  // }
  clearValue(event) {
    this.select.setInputValue("");
  }

  // switchClotheType(event) {
  //   var newClotheType = event.target.value;
  //   this.setState({
  //     clotheType: newClotheType,
  //     selectValue: null
  //   });
  // }

  setNewValue(event) {
    if (event) {
      this.setState({ selectValue: event.value });
      this.props.updateValue(event);
    } else {
      this.setState({ selectValue: "" });
      this.props.cleared();
    }
  }
  render() {
    var options = CLOTHECATEGORIES[this.props.type.toLowerCase()];
    return (
      <div className="section">
        <Select
          placeholder={this.props.type + "..."}
          id="clothetype-select"
          options={options}
          clearable={this.state.clearable}
          disabled={this.props.disabled}
          name="selectValue"
          value={this.state.selectValue}
          onChange={event => {
            this.setNewValue(event);
          }}
          searchable={this.state.searchable}
        />
      </div>
    );
  }
}

ClotheOptionsDropdown.propTypes = {
  searchable: PropTypes.bool
};
