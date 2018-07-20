import { GET_ERRORS, GET_ORDERS, ORDERS_LOADING, CLEAR_ORDERS } from "./types";
import axios from "axios";
//Deliver order
export const deliverorder = userData => dispatch => {
  dispatch(setOrdersLoading());
  axios
    .post("/api/users/orderdeliver", userData)
    .then(res =>
      dispatch({
        type: GET_ORDERS,
        payload: res.data
      })
    )
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

//Orders clearing
export const clearOrders = () => {
  return {
    type: CLEAR_ORDERS
  };
};
