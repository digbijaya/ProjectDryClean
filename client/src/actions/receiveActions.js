import { GET_ERRORS, POST_ORDERS, COMMITTING, COMMITTED } from "./types";
import axios from "axios";
//Receive order
export const receiveorder = (orderData, history) => dispatch => {
  axios
    .post("/api/users/orderreceive", orderData)
    // .then(res => history.push("/initial"), commitToDbComplete())
    .then(res => {
      dispatch({
        type: POST_ORDERS,
        payload: res.data
      });
      sleep(5000);
      dispatch(commitToDbComplete());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const commitToDb = () => dispatch => {
  dispatch({
    type: COMMITTING
  });
};

const commitToDbComplete = () => {
  console.log("COMMIT COMPLETE");
  return {
    type: COMMITTED
  };
};

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}
