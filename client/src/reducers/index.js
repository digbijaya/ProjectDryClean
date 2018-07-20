import { combineReducers } from "redux";
import orderReceiveReducer from "./receiveReducer";
import orderDeliverReducer from "./deliverReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  orderReceive: orderReceiveReducer,
  orderDeliver: orderDeliverReducer,
  errors: errorReducer
});
