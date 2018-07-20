import { GET_ORDERS, ORDERS_LOADING, CLEAR_ORDERS } from "../actions/types";
const initialState = {
  delivered: false,
  orders: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ORDERS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false
      };
    case CLEAR_ORDERS:
      return {
        ...state,
        orders: null
      };
    default:
      return state;
  }
}
