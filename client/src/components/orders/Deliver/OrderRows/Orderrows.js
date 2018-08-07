import React, { Component } from "react";
import Tux from "../../../hoc/Tux";
class Orderrows extends Component {
  constructor() {
    this.state = {
      gen: false
    };
  }

  render() {
    return (
      <Tux>
        <Orderrow />
      </Tux>
    );
  }
}

export default Orderrows;
