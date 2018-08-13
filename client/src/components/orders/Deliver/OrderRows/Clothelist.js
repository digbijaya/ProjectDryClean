import React from "react";
import Tux from "../../../hoc/Tux";

const clothelist = props => (
  <Tux>
    <div>
      <span>{props.fullUser ? props.fullUser.username : null}</span>
      <span>{props.orderid ? props.orderid._id : null}</span>
      <span>{props.orderid ? props.orderid.orderstatus : null}</span>
    </div>
    <div className="container">
      <hr />
      <div style={{ width: "30%", margin: "35px auto" }}>
        <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Cloth Type</th>
                <th>Quality</th>
                <th>Washtype</th>
                <th>Color</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {props.orderid.clothes
                ? props.orderid.clothes.map(cloth => (
                    <tr key={cloth.quality}>
                      <td>{cloth.type}</td>
                      <td>{cloth.quality}</td>
                      <td>{cloth.washtype}</td>
                      <td>{cloth.color}</td>
                      <td>{cloth.quantity}</td>
                      <td>{cloth.price}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Tux>
);

export default clothelist;
