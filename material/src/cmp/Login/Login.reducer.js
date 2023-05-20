import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  USER_NOT_FOUND,
  INCORRECT_PASSWORD,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED
} from "./Login.state";

const Model = {
  isLoading: false,
  userNotFound: false,
  incorrectPassword: false,
  isLogged: false,
  isLogout: false,
  data: []
}

const LoginReducer = (state=Model,action)=>{
  switch(action.type)
  {
    case LOGIN_REQUEST : return {
      ...state,
      isLoading: true,
      userNotFound: false,
      incorrectPassword: false,
      isLogged: false,
      isLogout: false,
      data: []
    }

    case LOGIN_SUCCESS : return {
      ...state,
      isLoading: false,
      userNotFound: false,
      incorrectPassword: false,
      isLogged: true,
      isLogout: false,
      data: action.payload
    }

    case LOGOUT_SUCCESS : return {
      ...state,
      isLoading: false,
      userNotFound: false,
      incorrectPassword: false,
      isLogged: false,
      isLogout: true,
      data: []
    }

    case LOGOUT_FAILED : return {
      ...state,
      isLoading: false,
      userNotFound: false,
      incorrectPassword: false,
      isLogged: true,
      isLogout: false,
    }

    case USER_NOT_FOUND : return {
      ...state,
      isLoading: false,
      userNotFound: true,
      incorrectPassword: false,
      isLogged: false,
      isLogout: false,
      data: []
    }

    case INCORRECT_PASSWORD: return {
      ...state,
      isLoading: false,
      userNotFound: false,
      incorrectPassword: true,
      isLogged: false,
      isLogout: false,
      data: []
    }

    default : return state
  }
}

export default LoginReducer;
