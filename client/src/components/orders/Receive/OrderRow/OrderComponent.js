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
        colorSelected: false,
        quantityFilled: false,
        priceFilled: false
      }
    };
    this.typeCleared = this.typeCleared.bind(this);
    this.qualityCleared = this.qualityCleared.bind(this);
    this.isTypeFilled = this.isTypeFilled.bind(this);
    this.isQualityFilled = this.isQualityFilled.bind(this);
    this.isFilled = this.isFilled.bind(this);
  }

  typeCleared() {
    this.setState({ clothetypeSelected: false }, () => {
      this.props.allFieldsPopulated(
        this.state.clothequalitySelected && this.state.clothetypeSelected
      );
    });
  }

  isCleared(clothProp) {
    let clothprops = this.state.clothprops;
    clothprops[clothProp] = false;
    this.setState({ clothprops }, () => {
      let allCleared = false;
      for (let entry of Object.entries(clothprops)) {
        allCleared = allCleared && entry[1];
      }
      console.log("ALL CLEARED", allCleared);
      this.props.allFieldsPopulated(allCleared);
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
    console.log("IS FILLED");
    let clothprops = this.state.clothprops;
    clothprops[clothProp] = true;
    this.setState({ clothprops }, () => {
      let allFilled = true;
      for (let entry of Object.entries(clothprops)) {
        allFilled = allFilled && entry[1];
      }
      this.props.allFieldsPopulated(allFilled);
    });
  }

  render() {
    return (
      <Tux>
        <div class="form-group row offset-md-0">
         <div class="form-group col-auto">Item- {this.props.orderkey + 1}</div>
         {Object.keys(this.props.clotheproperties).map(clothePropertyKey => {
         let clothProp = this.props.clotheproperties[clothePropertyKey];
         return (
         <ClotheOptionsDropdown
            updateValue={event =>
         {
         this.props.updateValue(event);
         this.props.addToOrderArray(event, this.props.orderkey);
         this.isFilled(clothProp + "Selected");
         }}
         type={clothProp}
         cleared={() => {
         this.isCleared(clothProp + "Selected");
         }}
         />
         );
         })}
         <div class="form-group col-auto control-label">
            <input class="btn btn-outline border h-99"
               type="text"
               placeholder="  quantity"
               name="quantity"
               onChange={event => {
            if (event.target.value === "") {
            event = null;
            }
            event
            ? (this.isFilled("quantityFilled"),
            this.props.addToOrderArrayFromInput(
            event,
            this.props.orderkey
            ))
            : this.isCleared("quantityFilled");
            }}
            />
         </div>
         <div class="form-group col-auto">
            <input class="btn btn-outline border h-90"
               type="text"
               placeholder="  price"
               name="price"
               onChange={event => {
            if (event.target.value === "") {
            event = null;
            }
            event
            ? (this.isFilled("priceFilled"),
            this.props.addToOrderArrayFromInput(
            event,
            this.props.orderkey
            ))
            : this.isCleared("priceFilled");
            }}
            />
         </div>
         <button class="form-group col-auto btn btn-outline-primary h-50"
            onClick={event => {
         // this.props.removeItem(event);
         this.props.remove(this.props.orderkey);
         }}
         >
         Delete
         </button>
      </div>
      </Tux>
    );
  }
}

export default OrderComponent;
