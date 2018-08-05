import React, { Component } from "react";
import Tux from "../../../hoc/Tux";
import ClotheOptionsDropdown from "../Dropdown/Dropdown";

class OrderComponent extends Component {
  constructor() {
    super();
    this.state = {
      clothetypeSelected: false,
      clothequalitySelected: false,
      clothprops: { clothetypeSelected: false, clothequalitySelected: false }
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
    let clothprop = eval(clothProp + "Selected");
    let clothprops = this.state.clothprops;
    clothprops[clothprop] = true;
    this.setState({ clothprops }, () => {
      let allFilled = false;
      Object.keys(this.state.clothprops).map(clothpropkey => {
        return (
          // console.log(this.state.clothprops[clothpropkey])
          (allFilled = allFilled && this.state.clothprops[clothpropkey])
        );
      });

      this.props.allFieldsPopulated(
        this.state.clothequalitySelected && this.state.clothetypeSelected
      );
    });
  }

  render() {
    return (
      <Tux>
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
        <div>Item no.- {this.props.orderkey + 1}</div>
        {/* <span>
          <ClotheOptionsDropdown
            updateValue={event => {
              this.props.updateValue(event);
              this.props.addToOrderArray(event, this.props.orderkey);
              this.isTypeFilled();
            }}
            type={this.props.clothetype}
            cleared={this.typeCleared}
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
          />
        </span>
        <span>
          <ClotheOptionsDropdown
            updateValue={event => {
              this.props.updateValue(event);
              this.props.addToOrderArray(event, this.props.orderkey);
              this.isWashtypeFilled();
            }}
            type={this.props.washtype}
            cleared={this.washtypeCleared}
          />
        </span>
        <span>
          <ClotheOptionsDropdown
            updateValue={event => {
              this.props.updateValue(event);
              this.props.addToOrderArray(event, this.props.orderkey);
              this.isQuantityFilled();
            }}
            type={this.props.quantity}
            cleared={this.quantityCleared}
          />
        </span>
        <span>
          <ClotheOptionsDropdown
            updateValue={event => {
              this.props.updateValue(event);
              this.props.addToOrderArray(event, this.props.orderkey);
              this.isColorFilled();
            }}
            type={this.props.color}
            cleared={this.colorCleared}
          />
        </span> */}
        <span>
          <input type="text" placeholder="price" name="price" />
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
