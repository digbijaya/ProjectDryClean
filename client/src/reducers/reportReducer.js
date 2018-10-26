import {
  GET_SALES,
  ORDERS_LOADING_COMPLETE,
  ORDERS_LOADING
} from "../actions/types";
const initialState = {
  fetching: false,
  salestats: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SALES:
      return {
        ...state,
        salestats: action.payload
      };
    case ORDERS_LOADING:
      return {
        ...state,
        fetching: true
      };
    case ORDERS_LOADING_COMPLETE:
      return {
        ...state,
        fetching: false
      };
    default:
      return state;
  }
}
