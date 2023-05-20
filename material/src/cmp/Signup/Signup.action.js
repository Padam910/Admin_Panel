import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR
} from "./Signup.state";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3434";

const signupRequest = (formdata)=>{
  return async (dispatch)=>{
    try {
      dispatch({
        type: SIGNUP_REQUEST,
        payload: []
      });
      const response = await axios({
        method: "post",
        url: "/signup",
        data: formdata
      });
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: response.data
      });
    }
    catch(err)
    {
      dispatch({
        type: SIGNUP_ERROR,
        error: err.response.data
      });
    }
  }
}

export {
  signupRequest
}
