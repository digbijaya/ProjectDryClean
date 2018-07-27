import React, { Component } from "react";
import Tux from "../../../hoc/Tux";
import OrderComponent from "./OrderComponent";
import Orderlist from "./Orderlist";

class OrderRowNew extends Component {
  constructor(props) {
    super();
    this.addOrderRow = this.addOrderRow.bind(this);
    this.removeOrderRow = this.removeOrderRow.bind(this);
    this.allFieldsPopulated = this.allFieldsPopulated.bind(this);
    this.addToOrderArray = this.addToOrderArray.bind(this);
    this.child = React.createRef();
    this.state = {
      clothetype: "Clothetype",
      clothequality: "Clothequality",
      allInputFilled: true,
      orderrows: []
    };
  }

  addOrderRow() {
    const neworderrows = this.state.orderrows.slice(0);
    var order = { orderId: new Date().getTime() };
    neworderrows.push(order);
    this.setState({ orderrows: neworderrows, allInputFilled: false });
  }

  addToOrderArray(event, index) {
    let orderrows = this.state.orderrows.slice(0);
    let clothParam = event.category;
    let orderAtIndex = orderrows[index];
    let orderIndex = orderAtIndex["orderId"];
    if (orderAtIndex.hasOwnProperty(event.category)) {
      orderAtIndex[clothParam] = event.value;
      orderAtIndex["orderId"] = orderIndex;
    } else {
      orderAtIndex[clothParam] = event.value;
      orderAtIndex["orderId"] = orderIndex;
    }
    this.setState({ orderrows });
  }

  removeOrderRow(index) {
    let neworderrows = this.state.orderrows.slice(0);
    neworderrows.forEach((val, ind) => {
      if (ind == index) {
        neworderrows.splice(index, 1);
      }
    });
    this.setState({ orderrows: neworderrows });
  }

  submitToHigher = () => {
    const orders = this.state.orderrows;
    Object.keys(orders).map(orderKey => {
      console.log(orders[orderKey]);
    });
  };

  allFieldsPopulated(allFilled) {
    this.setState({ allInputFilled: allFilled });
  }

  render() {
    return (
      <Tux>
        <Orderlist
          orders={this.state.orderrows}
          remove={this.removeOrderRow}
          allFieldsPopulated={this.allFieldsPopulated}
          updateValue={this.props.updateValue}
          addToOrderArray={this.addToOrderArray}
        />
        <button
          disabled={!this.state.allInputFilled}
          onClick={this.addOrderRow}
        >
          Add New
        </button>
        <button onClick={this.props.addItem(this.state.orderrows)}>
          Submit
        </button>
      </Tux>
    );
  }
}

export default OrderRowNew;
