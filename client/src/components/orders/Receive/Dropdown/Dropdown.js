import PropTypes from "prop-types";
import React, { Component } from "react";
import Select from "react-select";
import "./react-select.css?external";
const CLOTHECATEGORIES = require("../../../../data/clothecategories");

export default class ClotheOptionsDropdown extends Component {
  constructor() {
    super();
    this.state = {
      clotheType: "clothetype",
      // selectValue: "Saree",
      clearable: true,
      searchable: true,
      disabled: false
    };
    this.setNewValue = this.setNewValue.bind(this);
  }

  // getDefaultProps() {
  //   return {
  //     label: "ClotheType:",
  //     searchable: true
  //   };
  // }

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
    this.setState({ selectValue: event.value });
  }
  render() {
    var options = CLOTHECATEGORIES[this.props.type.toLowerCase()];
    return (
      <div className="section">
        <h3 className="section-heading">{this.props.type}</h3>
        <Select
          placeholder={this.props.type + "..."}
          id="clothetype-select"
          options={options}
          clearable={this.state.clearable}
          name="selectValue"
          value={this.state.selectValue}
          onChange={event => {
            this.setNewValue(event);
            this.props.updateValue(event);
          }}
          searchable={this.state.searchable}
        />
      </div>
    );
  }
}

ClotheOptionsDropdown.propTypes = {
  label: PropTypes.string,
  searchable: PropTypes.bool
};
