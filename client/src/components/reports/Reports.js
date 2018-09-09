import React, { Component } from "react";
import "react-dates/initialize";
import "./_datepicker.css?external";
import presetclass from "./presetdatepicker.css";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController,
  isInclusivelyBeforeDay
} from "react-dates";
import isSameDay from "./isSameDay";
import moment from "moment";
import Select from "react-select";
import PropTypes from "prop-types";
import Tux from "../hoc/Tux";
import "./react-select.css?external";
import { withStyles, css } from "react-with-styles";
const SHOPNAMES = require("../../data/shopnames");

let SelectedStartDate = moment();
let SelectedEndDate = moment();

const today = moment();
const yesterday = moment().subtract(1, "day");
const presets = [
  {
    text: "Today",
    start: today,
    end: today
  },
  {
    text: "Yesterday",
    start: yesterday,
    end: yesterday
  },
  {
    text: "Last Week",
    start: today,
    end: moment().subtract(1, "week")
  },
  {
    text: "Last Month",
    start: today,
    end: moment().subtract(1, "month")
  }
];

class Reports extends Component {
  constructor() {
    super();
    this.state = {
      clearable: true,
      searchable: true,
      startDate: moment(),
      endDate: moment(),
      focusedInput: null
    };
    this.renderDatePresets = this.renderDatePresets.bind(this);
    this.onDatesChange = this.onDatesChange.bind(this);
  }

  clearValue = event => {
    this.select.setInputValue("");
  };

  setNewValue = event => {
    if (event) {
      this.setState({ selectValue: event.value });
      // this.props.updateValue(event);
    } else {
      this.setState({ selectValue: "" });
      // this.props.cleared();
    }
  };

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate });
  }

  renderDatePresets() {
    const { styles } = this.props;
    const { startDate, endDate } = this.state;

    return (
      <div className={presetclass.PresetDateRangePicker_panel}>
        {presets.map(({ text, start, end }) => {
          const isSelected =
            isSameDay(start, startDate) && isSameDay(end, endDate);
          return (
            <button
              key={text}
              className={
                (presetclass.PresetDateRangePicker_button,
                isSelected &&
                  presetclass.PresetDateRangePicker_button__selected)
              }
              type="button"
              onClick={() =>
                this.onDatesChange({ startDate: start, endDate: end })
              }
            >
              {text}
            </button>
          );
        })}
      </div>
    );
  }

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
            value={this.state.selectValue}
            searchable={this.state.searchable}
            onChange={event => {
              this.setNewValue(event);
            }}
          />
        </div>
        <DateRangePicker
          key={
            this.state.startDate
              ? this.state.startDate.format("DDMM")
              : this.state.endDate.format("DDMM")
          }
          startDateId="startDate"
          endDateId="endDate"
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onDatesChange={({ startDate, endDate }) => {
            this.setState({ startDate, endDate });
          }}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => {
            this.setState({ focusedInput });
          }}
          minimumNights={0}
          isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
          renderCalendarInfo={this.renderDatePresets}
        />
      </Tux>
    );
  }
}

Reports.propTypes = {
  searchable: PropTypes.bool
};

export default Reports;
