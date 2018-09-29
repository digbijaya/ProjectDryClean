import React, { Component } from "react";
import { connect } from "react-redux";
import "react-dates/initialize";
import "./_datepicker.css?external";
import presetclass from "./presetdatepicker.css";
import { DateRangePicker, isInclusivelyBeforeDay } from "react-dates";
import { fetchReport } from "../../actions/reportActions";
import isSameDay from "./isSameDay";
import moment from "moment";
import Select from "react-select";
import PropTypes from "prop-types";
import Tux from "../hoc/Tux";
import "./react-select.css?external";
import { withStyles, css } from "react-with-styles";
const SHOPNAMES = require("../../data/shopnames");

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
    end: today.clone().subtract(1, "week")
  },
  {
    text: "Last Month",
    start: today,
    end: today.clone().subtract(1, "month")
  }
];

class Reports extends Component {
  constructor() {
    super();
    this.state = {
      clearable: true,
      searchable: true,
      selectedShop: "",
      startDate: today.clone().startOf("day"),
      endDate: today.clone(),
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
      this.setState({ selectedShop: event.value });
      // this.props.updateValue(event);
    } else {
      this.setState({ selectedShop: "" });
      // this.props.cleared();
    }
  };

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate });
  }

  renderDatePresets() {
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
                isSelected
                  ? presetclass.PresetDateRangePicker_button__selected
                  : null)
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

  onfetch = event => {
    const reportparams = {
      startdate: this.state.startDate.startOf("day"),
      enddate: this.state.endDate.endOf("day"),
      selectedshop: this.state.selectedShop
    };
    this.props.fetchReport(reportparams);
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
            value={this.state.selectedShop}
            searchable={this.state.searchable}
            onChange={event => {
              this.setNewValue(event);
            }}
          />
        </div>
        <DateRangePicker
          key={
            this.state.startDate
              ? this.state.startDate.format("DD MMM YY")
              : this.state.endDate.format("DD MMM YY")
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
          isOutsideRange={day => !isInclusivelyBeforeDay(day, today)}
          renderCalendarInfo={this.renderDatePresets}
          initialVisibleMonth={() => today.clone().subtract(1, "month")}
          displayFormat="DD MMM YY"
          showDefaultInputIcon
          inputIconPosition="after"
          small
          screenReaderInputMessage="Select from and to date"
        />
        <button onClick={this.onfetch}>Fetch</button>
      </Tux>
    );
  }
}

Reports.propTypes = {
  searchable: PropTypes.bool,
  fetchReport: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  fetchedreport: state.report
});

export default connect(
  mapStateToProps,
  { fetchReport }
)(Reports);
