import React, { Component } from "react";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import Tux from "../../../hoc/Tux";
import classes from "./Confirmation.css";
import "./_datepicker.css?external";
import Backdrop from "../../../ui/Backdrop/Backdrop";
import Clothelist from "./Clothelist";

class Confirmation extends Component {
  constructor(props) {
    super();
    this.state = {
      deliverydate: props.expecteddeliverydate,
      focused: true
    };
  }
  render() {
    return (
      <Tux>
        <Backdrop show={this.props.show} />

          <div
            className={classes.Confirmation}
            style={{
              transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
              opacity: this.props.show ? "1" : "0"
            }}
          >
            <Clothelist
              clothes={this.props.orders}
              totalprice={this.props.totalprice}
              user={this.props.user}
              orderdetails={this.props.orderdetails}
            />
            {this.props.errors.order && (
              <div className="alert alert-danger">{this.props.errors.order} </div>
            )}
            <p><strong>Expected Delivery Date</strong></p>
            <SingleDatePicker
              date={this.state.deliverydate}
              onDateChange={deliverydate => {
                this.setState({ deliverydate });
                this.props.updateDeliveryDate(deliverydate);
              }}
              focused={this.state.focused}
              onFocusChange={({ focused }) => this.setState({ focused })}
              id="singledatepicker"
              displayFormat="DD MMM YY"
              showDefaultInputIcon
              inputIconPosition="after"
              small
              screenReaderInputMessage="Select expected delivery date"
            />
            {this.props.orderdetails ? (
              <button onClick={this.props.cancelConfirmation}>Done</button>
            ) : (
              <div>
                <button onClick={this.props.submit}>Submit</button>
                <button onClick={this.props.cancelConfirmation}>Cancel</button>
              </div>
            )}
          </div>


      </Tux>
    );
  }
}
export default Confirmation;
