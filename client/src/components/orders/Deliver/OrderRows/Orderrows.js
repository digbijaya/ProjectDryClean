import React, { Component } from "react";
import Tux from "../../../hoc/Tux";
import Pagination from "react-js-pagination";

const PER_PAGE = 3;
class Orderrows extends Component {
  constructor() {
    super();
    this.state = {
      orderids: {},
      activePage: 1
    };
    this.toggleStateToShowOrderdetails = this.toggleStateToShowOrderdetails.bind(
      this
    );
  }

  componentWillMount() {
    this.props.currentpage
      ? this.setState({ activePage: this.props.currentpage })
      : null;
  }

  toggleStateToShowOrderdetails(orderid, showOrderDetails, activepage) {
    this.props.populateSelectedOrderid(orderid, showOrderDetails, activepage);
  }

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
  };

  render() {
    const fullUser = this.props.userentry;
    const fullorderids = this.props.userentry.orderids;
    var orderids = [];
    var start = Math.trunc(this.state.activePage * PER_PAGE - (PER_PAGE - 1));
    var end = Math.trunc(this.state.activePage * PER_PAGE);
    for (var i = start; i <= end && i <= fullorderids.length; i++) {
      orderids.push(fullorderids[i - 1]);
    }

    return (
      <Tux>
        {orderids.map(orderid => (
          <div>
            <div>Status- {orderid.orderstatus}</div>
            <div>id- {orderid._id}</div>
            <button
              className="btn btn-primary btn-lg btn-default btn-lock"
              onClick={event => {
                this.toggleStateToShowOrderdetails(
                  orderid,
                  true,
                  this.state.activePage
                );
              }}
            >
              Details
            </button>
            <hr />
          </div>
        ))}

        <div className="text-center">
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={this.state.activePage}
            itemsCountPerPage={PER_PAGE}
            totalItemsCount={fullorderids.length}
            pageRangeDisplayed={10}
            onChange={this.handlePageChange}
          />
        </div>
      </Tux>
    );
  }
}

export default Orderrows;
