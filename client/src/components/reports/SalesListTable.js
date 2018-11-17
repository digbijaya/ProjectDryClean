import React from "react";
import Tux from "../hoc/Tux";
import ReactTable from "react-table";
const columns = [
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Age",
    accessor: "age"
  }
];
const saleslisttable = props => (
  <Tux>
    <ReactTable data={props.salestats} columns={columns} />
  </Tux>
);
export default saleslisttable;
