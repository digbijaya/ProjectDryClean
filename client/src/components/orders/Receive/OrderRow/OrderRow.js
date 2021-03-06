import React, { Component } from "react";
import Tux from "../../../hoc/Tux";
import Orderlist from "./Orderlist";

class OrderRow extends Component {
  constructor() {
    super();
    this.addOrderRow = this.addOrderRow.bind(this);
    this.removeOrderRow = this.removeOrderRow.bind(this);
    this.allFieldsPopulated = this.allFieldsPopulated.bind(this);
    this.addToOrderArray = this.addToOrderArray.bind(this);
    this.addToOrderArrayFromInput = this.addToOrderArrayFromInput.bind(this);
    this.child = React.createRef();
    this.state = {
      clothetype: "Clothetype",
      clothequality: "Clothequality",
      allInputFilled: true,
      orderrows: [],
      errors: {}
    };
  }

  addOrderRow() {
    const neworderrows = this.state.orderrows.slice(0);
    var order = { orderId: new Date().getTime() };
    neworderrows.push(order);
    this.setState({ orderrows: neworderrows, allInputFilled: false });
  }

  addToOrderArrayFromInput(event, index) {
    let orderrows = this.state.orderrows.slice(0);
    let clothParam = event.target.name;
    let orderAtIndex = orderrows[index];
    let orderIndex = orderAtIndex["orderId"];
    if (orderAtIndex.hasOwnProperty(event.target.name)) {
      orderAtIndex[clothParam] = event.target.value;
      orderAtIndex["orderId"] = orderIndex;
    } else {
      orderAtIndex[clothParam] = event.target.value;
      orderAtIndex["orderId"] = orderIndex;
    }
    this.setState({ orderrows });
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
      if (ind === Math.trunc(index)) {
        neworderrows.splice(ind, 1);
      }
    });
    this.setState({ orderrows: neworderrows, allInputFilled: true });
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
          addToOrderArrayFromInput={this.addToOrderArrayFromInput}
        />
        <button class="btn btn-outline-primary mb-2 mr-1"
          disabled={!this.state.allInputFilled}
          onClick={event => {
            this.addOrderRow();
          }}
        >
          <strong>Add New</strong>
        </button>
        <button class="btn btn-outline-primary mb-2 mr-1" onClick={() => this.props.addItem(this.state.orderrows)}>
          <strong>Submit</strong>
        </button>
      </Tux>
    );
  }
}

export default OrderRow;
