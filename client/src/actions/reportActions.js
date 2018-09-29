import {
  GET_SALES,
  ORDERS_LOADING,
  GET_ERRORS,
  ORDERS_LOADING_COMPLETE
} from "./types";
import axios from "axios";

export const fetchReport = reportparams => dispatch => {
  dispatch(setReportLoading());
  axios
    .post("/api/reports/fetchreport", reportparams)
    .then(res => {
      dispatch({
        type: GET_SALES,
        payload: res.data
      });
      dispatch(fetchfromdbcomplete());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Reports loading
export const setReportLoading = () => {
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
