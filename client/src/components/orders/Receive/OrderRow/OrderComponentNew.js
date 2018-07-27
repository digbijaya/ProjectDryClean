import React, { Component } from "react";
import Tux from "../../../hoc/Tux";
import ClotheOptionsDropdown from "../Dropdown/Dropdown";

class OrderComponentNew extends Component {
  constructor() {
    super();
    this.state = {
      clothetypeSelected: false,
      clothequalitySelected: false
    };
    this.childtype = React.createRef();
    this.childquality = React.createRef();
    this.typeCleared = this.typeCleared.bind(this);
    this.qualityCleared = this.qualityCleared.bind(this);
    this.isTypeFilled = this.isTypeFilled.bind(this);
    this.isQualityFilled = this.isQualityFilled.bind(this);
  }

  // componentDidMount() {
  //   console.log("PROPS", this.props.type);
  //   this.childtype.current.updateAfterRemove(this.props.type);
  //   // this.setState({ selectValue: this.props.value });
  // }

  // updateAfterRemove() {
  //   console.log("IN ORDERCOMPONENTNEW");
  //   console.log("TYPE", this.props.type);
  //   console.log("QUALITY", this.props.quality);
  //   this.childtype.current.updateAfterRemove(this.props.type);
  //   // this.childquality.current.updateAfterRemove(this.props.quality);
  // }

  typeCleared() {
    this.setState({ clothetypeSelected: false }, () => {
      this.props.allFieldsPopulated(
        this.state.clothequalitySelected && this.state.clothetypeSelected
      );
    });
  }
  qualityCleared() {
    this.setState({ clothequalitySelected: false }, () => {
      this.props.allFieldsPopulated(
        this.state.clothequalitySelected && this.state.clothetypeSelected
      );
    });
  }

  isTypeFilled() {
    const clothetypeSelected = true;
    this.setState({ clothetypeSelected }, () => {
      this.props.allFieldsPopulated(
        this.state.clothequalitySelected && this.state.clothetypeSelected
      );
    });
  }
  isQualityFilled() {
    this.setState({ clothequalitySelected: true }, () => {
      this.props.allFieldsPopulated(
        this.state.clothequalitySelected && this.state.clothetypeSelected
      );
    });
  }

  render() {
    return (
      <Tux>
        <div>Item no.- {this.props.orderkey}</div>
        <div>Type no.- {this.props.type}</div>
        <div>Quality no.- {this.props.quality}</div>
        <span>
          <ClotheOptionsDropdown
            updateValue={event => {
              this.props.updateValue(event);
              this.props.addToOrderArray(event, this.props.orderkey);
              this.isTypeFilled();
            }}
            type={this.props.clothetype}
            cleared={this.typeCleared}
            ref={this.childtype}
            value={this.props.type}
          />
        </span>
        <span>
          <ClotheOptionsDropdown
            updateValue={event => {
              this.props.updateValue(event);
              this.props.addToOrderArray(event, this.props.orderkey);
              this.isQualityFilled();
            }}
            type={this.props.clothequality}
            cleared={this.qualityCleared}
            ref={this.childquality}
            value={this.props.quality}
          />
        </span>

        <button
          onClick={event => {
            // this.props.removeItem(event);
            this.props.remove(this.props.orderkey);
          }}
        >
          Delete
        </button>
      </Tux>
    );
  }
}

export default OrderComponentNew;
