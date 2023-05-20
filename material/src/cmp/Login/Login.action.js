import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  USER_NOT_FOUND,
  INCORRECT_PASSWORD,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED
} from "./Login.state";
import axios from "axios";
import Cookies from "universal-cookie";

axios.defaults.baseURL = "http://localhost:3434";


const loginRequest = (user)=>{
  return async (dispatch)=>{
    try {
      dispatch({
        type: LOGIN_REQUEST,
        payload: []
      });
      const response = await axios({
        method: "post",
        url: "/login",
        data: user
      });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data
      });
    }
    catch(err)
    {
      if(err.response.status === 404)
      {
        dispatch({
          type: USER_NOT_FOUND
        });
      }
      else {
        dispatch({
          type: INCORRECT_PASSWORD
        });
      }
    }
  }
}

const logoutRequest = ()=>{
  return async (dispatch)=>{
    try {
      const cookie = new Cookies();
      let tmp = sessionStorage.getItem("user");
      let userInfo = JSON.parse(tmp);
      let id = userInfo.userId;
      await axios({
        method: "get",
        url: "/logout/"+id
      });
      sessionStorage.clear();
      cookie.remove("authToken");
      dispatch({
        type: LOGOUT_SUCCESS
      });
    }
    catch(err)
    {
      dispatch({
        type: LOGOUT_FAILED
      });
    }
  }
}

export {
  loginRequest,
  logoutRequest
}
