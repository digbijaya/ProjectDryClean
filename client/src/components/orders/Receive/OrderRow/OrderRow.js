import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Tux from "../../../hoc/Tux";
import OrderComponent from "./OrderComponent";

class OrderRow extends Component {
  constructor(props) {
    super();
    this.addOrderRow = this.addOrderRow.bind(this);
    this.removeOrderRow = this.removeOrderRow.bind(this);
    this.state = {
      clothetype: "Clothetype",
      clothequality: "Clothequality",
      allInputFilled: false,
      orderrows: [
        {
          id: 1,
          component: (
            <OrderComponent
              updateValue={props.updateValue}
              clothetype={"Clothetype"}
              clothequality={"Clothequality"}
              itemid={1}
              addItem={props.addItem}
              removeItem={props.removeItem}
              removeOrderRow={this.removeOrderRow}
              allFieldsPopulated={state => {
                this.allFieldsPopulated(state);
              }}
            />
          )
        }
      ]
    };
  }

  addOrderRow() {
    let prevId = this.state.orderrows.length;
    const orderrows = this.state.orderrows.slice(0);
    orderrows.push({
      id: prevId + 1,
      component: (
        <OrderComponent
          updateValue={this.props.updateValue}
          clothetype={"Clothetype"}
          clothequality={"Clothequality"}
          itemid={prevId + 1}
          addItem={this.props.addItem}
          removeItem={this.props.removeItem}
          removeOrderRow={this.removeOrderRow}
          allFieldsPopulated={state => {
            this.allFieldsPopulated(state);
          }}
        />
      )
    });
    this.setState({ orderrows, allInputFilled: false });
  }

  removeOrderRow(itemid) {
    let orderrows = this.state.orderrows.slice(0);
    orderrows.map(order => {
      console.log(order.component);
      console.log(order.id);
    });
    orderrows.map(order => {
      console.log(order.component);
      console.log(order.id);
      if (order.id === itemid) {
        console.log("FOUND");
        orderrows.splice(itemid + 1, 1);
      }
    });
    console.log("LAST ITER");
    orderrows.map(order => {
      console.log(order.component);
      console.log(order.id);
    });
    this.setState({ orderrows });
  }

  allFieldsPopulated(allFilled) {
    this.setState({ allInputFilled: allFilled });
  }

  render() {
    return (
      <Tux>
        {this.state.orderrows.map(item => <div>{item.component}</div>)}
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

export default withRouter(OrderRow);
