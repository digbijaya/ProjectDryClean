import React, { Component } from "react";
import Tux from "../../../hoc/Tux";
import ClotheOptionsDropdown from "../Dropdown/Dropdown";

class OrderComponent extends Component {
  constructor() {
    super();
    this.state = {
      clothetypeSelected: false,
      clothequalitySelected: false,
      clothprops: {
        clothetypeSelected: false,
        clothequalitySelected: false,
        washtypeSelected: false,
        quantitySelected: false,
        colorSelected: false
      }
    };
    this.typeCleared = this.typeCleared.bind(this);
    this.qualityCleared = this.qualityCleared.bind(this);
    this.isTypeFilled = this.isTypeFilled.bind(this);
    this.isQualityFilled = this.isQualityFilled.bind(this);
  }

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

  isFilled(clothProp) {
    let clothprop = clothProp + "Selected";
    let clothprops = this.state.clothprops;
    clothprops[clothprop] = true;
    this.setState({ clothprops }, () => {
      let allFilled = true;
      for (let entry of Object.entries(clothprops)) {
        allFilled = allFilled && entry[1];
      }
      console.log("ALL FILLED", allFilled);
      this.props.allFieldsPopulated(allFilled);
    });
  }

  render() {
    return (
      <Tux>
        <div>Item no.- {this.props.orderkey + 1}</div>
        {Object.keys(this.props.clotheproperties).map(clothePropertyKey => {
          let clothProp = this.props.clotheproperties[clothePropertyKey];
          return (
            <span>
              <ClotheOptionsDropdown
                updateValue={event => {
                  this.props.updateValue(event);
                  this.props.addToOrderArray(event, this.props.orderkey);
                  this.isFilled(clothProp);
                }}
                type={clothProp}
                cleared={this.typeCleared}
              />
            </span>
          );
        })}
        <span>
          <input type="text" placeholder="  price" name="price" />
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

export default OrderComponent;
