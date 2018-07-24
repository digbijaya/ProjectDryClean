import React, { Component } from "react";
import OrderComponentNew from "./OrderComponentNew";

export default class Orderlist extends Component {
  constructor() {
    super();
    this.child = React.createRef();
  }
  updateAfterRemove() {
    this.child.current.updateAfterRemove();
  }
  render() {
    var orders = this.props.orders;
    var remove = this.props.remove;
    var allFieldsPopulated = this.props.allFieldsPopulated;

    return (
      <div>
        {/* orders.map(order => {
          return (
            <OrderComponentNew
              clothetype={"Clothetype"}
              clothequality={"Clothequality"}
              remove={remove}
              allFieldsPopulated={allFieldsPopulated}
              updateValue={this.props.updateValue}
              key={order.index}
              orderkey={orderComp}
            />
          );
        }) */}
        {Object.keys(orders).map(orderKey => {
          console.log(orders[orderKey].clothetype);
          return (
            <OrderComponentNew
              clothetype={"Clothetype"}
              clothequality={"Clothequality"}
              remove={remove}
              allFieldsPopulated={allFieldsPopulated}
              updateValue={this.props.updateValue}
              addToOrderArray={this.props.addToOrderArray}
              key={orderKey}
              orderkey={orderKey}
              type={orders[orderKey].clothetype}
              quality={orders[orderKey].clothequality}
              ref={this.child}
            />
          );
        })}
      </div>
    );
  }
}
