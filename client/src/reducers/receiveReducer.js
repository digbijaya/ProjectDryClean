import { POST_ORDERS, COMMITTING, COMMITTED } from "../actions/types";
const initialState = {
  committing: false,
  order: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_ORDERS:
      return {
        ...state,
        order: action.payload
      };
    case COMMITTING:
      return {
        ...state,
        committing: true
      };
    case COMMITTED:
      return {
        ...state,
        committing: false
      };
    default:
      return state;
  }
}
