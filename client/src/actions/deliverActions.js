import {
  GET_ERRORS,
  GET_ORDERS,
  ORDERS_LOADING_COMPLETE,
  ORDERS_LOADING,
  CHANGE_ORDERID_STATE,
  CLEAR_ORDERS
} from "./types";
import axios from "axios";
//Deliver order
export const deliverorder = userData => dispatch => {
  dispatch(setOrdersLoading());
  axios
    .post("/api/users/orderdeliver", userData)
    .then(res => {
      dispatch({
        type: GET_ORDERS,
        payload: res.data
      });
      // sleep(5000);
      dispatch(fetchfromdbcomplete());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Orders loading
export const setOrdersLoading = () => {
  return {
    type: ORDERS_LOADING
  };
};

const fetchfromdbcomplete = () => {
  console.log("FETCH COMPLETE");
  return {
    type: ORDERS_LOADING_COMPLETE
  };
};

//Orders clearing
export const clearOrders = () => {
  return {
    type: CLEAR_ORDERS
  };
};

//Change status
export const changeOrderidStatus = updateorderid => dispatch => {
  dispatch(setOrdersLoading());
  axios
    .post("/api/users/changeorderidstatus", updateorderid)
    .then(res => {
      dispatch({
        type: CHANGE_ORDERID_STATE,
        payload: res.data
      });
      dispatch(fetchfromdbcomplete());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}
