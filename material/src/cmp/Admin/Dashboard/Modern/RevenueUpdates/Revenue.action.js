import {
  REVENUE_REQUEST,
  REVENUE_SUCCESS,
  REVENUE_FAILED
} from "./Revenue.state";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3434";

const revenueRequest = ()=>{
  return async (dispatch)=>{
    try {
      dispatch({
        type: REVENUE_REQUEST,
        payload: []
      });
      const payload = await axios({
        method: "get",
        url: "/revenue-updates"
      });
        dispatch({
          type: REVENUE_SUCCESS,
          payload: payload.data
        });

    }
    catch(err)
    {
      dispatch({
        type: REVENUE_FAILED
      });
    }
  }
}

export {
  revenueRequest
}
