import React, { Component } from "react";
import OrderComponentNew from "./OrderComponentNew";

export default class Orderlist extends Component {
  render() {
    var orders = this.props.orders;
    var remove = this.props.remove;
    var allFieldsPopulated = this.props.allFieldsPopulated;

    return (
      <div>
        {Object.keys(orders).map(orderKey => {
          return (
            <OrderComponentNew
              clothetype={"Clothetype"}
              clothequality={"Clothequality"}
              remove={remove}
              allFieldsPopulated={allFieldsPopulated}
              updateValue={this.props.updateValue}
              addToOrderArray={this.props.addToOrderArray}
              key={orders[orderKey].orderId}
              orderkey={orderKey}
              type={orders[orderKey].clothetype}
              quality={orders[orderKey].clothequality}
            />
          );
        })}
      </div>
    );
  }
}
