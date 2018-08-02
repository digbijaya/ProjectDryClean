import React from "react";
import Tux from "../../../hoc/Tux";

const clothelist = props => (
  <Tux>
    <div>
      <span>{props.user.username}</span>
      <span>{props.orderid ? props.orderid._id : null}</span>
    </div>
    <div className="container">
      <hr />
      <div style={{ width: "30%", margin: "35px auto" }}>
        <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Cloth Type</th>
                <th>Cloth Description</th>
              </tr>
            </thead>
            <tbody>
              {props.clothes.map(cloth => (
                <tr key={cloth.clothname}>
                  <td>{cloth.clothname}</td>
                  <td>{cloth.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Tux>
);

export default clothelist;
