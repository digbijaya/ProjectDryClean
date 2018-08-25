import React from "react";
import Tux from "../../../hoc/Tux";

const clothelist = props => (
  <Tux>
    <div>
      <span>{props.user.username}</span>
      <span>
        {props.orderdetails ? props.orderdetails.neworderid._id : null}
      </span>
      <span>{props.orderdetails ? props.orderdetails.status : null}</span>
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
              {props.clothes.map(cloth => (
                <tr key={cloth.clothtype}>
                  <td nowrap>{cloth.clothtype}</td>
                  <td>{cloth.quality}</td>
                  <td>{cloth.washtype}</td>
                  <td>{cloth.color}</td>
                  <td>{cloth.quantity}</td>
                  <td>{cloth.price}</td>
                </tr>
              ))}
              <tr>
                <td nowrap>Total Price</td>
                <td />
                <td />
                <td />
                <td />
                <td>{props.totalPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Tux>
);

export default clothelist;
