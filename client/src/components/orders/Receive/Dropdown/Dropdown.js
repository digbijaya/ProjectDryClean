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
      searchable: true,
      errors: {}
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
    const errors = {};
    if (event) {
      errors.blankfieldmessage = null;
      this.setState({ selectValue: event.value, errors });
      this.props.updateValue(event);
    } else {
      errors.blankfieldmessage = "Can't be empty";
      this.setState({ selectValue: "", errors });
      this.props.cleared();
    }
  }
  render() {
    var options = CLOTHECATEGORIES[this.props.type.toLowerCase()];
    const { errors } = this.state;
    return (


      <div className="section btn dropdown form-group col">
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
        {errors.blankfieldmessage && (
          <div className="alert alert-danger">{errors.blankfieldmessage}</div>
        )}
      </div>


    );
  }
}

ClotheOptionsDropdown.propTypes = {
  searchable: PropTypes.bool
};
