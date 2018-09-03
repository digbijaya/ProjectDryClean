import React, { Component } from "react";
import OrderComponent from "./OrderComponent";

export default class Orderlist extends Component {
  render() {
    var orders = this.props.orders;
    var remove = this.props.remove;
    var allFieldsPopulated = this.props.allFieldsPopulated;

    return (
      <div class="form-group row">
        {Object.keys(orders).map(orderKey => {
          return (
            <OrderComponent
              clotheproperties={[
                "clothetype",
                "clothequality",
                "washtype",
                "color"
              ]}
              remove={remove}
              allFieldsPopulated={allFieldsPopulated}
              updateValue={this.props.updateValue}
              addToOrderArray={this.props.addToOrderArray}
              addToOrderArrayFromInput={this.props.addToOrderArrayFromInput}
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
