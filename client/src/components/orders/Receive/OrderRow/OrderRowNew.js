import React, { Component } from "react";
import { withRouter } from "react-router-dom";
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
    var order = {};
    neworderrows.push(order);
    this.setState({ orderrows: neworderrows, allInputFilled: false });
  }

  addToOrderArray(event, index) {
    let orderrows = this.state.orderrows.slice(0);
    let clothParam = event.category;
    let orderAtIndex = orderrows[index];
    if (orderAtIndex.hasOwnProperty(event.category)) {
      orderAtIndex[clothParam] = event.value;
      orderAtIndex["orderId"] = index * 17;
    } else {
      orderAtIndex[clothParam] = event.value;
      orderAtIndex["orderId"] = index * 17;
    }
    this.setState({ orderrows });
  }

  removeOrderRow(index) {
    console.log("INCOMING", index);

    let neworderrows = this.state.orderrows.slice(0);
    neworderrows.forEach((val, ind) => {
      console.log("BROWSED", val);
      if (ind == index) {
        console.log("FOUND");
        neworderrows.splice(index, 1);
      }
    });
    Object.keys(neworderrows).map(order => {
      console.log("ORDER", neworderrows[order]);
    });
    this.setState({ orderrows: neworderrows });
    // this.child.current.updateAfterRemove();
  }

  allFieldsPopulated(allFilled) {
    this.setState({ allInputFilled: allFilled });
  }

  render() {
    return (
      <Tux>
        {/* {this.state.orderrows.map(item => <div>{item.component}</div>)} */}
        <Orderlist
          orders={this.state.orderrows}
          remove={this.removeOrderRow}
          allFieldsPopulated={this.allFieldsPopulated}
          updateValue={this.props.updateValue}
          addToOrderArray={this.addToOrderArray}
          ref={this.child}
        />
        <button
          disabled={!this.state.allInputFilled}
          onClick={this.addOrderRow}
        >
          Add New
        </button>
      </Tux>
    );
  }
}

export default withRouter(OrderRowNew);
