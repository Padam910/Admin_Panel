import {
  EMAIL_SENDED,
  USER_NOT_FOUND,
  FORGOT_REQUEST,
  CHANGE_PASSWORD_REQUEST,
  PASSWORD_CHANGED,
  INVALID_CODE
} from "./Forgot.state";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3434";

const requestForgot = (e)=>{
  e.preventDefault();
  const email = e.target[0].value;
  return async (dispatch)=>{
    try {
      dispatch({
        type: FORGOT_REQUEST
      });
      await axios({
        method: "post",
        url: "/forgot-password",
        data: {
          email: email
        }
      });
      dispatch({
        type: EMAIL_SENDED
      });
    }
    catch(err)
    {
      dispatch({
        type: USER_NOT_FOUND
      });
    }
  }
}

const changePassword = (e,formData)=>{
  e.preventDefault();
  return async (dispatch)=>{
    try {
      dispatch({
        type: CHANGE_PASSWORD_REQUEST
      });
      await axios({
        method: "put",
        url: "/forgot-password",
        data: formData
      });
      dispatch({
        type: PASSWORD_CHANGED
      });
    }
    catch(err)
    {
      dispatch({
        type: INVALID_CODE
      });
    }
  }
}

export {
  requestForgot,
  changePassword
}
