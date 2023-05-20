import { useAsync } from "react-async";

import {
  Outlet,
  Navigate
} from "react-router";

import Cookies from "universal-cookie";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3434";

const verifyToken = async ({token})=>{
  try {
    const response = await axios({
      method: "get",
      url: "/verify-token/"+token
    });
    return response;
  }
  catch(err)
  {
    throw new Error(err);
  }
}

const AuthGuard = ()=>{
  const cookie = new Cookies();
  const token = cookie.get("authToken");
  const { data, error } = useAsync({
    promiseFn: verifyToken,
    token: token
  });
  if(data)
  {
    let user = JSON.stringify(data.data.data.data);
    sessionStorage.setItem("user",user);
    return <Outlet />;
  }
  if(error)
  {
    return <Navigate to="/login" />
  }
  return null;
}

export default AuthGuard;
