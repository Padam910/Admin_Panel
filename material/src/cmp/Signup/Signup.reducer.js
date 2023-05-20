import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR
} from "./Signup.state";

const Model = {
  isLoader: false,
  error: null,
  data: null
}

const SignupReducer = (state=Model,action)=>{
  switch(action.type)
  {
    case SIGNUP_REQUEST : return {
      ...state,
      isLoading: true,
      error: null,
      data: null
    }

    case SIGNUP_SUCCESS : return {
      ...state,
      isLoading: false,
      data: action.payload,
      error: null
    }

    case SIGNUP_ERROR : return {
      ...state,
      isLoading: false,
      error: action.error,
      data: null
    }

    default : return state;

  }
}

export default SignupReducer;
