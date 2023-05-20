import {
  EMAIL_SENDED,
  USER_NOT_FOUND,
  FORGOT_REQUEST,
  CHANGE_PASSWORD_REQUEST,
  PASSWORD_CHANGED,
  INVALID_CODE
} from "./Forgot.state";

const Model = {
    isLoading: false,
    userNotFound: false,
    success: false,
    passwordChanged: false,
    invalidCode: false
}

const ForgotReducer = (state=Model,action)=>{
  switch(action.type)
  {
    case FORGOT_REQUEST : return {
        ...state,
        isLoading: true,
        userNotFound: false,
        success: false,
        passwordChanged: false,
        invalidCode: false
    }

    case EMAIL_SENDED : return {
        ...state,
        isLoading: false,
        userNotFound: false,
        success: true,
        passwordChanged: false,
        invalidCode: false
    }

    case USER_NOT_FOUND : return {
        ...state,
        isLoading: false,
        userNotFound: true,
        success: false,
        passwordChanged: false,
        invalidCode: false
    }

    case CHANGE_PASSWORD_REQUEST : return {
        ...state,
        isLoading: true,
        userNotFound: false,
        success: true,
        passwordChanged: false,
        invalidCode: false
    }

    case PASSWORD_CHANGED : return {
        ...state,
        isLoading: false,
        userNotFound: false,
        success: true,
        passwordChanged: true,
        invalidCode: false
    }

    case INVALID_CODE : return {
        ...state,
        isLoading: false,
        userNotFound: false,
        success: true,
        passwordChanged: false,
        invalidCode: true
    }

    default : return state
  }
}

export default ForgotReducer;
