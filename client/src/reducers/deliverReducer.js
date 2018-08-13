import {
  GET_ORDERS,
  ORDERS_LOADING_COMPLETE,
  ORDERS_LOADING,
  CHANGE_ORDERID_STATE,
  CLEAR_ORDERS
} from "../actions/types";
const initialState = {
  delivered: false,
  userentry: null,
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
        userentry: action.payload,
        loading: true
      };
    case ORDERS_LOADING_COMPLETE:
      return {
        ...state,
        loading: false
      };
    case CLEAR_ORDERS:
      return {
        ...state,
        userentry: null
      };
    case CHANGE_ORDERID_STATE:
      return {
        ...state,
        userentry: action.payload
      };
    default:
      return state;
  }
}
