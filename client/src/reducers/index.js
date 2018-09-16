import { combineReducers } from "redux";
import orderReceiveReducer from "./receiveReducer";
import orderDeliverReducer from "./deliverReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  orderReceive: orderReceiveReducer,
  orderDeliver: orderDeliverReducer,
  auth: authReducer,
  errors: errorReducer
});
